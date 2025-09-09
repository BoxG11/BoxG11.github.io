// Game Loop and Production Logic
function startGameLoop() {
    // Clear any existing intervals to prevent duplicates
    if (window.gameIntervals) {
        window.gameIntervals.forEach(interval => clearInterval(interval));
    }
    window.gameIntervals = [];
    
    const mainLoop = setInterval(() => {
        try {
            const now = Date.now();
            const delta = now - gameState.lastUpdate;
            
            // Process production
            processProduction(delta);
            
            // Calculate money per second
            calculateMoneyPerSecond();
            
            // Update only stats for frequent updates (every 100ms)
            updateDisplayStats();
            
            gameState.lastUpdate = now;
        } catch (error) {
            console.error('[GAME-LOOP-ERROR] Error in main game loop:', error);
        }
    }, 100);
    window.gameIntervals.push(mainLoop);
    
    // Update full display less frequently (every 2 seconds)
    const displayUpdate = setInterval(() => {
        try {
            updateDisplay();
        } catch (error) {
            console.error('[UPDATE-ERROR] Error updating display:', error);
        }
    }, 1000);
    window.gameIntervals.push(displayUpdate);
    
    // Update work progress bars
    const progressUpdate = setInterval(() => {
        try {
            updateWorkProgress();
        } catch (error) {
            console.error('[PROGRESS-ERROR] Error updating work progress:', error);
        }
    }, 1000);
    window.gameIntervals.push(progressUpdate);
    
    // Save game every 5 seconds
    const saveInterval = setInterval(() => {
        try {
            saveGame();
        } catch (error) {
            console.error('[SAVE-INTERVAL-ERROR] Error in save interval:', error);
        }
    }, 5000);
    window.gameIntervals.push(saveInterval);
}

// Process Production - DRY version
function processProduction(delta) {
    const buildingTypes = [
        { type: 'producers', hasInput: false },
        { type: 'refineries', hasInput: true },
        { type: 'crafters', hasInput: true }
    ];
    
    buildingTypes.forEach(({ type, hasInput }) => {
        processBuildingType(type, hasInput);
    });
    
    // Process auto-sell after all production is complete
    processAutoSell();
}

function processBuildingType(type, hasInput) {
    gameData.buildings[type].forEach(building => {
        const buildingState = gameState.buildings[type][building.id];
        
        if (!buildingState || buildingState.count === 0 || buildingState.workers === 0) {
            return; // Skip inactive buildings
        }
        
        const timeSinceProduction = Date.now() - buildingState.lastProduction;
        const productionCycles = Math.floor(timeSinceProduction / building.interval);
        
        if (productionCycles === 0) {
            return; // No production cycles to process
        }
        
        if (hasInput) {
            processBuildingWithInput(building, buildingState, productionCycles);
        } else {
            processBuildingWithoutInput(building, buildingState, productionCycles);
        }
    });
}

function processBuildingWithoutInput(building, buildingState, productionCycles) {
    // Simple production - just add output
    Object.entries(building.output).forEach(([resource, amount]) => {
        gameState.inventory[resource] += amount * productionCycles * buildingState.workers;
    });
    buildingState.lastProduction = Date.now();
}

function processBuildingWithInput(building, buildingState, productionCycles) {
    // Calculate how much we can actually produce based on input availability
    let canProduce = buildingState.workers * productionCycles;
    
    Object.entries(building.input).forEach(([resource, amount]) => {
        const available = Math.floor(gameState.inventory[resource] / amount);
        canProduce = Math.min(canProduce, available);
    });
    
    if (canProduce > 0) {
        // Consume input resources
        Object.entries(building.input).forEach(([resource, amount]) => {
            gameState.inventory[resource] -= amount * canProduce;
        });
        
        // Produce output resources
        Object.entries(building.output).forEach(([resource, amount]) => {
            gameState.inventory[resource] += amount * canProduce;
        });
        
        buildingState.lastProduction = Date.now();
    }
}

// Calculate Money Per Second
function calculateMoneyPerSecond() {
    const now = Date.now();
    
    // Add current money to history
    gameState.moneyHistory.push({
        money: gameState.money,
        timestamp: now
    });
    
    // Remove entries older than 60 seconds
    const sixtySecondsAgo = now - 60000;
    gameState.moneyHistory = gameState.moneyHistory.filter(entry => entry.timestamp > sixtySecondsAgo);
    
    // Calculate money per second based on 60-second average
    if (gameState.moneyHistory.length >= 2) {
        const oldest = gameState.moneyHistory[0];
        const newest = gameState.moneyHistory[gameState.moneyHistory.length - 1];
        const timeDiff = (newest.timestamp - oldest.timestamp) / 1000; // Convert to seconds
        const moneyDiff = newest.money - oldest.money;
        
        if (timeDiff > 0) {
            gameState.moneyPerSecond = Math.floor(moneyDiff / timeDiff);
        } else {
            gameState.moneyPerSecond = 0;
        }
    } else {
        gameState.moneyPerSecond = 0;
    }
}

// Process Auto-sell
function processAutoSell() {
    Object.entries(gameState.autoSell).forEach(([resourceId, isEnabled]) => {
        if (isEnabled && gameState.inventory[resourceId] > 0) {
            const amount = gameState.inventory[resourceId];
            executeSell(resourceId, amount, true);
        }
    });
}
