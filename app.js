// Gamified Sustainable Farming Platform - JavaScript Implementation
// ================================================================

// Global Application State
const AppState = {
    currentLanguage: 'en',
    currentSection: 'home',
    currentUser: null,
    modules: [],
    achievements: [],
    leaderboard: [],
    idleGame: {
        coins: 45600,
        clickValue: 12,
        passiveIncome: 245,
        upgrades: [],
        knowledgeShards: 12,
        dailyRewards: { currentDay: 1, lastClaimed: '2024-01-18', streak: 1 } // <-- Change this to 1
    },
    currentModule: null,
    currentLesson: 0,
    quizData: null,
    charts: {}
};

// Internationalization Data
const translations = {
    en: {
        appName: "Krishi Sahayi",
        nav: {
            home: "Home",
            learn: "Learn",
            farm: "Farm Game",
            profile: "Profile",
            dashboard: "Dashboard"
        },
        hero: {
            title: "Transform Kerala Agriculture Through Gamified Learning",
            subtitle: "Join thousands of farmers learning sustainable practices while earning rewards and building thriving farms",
            startLearning: "Start Learning",
            playGame: "Play Farming Game",
            farmers: "Active Farmers",
            sustainability: "Avg. Sustainability Score",
            waterSaved: "Liters Water Saved"
        },
        learn: {
            title: "Learning Modules",
            completed: "Completed",
            xp: "XP",
            level: "Level",
            quiz: "Module Quiz",
            score: "Score",
            submit: "Submit Answer",
            previous: "Previous",
            next: "Next",
            startModule: "Start Module",
            takeQuiz: "Take Quiz",
            retakeQuiz: "Retake Quiz",
            completed: "Completed"
        },
        farm: {
            title: "Idle Farm Game",
            clickToFarm: "Click to Farm!",
            dailyRewards: "Daily Login Rewards",
            claimReward: "Claim Today's Reward",
            upgrades: "Upgrades",
            buy: "Buy"
        },
        profile: {
            memberSince: "Member since",
            shareProfile: "Share Profile",
            totalPoints: "Total Points",
            sustainabilityScore: "Sustainability Score",
            longestStreak: "Longest Streak",
            modulesCompleted: "Modules Completed",
            recentAchievements: "Recent Achievements",
            viewAll: "View All Achievements",
            farmData: "Farm Data",
            crops: "Crops",
            farmSize: "Farm Size",
            soilType: "Soil Type",
            updateFarmData: "Update Farm Data"
        },
        myFarm: {
            title: "My Farm Management",
            currentScore: "Current Sustainability Score",
            crops: "Select Your Crops",
            area: "Farm Area (Hectares)",
            soilType: "Soil Type",
            waterUsage: "Weekly Water Usage (Liters)",
            fertilizers: "Fertilizer Usage (kg/year)",
            updateScore: "Update Sustainability Score",
            recommendations: "Recommendations for Improvement",
            rec1: "Increase organic fertilizer ratio to improve soil health",
            rec2: "Consider implementing drip irrigation to reduce water usage",
            rec3: "Add more crop variety to boost biodiversity score"
        },
        achievements: {
            title: "Achievements & Badges",
            all: "All",
            learning: "Learning",
            farming: "Farming",
            sustainability: "Sustainability"
        },
        leaderboard: {
            title: "Leaderboard",
            points: "Points",
            sustainability: "Sustainability",
            modules: "Modules"
        },
        dashboard: {
            title: "Dashboard & Analytics",
            sustainabilityTrend: "Sustainability Score Trend",
            learningProgress: "Learning Progress",
            pointsEarned: "Points Earned Over Time",
            overview: "Quick Overview",
            totalSessions: "Total Learning Sessions",
            averageScore: "Average Quiz Score",
            farmingGains: "Farming Game Earnings",
            knowledgeShards: "Knowledge Shards Collected"
        },
        crops: {
            rice: "Rice",
            coconut: "Coconut",
            banana: "Banana",
            pepper: "Pepper",
            cardamom: "Cardamom",
            rubber: "Rubber"
        },
        soil: {
            sandy: "Sandy",
            loamy: "Loamy",
            clay: "Clay"
        },
        fertilizer: {
            organic: "Organic",
            chemical: "Chemical"
        }
    },
    ml: {
        appName: "കൃഷി സഹായി",
        nav: {
            home: "ഹോം",
            learn: "പഠനം",
            farm: "കൃഷി ഗെയിം",
            profile: "പ്രൊഫൈൽ",
            dashboard: "ഡാഷ്ബോർഡ്"
        },
        hero: {
            title: "ഗെയിമിഫൈഡ് പഠനത്തിലൂടെ കേരള കൃഷിയെ മാറ്റുക",
            subtitle: "റിവാർഡുകൾ നേടുകയും തഴച്ചുവളരുന്ന കൃഷിയിടങ്ങൾ നിർമ്മിക്കുകയും ചെയ്യുന്നതിനിടയിൽ സുസ്ഥിര രീതികൾ പഠിക്കുന്ന ആയിരക്കണക്കിന് കർഷകരോടൊപ്പം ചേരുക",
            startLearning: "പഠനം ആരംഭിക്കുക",
            playGame: "കൃഷി ഗെയിം കളിക്കുക",
            farmers: "സജീവ കർഷകർ",
            sustainability: "ശരാശരി സുസ്ഥിരത സ്കോർ",
            waterSaved: "ലിറ്റർ വെള്ളം ലാഭിച്ചു"
        },
        learn: {
            title: "പഠന ഘടകങ്ങൾ",
            completed: "പൂർത്തിയായി",
            xp: "XP",
            level: "ലെവൽ",
            quiz: "മൊഡ്യൂൾ ക്വിസ്",
            score: "സ്കോർ",
            submit: "ഉത്തരം സമർപ്പിക്കുക",
            previous: "മുമ്പത്തെ",
            next: "അടുത്തത്",
            startModule: "മൊഡ്യൂൾ ആരംഭിക്കുക",
            takeQuiz: "ക്വിസ് എടുക്കുക",
            retakeQuiz: "ക്വിസ് വീണ്ടും എടുക്കുക",
            completed: "പൂർത്തിയായി"
        },
        farm: {
            title: "ഐഡിൽ ഫാം ഗെയിം",
            clickToFarm: "കൃഷിക്കായി ക്ലിക്ക് ചെയ്യുക!",
            dailyRewards: "ദൈനംദിന ലോഗിൻ റിവാർഡുകൾ",
            claimReward: "ഇന്നത്തെ പ്രതിഫലം അവകാശപ്പെടുക",
            upgrades: "അപ്ഗ്രേഡുകൾ",
            buy: "വാങ്ങുക"
        },
        profile: {
            memberSince: "മുതൽ അംഗം",
            shareProfile: "പ്രൊഫൈൽ പങ്കിടുക",
            totalPoints: "മൊത്തം പോയിന്റുകൾ",
            sustainabilityScore: "സുസ്ഥിരത സ്കോർ",
            longestStreak: "ഏറ്റവും നീണ്ട സ്ട്രീക്ക്",
            modulesCompleted: "പൂർത്തിയാക്കിയ മൊഡ്യൂളുകൾ",
            recentAchievements: "സമീപകാല നേട്ടങ്ങൾ",
            viewAll: "എല്ലാ നേട്ടങ്ങളും കാണുക",
            farmData: "കൃഷി ഡാറ്റ",
            crops: "വിളകൾ",
            farmSize: "കൃഷിയിടത്തിന്റെ വലുപ്പം",
            soilType: "മണ്ണിന്റെ തരം",
            updateFarmData: "കൃഷി ഡാറ്റ അപ്ഡേറ്റ് ചെയ്യുക"
        },
        myFarm: {
            title: "എന്റെ കൃഷി നിയന്ത്രണം",
            currentScore: "നിലവിലെ സുസ്ഥിരത സ്കോർ",
            crops: "നിങ്ങളുടെ വിളകൾ തിരഞ്ഞെടുക്കുക",
            area: "കൃഷി ഏരിയ (ഹെക്ടർ)",
            soilType: "മണ്ണിന്റെ തരം",
            waterUsage: "പ്രതിവാര ജല ഉപയോഗം (ലിറ്റർ)",
            fertilizers: "വളം ഉപയോഗം (കി.ഗ്രാം/വർഷം)",
            updateScore: "സുസ്ഥിരത സ്കോർ അപ്ഡേറ്റ് ചെയ്യുക",
            recommendations: "മെച്ചപ്പെടുത്തലിനുള്ള ശുപാർശകൾ",
            rec1: "മണ്ണിന്റെ ആരോഗ്യ്യം മെച്ചപ്പെടുത്താൻ ജൈവ വളത്തിന്റെ അനുപാതം വർദ്ധിപ്പിക്കുക",
            rec2: "ജല ഉപയോഗം കുറയ്ക്കാൻ ഡ്രിപ്പ് ഇറിഗേഷൻ നടപ്പിലാക്കുന്നത് പരിഗണിക്കുക",
            rec3: "ജൈവവൈവിധ്യ സ്കോർ വർദ്ധിപ്പിക്കാൻ കൂടുതൽ വിള വൈവിധ്യം ചേർക്കുക"
        },
        achievements: {
            title: "നേട്ടങ്ങളും ബാഡ്ജുകളും",
            all: "എല്ലാം",
            learning: "പഠനം",
            farming: "കൃഷി",
            sustainability: "സുസ്ഥിരത"
        },
        leaderboard: {
            title: "ലീഡർബോർഡ്",
            points: "പോയിന്റുകൾ",
            sustainability: "സുസ്ഥിരത",
            modules: "മൊഡ്യൂളുകൾ"
        },
        dashboard: {
            title: "ഡാഷ്ബോർഡും അനാലിറ്റിക്സും",
            sustainabilityTrend: "സുസ്ഥിരത സ്കോർ ട്രെൻഡ്",
            learningProgress: "പഠന പുരോഗതി",
            pointsEarned: "കാലക്രമേണ നേടിയ പോയിന്റുകൾ",
            overview: "ദ്രുത അവലോകനം",
            totalSessions: "മൊത്തം പഠന സെഷനുകൾ",
            averageScore: "ശരാശരി ക്വിസ് സ്കോർ",
            farmingGains: "ഫാമിംഗ് ഗെയിം വരുമാനം",
            knowledgeShards: "ശേഖരിച്ച വിജ്ഞാന ശകലങ്ങൾ"
        },
        crops: {
            rice: "നെല്ല്",
            coconut: "തെങ്ങ്",
            banana: "വാഴ",
            pepper: "കുരുമുളക്",
            cardamom: "ഏലം",
            rubber: "റബ്ബർ"
        },
        soil: {
            sandy: "മണൽ",
            loamy: "പശിമരാശി",
            clay: "കളിമണ്ണ്"
        },
        fertilizer: {
            organic: "ജൈവിക",
            chemical: "രാസ"
        }
    }
};

