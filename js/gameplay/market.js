// Market and Trading Logic
// Buy Resource
window.buyResource = function(resourceId, amount) {
    const resource = gameData.resources.find(r => r.id === resourceId);
    const cost = resource.sellPrice * 2 * amount;
    
    if (gameState.money >= cost) {
        gameState.money -= cost;
        gameState.inventory[resourceId] += amount;
        
        // Log transaction
        logTransaction('expense', `Bought ${amount} ${resource.name}`, -cost, gameState.money);
        
        updateDisplay();
        saveGame();
    }
};

// Centralized selling function with logging
function executeSell(resourceId, amount, isAutoSell = false) {
    const startTime = performance.now();
    const currentAmount = gameState.inventory[resourceId] || 0;
    
    if (currentAmount >= amount) {
        const resource = gameData.resources.find(r => r.id === resourceId);
        const value = resource.sellPrice * amount;

        // Update inventory and money
        gameState.inventory[resourceId] = currentAmount - amount;
        gameState.money += value;
        gameState.lifetimeEarnings += value;
        
        // Log transaction
        const sellType = isAutoSell ? 'Auto-sell' : 'Manual sell';
        logTransaction('income', `${sellType}: ${amount} ${resource.name}`, value, gameState.money);
        
        // Calculate timing
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);
        
        // Log and notify
        const prefix = isAutoSell ? '[AUTO-SELL]' : '[MANUAL-SELL]';
        const message = `Sold ${amount} ${resource.name} for $${value}`;
        
        console.log(`${prefix} ${message} (${duration}ms)`);
        
        updateDisplay();
        saveGame();
        return true;
    } else {
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);
        const errorMessage = `Not enough ${resourceId} to sell!`;
        console.log(`[SELL-ERROR] ${errorMessage} (${duration}ms)`);
        return false;
    }
}

// Sell Resource Function
window.sellResource = function(resourceId, amount) {
    console.log(`[DEBUG] sellResource called with resourceId: ${resourceId}, amount: ${amount}`);
    executeSell(resourceId, amount, false);
};

// Sell All Resource Function
window.sellAllResource = function(resourceId) {
    console.log(`[DEBUG] sellAllResource called with resourceId: ${resourceId}`);
    const currentAmount = gameState.inventory[resourceId] || 0;
    
    if (currentAmount > 0) {
        executeSell(resourceId, currentAmount, false);
    } else {
        const errorMessage = `No ${resourceId} to sell!`;
        console.log(`[SELL-ERROR] ${errorMessage}`);
    }
};

function toggleAutoSell(resourceId) {
    const currentValue = gameState.autoSell[resourceId];
    const activeCount = Object.values(gameState.autoSell).filter(Boolean).length;
    
    if (!currentValue && activeCount >= gameState.maxAutoSell) {
        return;
    }
    
    gameState.autoSell[resourceId] = !currentValue;
    updateMarket();
    saveGame();
}
