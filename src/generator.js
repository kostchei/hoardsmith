import {
  BASE_ITEMS,
  CLASS_PREFERRED_ITEMS,
  DESCRIPTOR_QUIRKS,
  DESCRIPTORS,
  ITEM_FAMILY_OPTIONS,
  ITEM_FAMILY_RULES,
  MAGIC_CATEGORY_RULES,
  MINOR_BENEFICIAL,
  MINOR_DETRIMENTAL,
  MODEL_RECOMMENDATIONS,
  NARRATIVE_TABLES,
  POWER_MODULES,
  PURPOSES,
  RARITY_RULES,
  REFERENCE_ITEMS,
  SECONDARY_ABILITIES,
  SENTIENT_TABLES,
  SOURCES,
  THEME_LEXICON
} from "./data.js";

const rarities = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Artifact"];

const rarityWeights = {
  Common: 20,
  Uncommon: 34,
  Rare: 24,
  "Very Rare": 12,
  Legendary: 8,
  Artifact: 2
};

const sentienceChance = {
  Common: 0,
  Uncommon: 0.08,
  Rare: 0.16,
  "Very Rare": 0.28,
  Legendary: 0.42,
  Artifact: 0.66
};

const curseChance = {
  Common: 0.05,
  Uncommon: 0.14,
  Rare: 0.2,
  "Very Rare": 0.26,
  Legendary: 0.35,
  Artifact: 0.45
};

const spellThemes = {
  Common: ["guidance", "alarm", "healing word", "shield of faith"],
  Uncommon: ["misty step", "knock", "lesser restoration", "mirror image"],
  Rare: ["dispel magic", "fly", "fireball", "revivify"],
  "Very Rare": ["greater invisibility", "dimension door", "wall of force", "heal"],
  Legendary: ["teleport", "sunburst", "mass suggestion", "true seeing"],
  Artifact: ["wish", "foresight", "gate", "mass heal"]
};

const attunementPrerequisites = [
  "a creature proficient with the item's mundane chassis",
  "a spellcaster",
  "a creature of good standing with the item's maker tradition",
  "a creature that has kept a public oath",
  "a creature proficient in Arcana",
  "a creature that has carried the item through one long rest"
];