// Sample Data (from provided JSON)
const sampleData = {
    modules: [
        {
            moduleId: "mulching-101",
            title: "Mulching for Soil Health",
            titleMl: "മണ്ണിന്റെ ആരോഗ്യത്തിനായി ചവറ്",
            summary: "How to apply mulch to banana & coconut groves to improve moisture retention",
            summaryMl: "ബനാന, തെങ്ങ് തോപ്പുകളിൽ ചവറിടുന്ന രീതി",
            lessons: [
                {id:"l1",title:"Why mulch?",titleMl:"എന്തിന് ചവറ്?",type:"text",duration:120},
                {id:"l2",title:"How to mulch",titleMl:"എങ്ങനെ ചവറിടാം",type:"image",duration:180},
                {id:"l3",title:"Best materials",titleMl:"നല്ല വസ്തുക്കൾ",type:"video",duration:90}
            ],
            quiz: [
                {q:"Mulch reduces evaporation by approx?",qMl:"ചവറ് ബാഷ്പീകരണം എത്ര കുറയ്ക്കുന്നു?",choices:["10%","25%","50%"],choicesMl:["10%","25%","50%"],answer:1},
                {q:"Best mulch material for coconut?",qMl:"തെങ്ങിന് ഏറ്റവും നല്ല ചവറ്?",choices:["Coconut husk","Rice straw","Plastic"],choicesMl:["തെങ്ങിൻ പൊടി","നെല്ല് വൈക്കോൽ","പ്ലാസ്റ്റിക്"],answer:0}
            ],
            points: 50,
            unlocked: true,
            completed: true,
            xpReward: 100
        },
        {
            moduleId: "composting-basics",
            title: "Composting Fundamentals",
            titleMl: "കമ്പോസ്റ്റ് അടിസ്ഥാനങ്ങൾ",
            summary: "Learn to create nutrient-rich compost from kitchen and farm waste",
            summaryMl: "അടുക്കള, കൃഷി മാലിന്യങ്ങളിൽ നിന്ന് പോഷക കമ്പോസ്റ്റ് നിർമ്മാണം",
            lessons: [
                {id:"l1",title:"Carbon & Nitrogen balance",titleMl:"കാർബൺ-നൈട്രജൻ സന്തുലിതാവസ്ഥ",type:"text",duration:150},
                {id:"l2",title:"Composting methods",titleMl:"കമ്പോസ്റ്റ് രീതികൾ",type:"image",duration:200}
            ],
            quiz: [
                {q:"Ideal C:N ratio for compost?",qMl:"കമ്പോസ്റ്റിന് അനുയോജ്യമായ C:N അനുപാതം?",choices:["15:1","30:1","45:1"],choicesMl:["15:1","30:1","45:1"],answer:1}
            ],
            points: 60,
            unlocked: true,
            completed: true,
            requiredModule: "mulching-101",
            xpReward: 120
        },
        {
            moduleId: "water-conservation",
            title: "Water Conservation Techniques",
            titleMl: "ജല സംരക്ഷണ രീതികൾ",
            summary: "Drip irrigation, rainwater harvesting, and efficient water use",
            summaryMl: "തുള്ളി നീർവളം, മഴവെള്ള സംരക്ഷണം, കാര്യക്ഷമമായ ജല ഉപയോഗം",
            lessons: [
                {id:"l1",title:"Drip irrigation setup",titleMl:"തുള്ളി നീർവളം സ്ഥാപനം",type:"video",duration:180},
                {id:"l2",title:"Rainwater harvesting",titleMl:"മഴവെള്ള സംഭരണം",type:"text",duration:120}
            ],
            quiz: [
                {q:"Drip irrigation saves water by?",qMl:"തുള്ളി നീർവളം എത്ര ജലം ലാഭിക്കുന്നു?",choices:["30%","50%","70%"],choicesMl:["30%","50%","70%"],answer:2}
            ],
            points: 70,
            unlocked: true,
            completed: false,
            requiredModule: "composting-basics",
            xpReward: 140
        },
        {
            moduleId: "bio-pesticides",
            title: "Natural Pest Management",
            titleMl: "പ്രകൃതിദത്ത കീടനിയന്ത്രണം",
            summary: "Organic pest control using neem, turmeric, and beneficial insects",
            summaryMl: "വേപ്പ്, മഞ്ഞൾ, ഗുണകരമായ പ്രാണികൾ ഉപയോഗിച്ചുള്ള കീടനിയന്ത്രണം",
            lessons: [
                {id:"l1",title:"Neem-based solutions",titleMl:"വേപ്പ് അടിസ്ഥാനമാക്കിയ പരിഹാരങ്ങൾ",type:"text",duration:140}
            ],
            quiz: [
                {q:"Neem oil concentration for pests?",qMl:"കീടങ്ങൾക്ക് വേപ്പെണ്ണ സാന്ദ്രത?",choices:["1%","3%","5%"],choicesMl:["1%","3%","5%"],answer:1}
            ],
            points: 80,
            unlocked: false,
            completed: false,
            requiredModule: "water-conservation",
            xpReward: 160
        },
        {
            moduleId: "crop-rotation",
            title: "Crop Rotation Strategies",
            titleMl: "വിള ഭ്രമണ തന്ത്രങ്ങൾ",
            summary: "Optimizing soil health through strategic crop rotation",
            summaryMl: "തന്ത്രപരമായ വിള ഭ്രമണത്തിലൂടെ മണ്ണിന്റെ ആരോഗ്യ്യം മെച്ചപ്പെടുത്തൽ",
            lessons: [
                {id:"l1",title:"3-year rotation plans",titleMl:"3 വർഷത്തെ ഭ്രമണ പദ്ധതികൾ",type:"image",duration:160}
            ],
            quiz: [
                {q:"Best rotation after rice?",qMl:"നെല്ലിന് ശേഷം ഏറ്റവും നല്ല വിള?",choices:["Pulses","Corn","Banana"],choicesMl:["പയർവർഗ്ഗങ്ങൾ","ചോളം","വാഴ"],answer:0}
            ],
            points: 90,
            unlocked: false,
            completed: false,
            requiredModule: "bio-pesticides",
            xpReward: 180
        },
        {
            moduleId: "organic-certification",
            title: "Organic Certification Process",
            titleMl: "ജൈവിക സർട്ടിഫിക്കേഷൻ പ്രക്രിയ",
            summary: "Navigate Kerala's organic certification requirements and benefits",
            summaryMl: "കേരളത്തിലെ ജൈവിക സർട്ടിഫിക്കേഷൻ ആവശ്യകതകളും ഗുണങ്ങളും",
            lessons: [
                {id:"l1",title:"Documentation needed",titleMl:"ആവശ്യമായ രേഖകൾ",type:"text",duration:200}
            ],
            quiz: [
                {q:"Minimum period for organic certification?",qMl:"ജൈവിക സർട്ടിഫിക്കേഷന് ഏറ്റവും കുറഞ്ഞ സമയം?",choices:["1 year","2 years","3 years"],choicesMl:["1 വർഷം","2 വർഷം","3 വർഷം"],answer:2}
            ],
            points: 100,
            unlocked: false,
            completed: false,
            requiredModule: "crop-rotation",
            xpReward: 200
        }
    ],
    achievements: [
        {
            achievementId: "first-steps",
            title: "First Steps",
            titleMl: "ആദ്യ ചുവടുകൾ",
            description: "Completed your first learning module",
            descriptionMl: "നിങ്ങളുടെ ആദ്യ പഠന ഘടകം പൂർത്തിയാക്കി",
            icon: "🌱",
            rewards: {points: 50},
            unlocked: true
        },
        {
            achievementId: "compost-pro",
            title: "Compost Pro",
            titleMl: "കമ്പോസ്റ്റ് വിദഗ്ധൻ",
            description: "Completed the Composting module and reduced chemical fertilizer by 20%",
            descriptionMl: "കമ്പോസ്റ്റിംഗ് ഘടകം പൂർത്തിയാക്കി രാസവളം 20% കുറച്ചു",
            icon: "♻️",
            rewards: {points: 100, unlocks: ["compost-processor-upgrade"]},
            scheme: "Kerala Compost Grant Pilot",
            unlocked: true
        },
        {
            achievementId: "water-saver",
            title: "Water Conservation Expert",
            titleMl: "ജല സംരക്ഷണ വിദഗ്ധൻ",
            description: "Reduced water usage by 40% through efficient irrigation",
            descriptionMl: "കാര്യക്ഷമമായ നീർവളത്തിലൂടെ ജല ഉപയോഗം 40% കുറച്ചു",
            icon: "💧",
            rewards: {points: 150},
            scheme: "Kerala Water Conservation Scheme",
            unlocked: false
        },
        {
            achievementId: "streak-master",
            title: "Learning Streak Master",
            titleMl: "പഠന ധാരാ മാസ്റ്റർ",
            description: "Maintained a 30-day learning streak",
            descriptionMl: "30 ദിവസത്തെ പഠന ധാര നിലനിർത്തി",
            icon: "🔥",
            rewards: {points: 200, multiplier: 1.1},
            unlocked: false
        },
        {
            achievementId: "organic-warrior",
            title: "Organic Warrior",
            titleMl: "ജൈവിക യോദ്ധാവ്",
            description: "Achieved 90+ sustainability score with 100% organic farming",
            descriptionMl: "100% ജൈവ കൃഷിയിലൂടെ 90+ സുസ്ഥിരത സ്കോർ നേടി",
            icon: "🌿",
            rewards: {points: 300},
            scheme: "Kerala Organic Certification",
            unlocked: false
        },
        {
            achievementId: "quiz-champion",
            title: "Quiz Champion",
            titleMl: "ക്വിസ് ചാമ്പ്യൻ",
            description: "Scored 100% on 5 consecutive quizzes",
            descriptionMl: "തുടർച്ചയായി 5 ക്വിസുകളിൽ 100% സ്കോർ നേടി",
            icon: "🏆",
            rewards: {points: 250},
            unlocked: false
        },
        {
            achievementId: "biodiversity-guardian",
            title: "Biodiversity Guardian",
            titleMl: "ജൈവവൈവിധ്യ സംരക്ഷകൻ",
            description: "Cultivated 10+ different crop varieties",
            descriptionMl: "10+ വ്യത്യസ്ത വിള ഇനങ്ങൾ കൃഷി ചെയ്തു",
            icon: "🦋",
            rewards: {points: 180},
            unlocked: false
        },
        {
            achievementId: "idle-farmer",
            title: "Idle Farming Master",
            titleMl: "നിഷ്ക്രിയ കൃഷി മാസ്റ്റർ",
            description: "Earned 1M coins in the idle farming game",
            descriptionMl: "നിഷ്ക്രിയ കൃഷി കളിയിൽ 1M നാണയങ്ങൾ നേടി",
            icon: "🪙",
            rewards: {points: 400},
            unlocked: false
        }
    ],
    leaderboard: [
        {
            userId: "user1",
            name: "Rajesh Menon",
            nameMl: "രാജേഷ് മേനോൻ",
            location: "Wayanad",
            locationMl: "വയനാട്",
            points: 2450,
            sustainabilityScore: 87,
            modulesCompleted: 6,
            avatar: "👨‍🌾"
        },
        {
            userId: "user2",
            name: "Lakshmi Pillai",
            nameMl: "ലക്ഷ്മി പിള്ള",
            location: "Kottayam",
            locationMl: "കോട്ടയം",
            points: 2180,
            sustainabilityScore: 92,
            modulesCompleted: 5,
            avatar: "👩‍🌾"
        },
        {
            userId: "user3",
            name: "Krishnan Nair",
            nameMl: "കൃഷ്ണൻ നായർ",
            location: "Palakkad",
            locationMl: "പാലക്കാട്",
            points: 1920,
            sustainabilityScore: 78,
            modulesCompleted: 4,
            avatar: "👨‍🌾"
        },
        {
            userId: "user4",
            name: "Suma Varma",
            nameMl: "സുമ വർമ്മ",
            location: "Thrissur",
            locationMl: "തൃശ്ശൂർ",
            points: 1750,
            sustainabilityScore: 85,
            modulesCompleted: 4,
            avatar: "👩‍🌾"
        },
        {
            userId: "user5",
            name: "Anil Kumar",
            nameMl: "അനിൽ കുമാർ",
            location: "Malappuram",
            locationMl: "മലപ്പുറം",
            points: 1580,
            sustainabilityScore: 73,
            modulesCompleted: 3,
            avatar: "👨‍🌾"
        }
    ],
    userSample: {
        userId: "demo-user",
        name: "Demo Farmer",
        nameMl: "ഡെമോ കർഷകൻ",
        email: "demo@example.com",
        location: "Alappuzha",
        locationMl: "ആലപ്പുഴ",
        joinDate: "2024-01-15",
        points: 1240,
        xp: 2150,
        level: 8,
        sustainabilityScore: 76,
        currentStreak: 15,
        longestStreak: 23,
        modulesCompleted: 3,
        coinsEarned: 45600,
        achievements: ["first-steps", "compost-pro"],
        avatar: "👨‍🌾",
        farmData: {
            crops: ["Rice", "Coconut", "Banana", "Pepper"],
            area: 2.5,
            soilType: "loamy",
            waterUsage: 8500,
            fertilizers: [
                {type: "organic", amount: 200},
                {type: "chemical", amount: 50}
            ]
        }
    },
    idleGameData: {
        currentCoins: 45600,
        clickValue: 12,
        passiveIncome: 245,
        upgrades: [
            {
                id: "farmhand",
                name: "Farmhand",
                nameMl: "കൃഷിക്കാരൻ",
                level: 15,
                baseCost: 100,
                baseValue: 2,
                unlocked: true
            },
            {
                id: "drip-irrigation",
                name: "Drip Irrigation",
                nameMl: "തുള്ളി നീർവളം",
                level: 8,
                baseCost: 500,
                baseValue: 12,
                unlocked: true
            },
            {
                id: "compost-processor",
                name: "Compost Processor",
                nameMl: "കമ്പോസ്റ്റ് പ്രോസസർ",
                level: 0,
                baseCost: 2000,
                baseValue: 45,
                unlocked: true,
                requiredAchievement: "compost-pro"
            }
        ],
        knowledgeShards: 12,
        dailyRewards: {
            currentDay: 1, // <-- Change this to 1
            lastClaimed: "2024-01-18",
            streak: 1      // <-- Optionally reset streak to 1
        }
    }
};

