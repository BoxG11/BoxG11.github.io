// Save and Load Game Functions
function saveGame() {
    try {
        const gameData = JSON.stringify(gameState);
        localStorage.setItem('idleEconomyGame', gameData);
        console.log('[SAVE] Game saved successfully');
        
        // Verify save worked
        const verify = localStorage.getItem('idleEconomyGame');
        if (verify) {
            console.log('[SAVE-VERIFY] Save verification successful');
        } else {
            console.error('[SAVE-VERIFY] Save verification failed - no data in localStorage');
        }
    } catch (error) {
        console.error('[SAVE-ERROR] Failed to save game:', error);
    }
}

// Reset Game
function resetGame() {
    if (confirm('Are you sure you want to reset your game? This cannot be undone!')) {
        localStorage.removeItem('idleEconomyGame');
        location.reload();
    }
}

// Log financial transaction
function logTransaction(type, description, amount, balance) {
    const transaction = {
        timestamp: Date.now(),
        type: type, // 'income' or 'expense'
        description: description,
        amount: amount,
        balance: balance
    };
    
    gameState.transactionLog.unshift(transaction); // Add to beginning
    
    // Keep only last 100 transactions
    if (gameState.transactionLog.length > 100) {
        gameState.transactionLog = gameState.transactionLog.slice(0, 100);
    }
}
