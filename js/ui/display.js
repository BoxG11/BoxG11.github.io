// Display Management
function updateDisplay() {
    // Update stats
    document.getElementById('money').textContent = formatNumber(gameState.money);
    document.getElementById('lifetime').textContent = formatNumber(gameState.lifetimeEarnings);
    document.getElementById('workers').textContent = gameState.totalWorkers;
    document.getElementById('maxWorkers').textContent = getTotalBuildingCount() * 10;
    document.getElementById('mps').textContent = formatNumber(gameState.moneyPerSecond);
    
    // Update active tab content
    const activeTab = document.querySelector('.nav-tab.active').dataset.tab;
    
    switch(activeTab) {
        case 'inventory':
            updateInventory();
            break;
        case 'producers':
            updateBuildings('producers');
            break;
        case 'refineries':
            updateBuildings('refineries');
            break;
        case 'crafters':
            updateBuildings('crafters');
            break;
        case 'market':
            updateMarket();
            break;
        case 'unlocks':
            updateUnlocks();
            break;
        case 'financials':
            updateFinancials();
            break;
    }
}

// Update Display Stats Only (for frequent updates)
function updateDisplayStats() {
    // Update stats without updating tab content
    document.getElementById('money').textContent = formatNumber(gameState.money);
    document.getElementById('lifetime').textContent = formatNumber(gameState.lifetimeEarnings);
    document.getElementById('workers').textContent = gameState.totalWorkers;
    document.getElementById('maxWorkers').textContent = getTotalBuildingCount() * 10;
    document.getElementById('mps').textContent = formatNumber(gameState.moneyPerSecond);
}

// Update Work Progress Bars
function updateWorkProgress() {
    const activeTab = document.querySelector('.nav-tab.active').dataset.tab;
    
    // Only update progress bars for building tabs
    if (['producers', 'refineries', 'crafters'].includes(activeTab)) {
        const type = activeTab;
        gameData.buildings[type].forEach(building => {
            const state = gameState.buildings[type][building.id];
            if (state.workers > 0 && building.interval >= 6000) {
                const progressBar = document.querySelector(`[data-building="${building.id}"] .progress-fill`);
                const progressText = document.querySelector(`[data-building="${building.id}"] .progress-text`);
                
                if (progressBar) {
                    const timeSinceProduction = Date.now() - state.lastProduction;
                    const workProgress = Math.min((timeSinceProduction / building.interval) * 100, 100);
                    
                    progressBar.style.width = workProgress + '%';
                }
            }
        });
    }
}

// Update Inventory Display
function updateInventory() {
    const grid = document.getElementById('inventoryGrid');
    grid.innerHTML = '';
    
    gameData.resources.forEach(resource => {
        const count = gameState.inventory[resource.id] || 0;
        if (count > 0 || resource.id === 'wood' || resource.id === 'stone') {
            const item = document.createElement('div');
            item.className = 'inventory-item';
            item.innerHTML = `
                <div class="item-icon">${resource.icon}</div>
                <div class="item-name">${resource.name}</div>
                <div class="item-count">${formatNumber(count)}</div>
            `;
            grid.appendChild(item);
        }
    });
}

