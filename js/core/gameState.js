// Game State Management
let gameState = {
    money: 100,
    lifetimeEarnings: 100,
    inventory: {},
    buildings: {},
    workers: {},
    totalWorkers: 0,
    lastUpdate: Date.now(),
    moneyPerSecond: 0,
    autoSell: {}, // Track which resources are set to auto-sell
    maxAutoSell: 5, // Maximum 5 auto-sell checkboxes can be active
    transactionLog: [], // Log of all money transactions
    moneyHistory: [], // Track money changes over time for 60-second average
    lastMoneyUpdate: Date.now()
};

// Initialize buildings with proper error handling
function initializeBuildings() {
    const buildingTypes = ['producers', 'refineries', 'crafters'];
    
    // Validate gameData structure exists
    if (!gameData || !gameData.buildings) {
        throw new Error('gameData.buildings is not defined! Check your gameData configuration.');
    }
    
    buildingTypes.forEach(type => {
        initializeBuildingType(type);
    });
}

function initializeBuildingType(type) {
    // Validate building type exists in gameData
    if (!gameData.buildings[type]) {
        throw new Error(`Building type '${type}' not found in gameData.buildings! Available types: ${Object.keys(gameData.buildings).join(', ')}`);
    }
    
    // Validate gameState structure
    if (!gameState) {
        throw new Error('gameState is not defined!');
    }
    
    if (!gameState.buildings) {
        gameState.buildings = {};
    }
    
    if (!gameState.workers) {
        gameState.workers = {};
    }
    
    // Initialize building type container only if it doesn't exist
    if (!gameState.buildings[type]) {
        gameState.buildings[type] = {};
    }
    
    // Initialize each building of this type only if it doesn't exist
    gameData.buildings[type].forEach(building => {
        if (!gameState.buildings[type][building.id]) {
            console.log(`[INIT] Initializing new building: ${building.id} in ${type}`);
            initializeBuilding(building, type);
        } else {
            console.log(`[INIT] Building already exists: ${building.id} in ${type} (count: ${gameState.buildings[type][building.id].count}, workers: ${gameState.buildings[type][building.id].workers})`);
        }
    });
}

function initializeBuilding(building, type) {
    // Validate building has required properties
    if (!building.id) {
        throw new Error(`Building in ${type} is missing required 'id' property!`);
    }
    
    if (!building.name) {
        throw new Error(`Building '${building.id}' in ${type} is missing required 'name' property!`);
    }
    
    // Initialize building data
    const isLumbermill = building.id === 'lumbermill';
    gameState.buildings[type][building.id] = {
        count: isLumbermill ? 1 : 0,  // Start with 1 lumbermill
        workers: isLumbermill ? 1 : 0, // Start with 1 worker in lumbermill
        lastProduction: Date.now()
    };
    
    // Initialize worker data
    gameState.workers[building.id] = isLumbermill ? 1 : 0;
}

// Initialize auto-sell settings
function initializeAutoSell() {
    // Ensure autoSell object exists
    if (!gameState.autoSell) {
        gameState.autoSell = {};
    }
    
    gameData.resources.forEach(resource => {
        if (!gameState.autoSell[resource.id]) {
            gameState.autoSell[resource.id] = false;
        }
    });
}

// Get Total Building Count
function getTotalBuildingCount() {
    let total = 0;
    ['producers', 'refineries', 'crafters'].forEach(type => {
        Object.values(gameState.buildings[type]).forEach(building => {
            total += building.count;
        });
    });
    return total;
}