// Utility Functions
// ================

function formatNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) {
        return '0';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[AppState.currentLanguage];
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }
    return value;
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = getTranslation(key);
    });
}

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.warn('LocalStorage not available:', e);
    }
}

function loadFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.warn('LocalStorage not available:', e);
        return defaultValue;
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 300ms ease-in-out forwards';
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Gamification Functions
// =====================

function calculateUpgradeCost(baseCost, level) {
    return Math.floor(baseCost * Math.pow(1.18, level));
}

function calculateSustainabilityScore(farmData) {
    let score = 0;
    const weights = {
        cropDiversity: 0.20,
        waterEfficiency: 0.25,
        fertilizerType: 0.25,
        soilHealth: 0.20,
        organicInputs: 0.10
    };
    
    // Crop diversity (0-100)
    const cropCount = farmData.crops.length;
    const maxCrops = 6; // Based on available options
    const cropDiversityScore = Math.min((cropCount / maxCrops) * 100, 100);
    
    // Water efficiency (lower usage per hectare is better)
    const waterPerHectare = farmData.waterUsage / farmData.area;
    const baselineWater = 4000; // liters per hectare per week
    const waterEfficiencyScore = Math.max(0, Math.min(100, (1 - (waterPerHectare - baselineWater) / baselineWater) * 100));
    
    // Fertilizer type (higher organic ratio is better)
    const totalFertilizer = farmData.fertilizers.reduce((sum, f) => sum + f.amount, 0);
    const organicFertilizer = farmData.fertilizers.find(f => f.type === 'organic')?.amount || 0;
    const organicRatio = totalFertilizer > 0 ? organicFertilizer / totalFertilizer : 0;
    const fertilizerScore = organicRatio * 100;
    
    // Soil health practices (simplified)
    const soilHealthScore = farmData.soilType === 'loamy' ? 80 : 60;
    
    // Organic inputs (same as fertilizer for now)
    const organicInputsScore = organicRatio * 100;
    
    score = (
        cropDiversityScore * weights.cropDiversity +
        waterEfficiencyScore * weights.waterEfficiency +
        fertilizerScore * weights.fertilizerType +
        soilHealthScore * weights.soilHealth +
        organicInputsScore * weights.organicInputs
    );
    
    return Math.round(Math.max(0, Math.min(100, score)));
}

