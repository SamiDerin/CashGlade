# Server proxy for Cashglade AI Coach

This small Express server forwards requests from the Cashglade front-end to the Anthropic API. It keeps your Anthropic API key on the server so you don't need to expose it in client-side JavaScript.

Quickstart

1. Copy .env.example to .env and set your ANTHROPIC_API_KEY.
2. Install dependencies:
   cd server
   npm install
3. Start the server:
   ANTHROPIC_API_KEY="<your_key>" node index.js

The server listens on PORT (default 3000) and exposes POST /api/coach for the client to call.