// Update Buildings Display
function updateBuildings(type) {
    const container = document.getElementById(type + 'List');
    container.innerHTML = '';
    
    gameData.buildings[type].forEach(building => {
        const state = gameState.buildings[type][building.id];
        const isUnlocked = gameState.lifetimeEarnings >= building.unlockAt;
        
        // Only show unlocked buildings
        if (!isUnlocked) {
            return;
        }
        
        const card = document.createElement('div');
        card.className = 'building-card';
        card.setAttribute('data-building', building.id);
        
        // Calculate work progress
        let workProgress = 0;
        let progressText = '';
        let inputStatus = '';
        
        if (state.workers > 0) {
            const timeSinceProduction = Date.now() - state.lastProduction;
            workProgress = Math.min((timeSinceProduction / building.interval) * 100, 100);
            
            if (workProgress >= 100) {
                progressText = 'Ready to produce!';
            } else {
                progressText = `${(workProgress).toFixed(1)}% complete`;
            }
            
            // Show input/output ratios
            if (building.input) {
                const inputRatios = Object.entries(building.input).map(([resourceId, required]) => {
                    const available = gameState.inventory[resourceId] || 0;
                    const canProduce = Math.floor(available / required);
                    const resource = gameData.resources.find(r => r.id === resourceId);
                    return `${available}/${required} ${resource.icon}`;
                }).join(' | ');
                inputStatus = `Input: ${inputRatios}`;
            }
        }
        
        let productionInfo = '';
        const workerCount = state.workers || 0;
        
        if (building.input) {
            const inputs = Object.entries(building.input).map(([r, a]) => {
                const res = gameData.resources.find(resource => resource.id === r);
                const totalAmount = a * workerCount;
                return `${totalAmount} ${res.icon}`;
            }).join(' + ');
            productionInfo += `Input: ${inputs}`;
        }
        productionInfo += ` (${(building.interval / 1000).toFixed(1)}s)`;
        
        // Create output materials display
        const outputs = Object.entries(building.output).map(([r, a]) => {
            const res = gameData.resources.find(resource => resource.id === r);
            const totalAmount = a * workerCount;
            return `${totalAmount} ${res.icon}`;
        }).join(' + ');
        
        card.innerHTML = `
            <div class="building-header">
                <div class="building-count-text">${state.count}</div>
                <div class="building-icon-name">
                    <div class="building-icon">${building.icon || '🏭'}</div>
                    <div class="building-name">${building.name}</div>
                </div>
            </div>
            <div class="building-production">${productionInfo}</div>
            ${state.workers > 0 && building.interval >= 6000 ? `
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${workProgress}%"></div>
                </div>
                ${inputStatus ? `<div class="input-status">${inputStatus}</div>` : ''}
            ` : ''}
            <div class="worker-section">
                <div class="worker-info ${state.workers >= state.count * 10 || state.count === 0 ? 'worker-limit' : ''}">
                    Workers: ${state.workers}/${state.count * 10} (Cost: $${building.workerCost})
                </div>
                ${state.workers < state.count * 10 && state.count > 0 ? `
                    <div class="worker-controls">
                        <button class="btn btn-secondary" onclick="removeWorker('${type}', '${building.id}')" ${state.workers <= 0 ? 'disabled' : ''}>-</button>
                        <button class="btn btn-success" onclick="addWorker('${type}', '${building.id}', ${building.workerCost})" ${gameState.money < building.workerCost ? 'disabled' : ''}>+</button>
                    </div>
                ` : ''}
                ${state.workers >= state.count * 10 ? `
                    <div class="build-more-section">
                        <button class="btn btn-primary btn-lg" onclick="buildBuilding('${type}', '${building.id}')">Build More ($${building.workerCost})</button>
                    </div>
                ` : ''}
            </div>
            <div class="output-materials">
                <div class="output-label">Output:</div>
                <div class="output-items">${outputs}</div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Update Market Display
function updateMarket() {
    const container = document.getElementById('marketList');
    container.innerHTML = '';
    
    const activeCount = Object.values(gameState.autoSell).filter(Boolean).length;
    const maxReached = activeCount >= gameState.maxAutoSell;
    
    gameData.resources.forEach(resource => {
        const count = gameState.inventory[resource.id] || 0;
        const sellPrice = resource.sellPrice;
        const buyPrice = sellPrice * 2;
        const isAutoSellActive = gameState.autoSell[resource.id];
        const isDisabled = !isAutoSellActive && maxReached;
        
        const item = document.createElement('div');
        item.className = 'market-item';
        item.innerHTML = `
            <div class="market-info">
                <div><strong>${resource.icon} ${resource.name}</strong> (${formatNumber(count)})</div>
                <div class="price-tag">Buy: $${buyPrice} | Sell: $${sellPrice}</div>
            </div>
            <div class="market-actions">
                <div class="auto-sell-checkbox">
                    <input type="checkbox" 
                           id="autoSell_${resource.id}" 
                           ${isAutoSellActive ? 'checked' : ''} 
                           ${isDisabled ? 'disabled' : ''}
                           onchange="toggleAutoSell('${resource.id}')"
                           style="margin-right: 5px;">
                    <label for="autoSell_${resource.id}" style="font-size: 12px; color: ${isDisabled ? '#999' : '#333'};">
                        Auto-sell
                    </label>
                </div>
                <button class="btn btn-sm btn-secondary" onclick="sellResource('${resource.id}', 1)" ${count < 1 ? 'disabled' : ''}>Sell 1</button>
                <button class="btn btn-sm btn-secondary" onclick="sellResource('${resource.id}', 10)" ${count < 10 ? 'disabled' : ''}>Sell 10</button>
                <button class="btn btn-sm btn-primary" onclick="sellAllResource('${resource.id}')" ${count < 1 ? 'disabled' : ''}>Sell All</button>
                <button class="btn btn-sm btn-success" onclick="buyResource('${resource.id}', 1)" ${gameState.money < buyPrice ? 'disabled' : ''}>Buy 1</button>
                <button class="btn btn-sm btn-success" onclick="buyResource('${resource.id}', 10)" ${gameState.money < buyPrice * 10 ? 'disabled' : ''}>Buy 10</button>
            </div>
        `;
        container.appendChild(item);
    });
}

// Update Financials Display
function updateFinancials() {
    // Update summary
    document.getElementById('totalMoney').textContent = formatNumber(gameState.money);
    document.getElementById('lifetimeEarnings').textContent = formatNumber(gameState.lifetimeEarnings);
    document.getElementById('moneyPerSecond').textContent = formatNumber(gameState.moneyPerSecond);
    
    // Update transaction log
    const logEntries = document.getElementById('logEntries');
    logEntries.innerHTML = '';
    
    gameState.transactionLog.forEach(transaction => {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        
        const time = new Date(transaction.timestamp);
        const timeStr = time.toLocaleTimeString();
        
        entry.innerHTML = `
            <span class="log-time">${timeStr}</span>
            <span class="log-type ${transaction.type}">${transaction.type}</span>
            <span class="log-description">${transaction.description}</span>
            <span class="log-amount ${transaction.amount >= 0 ? 'positive' : 'negative'}">${transaction.amount >= 0 ? '+' : ''}$${formatNumber(Math.abs(transaction.amount))}</span>
            <span class="log-balance">$${formatNumber(transaction.balance)}</span>
        `;
        
        logEntries.appendChild(entry);
    });
}

// Update Unlocks Display
function updateUnlocks() {
    const progressFill = document.getElementById('progressFill');
    const unlockText = document.getElementById('unlockText');
    
    // Find next building unlock
    const allBuildings = [];
    Object.values(gameData.buildings).forEach(type => {
        type.forEach(building => allBuildings.push(building));
    });
    const nextBuilding = allBuildings
        .filter(b => b.unlockAt > gameState.lifetimeEarnings)
        .sort((a, b) => a.unlockAt - b.unlockAt)[0];
    
    if (nextBuilding) {
        const progress = (gameState.lifetimeEarnings / nextBuilding.unlockAt) * 100;
        progressFill.style.width = progress + '%';
        unlockText.innerHTML = `Next unlock: ${nextBuilding.name} at $${formatNumber(nextBuilding.unlockAt)}<br>Progress: $${formatNumber(gameState.lifetimeEarnings)} / $${formatNumber(nextBuilding.unlockAt)}`;
    } else {
        progressFill.style.width = '100%';
        unlockText.textContent = 'All buildings unlocked! 🎉';
    }
    
    // Update building status indicators
    updateBuildingStatusIndicators();
}

function updateBuildingStatusIndicators() {
    const buildingTypes = ['producers', 'refineries', 'crafters'];
    
    buildingTypes.forEach(type => {
        gameData.buildings[type].forEach(building => {
            const isUnlocked = gameState.lifetimeEarnings >= building.unlockAt;
            const statusElement = document.getElementById(`status-${building.id}`);
            const progressElement = document.getElementById(`progress-${building.id}`);
            
            if (statusElement) {
                if (isUnlocked) {
                    statusElement.innerHTML = '✅ <span style="color: #28a745;">Unlocked</span>';
                } else {
                    const progress = (gameState.lifetimeEarnings / building.unlockAt) * 100;
                    statusElement.innerHTML = `🔒 <span style="color: #6c757d;">Locked (${progress.toFixed(1)}%)</span>`;
                }
            }
            
            if (progressElement) {
                if (isUnlocked) {
                    progressElement.style.display = 'none';
                } else {
                    const progress = (gameState.lifetimeEarnings / building.unlockAt) * 100;
                    progressElement.style.width = Math.min(progress, 100) + '%';
                    progressElement.style.display = 'block';
                }
            }
        });
    });
}
