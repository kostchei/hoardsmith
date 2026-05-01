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
    simpleBase("signet-ring", "Signet Ring", "ring", "ring", "A signet band engraved with a forgotten crest.", ["wearable"]),
    simpleBase("stone-band", "Stone Band", "ring", "ring", "A polished stone ring streaked with metallic veins.", ["wearable"]),
    simpleBase("silver-loop", "Silver Loop", "ring", "ring", "A plain silver loop sized for a finger or talon.", ["wearable"])
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
  { id: "sending-stones", name: "Sending Stones", primaryEdition: "2024", categories: ["wondrous", "ring"], rarity: "Uncommon", url: "https://www.dndbeyond.com/srd", source: "SRD v5.2.1 added item" },
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
  { id: "many-spells", label: "Many Spells", primaryEdition: "2024", categories: ["wondrous", "wand", "staff", "ring"], rarities: ["Rare", "Very Rare"], roles: ["utility", "any"], references: ["hat-of-many-spells"], theme: "echo" },
  { id: "sending-pair", label: "Sending Pair", primaryEdition: "2024", categories: ["wondrous", "ring"], rarities: ["Uncommon"], roles: ["utility", "any"], references: ["sending-stones"], theme: "echo" },
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
