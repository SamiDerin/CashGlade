const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if(!ANTHROPIC_API_KEY){
  console.warn('Warning: ANTHROPIC_API_KEY is not set. /api/coach will fail until you set it.');
}

app.use(helmet());
app.use(express.json({limit: '64kb'}));

// Allow same-origin + localhost dev
app.use(cors({origin: (origin, cb)=> cb(null, true)}));

// Basic rate limiter — tuned for demo purposes
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Helper to validate incoming chat payload
function validatePayload(body){
  if(!body) return {ok:false, msg:'Empty body'};
  // Accept either {messages: [...]} or {input: 'text'}
  if(Array.isArray(body.messages)){
    const joined = body.messages.map(m=>m.content||m).join(' ');
    if(joined.length > 16000) return {ok:false, msg:'Payload too large'};
    if(body.messages.length > 50) return {ok:false, msg:'Too many message objects'};
    return {ok:true, type:'messages'};
  }
  if(typeof body.input === 'string'){
    if(body.input.length > 8000) return {ok:false, msg:'Input too long'};
    return {ok:true, type:'input'};
  }
  return {ok:false, msg:'Unsupported payload shape. Send {messages:[...] } or {input:"..."}.'};
}

app.post('/api/coach', async (req, res) => {
  const check = validatePayload(req.body);
  if(!check.ok) return res.status(400).json({error: check.msg});

  // Build request to Anthropic. We'll forward a minimal, safe envelope.
  const anthropicBody = {};
  if(check.type === 'messages'){
    anthropicBody.messages = req.body.messages;
  } else {
    anthropicBody.messages = [{role:'user', content: req.body.input}];
  }

  // Optional: allow clients to override model, otherwise use a safe default
  anthropicBody.model = req.body.model || 'claude-sonnet-4-6';
  anthropicBody.max_tokens = Math.min(1000, req.body.max_tokens || 800);

  try{
    const response = await axios.post('https://api.anthropic.com/v1/messages', anthropicBody, {
      headers: {
        'Content-Type': 'application/json',
        ...(ANTHROPIC_API_KEY ? { 'Authorization': `Bearer ${ANTHROPIC_API_KEY}` } : {})
      },
      timeout: 30_000,
    });

    // Try to extract text content in a few common shapes.
    const data = response.data || {};
    // 1) new Anthropic responses may return data.message or data.output
    if(data.output && Array.isArray(data.output)){
      const text = data.output.filter(x=>x.type==='text').map(x=>x.text).join('\n');
      return res.json({ok:true, text, raw: data});
    }
    if(Array.isArray(data.content)){
      const text = data.content.filter(x=>x.type==='text').map(x=>x.text).join('\n');
      return res.json({ok:true, text, raw: data});
    }
    // Fallbacks
    if(typeof data.completion === 'string') return res.json({ok:true, text: data.completion, raw: data});
    if(typeof data.message === 'string') return res.json({ok:true, text: data.message, raw: data});
    // If nothing matches, return the entire payload (caller can inspect raw)
    return res.json({ok:true, text: JSON.stringify(data), raw: data});
  }catch(err){
    console.error('Anthropic proxy error:', err.message || err);
    const status = err.response?.status || 500;
    const body = err.response?.data || {message: err.message};
    return res.status(status).json({ok:false, error: 'Anthropic proxy error', details: body});
  }
});

// Health
app.get('/api/health', (req,res)=> res.json({ok:true, now: Date.now()}));

app.listen(PORT, ()=> console.log(`Coach proxy listening on http://localhost:${PORT}/ — proxying to Anthropic`));