function generateRecommendations(farmData, score) {
    const recommendations = [];
    const lang = AppState.currentLanguage;
    
    const totalFertilizer = farmData.fertilizers.reduce((sum, f) => sum + f.amount, 0);
    const organicFertilizer = farmData.fertilizers.find(f => f.type === 'organic')?.amount || 0;
    const organicRatio = totalFertilizer > 0 ? organicFertilizer / totalFertilizer : 0;
    
    if (organicRatio < 0.7) {
        recommendations.push(getTranslation('myFarm.rec1'));
    }
    
    const waterPerHectare = farmData.waterUsage / farmData.area;
    if (waterPerHectare > 4000) {
        recommendations.push(getTranslation('myFarm.rec2'));
    }
    
    if (farmData.crops.length < 4) {
        recommendations.push(getTranslation('myFarm.rec3'));
    }
    
    return recommendations;
}

// Navigation Functions
// ===================

function showSection(sectionId) {
    console.log('Navigating to section:', sectionId);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        AppState.currentSection = sectionId;
        
        // Update active nav button
        const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Load section-specific data
        setTimeout(() => loadSectionData(sectionId), 50);
    }
}

function loadSectionData(sectionId) {
    console.log('Loading data for section:', sectionId);
    
    switch (sectionId) {
        case 'learn':
            renderModules();
            break;
        case 'farm':
            renderFarmGame();
            break;
        case 'profile':
            renderProfile();
            break;
        case 'myFarm':
            renderMyFarm();
            break;
        case 'achievements':
            renderAchievements();
            break;
        case 'leaderboard':
            renderLeaderboard();
            break;
        case 'dashboard':
            renderDashboard();
            break;
    }
}

// Learning Module Functions
// ========================

function renderModules() {
    const container = document.getElementById('modulesGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    AppState.modules.forEach((module, index) => {
        const moduleCard = createModuleCard(module, index);
        container.appendChild(moduleCard);
    });
    
    updateModuleUnlocks();
}

function createModuleCard(module, index) {
    const card = document.createElement('div');
    const lang = AppState.currentLanguage;
    const title = lang === 'ml' ? (module.titleMl || module.title) : module.title;
    const summary = lang === 'ml' ? (module.summaryMl || module.summary) : module.summary;
    
    card.className = `module-card ${module.completed ? 'completed' : ''} ${!module.unlocked ? 'locked' : ''}`;
    
    const completedLessons = module.lessons.filter((_, i) => i < (module.currentLesson || 0)).length;
    const progressPercent = module.completed ? 100 : (completedLessons / module.lessons.length) * 100;
    
    card.innerHTML = `
        <div class="module-header">
            <div>
                <h3 class="module-title">${title}</h3>
                <p class="module-summary">${summary}</p>
            </div>
            <div class="module-points">${module.points} pts</div>
        </div>
        <div class="module-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="progress-text">${completedLessons}/${module.lessons.length} lessons</div>
        </div>
        <div class="module-lessons">
            ${module.lessons.map((lesson, lessonIndex) => {
                let status = 'incomplete';
                if (module.completed || lessonIndex < (module.currentLesson || 0)) {
                    status = 'completed';
                } else if (lessonIndex === (module.currentLesson || 0)) {
                    status = 'current';
                }
                return `<div class="lesson-indicator ${status}"></div>`;
            }).join('')}
        </div>
        <div class="module-actions">
            ${module.unlocked ? 
                (module.completed ? 
                    `<button class="btn btn--outline" onclick="openModule('${module.moduleId}')" data-i18n="learn.retakeQuiz">Retake Quiz</button>` :
                    `<button class="btn btn--primary" onclick="openModule('${module.moduleId}')" data-i18n="learn.startModule">Start Module</button>`
                ) :
                `<button class="btn btn--secondary" disabled>🔒 Locked</button>`
            }
        </div>
    `;
    
    return card;
}

function updateModuleUnlocks() {
    // Update module unlock status based on completion
    AppState.modules.forEach((module, index) => {
        if (module.requiredModule) {
            const requiredModule = AppState.modules.find(m => m.moduleId === module.requiredModule);
            module.unlocked = requiredModule && requiredModule.completed;
        }
    });
}

