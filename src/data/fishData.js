export const FISH_DATA = [
  {
    id: 'yellowfin-trevally',
    commonName: 'Yellowfin Trevally',
    scientificName: 'Caranx ignobilis',
    pronunciation: 'Yeh-low-fin Treh-val-ee',
    image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&q=80&w=800', // Placeholder
    safetyLevel: 'safe', // safe, caution, avoid
    edibilityText: "This looks like a Yellowfin Trevally. It’s commonly eaten and works well when grilled or fried. If you’re unsure, it’s always okay to release it.",
    cookingMethods: [
      "Grilled with lemon and herbs",
      "Pan-fried with garlic butter",
      "Steamed with ginger"
    ],
    funFact: "Trevally are fast swimmers and can change their color slightly to blend in with the water!",
    tips: "Handle with care, they have strong fins."
  },
  {
    id: 'red-snapper',
    commonName: 'Red Snapper',
    scientificName: 'Lutjanus campechanus',
    pronunciation: 'Red Snap-er',
    image: 'https://images.unsplash.com/photo-1534268638706-e75128ff3a1d?auto=format&fit=crop&q=80&w=800', 
    safetyLevel: 'safe',
    edibilityText: "That's a Red Snapper! They are delicious and very popular for family dinners.",
    cookingMethods: [
      "Baked whole in the oven",
      "Fish tacos",
      "Grilled fillets"
    ],
    funFact: "Red Snappers can live to be over 50 years old!",
    tips: "Watch out for sharp spines on the top fin."
  },
  {
    id: 'pufferfish',
    commonName: 'Pufferfish',
    scientificName: 'Tetraodontidae',
    pronunciation: 'Puh-fer-fish',
    image: 'https://images.unsplash.com/photo-1549471013-3364d7266b75?auto=format&fit=crop&q=80&w=800',
    safetyLevel: 'avoid',
    edibilityText: "This is a Pufferfish. They can be very dangerous to eat if not prepared by an expert. It's best to admire this one and put it back.",
    cookingMethods: [],
    funFact: "Pufferfish puff up like a balloon to scare away predators!",
    tips: "Do not eat. Handle gently or use a net."
  },
  {
    id: 'clownfish',
    commonName: 'Clownfish',
    scientificName: 'Amphiprioninae',
    pronunciation: 'Klown-fish',
    image: 'https://images.unsplash.com/photo-1526682701831-27ee38a8ba9a?auto=format&fit=crop&q=80&w=800',
    safetyLevel: 'caution',
    edibilityText: "It's a Clownfish! They are beautiful but usually kept as pets, not for eating.",
    cookingMethods: [],
    funFact: "Clownfish live in anemones and are immune to their stings.",
    tips: "Best to release this little friend."
  }
];

export const getFishById = (id) => FISH_DATA.find(f => f.id === id);
export const getRandomFish = () => FISH_DATA[Math.floor(Math.random() * FISH_DATA.length)];
