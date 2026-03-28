export function exportJson(item) {
  return JSON.stringify(item, null, 2);
}

export function exportMarkdown(item, summary = "") {
  const sentience = item.sentience
    ? `## Sentience

- Abilities: INT ${item.sentience.abilityScores.intelligence}, WIS ${item.sentience.abilityScores.wisdom}, CHA ${item.sentience.abilityScores.charisma}
- Alignment: ${item.sentience.alignment}
- Communication: ${item.sentience.communication}
- Senses: ${item.sentience.senses}
- Purpose: ${item.sentience.purpose}
- Ideal: ${item.sentience.ideal}
- Bond: ${item.sentience.bond}
- Flaw: ${item.sentience.flaw}
- Conflict: ${item.sentience.conflict}
`
    : "";

  const summaryBlock = summary
    ? `## LM Studio Summary

${summary}
`
    : "";

  return `# ${item.naming.name}

- Seed: ${item.seed}
- 2024 family: ${item.itemFamily.label}
- Nature: ${item.itemNature}
- Rarity: ${item.identity.rarity}
- Category: ${item.identity.categoryLabel}
- Base chassis: ${item.baseItem.displayName}
- Attunement: ${item.attunement.required ? `Required (${item.attunement.prerequisite})` : "Not required"}

## Identity

- Common name: ${item.naming.commonName}
- True name: ${item.naming.trueName}
- Form factor: ${item.identity.formFactor}
- Materials: ${item.identity.materials}
- Origin: ${item.identity.originCulture}
- Age: ${item.identity.age}
- Appearance: ${item.identity.appearance}
- Tactile feel: ${item.identity.tactileFeel}
- Aura: ${item.identity.aura}
- Sensory tell: ${item.identity.smellOrSound}
- Oddity: ${item.identity.oddity}
- Rumor: ${item.identity.rumor}

## Provenance

- Creator: ${item.provenance.creator}
- Original purpose: ${item.provenance.originalPurpose}
- Notable bearer: ${item.provenance.notableBearer}
- Deed: ${item.provenance.deed}
- Loss: ${item.provenance.loss}
- Resurfacing: ${item.provenance.resurfacing}
- Interested faction: ${item.provenance.factions}
- Historical lie: ${item.provenance.historicalLie}
- Historical truth: ${item.provenance.historicalTruth}

## Mechanics

- Chassis: ${item.mechanics.chassis}
- Activation: ${item.mechanics.activation}
- Usage cadence: ${item.mechanics.cadence}
- Effect: ${item.mechanics.effect}
- Save or check: ${item.mechanics.saveOrCheck}
- Recharge: ${item.mechanics.recharge}
- Failure mode: ${item.mechanics.failure}
- Destruction: ${item.mechanics.destruction}

## Drawbacks

- Cost: ${item.drawbacks.cost}
- Collateral: ${item.drawbacks.collateral}
- Misfire: ${item.drawbacks.misfire}
- Curse: ${item.drawbacks.curse}

## Discovery

- Obvious: ${item.discovery.obvious}
- Handling: ${item.discovery.handling}
- First use: ${item.discovery.firstUse}
- Repeated use: ${item.discovery.repeatedUse}
- Lore: ${item.discovery.lore}
- Story unlock: ${item.discovery.storyUnlock}

## Embellishments

- Minor property: ${item.embellishments.minorProperty}
- Quirk: ${item.embellishments.quirk}
- Hidden property: ${item.embellishments.hiddenProperty}

## Awakening

- ${item.awakening.stages[0].label}: ${item.awakening.stages[0].reveal}
- ${item.awakening.stages[1].label}: ${item.awakening.stages[1].reveal}
- ${item.awakening.stages[2].label}: ${item.awakening.stages[2].reveal}

## World Impact

- Reaction: ${item.world.reaction}
- Mark: ${item.world.mark}
- Hook: ${item.world.hook}

## Crafting

- Tool: ${item.crafting.tool}
- Time: ${item.crafting.time}
- Cost: ${item.crafting.cost}
- Value: ${item.crafting.value}
- 2024 family rule: ${item.itemFamily.summary}

## GM Short Form

- Line: ${item.gmShortForm.line}
- Rules summary: ${item.gmShortForm.rulesSummary}
- Hidden truth: ${item.gmShortForm.hiddenTruth}
- Complication trigger: ${item.gmShortForm.complicationTrigger}

${sentience}${summaryBlock}`.trim();
}

export function downloadText(filename, text, mimeType) {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
