# Idle Economy Game

A browser-based idle/clicker game where you manage resources, build production facilities, and grow your economy.

## Project Structure

```
HTML Afk Game/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # All CSS styles
├── js/
│   ├── data/
│   │   └── gameData.js     # Game configuration and data
│   ├── core/
│   │   ├── gameState.js    # Game state management
│   │   └── gameLoop.js     # Main game loop and production logic
│   ├── ui/
│   │   ├── display.js      # Display and UI updates
│   │   └── tabs.js         # Tab management
│   ├── gameplay/
│   │   ├── buildings.js    # Building management
│   │   ├── market.js       # Market and trading
│   │   └── workers.js      # Worker management (placeholder)
│   ├── utils/
│   │   ├── formatting.js   # Number formatting utilities
│   │   └── save.js         # Save/load functionality
│   └── main.js             # Main initialization
└── README.md               # This file
```

## Features

- **Resource Management**: Collect and manage various resources
- **Production Buildings**: Build producers, refineries, and crafters
- **Worker System**: Hire workers to operate your buildings
- **Market Trading**: Buy and sell resources with auto-sell options
- **Progressive Unlocks**: Unlock new buildings as you earn money
- **Financial Tracking**: Monitor your income and expenses
- **Auto-Save**: Game automatically saves your progress

## How to Play

1. Open `index.html` in your web browser
2. Start with basic resource production (Wood and Stone)
3. Build more production facilities to increase output
4. Hire workers to operate your buildings
5. Use refineries to process raw materials into refined goods
6. Trade resources in the market for profit
7. Unlock new buildings and technologies as you progress

## Technical Details

- **Pure HTML/CSS/JavaScript**: No external dependencies
- **Modular Architecture**: Code is organized into logical modules
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Game progress is saved in browser storage
- **Performance Optimized**: Efficient game loop with separate update intervals

## Development

The codebase is organized into several modules:

- **Data Layer**: Game configuration and static data
- **Core Logic**: Game state and main game loop
- **UI Layer**: Display updates and user interface
- **Gameplay Systems**: Building, market, and worker management
- **Utilities**: Helper functions for formatting and persistence

This modular structure makes the code easier to maintain, debug, and extend with new features.
