// Zustand global state (tracks score, items, current section)

import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
  // --- STATE ---
  score: 0,
  currentSection: 0, // 0: Hero, 1: Skills, 2: Projects, 3: Testimonials, 4: Blog, 5: Contact
  gameStarted: false,
  gameOver: false,
  
  // Player Inventory & Achievements
  collectedOrbs: [], // Array of skill names collected (e.g., ['React', 'Three.js'])
  unlockedBadges: [], // Array of earned achievement names
  inventory: {
    hasResume: false,
    loreFragments: 0,
  },
  
  // Game Quiz State (Final Boss Form)
  quizAnswers: {
    question1: null,
    question2: null,
    question3: null,
  },
  bossDefeated: false,

  // --- ACTIONS ---
  
  // Core Navigation & General State
  startGame: () => set({ gameStarted: true }),
  setSection: (sectionIndex) => set({ currentSection: sectionIndex }),
  resetGame: () => set({
    score: 0,
    currentSection: 0,
    gameStarted: false,
    gameOver: false,
    collectedOrbs: [],
    unlockedBadges: [],
    inventory: { hasResume: false, loreFragments: 0 },
    bossDefeated: false
  }),

  // Mechanics: Collecting Skill Orbs
  collectOrb: (orbName) => set((state) => {
    // Prevent duplicate points for the same item
    if (state.collectedOrbs.includes(orbName)) return {};

    const updatedOrbs = [...state.collectedOrbs, orbName];
    let newScore = state.score + 100;
    const updatedBadges = [...state.unlockedBadges];

    // Example Achievement Logic: Unlocking Frontend Wizard
    if (
      updatedOrbs.includes('React') && 
      updatedOrbs.includes('Three.js') && 
      !updatedBadges.includes('Frontend Wizard')
    ) {
      updatedBadges.push('Frontend Wizard');
      newScore += 500; // Bonus score for badge
    }

    return {
      collectedOrbs: updatedOrbs,
      score: newScore,
      unlockedBadges: updatedBadges
    };
  }),

  // Mechanics: Lore Collection (from reading the blog)
  collectLoreFragment: () => set((state) => {
    const updatedLore = state.inventory.loreFragments + 1;
    let newScore = state.score + 50;
    const updatedBadges = [...state.unlockedBadges];

    if (updatedLore === 3 && !updatedBadges.includes('Historian')) {
      updatedBadges.push('Historian');
      newScore += 300;
    }

    return {
      score: newScore,
      inventory: { ...state.inventory, loreFragments: updatedLore },
      unlockedBadges: updatedBadges
    };
  }),

  // Mechanics: Final Quiz Boss
  submitQuizAnswer: (questionId, answer) => set((state) => ({
    quizAnswers: { ...state.quizAnswers, [questionId]: answer }
  })),

  verifyBossDefeated: () => set((state) => {
    // Add custom checking logic here based on quizAnswers
    const isVictorious = 
      state.quizAnswers.question1 === 'correct_a' && 
      state.quizAnswers.question2 === 'correct_b';
      
    if (isVictorious && !state.bossDefeated) {
      return {
        bossDefeated: true,
        score: state.score + 1000,
        gameOver: true
      };
    }
    return {};
  })
}));
