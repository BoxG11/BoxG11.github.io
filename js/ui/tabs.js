// Tab Management
function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
            
            // Refresh content
            updateDisplay();
        });
    });

    // Handle window resize for responsive tabs
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateTabSizing();
        }, 100);
    });

    // Initial tab sizing
    updateTabSizing();
}

// Update tab sizing based on window width
function updateTabSizing() {
    const tabs = document.querySelectorAll('.nav-tab');
    const windowWidth = window.innerWidth;
    
    tabs.forEach(tab => {
        // Remove any existing size classes
        tab.classList.remove('tab-large', 'tab-medium', 'tab-small');
        
        if (windowWidth >= 1200) {
            tab.classList.add('tab-large');
        } else if (windowWidth >= 768) {
            tab.classList.add('tab-medium');
        } else {
            tab.classList.add('tab-small');
        }
    });
}
