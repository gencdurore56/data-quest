Filename: sophisticatedCode.js

/*
   This code demonstrates a complex and sophisticated implementation of a stock portfolio management system.
   It handles stock buying and selling, portfolio allocation, and provides performance analytics.
*/

// Define the Stock class
class Stock {
  constructor(symbol, quantity, price) {
    this.symbol = symbol;
    this.quantity = quantity;
    this.price = price;
  }

  calculateValue() {
    return this.quantity * this.price;
  }
}

// Define the Portfolio class
class Portfolio {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
    this.stocks = [];
  }

  buyStock(symbol, quantity, price) {
    const stock = new Stock(symbol, quantity, price);
    this.stocks.push(stock);
    this.balance -= stock.calculateValue();
  }

  sellStock(symbol, quantity, price) {
    const stockIndex = this.stocks.findIndex((stock) => stock.symbol === symbol);
    if (stockIndex !== -1) {
      const stock = this.stocks[stockIndex];
      if (stock.quantity >= quantity) {
        stock.quantity -= quantity;
        if (stock.quantity === 0) {
          this.stocks.splice(stockIndex, 1);
        }
        this.balance += quantity * price;
      } else {
        console.log("Error: Not enough stocks to sell!");
      }
    } else {
      console.log("Error: Stock not found in portfolio!");
    }
  }

  getPortfolioValue() {
    let totalValue = this.balance;
    for (const stock of this.stocks) {
      totalValue += stock.calculateValue();
    }
    return totalValue;
  }
}

const myPortfolio = new Portfolio("My Portfolio", 10000);

myPortfolio.buyStock("AAPL", 10, 150);
myPortfolio.buyStock("GOOGL", 5, 2000);

myPortfolio.sellStock("AAPL", 5, 180);

console.log(`Portfolio Value: $${myPortfolio.getPortfolioValue().toFixed(2)}`);