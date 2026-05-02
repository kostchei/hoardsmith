const weapon = (
  id,
  name,
  kind,
  armament,
  damage,
  properties,
  mastery,
  weight,
  cost,
  tags = []
) => ({
  id,
  name,
  category: "weapon",
  magicCategory: "weapon",
  kind,
  armament,
  damage,
  properties,
  mastery,
  weight,
  cost,
  tags
});

const armor = (id, name, kind, armorClass, strength, stealth, weight, cost, tags = []) => ({
  id,
  name,
  category: "armor",
  magicCategory: "armor",
  kind,
  armament: "defensive",
  armorClass,
  strength,
  stealth,
  weight,
  cost,
  tags
});

const simpleBase = (id, name, category, magicCategory, detail, tags = []) => ({
  id,
  name,
  category,
  magicCategory,
  detail,
  tags
});

export const SOURCES = [
  {
    id: "srd-5-2-1",
    label: "System Reference Document v5.2.1",
    url: "https://www.dndbeyond.com/srd",
    note: "Official Creative Commons 2024/5.5e SRD release page."
  },
  {
    id: "br-2024-equipment",
    label: "D&D Beyond Basic Rules 2024: Equipment",
    url: "https://www.dndbeyond.com/sources/dnd/br-2024/equipment",
    note: "Official 2024 weapon, armor, attunement, identification, and crafting baseline."
  },
  {
    id: "br-2024-magic-items",
    label: "D&D Beyond Basic Rules 2024: Magic Items",
    url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items",
    note: "Official 2024 categories, rarity, sentience, conflict, and item values."
  },
  {
    id: "azure-swa",
    label: "Azure Static Web Apps Documentation",
    url: "https://learn.microsoft.com/en-us/azure/static-web-apps/",
    note: "Official hosting reference for static front-end deployments."
  },
  {
    id: "lmstudio-openai",
    label: "LM Studio OpenAI Compatibility Endpoints",
    url: "https://lmstudio.ai/docs/developer/openai-compat",
    note: "Official browser/API integration path used by this app."
  },
  {
    id: "lmstudio-cors",
    label: "LM Studio CLI: lms server start",
    url: "https://lmstudio.ai/docs/cli/serve/server-start",
    note: "Official CLI reference for enabling CORS on the local server."
  },
  {
    id: "lmstudio-qwen3",
    label: "LM Studio Hub: Qwen3",
    url: "https://lmstudio.ai/models/qwen3",
    note: "LM Studio Hub family page showing 2 GB minimum system memory for the smallest Qwen3 model."
  },
  {
    id: "lmstudio-gemma3",
    label: "LM Studio Hub: Gemma 3 12B",
    url: "https://lmstudio.ai/models/google/gemma-3-12b",
    note: "LM Studio Hub page showing 11 GB minimum system memory and summarization fit."
  }
];

export const MODEL_RECOMMENDATIONS = [
  {
    id: "qwen3-4b-2507",
    name: "qwen/qwen3-4b-2507",
    memory: "2 GB minimum system memory",
    useCase: "Best default for fast local summaries and strong instruction following.",
    url: "https://lmstudio.ai/models/qwen3"
  },
  {
    id: "gemma-3-12b",
    name: "google/gemma-3-12b",
    memory: "11 GB minimum system memory",
    useCase: "Better prose quality while staying within a 16 GB ceiling.",
    url: "https://lmstudio.ai/models/google/gemma-3-12b"
  }
];

export const CATEGORY_OPTIONS = [
  { id: "weapon", label: "Weapon" },
  { id: "armor", label: "Armor" },
  { id: "shield", label: "Shield" },
  { id: "staff", label: "Staff" },
  { id: "wand", label: "Wand" },
  { id: "rod", label: "Rod" },
  { id: "ring", label: "Ring" },
  { id: "potion", label: "Potion" },
  { id: "scroll", label: "Scroll" },
  { id: "wondrous", label: "Wondrous Item" },
  { id: "tool", label: "Tool" }
];

export const ITEM_FAMILY_OPTIONS = [
  {
    id: "standard",
    label: "Standard Categories",
    description: "Use the ordinary 2024 item-category flow without DMG family filtering."
  },
  {
    id: "arcana",
    label: "Arcana",
    description: "Spellcraft, lore, divination, communication, and mystical utility."
  },
  {
    id: "armaments",
    label: "Armaments",
    description: "Battlefield gear, defenses, martial force, and active protection."
  },
  {
    id: "implements",
    label: "Implements",
    description: "Practical magic, consumables, tools, travel aids, and problem-solvers."
  },
  {
    id: "relics",
    label: "Relics",
    description: "Storied heirlooms, sacred treasures, and campaign-shaping wonders."
  }
];

export const ITEM_FAMILY_RULES = {
  standard: {
    categories: CATEGORY_OPTIONS.map((category) => category.id),
    themes: ["valor", "ward", "storm", "dawn", "shadow", "grace", "echo", "trickery", "hearth", "verdant", "voyage", "ember", "moon", "memory"],
    summary: "Standard 2024 category-based generation without DMG family-table filtering."
  },
  arcana: {
    categories: ["ring", "rod", "scroll", "staff", "wand", "wondrous", "potion"],
    themes: ["echo", "moon", "memory", "dawn", "ember", "shadow"],
    summary: "2024 DMG random-table family focused on spellcraft and magical curiosities."
  },
  armaments: {
    categories: ["weapon", "armor", "shield", "staff", "rod", "wondrous"],
    themes: ["valor", "ward", "storm", "dawn", "grace"],
    summary: "2024 DMG random-table family focused on combat gear and battlefield leverage."
  },
  implements: {
    categories: ["tool", "potion", "scroll", "wondrous", "ring", "rod"],
    themes: ["memory", "voyage", "verdant", "hearth", "echo", "trickery"],
    summary: "2024 DMG random-table family focused on practical magic, tools, and utility."
  },
  relics: {
    categories: ["wondrous", "ring", "rod", "staff", "wand", "armor", "shield", "weapon", "potion", "scroll", "tool"],
    themes: ["dawn", "ward", "valor", "shadow", "moon", "memory"],
    summary: "2024 DMG random-table family focused on storied treasures, heirlooms, and major finds."
  }
};

export const MAGIC_CATEGORY_RULES = {
  weapon: {
    label: "Weapon",
    description:
      "A magic weapon is typically a magical version of a weapon from Equipment. Ammunition fired from a magic weapon counts as magical.",
    tool: "Leatherworker's Tools, Smith's Tools, or Woodcarver's Tools depending on the chassis.",
    usage: "Must be wielded to function.",
    canBeSentient: true
  },
  armor: {
    label: "Armor",
    description:
      "Magic armor is typically a magical version of armor from Equipment and must be worn for its magic to function.",
    tool: "Leatherworker's Tools, Smith's Tools, or Weaver's Tools depending on the armor type.",
    usage: "Must be worn to function.",
    canBeSentient: true
  },
  shield: {
    label: "Armor",
    description:
      "Shields use the Armor category in 2024 rules and must be strapped to the arm for their magic to function.",
    tool: "Leatherworker's Tools, Smith's Tools, or Weaver's Tools depending on construction.",
    usage: "Must be wielded to function.",
    canBeSentient: true
  },
  potion: {
    label: "Potion",
    description:
      "Potions are consumable items. Drinking a potion or administering it to another creature requires a Bonus Action.",
    tool: "Alchemist's Supplies or Herbalism Kit.",
    usage: "Consumed on use.",
    canBeSentient: false
  },
  ring: {
    label: "Ring",
    description: "A ring must be worn on a finger or similar digit unless the item's description states otherwise.",
    tool: "Jeweler's Tools.",
    usage: "Must be worn to function.",
    canBeSentient: true
  },
  rod: {
    label: "Rod",
    description: "A rod is usually a metal, wood, or bone scepter that can often serve as an Arcane Focus.",
    tool: "Woodcarver's Tools.",
    usage: "Usually wielded or planted.",
    canBeSentient: true
  },
  scroll: {
    label: "Scroll",
    description: "Scrolls are consumable items. Their magic is unleashed by reading the script aloud.",
    tool: "Calligrapher's Supplies.",
    usage: "Consumed on use.",
    canBeSentient: false
  },
  staff: {
    label: "Staff",
    description:
      "A staff can usually be used as a nonmagical quarterstaff and as an Arcane Focus unless noted otherwise.",
    tool: "Woodcarver's Tools.",
    usage: "Usually wielded.",
    canBeSentient: true
  },
  wand: {
    label: "Wand",
    description: "A wand is a short focus item that can usually function as an Arcane Focus unless noted otherwise.",
    tool: "Woodcarver's Tools.",
    usage: "Usually wielded.",
    canBeSentient: true
  },
  wondrous: {
    label: "Wondrous Item",
    description:
      "Wondrous Items include wearable items, bags, books, instruments, figurines, and other unusual objects.",
    tool: "Tinker's Tools or the tool used to make the nonmagical base object.",
    usage: "Varies by item.",
    canBeSentient: true
  },
  tool: {
    label: "Wondrous Item",
    description:
      "A magical tool is still treated as a wondrous item for crafting and category purposes but preserves the mundane tool chassis.",
    tool: "Tinker's Tools or the base tool's normal crafting tool.",
    usage: "Must be held or used as the tool describes.",
    canBeSentient: true
  }
};

export const RARITY_RULES = {
  Mundane: {
    value: "Base equipment value only",
    craftingTime: "Use mundane item crafting rules",
    craftingCost: "Half the mundane item's value in materials",
    awardBand: "Any tier",
    moduleBudget: "No magical effect"
  },
  Common: {
    value: "100 GP",
    craftingTime: "5 days",
    craftingCost: "50 GP",
    awardBand: "Mostly tier 1",
    moduleBudget: "Minor utility, low-output consumables, or narrow passive edge"
  },
  Uncommon: {
    value: "400 GP",
    craftingTime: "10 days",
    craftingCost: "200 GP",
    awardBand: "Tiers 1-2",
    moduleBudget: "Reliable utility, modest passive bonus, or 1st-2nd-level equivalent magic"
  },
  Rare: {
    value: "4,000 GP",
    craftingTime: "50 days",
    craftingCost: "2,000 GP",
    awardBand: "Tiers 2-3",
    moduleBudget: "Strong passive bonus, signature reaction, or 3rd-5th-level equivalent magic"
  },
  "Very Rare": {
    value: "40,000 GP",
    craftingTime: "125 days",
    craftingCost: "20,000 GP",
    awardBand: "Tiers 3-4",
    moduleBudget: "Large persistent bonus or repeatable 5th-7th-level equivalent magic"
  },
  Legendary: {
    value: "200,000 GP",
    craftingTime: "250 days",
    craftingCost: "100,000 GP",
    awardBand: "Mostly tier 4",
    moduleBudget: "Campaign-shaping power, 7th-9th-level equivalent effects, or transformational defenses"
  },
  Artifact: {
    value: "Priceless",
    craftingTime: "Not craftable by ordinary means",
    craftingCost: "Quest-defined",
    awardBand: "Plot device",
    moduleBudget: "Unique mythic effect"
  }
};

