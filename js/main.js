// Main Game Initialization
function initGame() {
    console.log('Initializing game...');
    // Load saved game or initialize
    const saved = localStorage.getItem('idleEconomyGame');
    if (saved) {
        try {
            gameState = JSON.parse(saved);
            console.log('[LOAD] Game loaded successfully from localStorage');
        } catch (e) {
            console.error('[LOAD-ERROR] Failed to load save:', e);
        }
    } else {
        console.log('[LOAD] No saved game found, starting fresh');
    }

    // Initialize inventory
    gameData.resources.forEach(resource => {
        if (!gameState.inventory[resource.id]) {
            gameState.inventory[resource.id] = 0;
        }
    });
    
    // Initialize buildings with proper error handling
    try {
        initializeBuildings();
    } catch (error) {
        console.error('Failed to initialize buildings:', error);
        return; // Stop game if initialization fails
    }

    // Initialize auto-sell settings
    initializeAutoSell();
    
    // Initialize transaction log if it doesn't exist
    if (!gameState.transactionLog) {
        gameState.transactionLog = [];
    }
    
    // Initialize money history if it doesn't exist
    if (!gameState.moneyHistory) {
        gameState.moneyHistory = [];
    }
    if (!gameState.lastMoneyUpdate) {
        gameState.lastMoneyUpdate = Date.now();
    }

    setupEventListeners();
    updateDisplay();
    startGameLoop();
}

// Test function to verify functions are accessible
window.testSell = function() {
    console.log('[DEBUG] testSell function called');
    console.log('[DEBUG] sellResource function exists:', typeof sellResource);
    console.log('[DEBUG] sellAllResource function exists:', typeof sellAllResource);
    console.log('[DEBUG] Current gameState:', gameState);
    console.log('[DEBUG] Inventory details:', gameState.inventory);
    console.log('[DEBUG] Money:', gameState.money);
    
    // Test if we can call sellResource directly
    if (gameState.inventory.wood > 0) {
        console.log('[DEBUG] Testing direct sellResource call for wood');
        sellResource('wood', 1);
    } else {
        console.log('[DEBUG] No wood in inventory to test with');
    }
};

// Initialize on load
initGame();