function hashSeed(input) {
  let hash = 2166136261;
  const text = String(input);
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed) {
  let state = hashSeed(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function pick(rng, list) {
  return list[Math.floor(rng() * list.length)];
}

function weightedPick(rng, list) {
  const total = list.reduce((sum, item) => sum + item.weight, 0);
  let roll = rng() * total;
  for (const item of list) {
    roll -= item.weight;
    if (roll <= 0) {
      return item.value;
    }
  }
  return list[list.length - 1].value;
}

function chance(rng, value) {
  return rng() < value;
}

function titleCase(input) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseCost(cost) {
  if (!cost) {
    return 0;
  }
  const [rawValue, unit] = cost.split(" ");
  const numeric = Number(rawValue.replace(",", ""));
  if (Number.isNaN(numeric)) {
    return 0;
  }
  if (unit === "SP") {
    return numeric / 10;
  }
  if (unit === "CP") {
    return numeric / 100;
  }
  return numeric;
}

function formatGp(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "Priceless";
  }
  if (value < 1) {
    return `${Math.round(value * 100)} CP`;
  }
  return `${value.toLocaleString("en-US")} GP`;
}

function getBaseItemsForCategory(category) {
  return BASE_ITEMS[category] || [];
}

function getReferenceItemById(referenceId) {
  return REFERENCE_ITEMS.find((item) => item.id === referenceId) || null;
}

function getModuleById(moduleId) {
  return POWER_MODULES.find((module) => module.id === moduleId) || null;
}

function getReferenceBackedModuleOptions(category, rarity, editionPreference = "2024") {
  return POWER_MODULES.filter((module) => {
    if (!module.references?.length) {
      return false;
    }
    if (category && category !== "random" && !module.categories.includes(category)) {
      return false;
    }
    if (rarity && rarity !== "random" && !module.rarities.includes(rarity)) {
      return false;
    }
    return moduleMatchesEdition(module, editionPreference);
  })
    .map((module) => {
      const reference = getReferenceItemById(module.references[0]);
      if (!reference) {
        return null;
      }
      return {
        id: `reference:${module.id}`,
        name: reference.name,
        source: reference.source,
        rarity: reference.rarity,
        referenceId: reference.id,
        moduleId: module.id,
        categories: module.categories
      };
    })
    .filter(Boolean);
}

function deriveMagicCategory(baseCategory) {
  return MAGIC_CATEGORY_RULES[baseCategory] ? baseCategory : "wondrous";
}

function resolveRarity(rng, requested, itemNature) {
  if (itemNature === "mundane") {
    return "Mundane";
  }
  if (requested && requested !== "auto" && requested !== "random") {
    return requested;
  }
  const weighted = rarities.map((value) => ({ value, weight: rarityWeights[value] }));
  return weightedPick(rng, weighted);
}

function resolveItemNature(rng, requested) {
  if (requested === "auto") {
    return chance(rng, 0.82) ? "magic" : "mundane";
  }
  return requested;
}

function resolveBaseCategory(options, rng) {
  const familyRule = ITEM_FAMILY_RULES[options.itemFamily] || ITEM_FAMILY_RULES.standard;
  const allowedCategories = familyRule.categories.filter((category) => getBaseItemsForCategory(category).length);
  if (!options.baseCategory || options.baseCategory === "random") {
    return pick(rng, allowedCategories);
  }
  if (allowedCategories.includes(options.baseCategory)) {
    return options.baseCategory;
  }
  return allowedCategories[0] || "wondrous";
}

function resolveBaseItem(options, rng, itemNature) {
  const baseCategory = resolveBaseCategory(options, rng);
  const list = getBaseItemsForCategory(baseCategory);
  const selectedReferenceModule =
    itemNature === "magic" && options.baseItemId?.startsWith("reference:") ? getModuleById(options.baseItemId.replace("reference:", "")) : null;
  const filtered =
    options.armamentRole === "any"
      ? list
      : list.filter((item) => item.armament === options.armamentRole || item.tags?.includes(options.armamentRole));

  if (selectedReferenceModule) {
    const fallback =
      list.find((item) => selectedReferenceModule.requireTags?.every((tag) => item.tags?.includes(tag))) ||
      filtered[0] ||
      list[0];
    const referenceItem = getReferenceItemById(selectedReferenceModule.references[0]);
    if (!fallback || !referenceItem) {
      throw new Error(`No compatible base item found for ${selectedReferenceModule.label}.`);
    }

    return {
      ...fallback,
      category: baseCategory,
      displayName: referenceItem.name,
      lockedName: referenceItem.name,
      itemNature,
      referenceModuleId: selectedReferenceModule.id,
      referenceItemId: referenceItem.id
    };
  }

  const selected =
    (options.baseItemId && options.baseItemId !== "random" && filtered.find((item) => item.id === options.baseItemId)) ||
    (options.baseItemId && options.baseItemId !== "random" && list.find((item) => item.id === options.baseItemId)) ||
    pick(rng, filtered.length ? filtered : list);

  if (!selected) {
    throw new Error(`No base item found for category ${baseCategory}.`);
  }

  const name = options.itemName?.trim() ? options.itemName.trim() : selected.name;

  return {
    ...selected,
    category: baseCategory,
    displayName: name,
    itemNature
  };
}

function moduleMatchesEdition(module, editionPreference) {
  if (editionPreference === "blended") {
    return true;
  }
  return module.primaryEdition === editionPreference || (editionPreference === "2024" && module.primaryEdition === "2024");
}

function chooseModule(options, rng, baseItem, rarity) {
  if (rarity === "Mundane") {
    return null;
  }

  if (baseItem.referenceModuleId) {
    const forcedModule = getModuleById(baseItem.referenceModuleId);
    if (forcedModule) {
      return forcedModule;
    }
  }

  const magicCategory = deriveMagicCategory(baseItem.category);
  const candidates = POWER_MODULES.filter((module) => {
    if (!module.categories.includes(magicCategory)) {
      return false;
    }
    if (!module.rarities.includes(rarity)) {
      return false;
    }
    if (!module.roles.includes("any") && !module.roles.includes(options.armamentRole)) {
      return false;
    }
    if (module.requireTags && !module.requireTags.every((tag) => baseItem.tags?.includes(tag))) {
      return false;
    }
    return moduleMatchesEdition(module, options.editionPreference);
  });

  if (candidates.length) {
    const familyRule = ITEM_FAMILY_RULES[options.itemFamily] || ITEM_FAMILY_RULES.standard;
    const scored = candidates.map((module) => {
      let weight = 1;
      if (module.primaryEdition === options.editionPreference) {
        weight += 3;
      }
      if (options.editionPreference === "2024" && module.primaryEdition === "2024") {
        weight += 2;
      }
      if (options.editionPreference === "2014" && module.primaryEdition === "2014") {
        weight += 2;
      }
      if (baseItem.tags?.includes("staff") && module.id === "acrobat-staff") {
        weight += 4;
      }
      if (baseItem.category === "tool" && ["craftsman-tool", "mapmaker-tool", "sleightmaster"].includes(module.id)) {
        weight += 3;
      }
      if (familyRule.themes.includes(module.theme)) {
        weight += 3;
      }
      if (familyRule.categories.includes(baseItem.category)) {
        weight += 2;
      }
      return { value: module, weight };
    });
    return weightedPick(rng, scored);
  }

  if (magicCategory === "weapon") {
    return POWER_MODULES.find((module) => module.id === "plus-weapon");
  }
  if (magicCategory === "armor" || magicCategory === "shield") {
    return POWER_MODULES.find((module) => module.id === "plus-armor");
  }
  if (magicCategory === "wondrous") {
    return POWER_MODULES.find((module) => module.id === "holding-cache");
  }
  return POWER_MODULES.find((module) => module.id === "oracle-wand");
}

function buildName(rng, baseItem, module) {
  if (baseItem.lockedName) {
    return {
      name: baseItem.lockedName,
      commonName: baseItem.lockedName,
      trueName: baseItem.lockedName
    };
  }

  const theme = module?.theme || "memory";
  const lexicon = THEME_LEXICON[theme] || THEME_LEXICON.memory;
  const prefix = pick(rng, lexicon.prefixes);
  const suffix = pick(rng, lexicon.suffixes);
  const core = baseItem.displayName;

  const generatedName =
    baseItem.displayName === baseItem.name
      ? `${prefix} ${core} of the ${suffix}`
      : `${baseItem.displayName}, the ${prefix} ${suffix}`;

  return {
    name: generatedName,
    commonName: `${core}${module ? `, ${module.label.toLowerCase()}` : ""}`,
    trueName: `${prefix}-${suffix}-${titleCase(theme)}`
  };
}

function buildIdentity(rng, baseItem, module, rarity) {
  return {
    categoryLabel: MAGIC_CATEGORY_RULES[deriveMagicCategory(baseItem.category)].label,
    formFactor: baseItem.detail || `${baseItem.kind || baseItem.name} chassis`,
    materials: pick(rng, NARRATIVE_TABLES.materials),
    originCulture: pick(rng, NARRATIVE_TABLES.creators),
    age: pick(rng, NARRATIVE_TABLES.ages),
    appearance: pick(rng, NARRATIVE_TABLES.appearances),
    tactileFeel: pick(rng, NARRATIVE_TABLES.tactile),
    aura: pick(rng, NARRATIVE_TABLES.aura),
    smellOrSound: pick(rng, NARRATIVE_TABLES.smells),
    oddity: pick(rng, NARRATIVE_TABLES.oddities),
    rumor: pick(rng, NARRATIVE_TABLES.rumors),
    rarity
  };
}

function buildAttunement(rng, module) {
  if (!module) {
    return {
      required: false,
      prerequisite: "None",
      note: "This item is mundane and uses only its ordinary equipment rules."
    };
  }

  return {
    required: true,
    prerequisite: pick(rng, attunementPrerequisites),
    note: "All generated magic items require attunement and follow the 2024 short-rest rules and three-item limit."
  };
}

function buildChassis(baseItem) {
  if (baseItem.category === "weapon") {
    const properties = baseItem.properties?.length ? baseItem.properties.join(", ") : "None";
    return `${baseItem.name}: ${baseItem.damage}; properties ${properties}; mastery ${baseItem.mastery}; weight ${baseItem.weight}; cost ${baseItem.cost}.`;
  }
  if (baseItem.category === "armor") {
    return `${baseItem.name}: AC ${baseItem.armorClass}; strength ${baseItem.strength}; stealth ${baseItem.stealth}; weight ${baseItem.weight}; cost ${baseItem.cost}.`;
  }
  if (baseItem.category === "shield") {
    return `${baseItem.name}: grants ${baseItem.armorClass}; weight ${baseItem.weight}; cost ${baseItem.cost}.`;
  }
  return baseItem.detail || baseItem.name;
}

function buildMechanics(module, rarity, baseItem, rng) {
  if (!module) {
    return {
      chassis: buildChassis(baseItem),
      activation: "None",
      cadence: "Always uses normal mundane rules.",
      effect: `Nonmagical ${baseItem.name}. Use the standard equipment statistics for this chassis.`,
      saveOrCheck: "None",
      recharge: "Not applicable",
      failure: "None beyond ordinary user error",
      destruction: "Destroyed as a normal mundane item.",
      referenceNotes: []
    };
  }

  const bonusByRarity = {
    Uncommon: 1,
    Rare: 1,
    "Very Rare": 2,
    Legendary: 3,
    Artifact: 3
  };

  const chargeByRarity = {
    Common: "1 charge, regains it at the next dawn",
    Uncommon: "3 charges, regains 1d3 expended charges at the next dawn",
    Rare: "5 charges, regains 1d4 + 1 expended charges at the next dawn",
    "Very Rare": "7 charges, regains 1d6 + 1 expended charges at the next dawn",
    Legendary: "10 charges, regains 1d8 + 2 expended charges at the next dawn",
    Artifact: "12 charges, regains 1d10 + 2 expended charges at the next dawn"
  };

  const handlers = {
    "plus-weapon": () => ({
      activation: "Passive",
      cadence: "Constant while wielded",
      effect: `You gain a +${bonusByRarity[rarity]} bonus to attack and damage rolls made with this weapon.`,
      saveOrCheck: "None",
      recharge: "Always active",
      failure: "None",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "plus-armor": () => ({
      activation: "Passive",
      cadence: "Constant while worn or wielded",
      effect: `You gain a +${bonusByRarity[rarity]} bonus to Armor Class while using this item.`,
      saveOrCheck: "None",
      recharge: "Always active",
      failure: "None",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    watchward: () => ({
      activation: "Passive",
      cadence: "Constant while worn or wielded",
      effect:
        "While using the item, you have Advantage on Initiative rolls and Wisdom (Perception) checks. If the item is Rare, you also have Advantage on the first saving throw you make against being surprised each dawn.",
      saveOrCheck: "No save. Applies to Initiative and Perception directly.",
      recharge: "Rare bonus resets at the next dawn",
      failure: "If the item is suppressed, the bearer loses the heightened awareness first.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "cavalier-guard": () => ({
      activation: "Reaction",
      cadence: "PB uses per long rest",
      effect:
        "When a creature you can see within 5 feet of you is hit by an attack, you can interpose the item. Reduce the damage by 1d8 + your Proficiency Bonus. If the item is Very Rare, the attacker must also succeed on a Strength save or be pushed 10 feet.",
      saveOrCheck: "Strength save against your item DC on the Very Rare rider.",
      recharge: "All expended uses return on a Long Rest.",
      failure: "If you are incapacitated, the item's guard cannot trigger.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "energy-bow": () => ({
      activation: "Attack action",
      cadence: "Constant while wielded; one surge rider per turn",
      effect:
        "The weapon conjures its own luminous ammunition, so it doesn't require mundane ammunition. Its attacks count as magical. Once on each of your turns when you hit, you can deal an extra 1d6 force damage, or 2d6 force damage if the item is Very Rare.",
      saveOrCheck: "None",
      recharge: "Extra damage refreshes every turn",
      failure: "If the conjured string sputters, the attack still uses the mundane chassis but loses the surge rider.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "thunderous-weapon": () => ({
      activation: "Passive, with a once-per-dawn surge",
      cadence: "Extra rider once per dawn; passive hum while wielded",
      effect:
        "The first time each dawn that you hit with the weapon, the target takes an extra 1d8 thunder damage and must succeed on a Strength save or be pushed up to 10 feet. If the item is Rare, the thunder rider becomes 2d8.",
      saveOrCheck: "Strength save against your item DC to resist the push.",
      recharge: "Resets at the next dawn",
      failure: "On a failed activation, the thunder bursts around the bearer in a 5-foot radius with no push.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "acrobat-staff": () => ({
      activation: "Passive and Bonus Action",
      cadence: "Passive while held, one recovery trick per short rest",
      effect:
        "While you hold the staff, you have Advantage on Dexterity (Acrobatics) checks made to balance, tumble, or avoid falling Prone. Once per Short Rest, when you would fall Prone, you can use a Bonus Action to remain standing instead.",
      saveOrCheck: "None",
      recharge: "Recovery trick returns after a Short Rest",
      failure: "If the recovery trick fails, you land Prone but take no extra damage from the failure itself.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "many-spells": () => ({
      activation: "Magic action",
      cadence: chargeByRarity[rarity],
      effect: `The item stores a rotating suite of prepared effects. When created, choose three spells of thematic fit from up to ${rarity === "Rare" ? "2nd" : "4th"} level. You can expend 1 charge per spell level to cast one of those spells from the item, using your spellcasting ability or +0 if you lack one.`,
      saveOrCheck: "Uses your spell save DC or item DC 13 if you have none.",
      recharge: chargeByRarity[rarity],
      failure: "A failed cast expends only half the intended charges, rounded up, and produces the weakest harmless manifestation of the spell.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "sending-pair": () => ({
      activation: "Magic action",
      cadence: "1 use per dawn",
      effect:
        "The item is one half of a bound pair. Once per dawn, the bearer can send a brief twenty-five-word message to the creature carrying the paired item and receive a reply of similar length immediately.",
      saveOrCheck: "None",
      recharge: "The next dawn",
      failure: "If the pair is on a different plane, the message carries only emotion and a single image.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    sleightmaster: () => ({
      activation: "Passive",
      cadence: "Constant while worn or used",
      effect:
        "You gain a +5 bonus to Dexterity (Sleight of Hand) checks and to checks made using the item's associated tool to pick locks, palm small objects, or conceal delicate manipulation. If the item is Rare, once per Short Rest you can treat one failed related check as a 10 on the die instead.",
      saveOrCheck: "None",
      recharge: "Short-rest rider for the Rare version",
      failure: "The item never fails quietly; a misstep produces an audible click or bright glint.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    nourishment: () => ({
      activation: "Bonus Action",
      cadence: "Single use",
      effect:
        "Consuming the item provides enough nourishment and hydration to sustain a creature for one day. The creature also gains Advantage on the next saving throw it makes against exhaustion before the next dawn.",
      saveOrCheck: "None",
      recharge: "Consumable",
      failure: "If spoiled or tampered with, it simply becomes inert.",
      destruction: "Consumed on use."
    }),
    "purity-elixir": () => ({
      activation: "Bonus Action",
      cadence: "Single use",
      effect:
        "When consumed, the draught ends one disease affecting the drinker, neutralizes one poison currently affecting them, and grants Advantage on the next Constitution saving throw they make before the next dawn.",
      saveOrCheck: "None",
      recharge: "Consumable",
      failure: "If mixed with another potion, treat it as volatile alchemy and let the DM apply potion miscibility.",
      destruction: "Consumed on use."
    }),
    "invulnerability-draught": () => ({
      activation: "Bonus Action",
      cadence: "Single use",
      effect:
        "For 1 minute after drinking this draught, you have Resistance to all damage. During that minute, the item's glamor makes your outline hard to ignore.",
      saveOrCheck: "None",
      recharge: "Consumable",
      failure: "If the draught is interrupted, you gain the resistance only until the end of your current turn.",
      destruction: "Consumed on use."
    }),
    "longevity-draught": () => ({
      activation: "Bonus Action",
      cadence: "Single use",
      effect:
        "When consumed, the potion reduces the drinker's physical age by 1d6 + 6 years, to a minimum age of 13 years. Each later use carries a cumulative 10 percent chance to age the drinker by the same amount instead.",
      saveOrCheck: "None",
      recharge: "Consumable",
      failure: "If the potion has spoiled or been diluted, it produces only a brief illusion of youth and no lasting effect.",
      destruction: "Consumed on use."
    }),
    "vitality-draught": () => ({
      activation: "Bonus Action",
      cadence: "Single use",
      effect:
        "When consumed, the drinker sheds one level of exhaustion, is cured of any disease and poison affecting them, and regains 2d8 + 10 Hit Points. The drinker also has Advantage on death saving throws until their next Long Rest.",
      saveOrCheck: "None",
      recharge: "Consumable",
      failure: "If diluted, only the healing and poison-curing portions apply.",
      destruction: "Consumed on use."
    }),
    "cloak-concealment": () => ({
      activation: "Magic action",
      cadence: "Up to 2 hours per dawn in 10-minute increments",
      effect:
        "While wearing the item, you can use a Magic action to gain the Invisible condition. The effect lasts until you dismiss it, attack, cast a spell, or the daily duration is exhausted. You can split the duration into 10-minute increments.",
      saveOrCheck: "None",
      recharge: "Daily duration refreshes at the next dawn",
      failure: "If the item is angry or cursed, the cloak hides the bearer but leaves tracks, breath, or a reflected silhouette.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "resurrection-rod": () => ({
      activation: "Magic action",
      cadence: "1 charge-heavy rite per dawn",
      effect:
        "The rod carries 5 charges. You can expend charges to restore life or bodily integrity: 1 charge to stabilize and heal a dying creature, 3 charges to cast a revivifying effect on a creature dead within the last minute, or all 5 charges to cast a resurrection-like effect subject to DM approval and campaign tone.",
      saveOrCheck: "No save. The target must still be willing to return to life.",
      recharge: "The rod regains 1d4 + 1 charges at the next dawn.",
      failure: "If it falls to 0 charges, the rod cannot restore life again until it is bathed in sunrise at a consecrated site.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "magi-staff": () => ({
      activation: "Magic action, Reaction, or Passive",
      cadence: "50 charges, regains 4d6 + 2 expended charges at the next dawn",
      effect:
        "The staff grants a +2 bonus to spell attack rolls and spell save DCs while held. It functions as a potent arcane focus, carries deep spell storage, and can expend charges to cast high-tier spells such as force, fire, utility, and control effects. As a reaction, it can absorb a spell that targets only you into its charge reservoir, up to the staff's maximum.",
      saveOrCheck: "Uses your spell save DC. If you lack one, use item DC 19.",
      recharge: "Regains 4d6 + 2 expended charges at dawn; if the last charge is spent, roll to determine whether the staff is destroyed or unleashes a catastrophic retributive strike.",
      failure: "If you expend the last charge, the staff risks breaking in a burst of stored magic.",
      destruction: "It can be broken deliberately as an action to release a retributive strike, with survival and fallout left to the DM's adjudication."
    }),
    "holding-cache": () => ({
      activation: "Use Object / item interaction",
      cadence: "Constant",
      effect:
        "The item contains an extradimensional cache capable of safely storing far more volume than its mundane form suggests. Retrieve or stow an item as an action unless the stored item is already in hand-ready order. If the item is Rare, it can also preserve one fragile object from ordinary environmental damage while stowed.",
      saveOrCheck: "None",
      recharge: "Always active",
      failure: "If overstuffed with sharp or impossible objects, the cache sheds one random stored item instead of rupturing immediately.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "quietstep-boots": () => ({
      activation: "Passive",
      cadence: "Constant while worn",
      effect:
        "Your steps make almost no sound. You have Advantage on Dexterity (Stealth) checks that rely on moving quietly. In addition, difficult terrain caused only by loose debris doesn't slow you for the first 10 feet you move each turn.",
      saveOrCheck: "None",
      recharge: "Always active",
      failure: "If the wearer runs or stomps deliberately, the magic offers no help.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "immovable-baton": () => ({
      activation: "Magic action",
      cadence: "PB uses per Long Rest",
      effect:
        "When you press the command and release the rod, it becomes fixed in place and resists normal movement. A creature can attempt a Strength check against the item's DC to move it. If the item is Rare, it can also pin one unattended object or door in place while fixed.",
      saveOrCheck: "Strength check against item DC 15 or 17 for the Rare version.",
      recharge: "All uses return on a Long Rest.",
      failure: "A failed fix leaves the rod hovering unsteadily and grants Advantage on the next attempt to move it.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "striking-staff": () => ({
      activation: "Passive with expendable charges",
      cadence: chargeByRarity[rarity],
      effect:
        "You gain a +1 bonus to attack and damage rolls made with this staff. When you hit, you can expend up to 3 charges to deal 1d6 force damage per charge. If the item is Very Rare, the bonus becomes +2.",
      saveOrCheck: "None",
      recharge: chargeByRarity[rarity],
      failure: "If you expend the last charge, the staff goes dull and nonmagical until the next dawn.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "fireburst-wand": () => ({
      activation: "Magic action",
      cadence: chargeByRarity[rarity],
      effect:
        "The wand holds volatile fire magic. Expend 1 to 3 charges to cast a burst of flame centered on a point you can see within 150 feet. The burst deals 6d6 fire damage in a 20-foot-radius Sphere on a failed Dexterity save, or half as much on a success. Add 1d6 damage for each charge beyond the first.",
      saveOrCheck: "Dexterity save against item DC 15.",
      recharge: chargeByRarity[rarity],
      failure: "If you expend the last charge, roll 1d20. On a 1, the wand crumbles into ash after resolving the spell.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "invisibility-ring": () => ({
      activation: "Bonus Action",
      cadence: "At will while worn, though each use demands concentration-like focus",
      effect:
        "While wearing the ring, you can gain the Invisible condition as a Bonus Action. The condition lasts until you remove the ring, attack, cast a spell, or choose to end the effect.",
      saveOrCheck: "None",
      recharge: "At will",
      failure: "If the ring is displeased, it hides the bearer from sight but not from sound or scent.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "craftsman-tool": () => ({
      activation: "Passive and 1 focused flourish per rest",
      cadence: rarity === "Common" ? "One flourish per Long Rest" : "One flourish per Short Rest",
      effect:
        "You gain Advantage on one common utilize or craft task this tool normally supports each rest. When you use the flourish, treat a d20 roll of 9 or lower on a related ability check as a 10. If the item is Rare, finishing a project with the tool reduces its ordinary crafting time by 25 percent.",
      saveOrCheck: "None",
      recharge: rarity === "Common" ? "Long Rest" : "Short Rest",
      failure: "The tool becomes temperamental and demands another full minute of setup before reuse.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "mapmaker-tool": () => ({
      activation: "Passive and Magic action",
      cadence: "PB uses per Long Rest",
      effect:
        "The tool marks safe routes, hidden turns, and stable bearings. You have Advantage on checks to navigate, chart, track a course, or recall the layout of a site you have explored with the tool in hand. Expend a use to ask the tool for the shortest safe path to a visible objective or exit within the current adventuring site.",
      saveOrCheck: "None",
      recharge: "All uses return on a Long Rest.",
      failure: "If the destination has been warded or shifted by magic, the tool offers only symbols and warnings.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "ward-scroll": () => ({
      activation: "Read the scroll",
      cadence: "Single use",
      effect: `The scroll stores a ${pick(rng, spellThemes[rarity])}-aligned warding effect appropriate to a ${rarity.toLowerCase()} item. When read, it casts the effect at the lowest level that matches its intended outcome without material components.`,
      saveOrCheck: "Uses spell save DC 13 for Common/Uncommon, 15 for Rare, 17 for Very Rare, and 19 for Legendary.",
      recharge: "Consumable",
      failure: "If the reader cannot understand the script, the scroll burns without releasing the full effect.",
      destruction: "Consumed on use."
    }),
    "oracle-wand": () => ({
      activation: "Magic action",
      cadence: chargeByRarity[rarity],
      effect:
        "The item stores divinatory prompts. Expend 1 charge to reveal one hidden door, magical aura, or active illusion within 30 feet. Expend 2 charges to ask a focused yes-or-no question about the next hour of danger, receiving an omen rather than precise language. If the item is Very Rare, expend 3 charges to briefly see invisible or ethereal outlines for 1 minute.",
      saveOrCheck: "None",
      recharge: chargeByRarity[rarity],
      failure: "A failed omen answers truthfully but in symbols the bearer misreads at first.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    }),
    "oath-rod": () => ({
      activation: "Magic action or Reaction",
      cadence: "PB uses per Long Rest",
      effect:
        "When a creature within 30 feet makes a promise, confession, or declaration you can hear, you can mark it with the rod. For the next hour, you know if that creature knowingly breaks the marked statement. As a Reaction when the marked creature breaks it, you can impose Disadvantage on its next d20 Test before the end of its next turn. If the item is Legendary, the creature also takes 2d8 psychic damage when the mark breaks.",
      saveOrCheck: "Charisma save against your item DC to resist the initial mark if the creature is unwilling.",
      recharge: "All expended uses return on a Long Rest.",
      failure: "If you mark a statement you know is false already, the item marks you instead for an hour.",
      destruction: pick(rng, NARRATIVE_TABLES.destruction)
    })
  };

  const mechanics = handlers[module.id] ? handlers[module.id]() : handlers["oracle-wand"]();
  return {
    chassis: buildChassis(baseItem),
    referenceNotes: module.references.map((referenceId) => REFERENCE_ITEMS.find((item) => item.id === referenceId)).filter(Boolean),
    ...mechanics
  };
}

function buildDrawbacks(rng, rarity, forcedCurse, module) {
  if (!module) {
    return { cost: "None", collateral: "None", misfire: "None", curse: "None" };
  }

  const cursed = forcedCurse === "forced" ? true : forcedCurse === "off" ? false : chance(rng, curseChance[rarity]);

  return {
    cost: pick(rng, NARRATIVE_TABLES.costs),
    collateral: pick(rng, NARRATIVE_TABLES.collateral),
    misfire: pick(rng, NARRATIVE_TABLES.misfires),
    curse: cursed ? pick(rng, NARRATIVE_TABLES.curses) : "No overt curse detected by the generator."
  };
}

function buildProvenance(rng) {
  return {
    creator: pick(rng, NARRATIVE_TABLES.creators),
    originalPurpose: pick(rng, NARRATIVE_TABLES.purposes),
    notableBearer: pick(rng, NARRATIVE_TABLES.bearers),
    deed: pick(rng, NARRATIVE_TABLES.deeds),
    loss: pick(rng, NARRATIVE_TABLES.losses),
    resurfacing: pick(rng, NARRATIVE_TABLES.resurfacing),
    factions: pick(rng, NARRATIVE_TABLES.factions),
    historicalLie: pick(rng, NARRATIVE_TABLES.lies),
    historicalTruth: pick(rng, NARRATIVE_TABLES.truths)
  };
}

function buildAwakening(rng, rarity) {
  const dormant = { label: "Dormant", reveal: "Only the base chassis and smallest omen are obvious." };
  const awakened = {
    label: "Awakened",
    reveal: `Unlock after fulfilling ${pick(rng, NARRATIVE_TABLES.trustGains)} or after a quest that honors the item's history.`
  };
  const exalted = {
    label: rarity === "Legendary" || rarity === "Artifact" ? "Ascendant" : "Exalted",
    reveal: `Unlock when the bearer resolves ${pick(rng, NARRATIVE_TABLES.hooks).toLowerCase()}`
  };
  return { stages: [dormant, awakened, exalted] };
}

function buildDiscovery(rng, item, mechanics, drawbacks) {
  const obvious = `${item.identity.appearance} It feels ${item.identity.tactileFeel} and carries ${item.identity.aura}.`;
  const handling = mechanics.effect;
  const firstUse = `${mechanics.activation}: ${drawbacks.collateral}`;
  const repeatedUse = `${drawbacks.cost} ${drawbacks.misfire}`;
  const lore = `${item.provenance.historicalTruth} ${item.provenance.historicalLie}`;
  const storyUnlock = `${item.awakening.stages[1].reveal} ${item.awakening.stages[2].reveal}`;

  return { obvious, handling, firstUse, repeatedUse, lore, storyUnlock };
}

function abilityModifier(score) {
  return Math.floor((score - 10) / 2);
}

function roll4d6DropLowest(rng) {
  const rolls = [randomInt(rng, 1, 6), randomInt(rng, 1, 6), randomInt(rng, 1, 6), randomInt(rng, 1, 6)].sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}

function roll1d10Plus1d8(rng) {
  return randomInt(rng, 1, 10) + randomInt(rng, 1, 8);
}

function roll2d4Plus5(rng) {
  return randomInt(rng, 1, 4) + randomInt(rng, 1, 4) + 5;
}

function roll3d4Plus8(rng) {
  return randomInt(rng, 1, 4) + randomInt(rng, 1, 4) + randomInt(rng, 1, 4) + 8;
}

function buildSentience(rng, baseItem, module, rarity, mode) {
  if (baseItem.itemNature === "mundane") {
    return null;
  }

  if (mode === "off") {
    return null;
  }

  if (mode === "auto" && !chance(rng, sentienceChance[rarity] ?? 0)) {
    return null;
  }

  const tier = pick(rng, ["nascent", "diminished", "full", "kenn"]);

  let intelligence, wisdom, charisma, abilityMethod;
  if (tier === "nascent") {
    intelligence = randomInt(rng, 1, 5);
    wisdom       = roll2d4Plus5(rng);
    charisma     = randomInt(rng, 1, 5);
    abilityMethod = "1d5 for INT and CHA; 2d4 + 5 for WIS.";
  } else if (tier === "diminished") {
    intelligence = roll1d10Plus1d8(rng);
    wisdom       = roll1d10Plus1d8(rng);
    charisma     = roll1d10Plus1d8(rng);
    abilityMethod = "1d10 + 1d8, for each of INT, WIS, and CHA.";
  } else if (tier === "full") {
    intelligence = roll4d6DropLowest(rng);
    wisdom       = roll4d6DropLowest(rng);
    charisma     = roll4d6DropLowest(rng);
    abilityMethod = "4d6, drop the lowest die, for each of INT, WIS, and CHA.";
  } else {
    intelligence = roll3d4Plus8(rng);
    wisdom       = roll3d4Plus8(rng);
    charisma     = roll3d4Plus8(rng);
    abilityMethod = "3d4 + 8, for each of INT, WIS, and CHA.";
  }

  const craftedBy = pick(rng, NARRATIVE_TABLES.creators);
  const craftingReason = pick(rng, NARRATIVE_TABLES.purposes);

  const communication =
    tier === "nascent"
      ? "Radiates a single overwhelming emotion — hunger, fear, or purpose — with no nuance or direction."
      : tier === "diminished"
        ? "Communicates only simple urges, emotions, and warning impulses to its bearer."
        : weightedPick(rng, SENTIENT_TABLES.communication);

  const literacy =
    tier === "nascent"    ? "Has no language faculty whatsoever."
    : tier === "diminished" ? "Cannot speak or read."
    : tier === "full"       ? "Can read and understand writing in the languages it knows."
    : "Reads and writes all languages it knows; can learn a new language after one week of exposure.";

  const voice =
    tier === "nascent"
      ? "a wordless emotional broadcast felt as pressure or warmth by those who hold it"
      : tier === "diminished"
        ? "a mute, pressure-like instinct that presses wants and warnings into the bearer's mind"
        : pick(rng, SENTIENT_TABLES.voices);

  const intelligenceTier =
    tier === "nascent"    ? "Nascent sentience"
    : tier === "diminished" ? "Diminished sentience"
    : tier === "full"       ? "Full sentience"
    : "Kenn sentience";

  return {
    abilityScores: { intelligence, wisdom, charisma },
    abilityMethod,
    intelligenceTier,
    alignment: weightedPick(rng, SENTIENT_TABLES.alignments),
    communication,
    literacy,
    senses: pick(rng, SENTIENT_TABLES.senses),
    voice,
    craftedBy,
    craftingReason,
    ideal: pick(rng, SENTIENT_TABLES.ideals),
    bond: pick(rng, SENTIENT_TABLES.bonds),
    flaw: pick(rng, SENTIENT_TABLES.flaws),
    motive: pick(rng, SENTIENT_TABLES.motives),
    quirk: pick(rng, SENTIENT_TABLES.quirks),
    purpose: pick(rng, SENTIENT_TABLES.purposes),
    rewards: pick(rng, NARRATIVE_TABLES.rewards),
    dislikes: pick(rng, NARRATIVE_TABLES.dislikes),
    trustGain: pick(rng, NARRATIVE_TABLES.trustGains),
    trustLoss: pick(rng, NARRATIVE_TABLES.trustLosses),
    conflict:
      `When the bearer acts against the item's alignment or special purpose, the bearer makes a Charisma save (DC ${12 + abilityModifier(charisma)}). On a failure, the item demands: ${pick(rng, SENTIENT_TABLES.conflictDemands)}`
  };
}

function buildCrafting(baseItem, rarity, mechanics) {
  if (rarity === "Mundane") {
    return {
      tool: "Use the mundane crafting rules for the base item.",
      time: RARITY_RULES.Mundane.craftingTime,
      cost: RARITY_RULES.Mundane.craftingCost,
      value: formatGp(parseCost(baseItem.cost))
    };
  }

  const category = deriveMagicCategory(baseItem.category);
  const rarityData = RARITY_RULES[rarity];
  const baseCost = parseCost(baseItem.cost);
  const magicValue = Number(rarityData.value.replace(/,/g, "").replace(" GP", "")) || 0;
  const consumable = ["potion", "scroll"].includes(category);
  const totalValue = consumable && category !== "scroll" ? magicValue / 2 + baseCost : magicValue + baseCost;

  return {
    tool: MAGIC_CATEGORY_RULES[category].tool,
    time: consumable && category !== "scroll" ? `Half of ${rarityData.craftingTime}` : rarityData.craftingTime,
    cost: consumable && category !== "scroll" ? `Half of ${rarityData.craftingCost}` : rarityData.craftingCost,
    value: rarity === "Artifact" ? "Priceless" : formatGp(totalValue),
    categoryRule: MAGIC_CATEGORY_RULES[category].description,
    chassis: mechanics.chassis
  };
}

function buildWorldState(rng) {
  return {
    reaction: pick(rng, NARRATIVE_TABLES.worldReactions),
    mark: pick(rng, NARRATIVE_TABLES.marks),
    hook: pick(rng, NARRATIVE_TABLES.hooks)
  };
}

function buildEmbellishments(rng) {
  return {
    minorProperty: pick(rng, NARRATIVE_TABLES.minorProperties),
    quirk: pick(rng, NARRATIVE_TABLES.quirks),
    hiddenProperty: pick(rng, NARRATIVE_TABLES.hiddenProperties)
  };
}

function buildGmShortForm(item, mechanics, drawbacks) {
  return {
    line: `${item.naming.name} (${item.identity.rarity} ${item.identity.categoryLabel})`,
    revealScript: [item.discovery.obvious, item.discovery.firstUse, item.discovery.storyUnlock],
    rulesSummary: mechanics.effect,
    hiddenTruth: item.provenance.historicalTruth,
    complicationTrigger: drawbacks.misfire
  };
}

function buildPlayerFacingText(item, mechanics) {
  return `${item.naming.name} is ${item.identity.appearance.toLowerCase()} ${item.identity.smellOrSound}. ${mechanics.effect}`;
}

function buildCompliance(options, baseItem, module, rarity, sentience) {
  const magicCategory = deriveMagicCategory(baseItem.category);
  const familyRule = ITEM_FAMILY_RULES[options.itemFamily] || ITEM_FAMILY_RULES.standard;
  const referenceItems =
    module?.references?.map((referenceId) => REFERENCE_ITEMS.find((item) => item.id === referenceId)).filter(Boolean) || [];

  return {
    editionPreference: options.editionPreference,
    itemFamilyRule: familyRule.summary,
    categoryRule: MAGIC_CATEGORY_RULES[magicCategory].description,
    rarityRule: RARITY_RULES[rarity].moduleBudget,
    attunementRule:
      module
        ? "All generated magic items require attunement and follow the 2024 Basic Rules short-rest procedure and three-item limit."
        : "Mundane items do not use attunement.",
    sentienceRule: sentience
      ? "Sentience follows the 2024 Basic Rules framework for ability scores, alignment, communication, senses, purpose, and conflict."
      : "No sentience package applied.",
    references: referenceItems,
    citations: SOURCES.filter((source) => ["srd-5-2-1", "br-2024-equipment", "br-2024-magic-items"].includes(source.id))
  };
}

export function generateItem(rawOptions) {
  const seed = rawOptions.seed?.trim() || `${Date.now()}`;
  const rng = createRng(seed);
  const itemFamily = ITEM_FAMILY_OPTIONS.find((family) => family.id === rawOptions.itemFamily) || ITEM_FAMILY_OPTIONS[0];
  const itemNature = resolveItemNature(rng, rawOptions.itemNature);
  const rarity = resolveRarity(rng, rawOptions.rarity, itemNature);
  const baseItem = resolveBaseItem(rawOptions, rng, itemNature);
  const module = chooseModule(rawOptions, rng, baseItem, rarity);
  const naming = buildName(rng, baseItem, module);
  const identity = buildIdentity(rng, baseItem, module, rarity);
  const provenance = buildProvenance(rng);
  const awakening = buildAwakening(rng, rarity);
  const sentience = buildSentience(rng, baseItem, module, rarity, rawOptions.sentientMode);
  const attunement = buildAttunement(rng, module);
  const mechanics = buildMechanics(module, rarity, baseItem, rng);
  const drawbacks = buildDrawbacks(rng, rarity, rawOptions.curseMode, module);
  const partialItem = { seed, naming, identity, provenance, awakening };
  const discovery = buildDiscovery(rng, partialItem, mechanics, drawbacks);
  const crafting = buildCrafting(baseItem, rarity, mechanics);
  const world = buildWorldState(rng);
  const embellishments = buildEmbellishments(rng);
  const playerFacingText = buildPlayerFacingText({ naming, identity }, mechanics);
  const compliance = buildCompliance(rawOptions, baseItem, module, rarity, sentience);

  const item = {
    seed,
    itemFamily: {
      id: itemFamily.id,
      label: itemFamily.label,
      summary: ITEM_FAMILY_RULES[itemFamily.id].summary
    },
    itemNature,
    baseItem,
    naming,
    identity,
    provenance,
    mechanics,
    drawbacks,
    attunement,
    sentience,
    awakening,
    discovery,
    world,
    embellishments,
    crafting,
    compliance,
    playerFacingText
  };

  return {
    ...item,
    gmShortForm: buildGmShortForm(item, mechanics, drawbacks),
    modelRecommendations: MODEL_RECOMMENDATIONS
  };
}

// ── Class Item Generator ────────────────────────────────────────────────────

const SWORD_IDS = new Set(["longsword", "shortsword", "greatsword", "rapier", "scimitar", "broadsword"]);
const RANGED_IDS = new Set(["longbow", "shortbow", "light-crossbow", "heavy-crossbow", "hand-crossbow", "blowgun", "dart", "sling"]);

function getSentienceChance(baseItem) {
  if (SWORD_IDS.has(baseItem.id))                                            return 0.75;
  if (baseItem.category === "weapon")                                        return 0.66;
  if (["wondrous", "ring", "wand", "rod"].includes(baseItem.category))      return 0.66;
  if (baseItem.category === "armor" || baseItem.category === "shield")       return 0.50;
  return 0.50;
}

function resolveClassBaseItem(rng, characterClass, baseItemId) {
  // Specific item requested
  if (baseItemId && baseItemId !== "random") {
    for (const items of Object.values(BASE_ITEMS)) {
      const found = items.find((i) => i.id === baseItemId);
      if (found) return found;
    }
  }

  // Class-based random pick
  const classKey = (characterClass || "").toLowerCase();
  const preferred = CLASS_PREFERRED_ITEMS[classKey];
  if (preferred?.length) {
    const id = pick(rng, preferred);
    for (const items of Object.values(BASE_ITEMS)) {
      const found = items.find((i) => i.id === id);
      if (found) return found;
    }
  }

  // Full random fallback: pick from weapons only (most interesting)
  return pick(rng, BASE_ITEMS.weapon);
}

function buildClassItemSentience(rng, hasPurpose) {
  const roll3d6 = () => randomInt(rng, 1, 6) + randomInt(rng, 1, 6) + randomInt(rng, 1, 6);
  return {
    intelligence: roll3d6(),
    wisdom:       roll3d6(),
    charisma:     roll3d6(),
    alignment:    weightedPick(rng, SENTIENT_TABLES.alignments),
    communication:weightedPick(rng, SENTIENT_TABLES.communication),
    senses:       pick(rng, SENTIENT_TABLES.senses),
    voice:        pick(rng, SENTIENT_TABLES.voices),
    purpose:      hasPurpose ? pick(rng, SENTIENT_TABLES.purposes) : null,
    ideal:        pick(rng, SENTIENT_TABLES.ideals),
    bond:         pick(rng, SENTIENT_TABLES.bonds),
    flaw:         pick(rng, SENTIENT_TABLES.flaws)
  };
}

function resolveSecondaryAbility(rng, baseItem) {
  const id = baseItem.id;
  const category = baseItem.category;

  let pool;
  if (SWORD_IDS.has(id))                pool = SECONDARY_ABILITIES.sword;
  else if (RANGED_IDS.has(id))          pool = SECONDARY_ABILITIES.ranged;
  else if (category === "weapon")       pool = SECONDARY_ABILITIES.weapon;
  else if (category === "armor")        pool = SECONDARY_ABILITIES.armor;
  else if (category === "shield")       pool = SECONDARY_ABILITIES.shield;
  else if (["wondrous", "ring", "wand", "rod", "staff", "tool"].includes(category))
                                        pool = SECONDARY_ABILITIES.wondrous;
  else                                  pool = SECONDARY_ABILITIES.default;

  return pick(rng, pool);
}

export function generateClassItem({ seed, characterClass, baseItemId } = {}) {
  const resolvedSeed = (seed !== undefined && seed !== null && seed !== "" && seed !== "-1")
    ? seed
    : Math.floor(Math.random() * 0xffffffff);

  const rng = createRng(resolvedSeed);

  const baseItem = resolveClassBaseItem(rng, characterClass, baseItemId);
  const prefix   = pick(rng, DESCRIPTORS.prefixes);
  const suffix   = pick(rng, DESCRIPTORS.suffixes);

  // Prefix quirkTag takes precedence; fall back to suffix's tag if they match or prefix has no tag
  const quirkTag  = prefix.quirkTag || suffix.quirkTag;
  const quirk     = DESCRIPTOR_QUIRKS[quirkTag] ?? null;

  const purpose   = pick(rng, PURPOSES);

  const sentienceChance = getSentienceChance(baseItem);
  const isSentient      = chance(rng, sentienceChance);
  const hasPurpose      = isSentient && chance(rng, 0.5);
  const sentience       = isSentient ? buildClassItemSentience(rng, hasPurpose) : null;

  const useSecondary    = chance(rng, 0.5);
  const secondary       = useSecondary  ? resolveSecondaryAbility(rng, baseItem) : null;
  const minorProps      = !useSecondary ? {
    beneficial:  pick(rng, MINOR_BENEFICIAL),
    detrimental: pick(rng, MINOR_DETRIMENTAL)
  } : null;

  return {
    seed: resolvedSeed,
    baseItem,
    name: `${prefix.text} ${baseItem.name} of ${suffix.text}`,
    prefix,
    suffix,
    quirk,
    purpose,
    sentience,
    secondary,
    minorProps
  };
}

export function getClassItemOptions() {
  return Object.entries(CLASS_PREFERRED_ITEMS).map(([id, itemIds]) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1),
    items: itemIds.map((itemId) => {
      for (const items of Object.values(BASE_ITEMS)) {
        const found = items.find((i) => i.id === itemId);
        if (found) return found;
      }
      return null;
    }).filter(Boolean)
  }));
}

export function getBaseItemsForUi(category, familyId = "standard", options = {}) {
  const includeReferences = options.itemNature !== "mundane";
  const rarity = options.rarity || "random";

  if (category && category !== "random") {
    const baseItems = getBaseItemsForCategory(category);
    if (!includeReferences) {
      return baseItems;
    }
    const references = getReferenceBackedModuleOptions(category, rarity, options.editionPreference);
    return [...references, ...baseItems];
  }

  const familyRule = ITEM_FAMILY_RULES[familyId] || ITEM_FAMILY_RULES.standard;
  const categoryLabels = Object.fromEntries(
    Object.entries(MAGIC_CATEGORY_RULES).map(([id, rule]) => [id, rule.label])
  );

  const baseItems = familyRule.categories.flatMap((categoryId) =>
    getBaseItemsForCategory(categoryId).map((item) => ({
      ...item,
      name: `${item.name} (${categoryLabels[categoryId] || titleCase(categoryId)})`
    }))
  );

  if (!includeReferences) {
    return baseItems;
  }

  const referenceItems = familyRule.categories.flatMap((categoryId) =>
    getReferenceBackedModuleOptions(categoryId, rarity, options.editionPreference).map((item) => ({
      ...item,
      name: `${item.name} (${categoryLabels[categoryId] || titleCase(categoryId)})`
    }))
  );

  return [...referenceItems, ...baseItems];
}