function openModule(moduleId) {
    const module = AppState.modules.find(m => m.moduleId === moduleId);
    if (!module || !module.unlocked) return;
    
    AppState.currentModule = module;
    AppState.currentLesson = module.currentLesson || 0;
    
    const modal = document.getElementById('moduleModal');
    const title = document.getElementById('modalTitle');
    const lang = AppState.currentLanguage;
    
    title.textContent = lang === 'ml' ? (module.titleMl || module.title) : module.title;
    
    if (module.completed || AppState.currentLesson >= module.lessons.length) {
        showQuiz();
    } else {
        showLesson();
    }
    
    modal.classList.remove('hidden');
}

function showLesson() {
    const lessonContent = document.getElementById('lessonContent');
    const quizContent = document.getElementById('quizContent');
    
    lessonContent.classList.remove('hidden');
    quizContent.classList.add('hidden');
    
    renderCurrentLesson();
}

function showQuiz() {
    const lessonContent = document.getElementById('lessonContent');
    const quizContent = document.getElementById('quizContent');
    
    lessonContent.classList.add('hidden');
    quizContent.classList.remove('hidden');
    
    renderQuiz();
}

function renderCurrentLesson() {
    if (!AppState.currentModule) return;
    
    const lesson = AppState.currentModule.lessons[AppState.currentLesson];
    const progressFill = document.getElementById('lessonProgress');
    const progressText = document.getElementById('progressText');
    const lessonBody = document.getElementById('lessonBody');
    const prevBtn = document.getElementById('prevLesson');
    const nextBtn = document.getElementById('nextLesson');
    
    const progress = ((AppState.currentLesson + 1) / AppState.currentModule.lessons.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Lesson ${AppState.currentLesson + 1} of ${AppState.currentModule.lessons.length}`;
    
    const lang = AppState.currentLanguage;
    const title = lang === 'ml' ? (lesson.titleMl || lesson.title) : lesson.title;
    
    lessonBody.innerHTML = `
        <div class="lesson-header">
            <h4>${title}</h4>
            <span class="lesson-duration">${Math.floor(lesson.duration / 60)}:${(lesson.duration % 60).toString().padStart(2, '0')}</span>
        </div>
        <div class="lesson-content-body">
            ${lesson.type === 'text' ? `
                <p>This is a text-based lesson about ${title.toLowerCase()}. In a real implementation, this would contain detailed educational content about sustainable farming practices.</p>
                <p>Key points would be covered with interactive elements, images, and practical examples specific to Kerala farming conditions.</p>
            ` : lesson.type === 'image' ? `
                <div class="lesson-image-placeholder">
                    <div style="background: #f0f0f0; padding: 2rem; text-align: center; border-radius: 8px; margin: 1rem 0;">
                        <span style="font-size: 3rem;">📸</span>
                        <p>Interactive image content for: ${title}</p>
                        <p>Visual demonstrations and step-by-step guides would be shown here.</p>
                    </div>
                </div>
            ` : `
                <div class="lesson-video-placeholder">
                    <div style="background: #f0f0f0; padding: 2rem; text-align: center; border-radius: 8px; margin: 1rem 0;">
                        <span style="font-size: 3rem;">🎥</span>
                        <p>Video content: ${title}</p>
                        <p>Practical demonstration videos would be embedded here.</p>
                    </div>
                </div>
            `}
        </div>
    `;
    
    prevBtn.style.display = AppState.currentLesson > 0 ? 'inline-flex' : 'none';
    nextBtn.textContent = AppState.currentLesson < AppState.currentModule.lessons.length - 1 ? 
        getTranslation('learn.next') : getTranslation('learn.takeQuiz');
}

function nextLesson() {
    if (!AppState.currentModule) return;
    
    if (AppState.currentLesson < AppState.currentModule.lessons.length - 1) {
        AppState.currentLesson++;
        AppState.currentModule.currentLesson = AppState.currentLesson;
        renderCurrentLesson();
    } else {
        // All lessons completed, show quiz
        showQuiz();
    }
}

function prevLesson() {
    if (!AppState.currentModule || AppState.currentLesson <= 0) return;
    
    AppState.currentLesson--;
    renderCurrentLesson();
}

function renderQuiz() {
    if (!AppState.currentModule || !AppState.currentModule.quiz) return;
    
    const quizQuestion = document.getElementById('quizQuestion');
    const submitBtn = document.getElementById('submitQuiz');
    
    AppState.quizData = {
        questions: AppState.currentModule.quiz,
        currentQuestion: 0,
        answers: [],
        score: 0
    };
    
    showQuizQuestion();
}

function showQuizQuestion() {
    const quizData = AppState.quizData;
    const question = quizData.questions[quizData.currentQuestion];
    const quizQuestion = document.getElementById('quizQuestion');
    const quizScore = document.getElementById('quizScore');
    const lang = AppState.currentLanguage;
    
    quizScore.textContent = `${quizData.score}/${quizData.questions.length}`;
    
    const questionText = lang === 'ml' ? (question.qMl || question.q) : question.q;
    const choices = lang === 'ml' ? (question.choicesMl || question.choices) : question.choices;
    
    quizQuestion.innerHTML = `
        <div class="question-text">${questionText}</div>
        <div class="choices-grid">
            ${choices.map((choice, index) => `
                <button class="choice-btn" data-choice="${index}">${choice}</button>
            `).join('')}
        </div>
    `;
    
    // Add click handlers to choices
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', () => selectChoice(btn));
    });
}

function selectChoice(btn) {
    // Remove selection from all choices
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
    
    // Select clicked choice
    btn.classList.add('selected');
    AppState.selectedChoice = parseInt(btn.dataset.choice);
}

function submitQuiz() {
    if (AppState.selectedChoice === undefined) {
        showToast('Please select an answer', 'error');
        return;
    }
    
    const quizData = AppState.quizData;
    const question = quizData.questions[quizData.currentQuestion];
    const isCorrect = AppState.selectedChoice === question.answer;
    
    // Show correct/incorrect feedback
    document.querySelectorAll('.choice-btn').forEach((btn, index) => {
        if (index === question.answer) {
            btn.classList.add('correct');
        } else if (index === AppState.selectedChoice && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    if (isCorrect) {
        quizData.score++;
        showToast('Correct! +5 points', 'success');
        AppState.currentUser.points += 5;
    } else {
        showToast('Incorrect. Try again!', 'error');
    }
    
    quizData.answers.push(AppState.selectedChoice);
    
    setTimeout(() => {
        if (quizData.currentQuestion < quizData.questions.length - 1) {
            quizData.currentQuestion++;
            AppState.selectedChoice = undefined;
            showQuizQuestion();
        } else {
            // Quiz completed
            completeQuiz();
        }
    }, 2000);
}

function completeQuiz() {
    const quizData = AppState.quizData;
    const module = AppState.currentModule;
    const scorePercent = (quizData.score / quizData.questions.length) * 100;
    
    if (scorePercent >= 70) { // Pass threshold
        module.completed = true;
        AppState.currentUser.points += module.points;
        AppState.currentUser.xp += module.xpReward;
        AppState.currentUser.modulesCompleted++;
        
        showToast(`Module completed! +${module.points} points, +${module.xpReward} XP`, 'success');
        
        // Check for achievements
        checkAchievements();
        
        // Update module unlocks
        updateModuleUnlocks();
    } else {
        showToast(`Quiz score: ${scorePercent.toFixed(0)}%. Need 70% to pass.`, 'error');
    }
    
    // Update UI
    updateUserStats();
    closeModal();
    renderModules();
}

// Idle Game Functions
// ==================

function renderFarmGame() {
    updateGameStats();
    renderDailyRewards();
    renderUpgrades();
    startPassiveIncome();
}

function updateGameStats() {
    const coinCount = document.getElementById('coinCount');
    const shardCount = document.getElementById('shardCount');
    const passiveIncomeElement = document.getElementById('passiveIncome');
    
    if (coinCount) coinCount.textContent = formatNumber(AppState.idleGame.coins);
    if (shardCount) shardCount.textContent = AppState.idleGame.knowledgeShards;
    if (passiveIncomeElement) passiveIncomeElement.textContent = formatNumber(AppState.idleGame.passiveIncome) + '/sec';

    renderUpgrades();
}

function handleClick() {
    const earnedCoins = AppState.idleGame.clickValue || 1;
    AppState.idleGame.coins = (AppState.idleGame.coins || 0) + earnedCoins;
    
    // Show click effect
    showClickEffect(earnedCoins);
    
    // Random chance for knowledge shard
    if (Math.random() < 0.02) { // 2% chance
        AppState.idleGame.knowledgeShards = (AppState.idleGame.knowledgeShards || 0) + 1;
        showClickEffect('💎 +1', true);
    }
    
    updateGameStats();
    saveGameData();
}

function showClickEffect(value, isShard = false) {
    const clickEffects = document.getElementById('clickEffects');
    if (!clickEffects) return;
    
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = isShard ? value : `+${formatNumber(value)}`;
    
    // Random position around the click target
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 100;
    effect.style.left = `${randomX}px`;
    effect.style.top = `${randomY}px`;
    
    clickEffects.appendChild(effect);
    
    setTimeout(() => {
        if (clickEffects.contains(effect)) {
            clickEffects.removeChild(effect);
        }
    }, 1000);
}

function renderDailyRewards() {
    const calendar = document.getElementById('rewardsCalendar');
    if (!calendar) return;
    
    const rewards = [
        { day: 1, reward: '100 coins', claimed: true },
        { day: 2, reward: '150 coins', claimed: false },
        { day: 3, reward: '200 coins', claimed: false },
        { day: 4, reward: '1 shard', claimed: false },
        { day: 5, reward: '300 coins', claimed: false },
        { day: 6, reward: '2 shards', claimed: false },
        { day: 7, reward: '500 coins', claimed: false }
    ];
    
    calendar.innerHTML = rewards.map(reward => `
        <div class="reward-day ${reward.claimed ? 'claimed' : ''} ${reward.day === 1 ? 'today' : ''}">
            <div class="reward-day-number">${reward.day}</div>
            <div class="reward-value">${reward.reward}</div>
        </div>
    `).join('');
}

function claimDailyReward() {
    const today = new Date().toISOString().slice(0, 10);
    const currentDay = AppState.idleGame.dailyRewards.currentDay || 1;
    const lastClaimed = AppState.idleGame.dailyRewards.lastClaimed || '';
    const rewards = [100, 150, 200, 1, 300, 2, 500]; // coins or shards
    const rewardTypes = ['coins', 'coins', 'coins', 'shards', 'coins', 'shards', 'coins'];

    // Prevent multiple claims per day
    if (lastClaimed === today) {
        showToast('Already claimed today\'s reward!', 'error');
        return;
    }

    if (currentDay <= 7) {
        const reward = rewards[currentDay - 1];
        const type = rewardTypes[currentDay - 1];

        if (type === 'coins') {
            AppState.idleGame.coins = (AppState.idleGame.coins || 0) + reward;
            showToast(`Claimed ${reward} coins!`, 'success');
        } else {
            AppState.idleGame.knowledgeShards = (AppState.idleGame.knowledgeShards || 0) + reward;
            showToast(`Claimed ${reward} knowledge shards!`, 'success');
        }

        AppState.idleGame.dailyRewards.currentDay = currentDay + 1;
        AppState.idleGame.dailyRewards.lastClaimed = today; // Update last claimed date
        updateGameStats();
        renderDailyRewards();
        saveGameData();
    } else {
        showToast('No more rewards to claim this week!', 'error');
    }
}

function renderUpgrades() {
    const upgradesList = document.getElementById('upgradesList');
    if (!upgradesList) return;
    
    upgradesList.innerHTML = AppState.idleGame.upgrades.map(upgrade => {
        const cost = calculateUpgradeCost(upgrade.baseCost, upgrade.level);
        const canAfford = AppState.idleGame.coins >= cost;
        const lang = AppState.currentLanguage;
        const name = lang === 'ml' ? (upgrade.nameMl || upgrade.name) : upgrade.name;
        
        return `
            <div class="upgrade-item ${!upgrade.unlocked ? 'locked' : ''}">
                <div class="upgrade-info">
                    <div class="upgrade-name">${name}</div>
                    <div class="upgrade-level">Level ${upgrade.level}</div>
                </div>
                <div class="upgrade-actions">
                    ${upgrade.unlocked ? `
                        <div class="upgrade-cost">${formatNumber(cost)} coins</div>
                        <button class="btn btn--primary ${!canAfford ? 'btn--secondary' : ''}" 
                                onclick="buyUpgrade('${upgrade.id}')" 
                                ${!canAfford ? 'disabled' : ''}
                                data-i18n="farm.buy">Buy</button>
                    ` : `
                        <div class="upgrade-cost">🔒 Locked</div>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

function buyUpgrade(upgradeId) {
    const upgrade = AppState.idleGame.upgrades.find(u => u.id === upgradeId);
    if (!upgrade || !upgrade.unlocked) return;
    
    const cost = calculateUpgradeCost(upgrade.baseCost, upgrade.level);
    if (AppState.idleGame.coins >= cost) {
        AppState.idleGame.coins -= cost;
        upgrade.level++;
        
        // Recalculate passive income
        calculatePassiveIncome();
        
        showToast(`Upgraded ${upgrade.name}!`, 'success');
        updateGameStats();
        renderUpgrades();
        saveGameData();
    }
}

function calculatePassiveIncome() {
    AppState.idleGame.passiveIncome = AppState.idleGame.upgrades
        .filter(u => u.unlocked && u.level > 0)
        .reduce((total, upgrade) => {
            return total + (upgrade.baseValue * upgrade.level);
        }, 0);
}

function startPassiveIncome() {
    // Prevent multiple intervals
    if (window.passiveIncomeInterval) {
        clearInterval(window.passiveIncomeInterval);
    }
    
    window.passiveIncomeInterval = setInterval(() => {
        if (AppState.idleGame.passiveIncome > 0) {
            AppState.idleGame.coins = (AppState.idleGame.coins || 0) + AppState.idleGame.passiveIncome;
            updateGameStats();
        }
    }, 1000); // Every second
}

// Profile Functions
// ================

function renderProfile() {
    const user = AppState.currentUser;
    const lang = AppState.currentLanguage;
    
    // Update profile info
    const profileName = document.getElementById('profileName');
    const profileLocation = document.getElementById('profileLocation');
    const joinDate = document.getElementById('joinDate');
    
    if (profileName) profileName.textContent = lang === 'ml' ? (user.nameMl || user.name) : user.name;
    if (profileLocation) profileLocation.textContent = lang === 'ml' ? (user.locationMl || user.location) : user.location;
    if (joinDate) joinDate.textContent = new Date(user.joinDate).toLocaleDateString();
    
    // Update stats
    const profilePoints = document.getElementById('profilePoints');
    const sustainabilityScoreProfile = document.getElementById('sustainabilityScoreProfile');
    const longestStreak = document.getElementById('longestStreak');
    const profileModules = document.getElementById('profileModules');
    
    if (profilePoints) profilePoints.textContent = formatNumber(user.points);
    if (sustainabilityScoreProfile) sustainabilityScoreProfile.textContent = user.sustainabilityScore;
    if (longestStreak) longestStreak.textContent = user.longestStreak;
    if (profileModules) profileModules.textContent = user.modulesCompleted;
    
    // Update farm data preview
    const cropsList = document.getElementById('cropsList');
    const farmSize = document.getElementById('farmSize');
    const soilType = document.getElementById('soilType');
    
    if (cropsList) cropsList.textContent = user.farmData.crops.join(', ');
    if (farmSize) farmSize.textContent = `${user.farmData.area} hectares`;
    if (soilType) soilType.textContent = user.farmData.soilType;
    
    // Render achievements
    renderProfileAchievements();
}

function renderProfileAchievements() {
    const container = document.getElementById('profileAchievements');
    if (!container) return;
    
    const userAchievements = AppState.achievements.filter(a => AppState.currentUser.achievements.includes(a.achievementId));
    
    container.innerHTML = userAchievements.slice(0, 3).map(achievement => {
        const lang = AppState.currentLanguage;
        const title = lang === 'ml' ? (achievement.titleMl || achievement.title) : achievement.title;
        
        return `
            <div class="achievement-preview">
                <span class="achievement-icon">${achievement.icon}</span>
                <span class="achievement-title">${title}</span>
            </div>
        `;
    }).join('') || '<p>No achievements yet. Complete modules to earn badges!</p>';
}

// Farm Management Functions
// ========================

function renderMyFarm() {
    const user = AppState.currentUser;
    
    // Update sustainability score display
    updateSustainabilityScoreDisplay(user.sustainabilityScore);
    
    // Set form values
    const farmArea = document.getElementById('farmArea');
    const soilTypeSelect = document.getElementById('soilTypeSelect');
    const waterUsage = document.getElementById('waterUsage');
    const organicFertilizer = document.getElementById('organicFertilizer');
    const chemicalFertilizer = document.getElementById('chemicalFertilizer');
    
    if (farmArea) farmArea.value = user.farmData.area;
    if (soilTypeSelect) soilTypeSelect.value = user.farmData.soilType;
    if (waterUsage) waterUsage.value = user.farmData.waterUsage;
    
    const organicFert = user.farmData.fertilizers.find(f => f.type === 'organic');
    const chemicalFert = user.farmData.fertilizers.find(f => f.type === 'chemical');
    
    if (organicFertilizer) organicFertilizer.value = organicFert ? organicFert.amount : 0;
    if (chemicalFertilizer) chemicalFertilizer.value = chemicalFert ? chemicalFert.amount : 0;
    
    // Set crop checkboxes
    const cropCheckboxes = document.querySelectorAll('#cropsGroup input[type="checkbox"]');
    cropCheckboxes.forEach(checkbox => {
        checkbox.checked = user.farmData.crops.includes(checkbox.value);
    });
    
    // Update recommendations
    updateRecommendations();
}

function updateSustainabilityScoreDisplay(score) {
    const currentScore = document.getElementById('currentSustainabilityScore');
    const scoreFill = document.getElementById('scoreFill');
    
    if (currentScore) currentScore.textContent = score;
    if (scoreFill) scoreFill.style.width = `${score}%`;
}

function updateFarmData() {
    const crops = Array.from(document.querySelectorAll('#cropsGroup input:checked')).map(cb => cb.value);
    
    const farmData = {
        crops: crops,
        area: parseFloat(document.getElementById('farmArea').value),
        soilType: document.getElementById('soilTypeSelect').value,
        waterUsage: parseInt(document.getElementById('waterUsage').value),
        fertilizers: [
            { type: 'organic', amount: parseInt(document.getElementById('organicFertilizer').value) },
            { type: 'chemical', amount: parseInt(document.getElementById('chemicalFertilizer').value) }
        ]
    };
    
    // Calculate new sustainability score
    const newScore = calculateSustainabilityScore(farmData);
    
    // Update user data
    AppState.currentUser.farmData = farmData;
    AppState.currentUser.sustainabilityScore = newScore;
    
    // Update display
    updateSustainabilityScoreDisplay(newScore);
    updateRecommendations();
    
    // Show feedback
    showToast(`Sustainability score updated: ${newScore}`, 'success');
    
    // Check for achievements
    checkAchievements();
    
    // Save data
    saveUserData();
}

function updateRecommendations() {
    const recommendations = generateRecommendations(AppState.currentUser.farmData, AppState.currentUser.sustainabilityScore);
    const container = document.getElementById('recommendationsList');
    
    if (container) {
        container.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('') || 
            '<li>Great job! Your farming practices are highly sustainable.</li>';
    }
}

// Achievement Functions
// ====================

function renderAchievements() {
    const container = document.getElementById('achievementsGrid');
    if (!container) return;
    
    const userAchievements = AppState.currentUser.achievements;
    
    container.innerHTML = AppState.achievements.map(achievement => {
        const isUnlocked = userAchievements.includes(achievement.achievementId);
        const lang = AppState.currentLanguage;
        const title = lang === 'ml' ? (achievement.titleMl || achievement.title) : achievement.title;
        const description = lang === 'ml' ? (achievement.descriptionMl || achievement.description) : achievement.description;
        
        return `
            <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <h3 class="achievement-title">${title}</h3>
                <p class="achievement-description">${description}</p>
                <div class="achievement-rewards">
                    <span class="reward-badge">${achievement.rewards.points} pts</span>
                    ${achievement.rewards.multiplier ? `<span class="reward-badge">${achievement.rewards.multiplier}x multiplier</span>` : ''}
                </div>
                ${achievement.scheme ? `<div class="scheme-badge">${achievement.scheme}</div>` : ''}
                ${isUnlocked ? '<div class="achievement-unlocked">✓ Unlocked</div>' : ''}
            </div>
        `;
    }).join('');
}

function checkAchievements() {
    const user = AppState.currentUser;
    let newAchievements = [];
    
    AppState.achievements.forEach(achievement => {
        if (!user.achievements.includes(achievement.achievementId)) {
            let shouldUnlock = false;
            
            switch (achievement.achievementId) {
                case 'first-steps':
                    shouldUnlock = user.modulesCompleted >= 1;
                    break;
                case 'compost-pro':
                    shouldUnlock = AppState.modules.find(m => m.moduleId === 'composting-basics')?.completed;
                    break;
                case 'water-saver':
                    shouldUnlock = user.sustainabilityScore >= 80 && user.farmData.waterUsage / user.farmData.area < 3000;
                    break;
                case 'streak-master':
                    shouldUnlock = user.currentStreak >= 30;
                    break;
                case 'organic-warrior':
                    shouldUnlock = user.sustainabilityScore >= 90;
                    break;
                case 'biodiversity-guardian':
                    shouldUnlock = user.farmData.crops.length >= 5;
                    break;
                case 'idle-farmer':
                    shouldUnlock = AppState.idleGame.coins >= 1000000;
                    break;
            }
            
            if (shouldUnlock) {
                user.achievements.push(achievement.achievementId);
                user.points += achievement.rewards.points;
                newAchievements.push(achievement);
                
                showToast(`Achievement unlocked: ${achievement.title}!`, 'success');
                
                // Unlock game upgrades if specified
                if (achievement.rewards.unlocks) {
                    achievement.rewards.unlocks.forEach(upgradeId => {
                        const upgrade = AppState.idleGame.upgrades.find(u => u.id === upgradeId);
                        if (upgrade) {
                            upgrade.unlocked = true;
                            showToast(`New upgrade unlocked: ${upgrade.name}!`, 'success');
                        }
                    });
                }
            }
        }
    });
    
    if (newAchievements.length > 0) {
        saveUserData();
        updateUserStats();
        renderUpgrades(); // Update upgrades if any were unlocked
    }
}

// Leaderboard Functions
// ====================

function renderLeaderboard() {
    const container = document.getElementById('leaderboardContent');
    if (!container) return;
    
    // Sort by current tab (default: points)
    const sortedLeaderboard = [...AppState.leaderboard].sort((a, b) => b.points - a.points);
    
    container.innerHTML = `
        <div class="leaderboard-list">
            ${sortedLeaderboard.map((user, index) => {
                const lang = AppState.currentLanguage;
                const name = lang === 'ml' ? (user.nameMl || user.name) : user.name;
                const location = lang === 'ml' ? (user.locationMl || user.location) : user.location;
                
                let rankClass = '';
                if (index === 0) rankClass = 'gold';
                else if (index === 1) rankClass = 'silver';
                else if (index === 2) rankClass = 'bronze';
                
                return `
                    <div class="leaderboard-item">
                        <div class="leaderboard-rank ${rankClass}">${index + 1}</div>
                        <div class="leaderboard-avatar">${user.avatar}</div>
                        <div class="leaderboard-info">
                            <div class="leaderboard-name">${name}</div>
                            <div class="leaderboard-location">${location}</div>
                        </div>
                        <div class="leaderboard-score">${formatNumber(user.points)}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Dashboard Functions
// ==================

function renderDashboard() {
    // Clear existing charts to prevent duplicates
    Object.keys(AppState.charts).forEach(key => {
        if (AppState.charts[key]) {
            AppState.charts[key].destroy();
            AppState.charts[key] = null;
        }
    });
    
    setTimeout(() => {
        renderSustainabilityChart();
        renderProgressChart();
        renderPointsChart();
    }, 100);
}

function renderSustainabilityChart() {
    const ctx = document.getElementById('sustainabilityChart');
    if (!ctx || AppState.charts.sustainability) return;
    
    // Sample data - in real app, this would come from user history
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sustainability Score',
            data: [45, 52, 61, 68, 72, 76],
            borderColor: '#3B5A40',
            backgroundColor: 'rgba(59, 90, 64, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };
    
    try {
        AppState.charts.sustainability = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    } catch (error) {
        console.warn('Chart.js not available:', error);
    }
}

function renderProgressChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx || AppState.charts.progress) return;
    
    const completedModules = AppState.modules.filter(m => m.completed).length;
    const totalModules = AppState.modules.length;
    
    const data = {
        labels: ['Completed', 'Remaining'],
        datasets: [{
            data: [completedModules, totalModules - completedModules],
            backgroundColor: ['#4CAF50', '#E0E0E0'],
            borderWidth: 0
        }]
    };
    
    try {
        AppState.charts.progress = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    } catch (error) {
        console.warn('Chart.js not available:', error);
    }
}

function renderPointsChart() {
    const ctx = document.getElementById('pointsChart');
    if (!ctx || AppState.charts.points) return;
    
    // Sample data
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Points Earned',
            data: [120, 190, 300, 210],
            backgroundColor: '#8B5A3C',
            borderRadius: 4
        }]
    };
    
    try {
        AppState.charts.points = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.warn('Chart.js not available:', error);
    }
}

// Data Persistence Functions
// ==========================

function saveUserData() {
    saveToLocalStorage('krishiSahayi_user', AppState.currentUser);
    saveToLocalStorage('krishiSahayi_modules', AppState.modules);
    saveToLocalStorage('krishiSahayi_achievements', AppState.achievements);
}

function saveGameData() {
    saveToLocalStorage('krishiSahayi_idleGame', AppState.idleGame);
}

function loadUserData() {
    const userData = loadFromLocalStorage('krishiSahayi_user', sampleData.userSample);
    const modulesData = loadFromLocalStorage('krishiSahayi_modules', sampleData.modules);
    const achievementsData = loadFromLocalStorage('krishiSahayi_achievements', sampleData.achievements);
    const idleGameData = loadFromLocalStorage('krishiSahayi_idleGame', sampleData.idleGameData);
    
    AppState.currentUser = userData;
    AppState.modules = modulesData;
    AppState.achievements = achievementsData;
    AppState.idleGame = idleGameData;
    AppState.leaderboard = sampleData.leaderboard;
    
    // Initialize numeric values properly
    AppState.idleGame.coins = parseInt(AppState.idleGame.coins) || 45600;
    AppState.idleGame.clickValue = parseInt(AppState.idleGame.clickValue) || 12;
    AppState.idleGame.passiveIncome = parseInt(AppState.idleGame.passiveIncome) || 245;
    AppState.idleGame.knowledgeShards = parseInt(AppState.idleGame.knowledgeShards) || 12;
}

function updateUserStats() {
    const currentStreak = document.getElementById('currentStreak');
    const userPoints = document.getElementById('userPoints');
    const modulesCompleted = document.getElementById('modulesCompleted');
    const userXP = document.getElementById('userXP');
    const userLevel = document.getElementById('userLevel');
    
    if (currentStreak) currentStreak.textContent = AppState.currentUser.currentStreak;
    if (userPoints) userPoints.textContent = formatNumber(AppState.currentUser.points);
    if (modulesCompleted) modulesCompleted.textContent = `${AppState.currentUser.modulesCompleted}/${AppState.modules.length}`;
    if (userXP) userXP.textContent = formatNumber(AppState.currentUser.xp);
    if (userLevel) userLevel.textContent = Math.floor(AppState.currentUser.xp / 300) + 1;
}

// Event Listeners and Initialization
// ==================================

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Set up navigation for all elements with data-section attribute
    document.querySelectorAll('[data-section]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            console.log('Navigation clicked:', section);
            if (section) {
                showSection(section);
            }
        });
    });
    
    // Language toggle
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // Farm game click handler
    const clickTarget = document.getElementById('clickTarget');
    if (clickTarget) {
        clickTarget.addEventListener('click', handleClick);
    }
    
    // Daily reward claim
    const claimReward = document.getElementById('claimReward');
    if (claimReward) {
        claimReward.addEventListener('click', claimDailyReward);
    }
    
    // Farm form submission
    const farmForm = document.getElementById('farmForm');
    if (farmForm) {
        farmForm.addEventListener('submit', (e) => {
            e.preventDefault();
            updateFarmData();
        });
    }
    
    // Modal close handlers
    const modalClose = document.querySelector('.modal-close');
    const moduleModal = document.getElementById('moduleModal');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (moduleModal) {
        moduleModal.addEventListener('click', (e) => {
            if (e.target.id === 'moduleModal') {
                closeModal();
            }
        });
    }
    
    // Lesson navigation
    const nextLesson = document.getElementById('nextLesson');
    const prevLesson = document.getElementById('prevLesson');
    const submitQuiz = document.getElementById('submitQuiz');
    
    if (nextLesson) nextLesson.addEventListener('click', () => window.nextLesson());
    if (prevLesson) prevLesson.addEventListener('click', () => window.prevLesson());
    if (submitQuiz) submitQuiz.addEventListener('click', () => window.submitQuiz());
}

function initializeApp() {
    console.log('Initializing Krishi Sahayi...');
    
    // Load saved language preference
    AppState.currentLanguage = loadFromLocalStorage('krishiSahayi_language', 'en');
    
    // Load user data
    loadUserData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update initial translations and stats
    updateTranslations();
    updateUserStats();
    
    // Set initial language toggle text
    updateLanguageToggle();
    
    // Calculate passive income for idle game
    calculatePassiveIncome();
    
    // Auto-save every 30 seconds
    setInterval(() => {
        saveUserData();
        saveGameData();
    }, 30000);
    
    console.log('Krishi Sahayi initialized successfully!');
}

function toggleLanguage() {
    AppState.currentLanguage = AppState.currentLanguage === 'en' ? 'ml' : 'en';
    saveToLocalStorage('krishiSahayi_language', AppState.currentLanguage);
    
    updateTranslations();
    updateLanguageToggle();
    
    // Re-render current section with new language
    loadSectionData(AppState.currentSection);
}

function updateLanguageToggle() {
    const toggle = document.getElementById('languageToggle');
    if (!toggle) return;
    
    const currentLang = toggle.querySelector('.current-lang');
    const altLang = toggle.querySelector('.alt-lang');
    
    if (currentLang && altLang) {
        if (AppState.currentLanguage === 'en') {
            currentLang.textContent = 'EN';
            altLang.textContent = 'ML';
        } else {
            currentLang.textContent = 'ML';
            altLang.textContent = 'EN';
        }
    }
}

function closeModal() {
    const moduleModal = document.getElementById('moduleModal');
    if (moduleModal) {
        moduleModal.classList.add('hidden');
    }
    AppState.currentModule = null;
    AppState.currentLesson = 0;
    AppState.quizData = null;
    AppState.selectedChoice = undefined;
}

// Global function definitions for onclick handlers
window.openModule = openModule;
window.buyUpgrade = buyUpgrade;
window.nextLesson = nextLesson;
window.prevLesson = prevLesson;
window.submitQuiz = submitQuiz;
window.showSection = showSection;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);