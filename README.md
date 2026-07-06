# 💰 Cashglade

**Learn to save, invest, and earn — before it costs you anything.**

Cashglade is a practice ground for money skills. Trade a simulated market across stocks, crypto, commodities, forex, and futures, play short games that teach budgeting and business, and ask an AI coach whenever you're stuck. No real money, no real risk, real understanding.

🌐 **[Launch Cashglade](https://samiderin.github.io/CashGlade/)**

---

## ✨ Features

### 📈 **Simulate**
Trade across five asset classes with a live-moving simulated market:
- **Stocks** (AAPL, TSLA, MSFT, AMZN, NVDA)
- **Crypto** (BTC, ETH, SOL, DOGE)
- **Commodities** (Gold, Silver, Oil, Natural Gas)
- **Forex** (EUR/USD, GBP/USD, USD/JPY, AUD/USD)
- **Futures** (S&P 500, Crude Oil, Gold, Corn)

Real TradingView charts embedded for each asset. Track your portfolio's cash, holdings value, total equity, and P&L in real time.

### 🎮 **Play**
Three educational mini-games that teach money habits:

1. **Budget Survivor** — Allocate your monthly income across rent, food, transport, fun, and savings. Survive 12 months of random life events while building your safety net.

2. **Lemonade Stand** — Run a tiny business for 10 days. Set your price and production volume, adjust for weather and demand, and learn the fundamentals of pricing and cost control.

3. **Compound Machine** — Visualize compound interest over decades. See how small monthly contributions grow exponentially with time and return rates.

### 🤖 **AI Coach**
Ask your personal AI coach anything about money:
- Explain financial terms ("What's the difference between a stock and a bond?")
- Walk through scenarios
- Get sanity checks on ideas
- Get general financial education (not personalized financial advice)

### 📚 **Learn**
Six core lessons to get you started:
- Why saving comes first
- The quiet power of compound interest
- Investing basics: what you're actually buying
- Risk isn't the same across markets
- Making more money: the other half of the equation
- A simple budgeting rule to start with

---

## 🚀 Getting Started

### Visit Online
No setup required — just open the live site:
👉 **[cashglade.com](https://samiderin.github.io/CashGlade/)**

### Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/SamiDerin/CashGlade.git
   cd CashGlade
   ```

2. Open `index.html` in your browser (no build step needed):
   ```bash
   open index.html
   # or on Windows:
   start index.html
   ```

3. Or use a local server for best experience:
   ```bash
   # Python 3
   python -m http.server 8000
   # Python 2
   python -m SimpleHTTPServer 8000
   # Node (if you have http-server installed)
   http-server
   ```

   Then visit `http://localhost:8000`

---

## 📋 How to Use

### Trading Simulator
1. Navigate to the **Simulate** tab
2. Choose an asset class (Stocks, Crypto, Commodities, Forex, Futures)
3. Click **Trade** on any asset
4. Enter quantity and click **Buy** or **Sell**
5. Watch your portfolio stats update in real time
6. Reset anytime with the **Reset portfolio** button

**Tip:** Compare simulated prices with real TradingView charts on the right side to practice trading decisions.

### Playing Games
1. Go to the **Games** tab
2. Pick a game: Budget Survivor, Lemonade Stand, or Compound Machine
3. Adjust sliders and make decisions
4. Watch the outcomes and learn from results
5. Restart anytime to try a different strategy

### Asking the Coach
1. Navigate to **AI Coach**
2. Type your question (e.g., "How do I start investing?")
3. Press Enter or click **Ask**
4. Get instant, educational guidance

---

## 💾 Data & Privacy

- **Portfolio data** is stored locally in your browser (localStorage)
- **No account creation needed** — all data stays on your device
- **AI Coach conversations** are sent to Anthropic's API for processing but not stored permanently
- See `index.html` line 776 for the AI endpoint configuration

---

## 🛠 Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (single-file app)
- **Charts:** SVG line charts (custom-drawn) + TradingView embedded widget
- **AI:** Claude API via Anthropic
- **Hosting:** GitHub Pages

---

## 📊 Market Simulation Details

The simulated market uses a **drift + random walk model**:
- Each asset has a base volatility (`vol`)
- Prices update every 2.2 seconds
- Changes are capped at 0 (no negative prices)
- 30-day price history tracked for sparklines
- Independent from real market prices (great for practice)

---

## 🎯 What You'll Learn

✅ How compound interest actually works  
✅ Risk/return tradeoffs across asset classes  
✅ Budgeting and allocation strategies  
✅ Pricing and business fundamentals  
✅ Trading mechanics (buy, sell, portfolio tracking)  
✅ Real financial terminology  

❌ **NOT** a substitute for licensed financial advice  
❌ Real money is never involved  

---

## 🚧 Roadmap

- [ ] Leaderboards (compare performance with other learners)
- [ ] Achievements & badges
- [ ] Portfolio export (CSV/PDF)
- [ ] Mobile app version
- [ ] Advanced game modes
- [ ] Historical performance tracking
- [ ] Multi-language support

---

## 🤝 Contributing

Found a bug? Have a feature idea? Open an issue or submit a pull request!

---

## 📄 License

This project is open source. Feel free to fork, modify, and learn.

---

## 💬 Questions?

- **Bug reports:** Open a GitHub issue
- **Feature requests:** Start a discussion
- **Use in your classroom?** Get in touch — we'd love to hear how you're using Cashglade to teach!

---

**Cashglade** — a practice sandbox for money skills. Real understanding, zero risk. 🚀