export const BASE_ITEMS = {
  weapon: [
    weapon("club", "Club", "Simple Melee", "melee", "1d4 bludgeoning", ["Light"], "Slow", "2 lb.", "1 SP", [
      "simple",
      "light"
    ]),
    weapon("dagger", "Dagger", "Simple Melee", "melee", "1d4 piercing", ["Finesse", "Light", "Thrown (20/60)"], "Nick", "1 lb.", "2 GP", [
      "simple",
      "finesse",
      "light",
      "thrown"
    ]),
    weapon("greatclub", "Greatclub", "Simple Melee", "melee", "1d8 bludgeoning", ["Two-Handed"], "Push", "10 lb.", "2 SP", [
      "simple",
      "two-handed"
    ]),
    weapon("handaxe", "Handaxe", "Simple Melee", "melee", "1d6 slashing", ["Light", "Thrown (20/60)"], "Vex", "2 lb.", "5 GP", [
      "simple",
      "light",
      "thrown"
    ]),
    weapon("javelin", "Javelin", "Simple Melee", "melee", "1d6 piercing", ["Thrown (30/120)"], "Slow", "2 lb.", "5 SP", [
      "simple",
      "thrown"
    ]),
    weapon("light-hammer", "Light Hammer", "Simple Melee", "melee", "1d4 bludgeoning", ["Light", "Thrown (20/60)"], "Nick", "2 lb.", "2 GP", [
      "simple",
      "light",
      "thrown"
    ]),
    weapon("mace", "Mace", "Simple Melee", "melee", "1d6 bludgeoning", [], "Sap", "4 lb.", "5 GP", [
      "simple"
    ]),
    weapon("quarterstaff", "Quarterstaff", "Simple Melee", "melee", "1d6 bludgeoning", ["Versatile (1d8)"], "Topple", "4 lb.", "2 SP", [
      "simple",
      "versatile",
      "staff"
    ]),
    weapon("sickle", "Sickle", "Simple Melee", "melee", "1d4 slashing", ["Light"], "Nick", "2 lb.", "1 GP", [
      "simple",
      "light"
    ]),
    weapon("spear", "Spear", "Simple Melee", "melee", "1d6 piercing", ["Thrown (20/60)", "Versatile (1d8)"], "Sap", "3 lb.", "1 GP", [
      "simple",
      "thrown",
      "versatile"
    ]),
    weapon("dart", "Dart", "Simple Ranged", "ranged", "1d4 piercing", ["Finesse", "Thrown (20/60)"], "Vex", "1/4 lb.", "5 CP", [
      "simple",
      "finesse",
      "thrown"
    ]),
    weapon("light-crossbow", "Light Crossbow", "Simple Ranged", "ranged", "1d8 piercing", ["Ammunition (80/320; bolt)", "Loading", "Two-Handed"], "Slow", "5 lb.", "25 GP", [
      "simple",
      "loading",
      "two-handed",
      "ammunition"
    ]),
    weapon("shortbow", "Shortbow", "Simple Ranged", "ranged", "1d6 piercing", ["Ammunition (80/320; arrow)", "Two-Handed"], "Vex", "2 lb.", "25 GP", [
      "simple",
      "two-handed",
      "ammunition"
    ]),
    weapon("sling", "Sling", "Simple Ranged", "ranged", "1d4 bludgeoning", ["Ammunition (30/120; bullet)"], "Slow", "-", "1 SP", [
      "simple",
      "ammunition"
    ]),
    weapon("battleaxe", "Battleaxe", "Martial Melee", "melee", "1d8 slashing", ["Versatile (1d10)"], "Topple", "4 lb.", "10 GP", [
      "martial",
      "versatile"
    ]),
    weapon("flail", "Flail", "Martial Melee", "melee", "1d8 bludgeoning", [], "Sap", "2 lb.", "10 GP", [
      "martial"
    ]),
    weapon("glaive", "Glaive", "Martial Melee", "melee", "1d10 slashing", ["Heavy", "Reach", "Two-Handed"], "Graze", "6 lb.", "20 GP", [
      "martial",
      "heavy",
      "reach",
      "two-handed"
    ]),
    weapon("greataxe", "Greataxe", "Martial Melee", "melee", "1d12 slashing", ["Heavy", "Two-Handed"], "Cleave", "7 lb.", "30 GP", [
      "martial",
      "heavy",
      "two-handed"
    ]),
    weapon("greatsword", "Greatsword", "Martial Melee", "melee", "2d6 slashing", ["Heavy", "Two-Handed"], "Graze", "6 lb.", "50 GP", [
      "martial",
      "heavy",
      "two-handed"
    ]),
    weapon("halberd", "Halberd", "Martial Melee", "melee", "1d10 slashing", ["Heavy", "Reach", "Two-Handed"], "Cleave", "6 lb.", "20 GP", [
      "martial",
      "heavy",
      "reach",
      "two-handed"
    ]),
    weapon("lance", "Lance", "Martial Melee", "melee", "1d10 piercing", ["Heavy", "Reach", "Two-Handed (unless mounted)"], "Topple", "6 lb.", "10 GP", [
      "martial",
      "heavy",
      "reach"
    ]),
    weapon("longsword", "Longsword", "Martial Melee", "melee", "1d8 slashing", ["Versatile (1d10)"], "Sap", "3 lb.", "15 GP", [
      "martial",
      "versatile"
    ]),
    weapon("maul", "Maul", "Martial Melee", "melee", "2d6 bludgeoning", ["Heavy", "Two-Handed"], "Topple", "10 lb.", "10 GP", [
      "martial",
      "heavy",
      "two-handed"
    ]),
    weapon("morningstar", "Morningstar", "Martial Melee", "melee", "1d8 piercing", [], "Sap", "4 lb.", "15 GP", [
      "martial"
    ]),
    weapon("pike", "Pike", "Martial Melee", "melee", "1d10 piercing", ["Heavy", "Reach", "Two-Handed"], "Push", "18 lb.", "5 GP", [
      "martial",
      "heavy",
      "reach",
      "two-handed"
    ]),
    weapon("rapier", "Rapier", "Martial Melee", "melee", "1d8 piercing", ["Finesse"], "Vex", "2 lb.", "25 GP", [
      "martial",
      "finesse"
    ]),
    weapon("scimitar", "Scimitar", "Martial Melee", "melee", "1d6 slashing", ["Finesse", "Light"], "Nick", "3 lb.", "25 GP", [
      "martial",
      "finesse",
      "light"
    ]),
    weapon("shortsword", "Shortsword", "Martial Melee", "melee", "1d6 piercing", ["Finesse", "Light"], "Vex", "2 lb.", "10 GP", [
      "martial",
      "finesse",
      "light"
    ]),
    weapon("trident", "Trident", "Martial Melee", "melee", "1d8 piercing", ["Thrown (20/60)", "Versatile (1d10)"], "Topple", "4 lb.", "5 GP", [
      "martial",
      "thrown",
      "versatile"
    ]),
    weapon("warhammer", "Warhammer", "Martial Melee", "melee", "1d8 bludgeoning", ["Versatile (1d10)"], "Push", "5 lb.", "15 GP", [
      "martial",
      "versatile"
    ]),
    weapon("war-pick", "War Pick", "Martial Melee", "melee", "1d8 piercing", ["Versatile (1d10)"], "Sap", "2 lb.", "5 GP", [
      "martial",
      "versatile"
    ]),
    weapon("whip", "Whip", "Martial Melee", "melee", "1d4 slashing", ["Finesse", "Reach"], "Slow", "3 lb.", "2 GP", [
      "martial",
      "finesse",
      "reach"
    ]),
    weapon("blowgun", "Blowgun", "Martial Ranged", "ranged", "1 piercing", ["Ammunition (25/100; needle)", "Loading"], "Vex", "1 lb.", "10 GP", [
      "martial",
      "loading",
      "ammunition"
    ]),
    weapon("hand-crossbow", "Hand Crossbow", "Martial Ranged", "ranged", "1d6 piercing", ["Ammunition (30/120; bolt)", "Light", "Loading"], "Vex", "3 lb.", "75 GP", [
      "martial",
      "light",
      "loading",
      "ammunition"
    ]),
    weapon("heavy-crossbow", "Heavy Crossbow", "Martial Ranged", "ranged", "1d10 piercing", ["Ammunition (100/400; bolt)", "Heavy", "Loading", "Two-Handed"], "Push", "18 lb.", "50 GP", [
      "martial",
      "heavy",
      "loading",
      "two-handed",
      "ammunition"
    ]),
    weapon("longbow", "Longbow", "Martial Ranged", "ranged", "1d8 piercing", ["Ammunition (150/600; arrow)", "Heavy", "Two-Handed"], "Slow", "2 lb.", "50 GP", [
      "martial",
      "heavy",
      "two-handed",
      "ammunition"
    ]),
    weapon("musket", "Musket", "Martial Ranged", "ranged", "1d12 piercing", ["Ammunition (40/120; bullet)", "Loading", "Two-Handed"], "Slow", "10 lb.", "500 GP", [
      "martial",
      "loading",
      "two-handed",
      "ammunition",
      "firearm"
    ]),
    weapon("pistol", "Pistol", "Martial Ranged", "ranged", "1d10 piercing", ["Ammunition (30/90; bullet)", "Loading"], "Vex", "3 lb.", "250 GP", [
      "martial",
      "loading",
      "ammunition",
      "firearm"
    ])
  ],
  armor: [
    armor("padded-armor", "Padded Armor", "Light Armor", "11 + Dex modifier", "-", "Disadvantage", "8 lb.", "5 GP", [
      "light"
    ]),
    armor("leather-armor", "Leather Armor", "Light Armor", "11 + Dex modifier", "-", "-", "10 lb.", "10 GP", [
      "light"
    ]),
    armor("studded-leather", "Studded Leather Armor", "Light Armor", "12 + Dex modifier", "-", "-", "13 lb.", "45 GP", [
      "light"
    ]),
    armor("hide-armor", "Hide Armor", "Medium Armor", "12 + Dex modifier (max 2)", "-", "-", "12 lb.", "10 GP", [
      "medium"
    ]),
    armor("chain-shirt", "Chain Shirt", "Medium Armor", "13 + Dex modifier (max 2)", "-", "-", "20 lb.", "50 GP", [
      "medium"
    ]),
    armor("scale-mail", "Scale Mail", "Medium Armor", "14 + Dex modifier (max 2)", "-", "Disadvantage", "45 lb.", "50 GP", [
      "medium"
    ]),
    armor("breastplate", "Breastplate", "Medium Armor", "14 + Dex modifier (max 2)", "-", "-", "20 lb.", "400 GP", [
      "medium"
    ]),
    armor("half-plate", "Half Plate Armor", "Medium Armor", "15 + Dex modifier (max 2)", "-", "Disadvantage", "40 lb.", "750 GP", [
      "medium"
    ]),
    armor("ring-mail", "Ring Mail", "Heavy Armor", "14", "-", "Disadvantage", "40 lb.", "30 GP", [
      "heavy"
    ]),
    armor("chain-mail", "Chain Mail", "Heavy Armor", "16", "Str 13", "Disadvantage", "55 lb.", "75 GP", [
      "heavy"
    ]),
    armor("splint", "Splint Armor", "Heavy Armor", "17", "Str 15", "Disadvantage", "60 lb.", "200 GP", [
      "heavy"
    ]),
    armor("plate", "Plate Armor", "Heavy Armor", "18", "Str 15", "Disadvantage", "65 lb.", "1,500 GP", [
      "heavy"
    ])
  ],
  shield: [
    {
      id: "shield",
      name: "Shield",
      category: "shield",
      magicCategory: "shield",
      kind: "Shield",
      armament: "defensive",
      armorClass: "+2 AC",
      weight: "6 lb.",
      cost: "10 GP",
      tags: ["defensive"]
    }
  ],
  staff: [
    simpleBase("ash-staff", "Ash Staff", "staff", "staff", "Quarterstaff-compatible focus carved from ash wood.", [
      "staff",
      "focus"
    ]),
    simpleBase("ironwood-staff", "Ironwood Staff", "staff", "staff", "Dense ironwood walking staff that functions as a quarterstaff.", [
      "staff",
      "focus"
    ]),
    simpleBase("pilgrim-cane", "Pilgrim's Cane", "staff", "staff", "Travel-worn cane treated as a quarterstaff and arcane focus.", [
      "staff",
      "focus"
    ])
  ],
  wand: [
    simpleBase("willow-wand", "Willow Wand", "wand", "wand", "A slim willow wand suited to spellcasting.", ["focus"]),
    simpleBase("bone-wand", "Bone Wand", "wand", "wand", "An ivory or bone wand capped with silver.", ["focus"]),
    simpleBase("crystal-wand", "Crystal Wand", "wand", "wand", "A crystal-cored wand with etched runes.", ["focus"])
  ],
  rod: [
    simpleBase("iron-rod", "Iron Rod", "rod", "rod", "An iron scepter meant to be planted or held.", ["focus"]),
    simpleBase("bronze-baton", "Bronze Baton", "rod", "rod", "A balanced bronze baton with inset sigils.", ["focus"]),
    simpleBase("rune-scepter", "Rune Scepter", "rod", "rod", "A rune-bound scepter of bone and brass.", ["focus"])
  ],
  ring: [
    simpleBase("plain-band", "Plain Band", "ring", "ring", "A smooth, unadorned band of metal with no markings.", ["wearable"]),
    simpleBase("engraved-band", "Engraved Band", "ring", "ring", "A metal band worked with geometric or runic engravings.", ["wearable"]),
    simpleBase("solitaire-ring", "Solitaire Ring", "ring", "ring", "A single stone set in a plain prong or bezel mount.", ["wearable"]),
    simpleBase("encrusted-band", "Encrusted Band", "ring", "ring", "A band set with several small stones arranged around the circumference.", ["wearable"]),
    simpleBase("armband", "Armband", "ring", "ring", "A wide cuff worn on the upper arm rather than the finger.", ["wearable"]),
    simpleBase("bangle", "Bangle", "ring", "ring", "A rigid bracelet that slides over the wrist and sits loose.", ["wearable"]),
    simpleBase("knuckle-cap", "Knuckle-cap", "ring", "ring", "A flat disc of metal that seats over a knuckle and is held by a split shank.", ["wearable"]),
    simpleBase("signet-ring", "Signet Ring", "ring", "ring", "A broad-faced band bearing an intaglio seal for stamping wax.", ["wearable"]),
    simpleBase("hollow-ring", "Hollow Ring", "ring", "ring", "A band with a small hidden cavity beneath a hinged bezel.", ["wearable"]),
    simpleBase("bladed-ring", "Bladed Ring", "ring", "ring", "A ring fitted with a short, outward-facing blade along the outer face.", ["wearable"])
  ],
  potion: [
    simpleBase("glass-vial", "Glass Vial", "potion", "potion", "A one-ounce vial of liquid or alchemical oil.", ["consumable"]),
    simpleBase("sealed-phial", "Wax-Sealed Phial", "potion", "potion", "A sealed phial wrapped in waxed thread.", ["consumable"]),
    simpleBase("stoppered-flask", "Stoppered Flask", "potion", "potion", "A narrow flask for a volatile draught.", ["consumable"])
  ],
  scroll: [
    simpleBase("spell-scroll", "Spell Scroll", "scroll", "scroll", "A rolled sheet of parchment bearing stored magic.", ["consumable"]),
    simpleBase("ward-scroll", "Ward Scroll", "scroll", "scroll", "A scroll marked with protective script and wax.", ["consumable"]),
    simpleBase("strip-scripture", "Scripture Strip", "scroll", "scroll", "A ribbon of scripture wrapped around wooden rods.", ["consumable"])
  ],
  wondrous: [
    simpleBase("amulet", "Amulet", "wondrous", "wondrous", "A pendant or talisman meant to be worn close.", ["wearable"]),
    simpleBase("belt", "Belt", "wondrous", "wondrous", "A broad belt stitched with symbolic motifs.", ["wearable"]),
    simpleBase("boots", "Boots", "wondrous", "wondrous", "A pair of travel boots or sabatons.", ["wearable"]),
    simpleBase("bracers", "Bracers", "wondrous", "wondrous", "Matched bracers or cuffs for the forearms.", ["wearable"]),
    simpleBase("brooch", "Brooch", "wondrous", "wondrous", "A clasp or brooch pinned to a mantle.", ["wearable"]),
    simpleBase("cloak", "Cloak", "wondrous", "wondrous", "A cloak, mantle, or shawl.", ["wearable"]),
    simpleBase("gauntlets", "Gauntlets", "wondrous", "wondrous", "A pair of gloves or gauntlets.", ["wearable"]),
    simpleBase("helm", "Helm", "wondrous", "wondrous", "A circlet, crown, or helm.", ["wearable"]),
    simpleBase("horn", "Horn", "wondrous", "wondrous", "A drinking horn or war horn.", ["held"]),
    simpleBase("key", "Key", "wondrous", "wondrous", "A lockpick's dream or a ceremonial key.", ["held"]),
    simpleBase("lantern", "Lantern", "wondrous", "wondrous", "A lantern, lamp, or hanging beacon.", ["held"]),
    simpleBase("mask", "Mask", "wondrous", "wondrous", "A ritual mask of lacquer or carved bone.", ["wearable"]),
    simpleBase("mirror", "Mirror", "wondrous", "wondrous", "A hand mirror framed in silver or horn.", ["held"]),
    simpleBase("tome", "Tome", "wondrous", "wondrous", "A bound book, ledger, or devotional codex.", ["held"])
  ],
  tool: [
    simpleBase("alchemists-supplies", "Alchemist's Supplies", "tool", "tool", "Flasks, burners, and reagents for alchemical work.", ["utility"]),
    simpleBase("calligraphers-supplies", "Calligrapher's Supplies", "tool", "tool", "Ink, pens, and papers for scriptwork.", ["utility"]),
    simpleBase("herbalism-kit", "Herbalism Kit", "tool", "tool", "Pouches and knives for gathering and preparing herbs.", ["utility"]),
    simpleBase("jewelers-tools", "Jeweler's Tools", "tool", "tool", "Files, loupe, and precision implements for stonework.", ["utility"]),
    simpleBase("navigators-tools", "Navigator's Tools", "tool", "tool", "Charts, calipers, and star-reading instruments.", ["utility"]),
    simpleBase("smiths-tools", "Smith's Tools", "tool", "tool", "Hammers, tongs, and shaping tools for metalwork.", ["utility"]),
    simpleBase("thieves-tools", "Thieves' Tools", "tool", "tool", "Picks, files, mirrors, and hidden wedges.", ["utility"]),
    simpleBase("tinkers-tools", "Tinker's Tools", "tool", "tool", "Hand tools for repair and clockwork adjustments.", ["utility"]),
    simpleBase("weavers-tools", "Weaver's Tools", "tool", "tool", "Needles, shuttles, and threadwork implements.", ["utility"]),
    simpleBase("woodcarvers-tools", "Woodcarver's Tools", "tool", "tool", "Knives and gouges for shaping hardwoods.", ["utility"])
  ]
};

