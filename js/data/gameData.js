// Game Data Configuration
const gameData = {
    resources: [
        { id: "wood", name: "Wood", icon: "🪵", sellPrice: 0.5 },
        { id: "stone", name: "Stone", icon: "🪨", sellPrice: 0.8 },
        { id: "iron", name: "Iron Ore", icon: "⛏️", sellPrice: 1.5 },
        { id: "coal", name: "Coal", icon: "⚫", sellPrice: 1 },
        { id: "planks", name: "Planks", icon: "🪵", sellPrice: 1.5 },
        { id: "bricks", name: "Bricks", icon: "🧱", sellPrice: 2.5 },
        { id: "ironBar", name: "Iron Bar", icon: "🔧", sellPrice: 5.0 },
        { id: "steel", name: "Steel", icon: "⚙️", sellPrice: 10.0 },
        { id: "tools", name: "Tools", icon: "🔨", sellPrice: 200. },
        { id: "machinery", name: "Machinery", icon: "⚡", sellPrice: 50.0 },
        { id: "electronics", name: "Electronics", icon: "📱", sellPrice: 100.0 }
    ],
    buildings: {
        producers: [
            { id: "lumbermill", name: "Lumber Mill", icon: "🪚", output: { wood: 1 }, interval: 2000, workerCost: 100, unlockAt: 0 },
            { id: "quarry", name: "Quarry", icon: "⛏️", output: { stone: 1 }, interval: 30000, workerCost: 150, unlockAt: 0 },
            { id: "mine", name: "Iron Mine", icon: "⛰️", output: { iron: 1 }, interval: 50000, workerCost: 300, unlockAt: 50000 },
            { id: "coalmine", name: "Coal Mine", icon: "⚫", output: { coal: 1 }, interval: 40000, workerCost: 250, unlockAt: 100000 }
        ],
        refineries: [
            { id: "sawmill", name: "Sawmill", icon: "🪚", input: { wood: 2 }, output: { planks: 1 }, interval: 3000, workerCost: 200, unlockAt: 0 },
            { id: "brickworks", name: "Brickworks", icon: "🏭", input: { stone: 2 }, output: { bricks: 1 }, interval: 40000, workerCost: 300, unlockAt: 30000 },
            { id: "smelter", name: "Smelter", icon: "🔥", input: { iron: 2, coal: 1 }, output: { ironBar: 1 }, interval: 60000, workerCost: 500, unlockAt: 150000 },
            { id: "steelmill", name: "Steel Mill", icon: "⚙️", input: { ironBar: 2, coal: 2 }, output: { steel: 1 }, interval: 80000, workerCost: 1000, unlockAt: 500000 }
        ],
        crafters: [
            { id: "toolshop", name: "Tool Shop", icon: "🔨", input: { planks: 1, ironBar: 1 }, output: { tools: 1 }, interval: 70000, workerCost: 800, unlockAt: 3000000 },
            { id: "factory", name: "Factory", icon: "🏭", input: { steel: 1, tools: 1 }, output: { machinery: 1 }, interval: 100000, workerCost: 2000, unlockAt: 10000000 },
            { id: "techlab", name: "Tech Lab", icon: "🔬", input: { machinery: 1, steel: 2 }, output: { electronics: 1 }, interval: 150000, workerCost: 5000, unlockAt: 25000000 }
        ]
    },
    milestones: [
        { earnings: 10000, reward: "Unlock Sawmill" },
        { earnings: 30000, reward: "Unlock Brickworks" },
        { earnings: 50000, reward: "Unlock Iron Mine" },
        { earnings: 100000, reward: "Unlock Coal Mine" },
        { earnings: 15000, reward: "Unlock Smelter" },
        { earnings: 30000, reward: "Unlock Tool Shop" },
        { earnings: 50000, reward: "Unlock Steel Mill" },
        { earnings: 100000, reward: "Unlock Factory" },
        { earnings: 250000, reward: "Unlock Tech Lab" },
        { earnings: 500000, reward: "Efficiency Boost +10%" },
        { earnings: 1000000, reward: "Master of Industry" }
    ]
};
