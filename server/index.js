const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  // Allow CORS for development. In production, lock this down.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.post('/api/coach', async (req, res) => {
  try {
    const { model, system, messages, max_tokens } = req.body || {};

    // Prefer Anthropic if key present
    if (process.env.ANTHROPIC_API_KEY) {
      const ar = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY
        },
        body: JSON.stringify({ model, messages, system, max_tokens })
      });
      const data = await ar.json();
      // Attempt to extract text in a few common shapes
      let reply = '';
      if (typeof data?.completion === 'string') reply = data.completion;
      else if (Array.isArray(data?.content)) reply = data.content.map(c => c?.text || '').join('\n');
      else if (data?.output?.text) reply = data.output.text;
      else reply = JSON.stringify(data);
      return res.json({ reply });
    }

    // Fallback: OpenAI (if configured)
    if (process.env.OPENAI_API_KEY) {
      const or = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: model || 'gpt-4o-mini',
          messages: [ { role: 'system', content: system || '' }, ...(messages || []) ],
          max_tokens
        })
      });
      const data = await or.json();
      const reply = data?.choices?.[0]?.message?.content || JSON.stringify(data);
      return res.json({ reply });
    }

    return res.status(500).json({ error: 'No AI provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.' });
  } catch (err) {
    console.error('Proxy error', err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Coach proxy running on port ${PORT}`));