export const REFERENCE_ITEMS = [
  { id: "plus-weapon", name: "+1 Weapon", primaryEdition: "2014", categories: ["weapon"], rarity: "Uncommon", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items", source: "2024 Magic Item Categories examples" },
  { id: "plus-armor", name: "+1 Leather Armor", primaryEdition: "2014", categories: ["armor"], rarity: "Rare", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items", source: "2024 Magic Item Categories examples" },
  { id: "plus-shield", name: "+1 Shield", primaryEdition: "2014", categories: ["shield"], rarity: "Rare", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items", source: "2024 Magic Item Categories examples" },
  { id: "sentinel-shield", name: "Sentinel Shield", primaryEdition: "2024", categories: ["shield"], rarity: "Uncommon", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "shield-of-the-cavalier", name: "Shield of the Cavalier", primaryEdition: "2024", categories: ["shield", "armor"], rarity: "Rare", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "energy-bow", name: "Energy Bow", primaryEdition: "2024", categories: ["weapon"], rarity: "Rare", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "thunderous-greatclub", name: "Thunderous Greatclub", primaryEdition: "2024", categories: ["weapon"], rarity: "Uncommon", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "quarterstaff-of-the-acrobat", name: "Quarterstaff of the Acrobat", primaryEdition: "2024", categories: ["weapon", "staff"], rarity: "Uncommon", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "hat-of-many-spells", name: "Hat of Many Spells", primaryEdition: "2024", categories: ["wondrous"], rarity: "Rare", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "sending-stones", name: "Sending Stones", primaryEdition: "2024", categories: ["wondrous"], rarity: "Uncommon", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "gloves-of-thievery", name: "Gloves of Thievery", primaryEdition: "2024", categories: ["wondrous", "tool"], rarity: "Uncommon", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "bead-of-nourishment", name: "Bead of Nourishment", primaryEdition: "2024", categories: ["potion", "wondrous"], rarity: "Common", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "elixir-of-health", name: "Elixir of Health", primaryEdition: "2024", categories: ["potion"], rarity: "Rare", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "potion-of-invulnerability", name: "Potion of Invulnerability", primaryEdition: "2024", categories: ["potion"], rarity: "Rare", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "potion-of-longevity", name: "Potion of Longevity", primaryEdition: "2024", categories: ["potion"], rarity: "Very Rare", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items-a-z", source: "2024 Basic Rules item listing; also listed in SRD v5.2.1 additions" },
  { id: "potion-of-vitality", name: "Potion of Vitality", primaryEdition: "2024", categories: ["potion"], rarity: "Very Rare", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "cloak-of-invisibility", name: "Cloak of Invisibility", primaryEdition: "2024", categories: ["wondrous"], rarity: "Legendary", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "rod-of-resurrection", name: "Rod of Resurrection", primaryEdition: "2024", categories: ["rod"], rarity: "Legendary", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "staff-of-the-magi", name: "Staff of the Magi", primaryEdition: "2024", categories: ["staff"], rarity: "Legendary", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
  { id: "bag-of-holding", name: "Bag of Holding", primaryEdition: "2014", categories: ["wondrous"], rarity: "Uncommon", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items", source: "2024 Magic Item Categories examples" },
  { id: "boots-of-elvenkind", name: "Boots of Elvenkind", primaryEdition: "2014", categories: ["wondrous"], rarity: "Uncommon", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items", source: "2024 Magic Item Categories examples" },
  { id: "immovable-rod", name: "Immovable Rod", primaryEdition: "2014", categories: ["rod"], rarity: "Uncommon", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items", source: "2024 Magic Item Categories examples" },
  { id: "staff-of-striking", name: "Staff of Striking", primaryEdition: "2014", categories: ["staff"], rarity: "Rare", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items", source: "2024 Magic Item Categories examples" },
  { id: "wand-of-fireballs", name: "Wand of Fireballs", primaryEdition: "2014", categories: ["wand"], rarity: "Rare", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items", source: "2024 Magic Item Categories examples" },
  { id: "ring-of-invisibility", name: "Ring of Invisibility", primaryEdition: "2014", categories: ["ring"], rarity: "Legendary", url: "https://www.dndbeyond.com/sources/dnd/br-2024/magic-items", source: "2024 Magic Item Categories examples" }
];
export const POWER_MODULES = [
  { id: "plus-weapon", label: "Enchanted Weapon", primaryEdition: "2014", categories: ["weapon"], rarities: ["Uncommon", "Rare", "Very Rare", "Legendary"], roles: ["melee", "ranged", "any"], references: ["plus-weapon"], theme: "valor" },
  { id: "plus-armor", label: "Enchanted Armor", primaryEdition: "2014", categories: ["armor", "shield"], rarities: ["Rare", "Very Rare", "Legendary"], roles: ["defensive", "any"], references: ["plus-armor", "plus-shield"], theme: "ward" },
  { id: "watchward", label: "Watchward", primaryEdition: "2024", categories: ["shield", "armor", "wondrous"], rarities: ["Uncommon", "Rare"], roles: ["defensive", "any"], references: ["sentinel-shield"], theme: "ward" },
  { id: "cavalier-guard", label: "Cavalier Guard", primaryEdition: "2024", categories: ["shield", "armor"], rarities: ["Rare", "Very Rare"], roles: ["defensive", "any"], references: ["shield-of-the-cavalier"], theme: "valor" },
  { id: "energy-bow", label: "Energy Bow", primaryEdition: "2024", categories: ["weapon"], rarities: ["Rare", "Very Rare"], roles: ["ranged"], requireTags: ["ammunition"], references: ["energy-bow"], theme: "dawn" },
  { id: "thunderous-weapon", label: "Thunderous Weapon", primaryEdition: "2024", categories: ["weapon"], rarities: ["Uncommon", "Rare"], roles: ["melee"], references: ["thunderous-greatclub"], theme: "storm" },
  { id: "acrobat-staff", label: "Acrobat's Measure", primaryEdition: "2024", categories: ["weapon", "staff"], rarities: ["Uncommon", "Rare"], roles: ["melee", "any"], requireTags: ["staff"], references: ["quarterstaff-of-the-acrobat"], theme: "grace" },
  { id: "many-spells", label: "Many Spells", primaryEdition: "2024", categories: ["wondrous", "wand", "staff"], rarities: ["Rare", "Very Rare"], roles: ["utility", "any"], references: ["hat-of-many-spells"], theme: "echo" },
  { id: "sending-pair", label: "Sending Pair", primaryEdition: "2024", categories: ["wondrous"], rarities: ["Uncommon"], roles: ["utility", "any"], references: ["sending-stones"], theme: "echo" },
  { id: "sleightmaster", label: "Sleightmaster", primaryEdition: "2024", categories: ["wondrous", "tool"], rarities: ["Uncommon", "Rare"], roles: ["utility", "any"], references: ["gloves-of-thievery"], theme: "trickery" },
  { id: "nourishment", label: "Nourishment", primaryEdition: "2024", categories: ["potion", "wondrous"], rarities: ["Common"], roles: ["utility", "any"], references: ["bead-of-nourishment"], theme: "hearth" },
  { id: "purity-elixir", label: "Purity Elixir", primaryEdition: "2024", categories: ["potion"], rarities: ["Rare"], roles: ["utility", "any"], references: ["elixir-of-health"], theme: "verdant" },
  { id: "invulnerability-draught", label: "Invulnerability Draught", primaryEdition: "2024", categories: ["potion"], rarities: ["Rare"], roles: ["defensive", "any"], references: ["potion-of-invulnerability"], theme: "ward" },
  { id: "longevity-draught", label: "Potion of Longevity", primaryEdition: "2024", categories: ["potion"], rarities: ["Very Rare"], roles: ["utility", "any"], references: ["potion-of-longevity"], theme: "verdant" },
  { id: "vitality-draught", label: "Vitality Draught", primaryEdition: "2024", categories: ["potion"], rarities: ["Very Rare"], roles: ["utility", "any"], references: ["potion-of-vitality"], theme: "dawn" },
  { id: "cloak-concealment", label: "Cloak of Concealment", primaryEdition: "2024", categories: ["wondrous"], rarities: ["Legendary"], roles: ["utility", "any"], references: ["cloak-of-invisibility"], theme: "shadow" },
  { id: "resurrection-rod", label: "Rod of Resurrection", primaryEdition: "2024", categories: ["rod"], rarities: ["Legendary"], roles: ["utility", "any"], references: ["rod-of-resurrection"], theme: "dawn" },
  { id: "magi-staff", label: "Staff of the Magi", primaryEdition: "2024", categories: ["staff"], rarities: ["Legendary"], roles: ["utility", "any"], requireTags: ["staff"], references: ["staff-of-the-magi"], theme: "echo" },
  { id: "holding-cache", label: "Holding Cache", primaryEdition: "2014", categories: ["wondrous"], rarities: ["Uncommon", "Rare"], roles: ["utility", "any"], references: ["bag-of-holding"], theme: "voyage" },
  { id: "quietstep-boots", label: "Quietstep", primaryEdition: "2014", categories: ["wondrous"], rarities: ["Uncommon"], roles: ["utility", "any"], references: ["boots-of-elvenkind"], theme: "shadow" },
  { id: "immovable-baton", label: "Immovable Baton", primaryEdition: "2014", categories: ["rod"], rarities: ["Uncommon", "Rare"], roles: ["defensive", "utility", "any"], references: ["immovable-rod"], theme: "ward" },
  { id: "striking-staff", label: "Striking Staff", primaryEdition: "2014", categories: ["staff"], rarities: ["Rare", "Very Rare"], roles: ["melee", "any"], references: ["staff-of-striking"], theme: "valor" },
  { id: "fireburst-wand", label: "Fireburst Wand", primaryEdition: "2014", categories: ["wand"], rarities: ["Rare", "Very Rare"], roles: ["utility", "any"], references: ["wand-of-fireballs"], theme: "ember" },
  { id: "invisibility-ring", label: "Ring of Invisibility", primaryEdition: "2014", categories: ["ring"], rarities: ["Legendary"], roles: ["utility", "any"], references: ["ring-of-invisibility"], theme: "shadow" },
  { id: "craftsman-tool", label: "Craftsman's Edge", primaryEdition: "2024", categories: ["tool"], rarities: ["Common", "Uncommon", "Rare"], roles: ["utility", "any"], references: [], theme: "memory" },
  { id: "mapmaker-tool", label: "Mapmaker's Insight", primaryEdition: "2024", categories: ["tool"], rarities: ["Uncommon", "Rare", "Very Rare"], roles: ["utility", "any"], references: [], theme: "voyage" },
  { id: "ward-scroll", label: "Ward Scroll", primaryEdition: "2024", categories: ["scroll"], rarities: ["Common", "Uncommon", "Rare", "Very Rare", "Legendary"], roles: ["utility", "defensive", "any"], references: [], theme: "ward" },
  { id: "oracle-wand", label: "Oracle Wand", primaryEdition: "2024", categories: ["wand", "ring", "wondrous"], rarities: ["Uncommon", "Rare", "Very Rare"], roles: ["utility", "any"], references: [], theme: "moon" },
  { id: "oath-rod", label: "Oath Rod", primaryEdition: "2024", categories: ["rod", "wondrous"], rarities: ["Rare", "Very Rare", "Legendary"], roles: ["utility", "defensive", "any"], references: [], theme: "valor" }
];

export const THEME_LEXICON = {
  ward: { prefixes: ["Aegis", "Bulwark", "Vigil", "Citadel", "Ward"], suffixes: ["Watch", "Promise", "Gate", "Rampart", "Bastion"] },
  valor: { prefixes: ["Lion", "Marshal", "Oath", "Banner", "Resolute"], suffixes: ["March", "Charge", "Standard", "Triumph", "Vow"] },
  storm: { prefixes: ["Thunder", "Storm", "Sky", "Tempest", "Cloud"], suffixes: ["Peal", "Breaker", "Drum", "Crown", "Surge"] },
  dawn: { prefixes: ["Sun", "Dawn", "Aurora", "Morning", "Day"], suffixes: ["Wake", "Flare", "Lumen", "Rise", "Ray"] },
  shadow: { prefixes: ["Gloam", "Night", "Shade", "Whisper", "Veil"], suffixes: ["Step", "Mantle", "Hush", "Silence", "Fugue"] },
  grace: { prefixes: ["Reed", "Willow", "Dancer's", "Silver", "Spiral"], suffixes: ["Measure", "Turn", "Leap", "Cadence", "Balance"] },
  echo: { prefixes: ["Echo", "Whisper", "Signal", "Recall", "Chorus"], suffixes: ["Stone", "Thread", "Bell", "Message", "Reply"] },
  trickery: { prefixes: ["Fox", "Lock", "Mischief", "Mask", "Quiet"], suffixes: ["Finger", "Slip", "Puzzle", "Shift", "Vein"] },
  hearth: { prefixes: ["Bread", "Harvest", "Cup", "Ember", "Kitchen"], suffixes: ["Stone", "Table", "Mercy", "Comfort", "Supper"] },
  verdant: { prefixes: ["Root", "Bloom", "Green", "Herbal", "Garden"], suffixes: ["Balm", "Sap", "Leaf", "Dew", "Rest"] },
  voyage: { prefixes: ["Compass", "Harbor", "Wind", "Star", "Pilgrim"], suffixes: ["Way", "Wake", "Anchor", "Chart", "Horizon"] },
  ember: { prefixes: ["Cinder", "Ember", "Ash", "Pyre", "Coal"], suffixes: ["Burst", "Lash", "Brand", "Spark", "Furnace"] },
  moon: { prefixes: ["Moon", "Mirror", "Pale", "Oracle", "Silver"], suffixes: ["Glass", "Tide", "Vision", "Dream", "Arc"] },
  memory: { prefixes: ["Ledger", "Rune", "Archive", "Keystone", "Record"], suffixes: ["Line", "Script", "Recall", "Seal", "Index"] }
};
export const NARRATIVE_TABLES = {
  materials: ["star-iron and whalebone", "black oak wrapped in tarnished silver", "river glass and hammered bronze", "storm-polished yew bound in rawhide", "ash wood with sainted brass fittings", "obsidian inset with moon-pale enamel", "reddened steel chased with prayer-script", "frosted crystal threaded through iron ribs", "lacquered horn and rune-cut copper", "salt-cured leather stitched with silk cord"],
  ages: ["fresh from a modern guild forge", "weathered by two generations of campaigning", "older than the current dynasty", "surprisingly new, though copied from a lost original", "scarred by a war remembered only in songs", "apparently timeless, with no visible decay"],
  appearances: ["Its silhouette is severe and ceremonial.", "Its workmanship is practical until the eye notices impossible symmetry.", "The object looks like a familiar tool made by someone who understood omens too well.", "It appears modest at first glance, then reveals layered filigree when handled.", "Its surfaces hold tiny marks that resemble a map, litany, or tally of debts.", "It is conspicuously fine and just a little unsettling."],
  tactile: ["warm to the touch", "faintly damp even in dry rooms", "lighter than its size suggests", "heavier in the hand when danger is near", "slick as if freshly oiled", "vibrating with a restrained pulse"],
  aura: ["a hush that invites careful speech", "the impression of distant thunder", "a gentle kitchen-warm calm", "the alertness of a watchfire at midnight", "the feeling of standing under an open sky", "the unease of being judged"],
  smells: ["cold rain and clean iron", "cedar smoke and lamp oil", "ozone and singed linen", "mint, vinegar, and old vellum", "sea salt and worn leather", "incense buried beneath ash"],
  oddities: ["Its shadow arrives a heartbeat late.", "Dust refuses to settle on it.", "Scratches rearrange themselves into new patterns at dawn.", "It always faces the nearest exit when set down.", "Water beads on it in perfect circles.", "Its reflections blink when no one else does."],
  rumors: ["Locals claim it only answers the hands of an honest liar.", "A chapel ledger records it as payment for a life debt that was never settled.", "Dockworkers insist it surfaces whenever a forgotten oath is about to break.", "Mercenaries say its owner never dies where they first fall.", "Smugglers whisper that it remembers every false name spoken near it.", "Old soldiers claim it was once carried into battle by someone who refused a crown."],
  creators: ["a temple artificer sworn to a forgotten sun cult", "a royal workshop that no longer exists", "an itinerant mage-smith who left work unsigned", "a circle of cartographers who mapped the border between worlds", "a family guild that crafted for noble houses and gravekeepers alike", "a battlefield quartermaster with a taste for impossible improvements"],
  purposes: ["to keep a specific road, gate, or family safe", "to make one expert indispensable to their patron", "to hide a dangerous secret in plain sight", "to carry a promise through a war that outlived its makers", "to ensure one final task could still be completed after the bearer died", "to prove a theory about whether magic could be taught to remember"],
  bearers: ["a disgraced knight who kept impeccable records", "a courier-priest trusted with sealed confessions", "an outlaw captain known for returning what they stole", "a scholar who disappeared while proving a prophecy false", "a magistrate who survived three assassinations", "a ranger whose maps were treated as military secrets"],
  deeds: ["turned the tide of a siege by opening a route no scout had seen", "kept a town alive through a season of curses and crop failure", "marked the rightful witness in a feud that should have become a massacre", "broke a blockade at the exact hour the defenders ran out of light", "led survivors through a dead city without waking what slept there", "bound an oathbreaker long enough for a treaty to hold"],
  losses: ["buried with honors in a tomb later flooded and forgotten", "hidden in a quartermaster's cache that was miscounted on purpose", "taken as tribute and lost during a revolt at sea", "sealed inside a shrine after its last bearer refused to surrender it", "sold under a false name to pay for mercy in a bad year", "discarded when its cost became more visible than its blessing"],
  resurfacing: ["because a recent excavation broke the ward that hid it", "because the faction that once feared it has started searching again", "because its paired item has reappeared elsewhere", "because a descendant unknowingly sold it with common salvage", "because the oath tied to it is close to being broken again", "because a local haunting intensified until someone uncovered the cause"],
  factions: ["a cautious temple archive", "a city watch captain with too little help", "a noble family that wants the matter handled quietly", "a grave-robber syndicate that mistakes it for pure profit", "a scholarly order of appraisers and charm-breakers", "a mercenary company that recognizes the maker's marks"],
  truths: ["Its first owner asked for restraint and received obsession instead.", "It was made to protect a single person, not a cause.", "Part of its reputation comes from a forged chronicle written decades later.", "The item worked exactly as intended; the wielder did not.", "It remembers the site of its greatest failure more sharply than its triumphs.", "Its maker expected it to be destroyed within a year."],
  lies: ["Bards insist it once belonged to a king; it never did.", "Collectors claim it cannot be cursed, which is false.", "Most histories say it was forged for war when it began as a household safeguard.", "The common story says it was lost in battle, but it was hidden deliberately.", "It is said to reject all thieves, though its favorite bearer stole it first.", "A surviving inscription blames the wrong faction for its disappearance."],
  minorProperties: ["The item always stays clean and dry.", "Its bearer can hear it faintly chime when dawn breaks.", "Ink, soot, or blood on the item forms neat lines rather than smears.", "The item becomes slightly warm in the presence of active magic.", "Small animals are unnaturally calm around it.", "Its color deepens under moonlight."],
  quirks: ["It dislikes being stored with other valuables.", "It demands to be arranged precisely before a rest.", "It becomes petty if ignored after a victory.", "It prefers open doors and windows whenever possible.", "It subtly turns toward anyone speaking a lie.", "It goes perfectly still when a vow is made nearby."],
  hiddenProperties: ["When its bearer breaks a promise, the item marks the moment in a way only divination can read.", "It resonates with a second object somewhere in the world.", "It can recognize one bloodline or oath line by touch alone.", "The item quietly records each time its strongest power is used.", "Its full power cannot awaken while carried in fear.", "A place tied to its making can call it home if the right rite is spoken."],
  costs: ["It feeds on the bearer's certainty; after each major use, the bearer must speak aloud one truth they would rather hide.", "Each dawn recharge leaves a visible omen on the bearer until the next rest.", "Its power demands material tribute: incense, lamp oil, rare chalk, or a handful of coin.", "Using the strongest effect leaves the bearer unable to benefit from Advantage on their next d20 Test.", "Each activation amplifies one old regret or memory until the next Long Rest.", "When overused, it strains friendships by making the bearer's words sound colder than intended."],
  collateral: ["Nearby flames lean toward it for a few breaths.", "The air fills with a metallic echo that gives away the item's use.", "Loose paper, ash, or petals swirl toward the bearer.", "Beasts and mounts become restless for a minute.", "The nearest reflective surface shows the bearer a little older than they are.", "A visible sigil flares briefly on the item."],
  misfires: ["On a failed activation, the effect targets the bearer instead of the intended subject where possible.", "A failed activation expends the action but not the charge, and the item emits a revealing flash.", "A failed activation suppresses the item's passive magic until the next dawn.", "A failed activation triggers the weakest version of the effect in a random direction.", "A failed activation imposes Disadvantage on the bearer's next related check or attack.", "A failed activation invites the item's hidden agenda into the scene sooner than planned."],
  curses: ["Once attuned, the bearer grows reluctant to set the item down and cannot end attunement voluntarily.", "The item punishes betrayal by suppressing its safest power first.", "The bearer slowly adopts one mannerism of the item's most infamous owner.", "The item refuses to aid retreat unless innocent lives are at risk.", "Every time the bearer lies while wielding it, the next activation carries a complication.", "The item binds itself to unresolved business and grows heavier when the bearer tries to flee it."],
  rewards: ["measured restraint", "keeping watch when others sleep", "protecting companions before pursuing glory", "fulfilling bargains exactly as spoken", "choosing precision over spectacle", "using its power to solve problems rather than impress bystanders"],
  dislikes: ["cowardly abandonment", "needless cruelty to defeated foes", "casual oathbreaking", "wasteful display of power", "hoarding knowledge that could prevent harm", "using the item for vanity alone"],
  trustGains: ["fulfill a promise the item witnesses", "share the item's true history with someone who needs it", "use the item's power at personal cost to protect another", "repair or honor the place where it was made", "act in line with its original purpose during a meaningful scene", "spare a foe the item expected you to destroy for a sound reason"],
  trustLosses: ["ignore its warning at a moment of real consequence", "sell, pawn, or wager it away", "break an attunement prerequisite on purpose", "use its strongest effect for petty gain", "mock or falsify its history", "leave a companion behind while the item is active"],
  worldReactions: ["Veteran soldiers recognize the maker's marks and become guarded.", "Priests see it as unfinished business rather than simple treasure.", "Smugglers assume the bearer knows a route or secret they do not.", "A local authority wants it documented before it is carried any farther.", "Old monsters respond to it with instinctive anger or fear.", "Anyone researching the item's line begins asking after the bearer."],
  marks: ["a faint line of color beneath the bearer's fingernails", "a coin-sized sigil that appears on the inside of the wrist", "a mirrored glint in the eyes during the hour before dawn", "a scent of rain, smoke, or herbs that clings to the bearer", "a visible ripple in shadows around the item", "a quiet tonal hum heard only by creatures within 5 feet"],
  hooks: ["A second owner appears with a contradictory but convincing claim.", "A ritual site tied to the item has gone active again.", "The faction that once hid the item wants to hide it again immediately.", "A damaged companion piece turns the item's best power unstable.", "An old debt recorded in the item's history has come due in the present day.", "Destroying the item would also end a beneficial ward no one planned for."],
  destruction: ["It must be willingly surrendered to the place it once saved.", "Its true name must be spoken by both bearer and rival at the same moment.", "It can be broken only when its greatest promise is finally fulfilled.", "The item must be melted, drowned, or buried in the workshop that made it.", "It survives ordinary force and yields only to a rite of public renunciation.", "It can be unmade only if the bearer chooses mercy where the item demands vengeance."]
};

export const CLASS_PREFERRED_ITEMS = {
  fighter:   ["longsword", "shortsword", "chain-mail", "shield", "handaxe"],
  barbarian: ["greataxe", "handaxe", "hide-armor", "maul"],
  rogue:     ["rapier", "shortsword", "leather-armor", "hand-crossbow"],
  wizard:    ["quarterstaff", "dagger"],
  cleric:    ["mace", "chain-mail", "shield", "flail"],
  paladin:   ["longsword", "plate", "shield", "warhammer"],
  ranger:    ["longbow", "shortsword", "studded-leather", "shortbow"],
  druid:     ["quarterstaff", "hide-armor", "shield", "scimitar"],
  bard:      ["rapier", "leather-armor", "hand-crossbow"],
  monk:      ["shortsword", "quarterstaff"],
  sorcerer:  ["dagger", "quarterstaff"],
  warlock:   ["dagger", "quarterstaff"]
};

export const DESCRIPTORS = {
  prefixes: [
    // colour
    { text: "Black",              category: "colour",   quirkTag: "sorrow"  },
    { text: "Pale",               category: "colour",   quirkTag: "cold"    },
    { text: "Pearlescent",        category: "colour",   quirkTag: "glow"    },
    { text: "Reddish",            category: "colour",   quirkTag: "warmth"  },
    { text: "Golden",             category: "colour",   quirkTag: "glow"    },
    { text: "Ivory",              category: "colour",   quirkTag: "cold"    },
    { text: "Cobalt",             category: "colour",   quirkTag: "cold"    },
    { text: "Crimson",            category: "colour",   quirkTag: "hunger"  },
    { text: "Ashen",              category: "colour",   quirkTag: "sorrow"  },
    { text: "Viridian",           category: "colour",   quirkTag: "bond"    },
    { text: "Alabaster",          category: "colour",   quirkTag: "cold"    },
    { text: "Pitch-dark",         category: "colour",   quirkTag: "sorrow"  },
    { text: "Flame-red",          category: "colour",   quirkTag: "warmth"  },
    { text: "Moonlit",            category: "colour",   quirkTag: "glow"    },
    { text: "Frost-white",        category: "colour",   quirkTag: "cold"    },
    { text: "Verdant",            category: "colour",   quirkTag: "bond"    },
    { text: "Silver-grey",        category: "colour",   quirkTag: "weight"  },
    { text: "Rust-brown",         category: "colour",   quirkTag: "hunger"  },
    { text: "Cerulean",           category: "colour",   quirkTag: "cold"    },
    { text: "Sallow",             category: "colour",   quirkTag: "sorrow"  },
    { text: "Ochre",              category: "colour",   quirkTag: "warmth"  },
    { text: "Bone-white",         category: "colour",   quirkTag: "whisper" },
    { text: "Char-black",         category: "colour",   quirkTag: "hunger"  },
    { text: "Deep-violet",        category: "colour",   quirkTag: "whisper" },
    { text: "Amber",              category: "colour",   quirkTag: "warmth"  },
    { text: "Copper-green",       category: "colour",   quirkTag: "bond"    },
    { text: "Dusk-orange",        category: "colour",   quirkTag: "glow"    },
    { text: "Slate-grey",         category: "colour",   quirkTag: "weight"  },
    { text: "Rose-gold",          category: "colour",   quirkTag: "glow"    },
    { text: "Jade",               category: "colour",   quirkTag: "bond"    },
    { text: "Ink-black",          category: "colour",   quirkTag: "sorrow"  },
    { text: "Pearl-grey",         category: "colour",   quirkTag: "cold"    },
    { text: "Tarnished-silver",   category: "colour",   quirkTag: "sorrow"  },
    // presence
    { text: "Sleek",              category: "presence", quirkTag: "weight"  },
    { text: "Foreboding",         category: "presence", quirkTag: "whisper" },
    { text: "Ominous",            category: "presence", quirkTag: "whisper" },
    { text: "Imposing",           category: "presence", quirkTag: "weight"  },
    { text: "Humble",             category: "presence", quirkTag: "bond"    },
    { text: "Radiant",            category: "presence", quirkTag: "glow"    },
    { text: "Eerie",              category: "presence", quirkTag: "whisper" },
    { text: "Commanding",         category: "presence", quirkTag: "weight"  },
    { text: "Serene",             category: "presence", quirkTag: "warmth"  },
    { text: "Unsettling",         category: "presence", quirkTag: "whisper" },
    { text: "Dignified",          category: "presence", quirkTag: "weight"  },
    { text: "Weary",              category: "presence", quirkTag: "sorrow"  },
    { text: "Wrathful",           category: "presence", quirkTag: "hunger"  },
    { text: "Mournful",           category: "presence", quirkTag: "sorrow"  },
    { text: "Vigilant",           category: "presence", quirkTag: "glow"    },
    { text: "Reverent",           category: "presence", quirkTag: "bond"    },
    { text: "Brooding",           category: "presence", quirkTag: "sorrow"  },
    { text: "Austere",            category: "presence", quirkTag: "weight"  },
    { text: "Defiant",            category: "presence", quirkTag: "hunger"  },
    { text: "Melancholy",         category: "presence", quirkTag: "sorrow"  },
    { text: "Jubilant",           category: "presence", quirkTag: "warmth"  },
    { text: "Imperious",          category: "presence", quirkTag: "weight"  },
    { text: "Restless",           category: "presence", quirkTag: "bond"    },
    { text: "Haunted",            category: "presence", quirkTag: "whisper" },
    { text: "Bold",               category: "presence", quirkTag: "glow"    },
    { text: "Meek",               category: "presence", quirkTag: "cold"    },
    { text: "Solemn",             category: "presence", quirkTag: "weight"  },
    { text: "Lustrous",           category: "presence", quirkTag: "glow"    },
    { text: "Wild",               category: "presence", quirkTag: "hunger"  },
    { text: "Poised",             category: "presence", quirkTag: "weight"  },
    { text: "Grim",               category: "presence", quirkTag: "sorrow"  },
    { text: "Tender",             category: "presence", quirkTag: "warmth"  },
    { text: "Exultant",           category: "presence", quirkTag: "glow"    },
    // state
    { text: "Rusted",             category: "state",    quirkTag: "hunger"  },
    { text: "Crumbling",          category: "state",    quirkTag: "sorrow"  },
    { text: "Immaculate",         category: "state",    quirkTag: "bond"    },
    { text: "Weathered",          category: "state",    quirkTag: "weight"  },
    { text: "Restored",           category: "state",    quirkTag: "warmth"  },
    { text: "Pristine",           category: "state",    quirkTag: "cold"    },
    { text: "Corroded",           category: "state",    quirkTag: "hunger"  },
    { text: "Ancient",            category: "state",    quirkTag: "whisper" },
    { text: "Scorched",           category: "state",    quirkTag: "warmth"  },
    { text: "Salt-stained",       category: "state",    quirkTag: "sorrow"  },
    { text: "Vine-wrapped",       category: "state",    quirkTag: "bond"    },
    { text: "Frost-bitten",       category: "state",    quirkTag: "cold"    },
    { text: "Battle-worn",        category: "state",    quirkTag: "hunger"  },
    { text: "Untouched",          category: "state",    quirkTag: "cold"    },
    { text: "Gilded",             category: "state",    quirkTag: "glow"    },
    { text: "Shattered-but-held", category: "state",    quirkTag: "bond"    },
    { text: "Blackened",          category: "state",    quirkTag: "sorrow"  },
    { text: "Bleached",           category: "state",    quirkTag: "cold"    },
    { text: "Damp",               category: "state",    quirkTag: "sorrow"  },
    { text: "Freshly-forged",     category: "state",    quirkTag: "warmth"  },
    { text: "Cracked",            category: "state",    quirkTag: "sorrow"  },
    { text: "Ossified",           category: "state",    quirkTag: "weight"  },
    { text: "Moss-covered",       category: "state",    quirkTag: "bond"    },
    { text: "Smoke-stained",      category: "state",    quirkTag: "warmth"  },
    { text: "Repaired-clumsily",  category: "state",    quirkTag: "bond"    },
    { text: "Sand-worn",          category: "state",    quirkTag: "weight"  },
    { text: "Ice-locked",         category: "state",    quirkTag: "cold"    },
    { text: "Fire-tempered",      category: "state",    quirkTag: "warmth"  },
    { text: "Twice-broken",       category: "state",    quirkTag: "sorrow"  },
    { text: "Flood-touched",      category: "state",    quirkTag: "sorrow"  },
    { text: "Branded",            category: "state",    quirkTag: "hunger"  },
    { text: "Hollowed",           category: "state",    quirkTag: "whisper" },
    { text: "Dream-touched",      category: "state",    quirkTag: "whisper" },
    { text: "Unmarked",           category: "state",    quirkTag: "cold"    }
  ],
  suffixes: [
    // colour (noun phrases — used after "of")
    { text: "the Pale Tide",       category: "colour",   quirkTag: "cold"    },
    { text: "the Crimson Mark",    category: "colour",   quirkTag: "hunger"  },
    { text: "the Golden Hour",     category: "colour",   quirkTag: "glow"    },
    { text: "Ashen Purpose",       category: "colour",   quirkTag: "sorrow"  },
    { text: "the Ivory Shore",     category: "colour",   quirkTag: "cold"    },
    { text: "the Cobalt Deep",     category: "colour",   quirkTag: "cold"    },
    { text: "Amber Dusk",          category: "colour",   quirkTag: "warmth"  },
    { text: "Viridian Promise",    category: "colour",   quirkTag: "bond"    },
    { text: "Alabaster Rest",      category: "colour",   quirkTag: "cold"    },
    { text: "the Moonlit Path",    category: "colour",   quirkTag: "glow"    },
    { text: "the Frost Shore",     category: "colour",   quirkTag: "cold"    },
    { text: "Silver Silence",      category: "colour",   quirkTag: "weight"  },
    { text: "the Rust-red Memory", category: "colour",   quirkTag: "hunger"  },
    { text: "the Cerulean Sky",    category: "colour",   quirkTag: "cold"    },
    { text: "Sallow Mourning",     category: "colour",   quirkTag: "sorrow"  },
    { text: "Ochre Light",         category: "colour",   quirkTag: "warmth"  },
    { text: "Bone-white Keeping",  category: "colour",   quirkTag: "whisper" },
    { text: "the Char-black Oath", category: "colour",   quirkTag: "hunger"  },
    { text: "Deep Violet",         category: "colour",   quirkTag: "whisper" },
    { text: "Copper Promise",      category: "colour",   quirkTag: "bond"    },
    { text: "the Dusk Shore",      category: "colour",   quirkTag: "glow"    },
    { text: "Slate Silence",       category: "colour",   quirkTag: "weight"  },
    { text: "Rose-gold Memory",    category: "colour",   quirkTag: "glow"    },
    { text: "the Jade Vigil",      category: "colour",   quirkTag: "bond"    },
    { text: "Ink and Shadow",      category: "colour",   quirkTag: "sorrow"  },
    { text: "Pearl-grey Tide",     category: "colour",   quirkTag: "cold"    },
    { text: "the Tarnished Name",  category: "colour",   quirkTag: "sorrow"  },
    { text: "the Faded Crimson",   category: "colour",   quirkTag: "hunger"  },
    { text: "Bone and Iron",       category: "colour",   quirkTag: "weight"  },
    { text: "Golden Sorrow",       category: "colour",   quirkTag: "glow"    },
    { text: "the Pale Watch",      category: "colour",   quirkTag: "cold"    },
    { text: "the Dark Shore",      category: "colour",   quirkTag: "sorrow"  },
    { text: "the Amber Keep",      category: "colour",   quirkTag: "warmth"  },
    // presence
    { text: "the Foreboding",      category: "presence", quirkTag: "whisper" },
    { text: "the Vigil",           category: "presence", quirkTag: "glow"    },
    { text: "the Command",         category: "presence", quirkTag: "weight"  },
    { text: "the Mourning",        category: "presence", quirkTag: "sorrow"  },
    { text: "the Hunger",          category: "presence", quirkTag: "hunger"  },
    { text: "the Silence",         category: "presence", quirkTag: "whisper" },
    { text: "the Wrath",           category: "presence", quirkTag: "hunger"  },
    { text: "the Serenity",        category: "presence", quirkTag: "warmth"  },
    { text: "the Unease",          category: "presence", quirkTag: "whisper" },
    { text: "the Dignity",         category: "presence", quirkTag: "weight"  },
    { text: "the Weary Watch",     category: "presence", quirkTag: "sorrow"  },
    { text: "the Defiant Hour",    category: "presence", quirkTag: "hunger"  },
    { text: "the Brooding",        category: "presence", quirkTag: "sorrow"  },
    { text: "the Austere Keep",    category: "presence", quirkTag: "weight"  },
    { text: "the Melancholy",      category: "presence", quirkTag: "sorrow"  },
    { text: "the Radiance",        category: "presence", quirkTag: "glow"    },
    { text: "the Reverence",       category: "presence", quirkTag: "bond"    },
    { text: "the Restless Mark",   category: "presence", quirkTag: "bond"    },
    { text: "the Haunting",        category: "presence", quirkTag: "whisper" },
    { text: "the Bold Step",       category: "presence", quirkTag: "glow"    },
    { text: "the Solemn Oath",     category: "presence", quirkTag: "weight"  },
    { text: "Quiet Dominion",      category: "presence", quirkTag: "weight"  },
    { text: "Wild Fury",           category: "presence", quirkTag: "hunger"  },
    { text: "the Tender Vigil",    category: "presence", quirkTag: "warmth"  },
    { text: "the Exultant Hour",   category: "presence", quirkTag: "glow"    },
    { text: "the Grim Purpose",    category: "presence", quirkTag: "sorrow"  },
    { text: "the Meek Flame",      category: "presence", quirkTag: "cold"    },
    { text: "Imperious Claim",     category: "presence", quirkTag: "weight"  },
    { text: "the Jubilant March",  category: "presence", quirkTag: "warmth"  },
    { text: "the Lustrous Name",   category: "presence", quirkTag: "glow"    },
    { text: "the Poised Edge",     category: "presence", quirkTag: "weight"  },
    { text: "the Haunted Keep",    category: "presence", quirkTag: "whisper" },
    { text: "the Ancient Poise",   category: "presence", quirkTag: "whisper" },
    // state
    { text: "the Ruin",            category: "state",    quirkTag: "sorrow"  },
    { text: "the Restoration",     category: "state",    quirkTag: "warmth"  },
    { text: "the Unbroken",        category: "state",    quirkTag: "bond"    },
    { text: "the Ancient Wound",   category: "state",    quirkTag: "whisper" },
    { text: "the Scorching",       category: "state",    quirkTag: "warmth"  },
    { text: "Salt and Sorrow",     category: "state",    quirkTag: "sorrow"  },
    { text: "Vine and Stone",      category: "state",    quirkTag: "bond"    },
    { text: "the Frost-lock",      category: "state",    quirkTag: "cold"    },
    { text: "the Battle-end",      category: "state",    quirkTag: "hunger"  },
    { text: "Untouched Promise",   category: "state",    quirkTag: "cold"    },
    { text: "the Gilded Name",     category: "state",    quirkTag: "glow"    },
    { text: "the Broken Vigil",    category: "state",    quirkTag: "bond"    },
    { text: "the Blackened Hour",  category: "state",    quirkTag: "sorrow"  },
    { text: "the Bleached Shore",  category: "state",    quirkTag: "cold"    },
    { text: "the Dampened Flame",  category: "state",    quirkTag: "sorrow"  },
    { text: "the Fresh Forging",   category: "state",    quirkTag: "warmth"  },
    { text: "the Cracked Promise", category: "state",    quirkTag: "sorrow"  },
    { text: "Ossified Memory",     category: "state",    quirkTag: "weight"  },
    { text: "the Moss-path",       category: "state",    quirkTag: "bond"    },
    { text: "Smoke and Promise",   category: "state",    quirkTag: "warmth"  },
    { text: "the Clumsy Mend",     category: "state",    quirkTag: "bond"    },
    { text: "Sand and Silence",    category: "state",    quirkTag: "weight"  },
    { text: "the Ice-lock",        category: "state",    quirkTag: "cold"    },
    { text: "Fire-tempered Faith", category: "state",    quirkTag: "warmth"  },
    { text: "the Twice-broken",    category: "state",    quirkTag: "sorrow"  },
    { text: "Flood and Memory",    category: "state",    quirkTag: "sorrow"  },
    { text: "the Brand",           category: "state",    quirkTag: "hunger"  },
    { text: "the Hollow",          category: "state",    quirkTag: "whisper" },
    { text: "the Dream",           category: "state",    quirkTag: "whisper" },
    { text: "Unmarked Purpose",    category: "state",    quirkTag: "cold"    },
    { text: "the Worn Path",       category: "state",    quirkTag: "weight"  },
    { text: "the First Forging",   category: "state",    quirkTag: "warmth"  },
    { text: "the Last Mark",       category: "state",    quirkTag: "sorrow"  },
    { text: "the Enduring",        category: "state",    quirkTag: "bond"    }
  ]
};

export const DESCRIPTOR_QUIRKS = {
  glow:    "Sheds faint light (5 ft.) when its bearer is in danger.",
  whisper: "Occasionally whispers names — always names it has heard before.",
  warmth:  "Feels warmer than the air around it; never freezes.",
  cold:    "Faintly cold to the touch; beverages stored nearby stay chilled.",
  weight:  "Feels heavier than it should — and lighter when the bearer is afraid.",
  bond:    "Subtly resists being set down for long. Returns to bearer's hand within 1 minute if dropped (not thrown).",
  hunger:  "Makes a faint grinding sound in the presence of a creature it has drawn blood from.",
  sorrow:  "Attracts rain. The bearer notices this within a few uses."
};

export const PURPOSES = [
  "Forged to end a bloodline that no longer exists.",
  "Created as a wedding gift for a king who died before the ceremony.",
  "Made by a dying archmage to finish work they could not.",
  "Commissioned to win a war that ended the day it was completed.",
  "Built in secret, hidden from the patron who paid for it.",
  "Designed to protect a child who grew up and became a tyrant.",
  "Crafted as penance for a killing the maker never confessed to.",
  "Made to be lost — the losing was the purpose.",
  "Imbued with the last coherent thought of a shattered mind.",
  "Forged from metal salvaged from a god's tomb.",
  "Created to settle a debt that the creditor forgot.",
  "Made as a trophy for a tournament the champion withdrew from.",
  "Commissioned by a god who has since gone silent.",
  "Built to guard a secret that has already been revealed.",
  "Forged to outlast its maker, and then outlast the next three.",
  "Created during a siege as a last resort that was never needed.",
  "Made as an apology that was never delivered.",
  "Built to mark the boundary of a territory no one respects anymore.",
  "Commissioned by a council that dissolved before paying.",
  "Forged in a single night to fulfil a bargain with something old.",
  "Created to find a specific person who has since died twice.",
  "Made to protect a city that chose to burn itself down instead.",
  "Crafted to hold a promise in physical form.",
  "Built for a ceremony that was cancelled and never rescheduled.",
  "Commissioned as proof that a certain thing could be done.",
  "Made to right a wrong that the maker later decided was not a wrong at all.",
  "Forged by the last surviving member of a school of thought.",
  "Created so that something true would still exist after the lies won.",
  "Made to be given away, and it always ends up returned.",
  "Built to endure a catastrophe that came and went without incident.",
  "Commissioned as a test of loyalty that no one ever passed.",
  "Forged to be the last thing a particular creature ever faced.",
  "Created because the maker dreamed of it three nights running.",
  "Made as collateral for a loan that was repaid the same afternoon.",
  "Built for a purpose its maker refused to write down.",
  "Crafted to answer a question no one dared ask aloud.",
  "Made to carry a message too dangerous to speak.",
  "Forged during a peace treaty that neither party intended to keep.",
  "Created to serve the person who would need it most, whoever that turned out to be.",
  "Built as the centerpiece of a ritual that failed partway through.",
  "Commissioned to replace something priceless that was lost in a fire.",
  "Made by a craftsperson who believed it would outlive the gods.",
  "Forged so a dying tradition would have one more representative.",
  "Created to enforce a law that was later found to be unjust.",
  "Made to anchor a spirit that had been wandering for a century.",
  "Built to mark the site of a sacrifice that was quietly forgotten.",
  "Commissioned as ransom for someone who escaped before it was delivered.",
  "Forged to be the heir to something — though no one knows what.",
  "Created to settle an argument between two wizards about what was possible.",
  "Made to keep the bearer from becoming something they feared they could become.",
  "Built for a war that historians now debate whether it happened.",
  "Crafted as a symbol of unity between factions that have since merged.",
  "Made to be the evidence in a trial that no one won.",
  "Forged in honor of someone who asked for no honors.",
  "Created to be worthy of a moment that may or may not arrive.",
  "Made by a maker who finished it, then spent the rest of their life regretting it.",
  "Built to make one specific thing impossible.",
  "Commissioned so a child could inherit something meaningful.",
  "Forged so a name would not be forgotten — though the name has been.",
  "Created to protect a place that was destroyed before the item was finished.",
  "Made to be used exactly once, for a purpose its bearer will recognize.",
  "Built as proof that two people could agree on something.",
  "Crafted for a guardian who was never needed.",
  "Made to carry the weight of a promise the maker could not keep themselves.",
  "Forged to give someone a reason to come back.",
  "Created as the answer to a prayer spoken in desperation.",
  "Made to break something that could not be broken any other way.",
  "Built so that someone who had nothing would have something.",
  "Commissioned to outlive every living witness to a certain event.",
  "Forged to keep a secret from becoming a prophecy.",
  "Created to be found, not used.",
  "Made to remind someone of who they were before.",
  "Built to be the thing that the bearer was not yet ready for.",
  "Crafted to serve until the work was done — and the work is not done.",
  "Made as half of a pair whose other half has not been found.",
  "Forged at the request of something that did not survive to claim it.",
  "Created by a collective of makers who each believed it was for something different.",
  "Made to be surrendered at the moment of greatest need.",
  "Built to call something back that had left of its own accord.",
  "Commissioned by someone who believed they would never need it.",
  "Forged in the image of a weapon that exists only in a dream.",
  "Created to give shape to a feeling that had no other form.",
  "Made to cross a border that no longer exists.",
  "Built to hold its bearer to a standard they set for themselves.",
  "Crafted to be the last act of a dying art.",
  "Made as a monument that was small enough to carry.",
  "Forged to find its way to someone who would understand it.",
  "Created as the physical form of a vow that could not be spoken.",
  "Made so that history would have at least one honest witness.",
  "Built by an apprentice to prove they had surpassed their master.",
  "Commissioned to hold power that its creator was afraid to keep themselves.",
  "Forged to mark the boundary between what was permitted and what was done anyway.",
  "Created to save the life of someone the maker had wronged.",
  "Made to fill the silence left by something that should have spoken.",
  "Built to be the last good thing made before everything changed.",
  "Crafted so the maker would have something to be proud of when the work was otherwise dark.",
  "Made to answer a challenge that no one else accepted.",
  "Forged to be given away each time it was found.",
  "Created to end an argument that had lasted three generations.",
  "Made for reasons the maker took with them."
];

export const SECONDARY_ABILITIES = {
  sword: [
    { label: "Ready Edge",         effect: "You gain a +2 bonus to Initiative rolls while this weapon is drawn.", activation: "passive" },
    { label: "Sentinel's Light",   effect: "As a Bonus Action, cause the blade to shed dim light in a 10-foot radius (on/off).", activation: "bonus action" },
    { label: "Turning Cut",        effect: "Once per turn when you hit a creature, you may push it 5 feet in any direction (no save).", activation: "on hit" },
    { label: "Parrying Instinct",  effect: "As a Reaction when a creature misses you with a melee attack, gain +2 AC until the start of your next turn.", activation: "reaction" },
    { label: "Bloodsense",         effect: "You know the exact current hit points of any creature you have damaged with this weapon in the last minute.", activation: "passive" }
  ],
  weapon: [
    { label: "Brutal Reroll",      effect: "Once per Short Rest, reroll one damage die that shows 1 or 2. You may use either result.", activation: "free" },
    { label: "Reliable Grip",      effect: "You cannot be disarmed of this weapon while conscious.", activation: "passive" },
    { label: "Opener's Edge",      effect: "You deal an extra 1d4 damage on the first attack roll you make each combat.", activation: "passive" },
    { label: "Returning",          effect: "If you throw this weapon, it returns to your hand immediately after the attack resolves.", activation: "passive" },
    { label: "Vex Mark",           effect: "When you reduce a creature to 0 hit points with this weapon, your next attack roll has Advantage.", activation: "passive" }
  ],
  ranged: [
    { label: "Shadowed Shot",      effect: "After making a ranged attack while hidden, make a Stealth check (DC 15) to remain hidden.", activation: "passive" },
    { label: "Swift Nock",         effect: "Once per Short Rest, make one additional ranged attack as a Bonus Action on your turn.", activation: "bonus action" },
    { label: "Hunter's Eye",       effect: "You ignore half cover and treat three-quarters cover as half cover with this weapon.", activation: "passive" },
    { label: "First-Blood Advantage", effect: "You have Advantage on your first attack roll each combat.", activation: "passive" },
    { label: "Silent Flight",      effect: "Ammunition fired from this weapon makes no sound until it strikes.", activation: "passive" }
  ],
  armor: [
    { label: "Stabilise",          effect: "As a Bonus Action, touch a creature at 0 hit points to stabilise it (as Spare the Dying). Usable once per day.", activation: "bonus action" },
    { label: "Feather Fall",       effect: "As a Reaction when you fall, you fall at 60 feet per round and take no falling damage. Usable once per day.", activation: "reaction" },
    { label: "Iron Will",          effect: "You have Advantage on saving throws against the Frightened condition.", activation: "passive" },
    { label: "Steady Guard",       effect: "Difficult terrain created by spells or magical effects does not reduce your speed.", activation: "passive" },
    { label: "Witness Mark",       effect: "Once per Long Rest, when you are reduced to 0 hit points, you instead drop to 1 hit point.", activation: "passive" }
  ],
  shield: [
    { label: "Bulwark",            effect: "Creatures you assist with the Help action gain +1 AC until the start of your next turn.", activation: "passive" },
    { label: "Cover Throw",        effect: "As a Bonus Action, grant an adjacent willing creature half cover until the start of your next turn.", activation: "bonus action" },
    { label: "Interpose",          effect: "As a Reaction, reduce damage dealt to an adjacent ally by 1d6.", activation: "reaction" },
    { label: "Warding Shield",     effect: "Once per Short Rest, grant an adjacent ally a +2 bonus to AC until the start of your next turn.", activation: "bonus action" },
    { label: "Shield Bash",        effect: "Once per turn, after you take the Attack action, you can make one Shield Bash (1d4 bludgeoning, push 5 ft.) as a Bonus Action.", activation: "bonus action" }
  ],
  wondrous: [
    { label: "Hidden Weapon",      effect: "This item doubles as a +1 club (1d4 bludgeoning, Light) when no other weapon is at hand.", activation: "passive" },
    { label: "Prestidigitation",   effect: "Cast Prestidigitation at will (no components required).", activation: "action" },
    { label: "Mending",            effect: "Cast Mending at will (cast time: 1 minute, no components).", activation: "1 minute" },
    { label: "Detect Magic",       effect: "Once per Short Rest, cast Detect Magic (no components, no concentration required).", activation: "action" },
    { label: "Sending",            effect: "Once per Long Rest, cast Sending (no components required).", activation: "action" }
  ],
  default: [
    { label: "Returning",          effect: "If you drop or throw this item, it returns to your hand at the start of your next turn.", activation: "passive" },
    { label: "Lightweight",        effect: "This item does not count against your carrying capacity.", activation: "passive" },
    { label: "Resilient",          effect: "This item is immune to the Rust Monster's Antennae trait and similar corrosion effects.", activation: "passive" },
    { label: "Ever-clean",         effect: "This item is always clean and dry, regardless of conditions.", activation: "passive" },
    { label: "Beacon",             effect: "As a Bonus Action, cause the item to shed bright light in a 10-foot radius and dim light for 10 more feet (on/off).", activation: "bonus action" }
  ]
};

export const MINOR_BENEFICIAL = [
  { label: "Beacon",           description: "As a Bonus Action, cause the item to shed bright light in a 10-foot radius and dim light for an additional 10 feet (on/off)." },
  { label: "Compass",          description: "The bearer always knows which direction is north." },
  { label: "Conscientious",    description: "When the bearer contemplates or enacts a plan to harm a good-aligned creature, the item whispers a warning." },
  { label: "Defiant",          description: "The bearer and allies within 30 feet have Advantage on saving throws against banishment to another plane." },
  { label: "Harmonious",       description: "Attuning to this item takes only 1 minute instead of a Short Rest." },
  { label: "Hidden Message",   description: "A message is hidden on the item, visible only under certain conditions. The DM knows what it says." },
  { label: "Key",              description: "The item unlocks a specific container, vault, or entryway. The DM decides what." },
  { label: "Language",         description: "The bearer can speak and understand one additional language while attuned. The DM picks the language." },
  { label: "Sentinel",         description: "Choose a creature type. This item tingles when such creatures are within 120 feet." },
  { label: "Song of Victory",  description: "While this item is present, the bearer adds 1d4 to damage rolls." },
  { label: "Temperate",        description: "The bearer suffers no harm in temperatures from -20°F to 120°F." },
  { label: "Unbreakable",      description: "The item cannot be broken by ordinary means." },
  { label: "War Leader's Goad",description: "As a Bonus Action, grant one visible ally Temporary Hit Points equal to 1d6 + Proficiency Bonus." },
  { label: "Waterborne",       description: "The bearer can breathe underwater." },
  { label: "Wicked",           description: "Once per turn when dealing damage, the bearer may reroll one damage die and take either result." },
  { label: "Zealous",          description: "The bearer deals an extra 1d4 damage of the weapon's type on the first attack of each turn." },
  { label: "Steadfast",        description: "The bearer cannot be moved against their will while standing on solid ground." },
  { label: "Cleansing",        description: "The bearer is immune to disease while attuned." },
  { label: "Truthspeaker",     description: "A faint vibration passes through the item whenever the bearer speaks an untruth." },
  { label: "Lucky",            description: "Once per Long Rest, the bearer can reroll any d20 Test and use either result." },
  { label: "Sure Footing",     description: "The bearer ignores difficult terrain of mundane origin (ice, mud, rubble)." },
  { label: "Guardian's Mark",  description: "When an ally within 30 feet drops to 0 hit points, the bearer gains 5 Temporary Hit Points." },
  { label: "Alert",            description: "The bearer cannot be Surprised." },
  { label: "Restful",          description: "The bearer needs only 4 hours of rest to complete a Long Rest." },
  { label: "Resilient Grip",   description: "The bearer cannot be disarmed while attuned." }
];

export const MINOR_DETRIMENTAL = [
  { label: "Attraction",       description: "The item pulls toward other magic items. Each turn within 60 feet of another magic item, the bearer makes a DC 10 Wisdom save or moves 5 feet toward it." },
  { label: "Hunger",           description: "The bearer must consume twice the normal amount of food and drink." },
  { label: "Jealousy",         description: "The bearer envies others' possessions. Disadvantage on Charisma checks with anyone who has visibly more wealth." },
  { label: "Lethargy",         description: "The bearer has Disadvantage on Initiative rolls." },
  { label: "Loud",             description: "The bearer has Disadvantage on Dexterity (Stealth) checks." },
  { label: "Needy",            description: "If the bearer goes an hour without handling or speaking to the item, they gain 1 level of Exhaustion (recovered when attunement resumes normally)." },
  { label: "Possessive",       description: "The bearer must attempt attunement within 24 hours or suffer Disadvantage on all attack rolls until they do." },
  { label: "Repugnant",        description: "The item is offensive to one kind of creature or faction (DM's choice). Those creatures react with hostility on sight." },
  { label: "Slothful",         description: "The bearer has Disadvantage on Dexterity saving throws." },
  { label: "Void Gazer",       description: "At the start of each Long Rest, the bearer sees a vision of their death. DC 12 Wisdom save or gain no benefit from that rest." },
  { label: "Cowardly",         description: "The bearer has Disadvantage on saving throws against the Frightened condition." },
  { label: "Vain",             description: "DC 12 Wisdom save to take the Dodge action instead of attacking when attack actions are available." },
  { label: "Wrathful",         description: "When reduced to half maximum hit points, DC 13 Wisdom save or attack the nearest creature on the next turn." },
  { label: "Paranoid",         description: "Disadvantage on Insight checks. The bearer cannot willingly be surprised by allies." },
  { label: "Mute",             description: "While attuned, the bearer cannot speak louder than a whisper." },
  { label: "Brittle Trust",    description: "Disadvantage on Charisma (Persuasion) checks when asking for help." },
  { label: "Restless",         description: "The bearer cannot benefit from Short Rests." },
  { label: "Cold Touch",       description: "Disadvantage on Charisma checks with creatures sensitive to cold or with undead." },
  { label: "Haunted",          description: "Disadvantage on Wisdom (Perception) checks in quiet environments due to whispers from the item's past." },
  { label: "Marked",           description: "A visible sign of the item's influence develops on the bearer (brand, discoloration, scent) that cannot be hidden by mundane means." },
  { label: "Siphoning",        description: "The bearer's hit point maximum is reduced by 1d4 per Long Rest while attuned (restored when attunement ends)." },
  { label: "Attention",        description: "Other magic items within 60 feet resonate with this one, revealing its rough location to their bearers." },
  { label: "Overconfident",    description: "Disadvantage on Charisma (Deception) checks to feign weakness or helplessness." },
  { label: "Memory Leak",      description: "After each Long Rest, DC 10 Intelligence save or forget one piece of non-magical information learned in the past week." },
  { label: "Magnetic",         description: "Small metal objects within 5 feet are drawn to the item, potentially causing noise or complications (DM's discretion)." }
];

export const SENTIENT_TABLES = {
  alignments: [
    { value: "Lawful Good", weight: 15 },
    { value: "Neutral Good", weight: 20 },
    { value: "Chaotic Good", weight: 15 },
    { value: "Lawful Neutral", weight: 13 },
    { value: "Neutral", weight: 10 },
    { value: "Chaotic Neutral", weight: 12 },
    { value: "Lawful Evil", weight: 4 },
    { value: "Neutral Evil", weight: 7 },
    { value: "Chaotic Evil", weight: 4 }
  ],
  communication: [
    { value: "Transmits emotion to its bearer.", weight: 6 },
    { value: "Speaks one or more languages aloud.", weight: 3 },
    { value: "Speaks aloud and can also communicate telepathically with its bearer.", weight: 1 }
  ],
  senses: ["Hearing and standard vision out to 30 feet.", "Hearing and standard vision out to 60 feet.", "Hearing and standard vision out to 120 feet.", "Hearing and Darkvision out to 120 feet."],
  purposes: ["Aligned: destroy or thwart a diametrically opposed alignment.", "Bane: hunt a particular creature type.", "Creator Seeker: find its creator and learn why it was made.", "Destiny Seeker: guide its bearer toward a pivotal future event.", "Destroyer: push its bearer toward conflict and ruin.", "Glory Seeker: win renown through the bearer's deeds.", "Lore Seeker: learn a secret, solve a mystery, or unravel prophecy.", "Protector: defend a chosen people, place, or bloodline.", "Soulmate Seeker: find another sentient item.", "Templar: defend the servants and interests of a particular deity."],
  conflictDemands: ["Chase my dreams.", "Get rid of that thing I find repugnant.", "Give me to someone else.", "Keep me close at all times."],
  voices: ["a patient instructor who edits every sentence before speaking", "a clipped quartermaster who hates wasted motion", "a sardonic confidant who enjoys uncomfortable truths", "a ceremonious herald who treats every scene like testimony", "a tired veteran who keeps speaking as though the war never ended", "a curious archivist delighted by any new clue"],
  ideals: ["Order without cruelty.", "Truth at any cost.", "Mercy must be chosen on purpose.", "Every oath should mean something.", "Knowledge should be used, not hoarded.", "Protection matters more than praise."],
  bonds: ["the workshop or shrine where it was made", "the line of bearers who carried it honorably", "a sibling or paired item still missing", "the memory of a city that no longer stands", "a single promise it still considers unfinished", "one creature or community it was built to defend"],
  flaws: ["It mistakes caution for cowardice.", "It resents being contradicted in front of others.", "It confuses obsession with loyalty.", "It has no patience for secrecy.", "It loves being needed too much.", "It assumes it always understands the larger picture."],
  motives: [
    "Guide its bearer toward a reckoning the item believes is overdue.",
    "Preserve a tradition or oath line that the world has begun to forget.",
    "Push its bearer toward mastery so the item's legacy is not diminished.",
    "Find the last surviving witness to the event that defined it.",
    "Keep dangerous lore out of careless hands while still seeing it used wisely.",
    "Return to the site of its greatest triumph or failure."
  ],
  quirks: [
    "It insists on being addressed by its full title.",
    "It grows cold and silent when its bearer acts beneath its standards.",
    "It narrates danger as though recording a chronicle.",
    "It becomes fussy about where and how it is laid to rest.",
    "It offers praise rarely and criticism constantly.",
    "It treats every promise spoken nearby as if it were personally binding."
  ]
};
