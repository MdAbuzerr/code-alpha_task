package Code_alpha;

import java.util.*;

class Stock {
    String symbol;
    double price;

    public Stock(String symbol, double price) {
        this.symbol = symbol;
        this.price = price;
    }

    public void updatePrice() {
        // Randomly adjust the price for simulation purposes
        this.price += (Math.random() - 0.5) * 5; // +/- up to 2.5
        if (this.price < 1) this.price = 1; // Prevent price from dropping below 1
    }
}

class Portfolio {
    private Map<String, Integer> holdings = new HashMap<>();
    private double balance;

    public Portfolio(double initialBalance) {
        this.balance = initialBalance;
    }

    public void buyStock(Stock stock, int quantity) {
        double cost = stock.price * quantity;
        if (cost > balance) {
            System.out.println("Insufficient balance to buy " + quantity + " shares of " + stock.symbol);
            return;
        }
        balance -= cost;
        holdings.put(stock.symbol, holdings.getOrDefault(stock.symbol, 0) + quantity);
        System.out.println("Bought " + quantity + " shares of " + stock.symbol);
    }

    public void sellStock(Stock stock, int quantity) {
        int owned = holdings.getOrDefault(stock.symbol, 0);
        if (quantity > owned) {
            System.out.println("You do not own enough shares of " + stock.symbol);
            return;
        }
        balance += stock.price * quantity;
        if (quantity == owned) {
            holdings.remove(stock.symbol);
        } else {
            holdings.put(stock.symbol, owned - quantity);
        }
        System.out.println("Sold " + quantity + " shares of " + stock.symbol);
    }

    public void viewPortfolio(List<Stock> market) {
        System.out.println("\n--- Portfolio ---");
        System.out.println("Balance: $" + balance);
        double totalValue = balance;
        for (Stock stock : market) {
            if (holdings.containsKey(stock.symbol)) {
                int quantity = holdings.get(stock.symbol);
                double value = quantity * stock.price;
                totalValue += value;
                System.out.println(stock.symbol + ": " + quantity + " shares, Market Price: $" + stock.price + ", Value: $" + value);
            }
        }
        System.out.println("Total Portfolio Value: $" + totalValue);
    }
}

public class Stock_Trading_platform {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		   Scanner scanner = new Scanner(System.in);

	        // Initialize market data
	        List<Stock> market = new ArrayList<>();
	        market.add(new Stock("AAPL", 150.00));
	        market.add(new Stock("GOOGL", 2700.00));
	        market.add(new Stock("AMZN", 3400.00));
	        market.add(new Stock("TSLA", 700.00));
	        market.add(new Stock("MSFT", 290.00));

	        // Initialize portfolio with a starting balance
	        Portfolio portfolio = new Portfolio(10000.00);

	        boolean running = true;
	        while (running) {
	            // Update market data for each stock
	            for (Stock stock : market) {
	                stock.updatePrice();
	            }

	            // Display market data
	            System.out.println("\n--- Market Data ---");
	            for (Stock stock : market) {
	                System.out.println(stock.symbol + ": $" + stock.price);
	            }
	         // Display menu
	            System.out.println("\n--- Menu ---");
	            System.out.println("1. Buy Stock");
	            System.out.println("2. Sell Stock");
	            System.out.println("3. View Portfolio");
	            System.out.println("4. Exit");
	            System.out.print("Choose an option: ");
	            int choice = scanner.nextInt();

	            switch (choice) {
	                case 1:
	                    // Buy stock
	                    System.out.print("Enter stock symbol to buy: ");
	                    String buySymbol = scanner.next().toUpperCase();
	                    Stock buyStock = getStockBySymbol(market, buySymbol);
	                    if (buyStock == null) {
	                        System.out.println("Stock not found!");
	                        break;
	                    }
	                    System.out.print("Enter quantity to buy: ");
	                    int buyQuantity = scanner.nextInt();
	                    portfolio.buyStock(buyStock, buyQuantity);
	                    break;
	                case 2:
	                    // Sell stock
	                    System.out.print("Enter stock symbol to sell: ");
	                    String sellSymbol = scanner.next().toUpperCase();
	                    Stock sellStock = getStockBySymbol(market, sellSymbol);
	                    if (sellStock == null) {
	                        System.out.println("Stock not found!");
	                        break;
	                    }
	                    System.out.print("Enter quantity to sell: ");
	                    int sellQuantity = scanner.nextInt();
	                    portfolio.sellStock(sellStock, sellQuantity);
	                    break;

	                case 3:
	                    // View portfolio
	                    portfolio.viewPortfolio(market);
	                    break;

	                case 4:
	                    // Exit
	                    running = false;
	                    System.out.println("Exiting...");
	                    break;

	                default:
	                    System.out.println("Invalid choice! Please choose again.");
	            }
	        }
	        scanner.close();
    }

    private static Stock getStockBySymbol(List<Stock> market, String symbol) {
        for (Stock stock : market) {
            if (stock.symbol.equalsIgnoreCase(symbol)) {
                return stock;
            }
        } 
        return null;


		

	}

}
