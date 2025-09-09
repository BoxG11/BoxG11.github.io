// Building Management
function buildBuilding(type, buildingId) {
    const buildingData = gameData.buildings[type].find(b => b.id === buildingId);
    const cost = buildingData.workerCost; // Use worker cost as building cost
    
    if (gameState.money >= cost) {
        const building = gameState.buildings[type][buildingId];
        gameState.money -= cost;
        building.count++;
        
        // Log transaction
        logTransaction('expense', `Built ${buildingData.name}`, -cost, gameState.money);
        
        updateDisplay();
        saveGame();
    } else {
        // Not enough money
    }
}

// Add Worker
function addWorker(type, buildingId, cost) {
    if (gameState.money >= cost) {
        const building = gameState.buildings[type][buildingId];
        if (building.workers < building.count * 10) {
            gameState.money -= cost;
            building.workers++;
            gameState.totalWorkers++;
            
            // Log transaction
            const buildingData = gameData.buildings[type].find(b => b.id === buildingId);
            logTransaction('expense', `Hired worker for ${buildingData.name}`, -cost, gameState.money);
            
            updateDisplay();
            saveGame();
        }
    }
}

// Remove Worker
function removeWorker(type, buildingId) {
    const building = gameState.buildings[type][buildingId];
    const buildingData = gameData.buildings[type].find(b => b.id === buildingId);
    if (building.workers > 0) {
        building.workers--;
        gameState.totalWorkers--;
        const refund = Math.floor(buildingData.workerCost * 0.5); // Refund 50%
        gameState.money += refund;
        
        // Log transaction
        logTransaction('income', `Fired worker from ${buildingData.name} (refund)`, refund, gameState.money);
        
        updateDisplay();
        saveGame();
    }
}
