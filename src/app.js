import { CATEGORY_OPTIONS, ITEM_FAMILY_OPTIONS, ITEM_FAMILY_RULES, SOURCES } from "./data.js";
import { exportJson, exportMarkdown, downloadText } from "./exporters.js";
import { generateClassItem, generateItem, getBaseItemsForUi, getClassItemOptions } from "./generator.js";
import { listModels, summarizeItem } from "./lmstudio.js";

const state = {
  item: null,
  summary: ""
};

const elements = {
  form: document.querySelector("#itemForm"),
  itemFamily: document.querySelector("#itemFamily"),
  itemNature: document.querySelector("#itemNature"),
  rarity: document.querySelector("#rarity"),
  baseCategory: document.querySelector("#baseCategory"),
  armamentRole: document.querySelector("#armamentRole"),
  baseItem: document.querySelector("#baseItem"),
  sentientMode: document.querySelector("#sentientMode"),
  curseMode: document.querySelector("#curseMode"),
  itemName: document.querySelector("#itemName"),
  seed: document.querySelector("#seed"),
  rerollButton: document.querySelector("#rerollButton"),
  resultRoot: document.querySelector("#resultRoot"),
  appStatus: document.querySelector("#appStatus"),
  copyMarkdownButton: document.querySelector("#copyMarkdownButton"),
  downloadJsonButton: document.querySelector("#downloadJsonButton"),
  lmStudioBaseUrl: document.querySelector("#lmStudioBaseUrl"),
  lmStudioModel: document.querySelector("#lmStudioModel"),
  detectModelsButton: document.querySelector("#detectModelsButton"),
  summarizeButton: document.querySelector("#summarizeButton"),
  lmStudioStatus: document.querySelector("#lmStudioStatus")
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function randomSeed() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function setStatus(message) {
  elements.appStatus.textContent = message;
}

function setLmStudioStatus(message) {
  elements.lmStudioStatus.textContent = message;
}

function renderDetailList(entries, className = "") {
  const classes = ["detail-list", className].filter(Boolean).join(" ");
  return `<ul class="${classes}">${entries
    .map(
      ({ label, value }) => `<li><span class="detail-label">${escapeHtml(label)}</span><div class="card-copy">${escapeHtml(value)}</div></li>`
    )
    .join("")}</ul>`;
}

function renderSourceLinks(references) {
  return `<div class="source-list">${references
    .map(
      (reference) =>
        `<a href="${escapeHtml(reference.url)}" target="_blank" rel="noreferrer">${escapeHtml(reference.label || reference.name)}</a>`
    )
    .join("")}</div>`;
}

function renderSentience(item) {
  if (!item.sentience) {
    return `<article class="result-card">
      <p class="meta-kicker">Sentience</p>
      <h3>No sentience package</h3>
      <p class="card-copy">The generator kept this item non-sentient, so no relationship or conflict engine was attached.</p>
    </article>`;
  }

  const stats = item.sentience.abilityScores;
  return `<article class="result-card sentience-card">
    <p class="meta-kicker">Sentience</p>
    <h3>${escapeHtml(item.sentience.voice)}</h3>
    ${renderDetailList([
      { label: "Abilities", value: `INT ${stats.intelligence}, WIS ${stats.wisdom}, CHA ${stats.charisma}` },
      { label: "Mind", value: item.sentience.intelligenceTier },
      { label: "Stat method", value: item.sentience.abilityMethod },
      { label: "Alignment", value: item.sentience.alignment },
      { label: "Communication", value: item.sentience.communication },
      { label: "Literacy", value: item.sentience.literacy },
      { label: "Senses", value: item.sentience.senses },
      { label: "Crafted by", value: item.sentience.craftedBy },
      { label: "Crafted for", value: item.sentience.craftingReason },
      { label: "Purpose", value: item.sentience.purpose },
      { label: "Motive", value: item.sentience.motive },
      { label: "Quirk", value: item.sentience.quirk },
      { label: "Ideal", value: item.sentience.ideal },
      { label: "Bond", value: item.sentience.bond },
      { label: "Flaw", value: item.sentience.flaw },
      { label: "Rewards", value: item.sentience.rewards },
      { label: "Dislikes", value: item.sentience.dislikes },
      { label: "Trust Gain", value: item.sentience.trustGain },
      { label: "Trust Loss", value: item.sentience.trustLoss },
      { label: "Conflict", value: item.sentience.conflict }
    ], "sentience-details")}
  </article>`;
}

function renderItem(item, summary) {
  const attunement = item.attunement.required ? `Required: ${item.attunement.prerequisite}` : "No attunement required";
  const referenceBasis = item.compliance.references.length
    ? item.compliance.references.map((reference) => reference.name).join(", ")
    : "Original generator pattern";
  const sourceReferences = [
    ...item.compliance.references,
    ...item.compliance.citations,
    ...SOURCES.filter((source) => ["azure-swa", "lmstudio-openai", "lmstudio-cors"].includes(source.id))
  ];

  const summaryCard = `<article class="result-card">
    <p class="meta-kicker">LM Studio</p>
    <h3>Player-Facing Summary</h3>
    <div class="summary-box">
      <p class="card-copy">${escapeHtml(
        summary ||
          "No local-model summary yet. Load a model in LM Studio, detect it in the form, and run Generate Summary."
      )}</p>
    </div>
  </article>`;

  elements.resultRoot.innerHTML = `
    <article class="result-card overview-card">
      <p class="meta-kicker">${escapeHtml(item.itemNature)} item</p>
      <h2>${escapeHtml(item.naming.name)}</h2>
      <p class="card-copy">${escapeHtml(item.playerFacingText)}</p>
      <div class="overview-grid">
        <div class="overview-metric"><span class="detail-label">Family</span><strong>${escapeHtml(item.itemFamily.label)}</strong></div>
        <div class="overview-metric"><span class="detail-label">Rarity</span><strong>${escapeHtml(item.identity.rarity)}</strong></div>
        <div class="overview-metric"><span class="detail-label">Category</span><strong>${escapeHtml(item.identity.categoryLabel)}</strong></div>
        <div class="overview-metric"><span class="detail-label">Attunement</span><strong>${escapeHtml(attunement)}</strong></div>
      </div>
      <div class="tag-row">
        <span class="tag">Generation mode: ${escapeHtml(item.itemFamily.summary)}</span>
        <span class="tag">Base chassis: ${escapeHtml(item.baseItem.displayName)}</span>
        <span class="tag">Based on: ${escapeHtml(referenceBasis)}</span>
        <span class="tag">Common name: ${escapeHtml(item.naming.commonName)}</span>
        <span class="tag">True name: ${escapeHtml(item.naming.trueName)}</span>
        <span class="tag">Seed: ${escapeHtml(item.seed)}</span>
      </div>
    </article>

    <section class="result-grid">
      <article class="result-card">
        <p class="meta-kicker">Identity</p>
        <h3>First Impression</h3>
        ${renderDetailList([
          { label: "Form factor", value: item.identity.formFactor },
          { label: "Materials", value: item.identity.materials },
          { label: "Origin", value: item.identity.originCulture },
          { label: "Age", value: item.identity.age },
          { label: "Appearance", value: item.identity.appearance },
          { label: "Tactile feel", value: item.identity.tactileFeel },
          { label: "Aura", value: item.identity.aura },
          { label: "Sensory tell", value: item.identity.smellOrSound },
          { label: "Oddity", value: item.identity.oddity },
          { label: "Public rumor", value: item.identity.rumor }
        ])}
      </article>

      <article class="result-card">
        <p class="meta-kicker">Mechanics</p>
        <h3>2024-Compatible Chassis</h3>
        ${renderDetailList([
          { label: "Chassis", value: item.mechanics.chassis },
          { label: "Activation", value: item.mechanics.activation },
          { label: "Cadence", value: item.mechanics.cadence },
          { label: "Effect", value: item.mechanics.effect },
          { label: "Save or check", value: item.mechanics.saveOrCheck },
          { label: "Recharge", value: item.mechanics.recharge },
          { label: "Failure mode", value: item.mechanics.failure },
          { label: "Destruction", value: item.mechanics.destruction }
        ])}
      </article>

      <article class="result-card">
        <p class="meta-kicker">History</p>
        <h3>Provenance</h3>
        ${renderDetailList([
          { label: "Creator", value: item.provenance.creator },
          { label: "Original purpose", value: item.provenance.originalPurpose },
          { label: "Notable bearer", value: item.provenance.notableBearer },
          { label: "Historical deed", value: item.provenance.deed },
          { label: "How it was lost", value: item.provenance.loss },
          { label: "Why it resurfaced", value: item.provenance.resurfacing },
          { label: "Interested faction", value: item.provenance.factions },
          { label: "Historical lie", value: item.provenance.historicalLie },
          { label: "Historical truth", value: item.provenance.historicalTruth }
        ])}
      </article>

      <article class="result-card">
        <p class="meta-kicker">Discovery</p>
        <h3>Reveal Track</h3>
        ${renderDetailList([
          { label: "Obvious", value: item.discovery.obvious },
          { label: "After handling", value: item.discovery.handling },
          { label: "After first use", value: item.discovery.firstUse },
          { label: "After repeated use", value: item.discovery.repeatedUse },
          { label: "Lore gate", value: item.discovery.lore },
          { label: "Story unlock", value: item.discovery.storyUnlock }
        ])}
      </article>

      <article class="result-card">
        <p class="meta-kicker">Costs</p>
        <h3>Burden and Instability</h3>
        ${renderDetailList([
          { label: "Operational cost", value: item.drawbacks.cost },
          { label: "Collateral", value: item.drawbacks.collateral },
          { label: "Misfire", value: item.drawbacks.misfire },
          { label: "Curse", value: item.drawbacks.curse },
          { label: "Minor property", value: item.embellishments.minorProperty },
          { label: "Quirk", value: item.embellishments.quirk },
          { label: "Hidden property", value: item.embellishments.hiddenProperty }
        ])}
      </article>

      <article class="result-card">
        <p class="meta-kicker">Campaign Use</p>
        <h3>Awakening and World Pressure</h3>
        ${renderDetailList([
          { label: item.awakening.stages[0].label, value: item.awakening.stages[0].reveal },
          { label: item.awakening.stages[1].label, value: item.awakening.stages[1].reveal },
          { label: item.awakening.stages[2].label, value: item.awakening.stages[2].reveal },
          { label: "World reaction", value: item.world.reaction },
          { label: "Bearer mark", value: item.world.mark },
          { label: "Adventure hook", value: item.world.hook }
        ])}
      </article>

      ${renderSentience(item)}

      <article class="result-card">
        <p class="meta-kicker">GM Short Form</p>
        <h3>Table-Ready Summary</h3>
        ${renderDetailList([
          { label: "One-line summary", value: item.gmShortForm.line },
          { label: "Reveal step 1", value: item.gmShortForm.revealScript[0] },
          { label: "Reveal step 2", value: item.gmShortForm.revealScript[1] },
          { label: "Reveal step 3", value: item.gmShortForm.revealScript[2] },
          { label: "Rules summary", value: item.gmShortForm.rulesSummary },
          { label: "Hidden truth", value: item.gmShortForm.hiddenTruth },
          { label: "Complication trigger", value: item.gmShortForm.complicationTrigger }
        ])}
      </article>

      <article class="result-card">
        <p class="meta-kicker">Crafting and Compliance</p>
        <h3>SRD-Grounded Notes</h3>
        ${renderDetailList([
          { label: "Crafting tool", value: item.crafting.tool },
          { label: "Crafting time", value: item.crafting.time },
          { label: "Crafting cost", value: item.crafting.cost },
          { label: "Estimated value", value: item.crafting.value },
          { label: "Reference basis", value: referenceBasis },
          { label: "Generation mode", value: item.itemFamily.summary },
          { label: "Category rule", value: item.compliance.categoryRule },
          { label: "Rarity budget", value: item.compliance.rarityRule },
          { label: "Attunement rule", value: item.compliance.attunementRule },
          { label: "Sentience rule", value: item.compliance.sentienceRule }
        ])}
        ${renderSourceLinks(sourceReferences)}
      </article>

      ${summaryCard}
    </section>
  `;
}

function populateFamilyOptions() {
  elements.itemFamily.innerHTML = ITEM_FAMILY_OPTIONS.map(
    (family) => `<option value="${escapeHtml(family.id)}">${escapeHtml(family.label)}</option>`
  ).join("");
  elements.itemFamily.value = "standard";
}

function populateCategoryOptions() {
  const familyId = elements.itemFamily.value || "standard";
  const allowed = new Set(ITEM_FAMILY_RULES[familyId].categories);
  const options = CATEGORY_OPTIONS.filter((category) => allowed.has(category.id));
  const currentValue = elements.baseCategory.value;

  elements.baseCategory.innerHTML = [{ id: "random", label: "Random" }, ...options]
    .map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.label)}</option>`)
    .join("");

  if (currentValue === "random" || options.some((category) => category.id === currentValue)) {
    elements.baseCategory.value = currentValue;
  } else {
    elements.baseCategory.value = "random";
  }
}

function populateBaseItems() {
  const familyId = elements.itemFamily.value || "standard";
  const categoryId = elements.baseCategory.value || "random";
  const items = getBaseItemsForUi(categoryId, familyId, {
    itemNature: elements.itemNature.value,
    rarity: elements.rarity.value,
    editionPreference: "2024"
  });
  const currentValue = elements.baseItem.value;

  elements.baseItem.innerHTML = [{ id: "random", name: "Random" }, ...items]
    .map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`)
    .join("");

  if (currentValue === "random" || items.some((item) => item.id === currentValue)) {
    elements.baseItem.value = currentValue;
  } else {
    elements.baseItem.value = "random";
  }
}

function syncInputs() {
  const mundane = elements.itemNature.value === "mundane";
  elements.rarity.disabled = mundane;
  elements.sentientMode.disabled = mundane;
  elements.curseMode.disabled = mundane;
}

async function copyMarkdown() {
  if (!state.item) {
    return;
  }
  const markdown = exportMarkdown(state.item, state.summary);
  await navigator.clipboard.writeText(markdown);
  setStatus("Markdown copied to the clipboard.");
}

function buildOptions() {
  const rawSeed = elements.seed.value.trim();
  return {
    editionPreference: "2024",
    itemFamily: elements.itemFamily.value,
    itemNature: elements.itemNature.value,
    rarity: elements.rarity.value,
    baseCategory: elements.baseCategory.value,
    armamentRole: elements.armamentRole.value,
    baseItemId: elements.baseItem.value,
    sentientMode: elements.sentientMode.value,
    curseMode: elements.curseMode.value,
    itemName: elements.itemName.value,
    seed: rawSeed === "-1" ? "" : rawSeed
  };
}

function resolveEffectiveSeed(rawValue) {
  const trimmed = rawValue.trim();
  if (!trimmed || trimmed === "-1") {
    return randomSeed();
  }
  return trimmed;
}

async function detectModels() {
  setLmStudioStatus("Checking LM Studio for loaded models...");
  try {
    const models = await listModels(elements.lmStudioBaseUrl.value);
    if (!models.length) {
      elements.lmStudioModel.innerHTML = `<option value="">No loaded models found</option>`;
      setLmStudioStatus("No loaded model was found. Load one in LM Studio first.");
      return;
    }
    elements.lmStudioModel.innerHTML = models
      .map((model) => `<option value="${escapeHtml(model.id)}">${escapeHtml(model.id)}</option>`)
      .join("");
    setLmStudioStatus(`Detected ${models.length} loaded model${models.length === 1 ? "" : "s"}.`);
  } catch (error) {
    setLmStudioStatus(error.message);
  }
}

async function generateSummary() {
  if (!state.item) {
    setLmStudioStatus("Generate an item before asking LM Studio for a summary.");
    return;
  }
  if (!elements.lmStudioModel.value) {
    setLmStudioStatus("Choose a loaded model first.");
    return;
  }

  setLmStudioStatus("Generating summary from LM Studio...");
  try {
    state.summary = await summarizeItem(elements.lmStudioBaseUrl.value, elements.lmStudioModel.value, state.item);
    renderItem(state.item, state.summary);
    setLmStudioStatus(`Summary generated with ${elements.lmStudioModel.value}.`);
  } catch (error) {
    setLmStudioStatus(error.message);
  }
}

function handleGenerate(event) {
  event.preventDefault();
  try {
    const options = buildOptions();
    options.seed = resolveEffectiveSeed(elements.seed.value);
    state.item = generateItem(options);
    state.summary = "";
    renderItem(state.item, "");
    elements.copyMarkdownButton.disabled = false;
    elements.downloadJsonButton.disabled = false;
    setStatus(`Generated ${state.item.naming.name}.`);
  } catch (error) {
    setStatus(error.message);
  }
}

function handleDownloadJson() {
  if (!state.item) {
    return;
  }
  downloadText(`${state.item.naming.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.json`, exportJson(state.item), "application/json");
  setStatus("JSON download started.");
}

function initialize() {
  populateFamilyOptions();
  populateCategoryOptions();
  populateBaseItems();
  syncInputs();
  elements.seed.value = randomSeed();

  elements.form.addEventListener("submit", handleGenerate);
  elements.itemFamily.addEventListener("change", () => {
    populateCategoryOptions();
    populateBaseItems();
  });
  elements.baseCategory.addEventListener("change", populateBaseItems);
  elements.itemNature.addEventListener("change", () => {
    syncInputs();
    populateBaseItems();
  });
  elements.rarity.addEventListener("change", populateBaseItems);
  elements.rerollButton.addEventListener("click", () => {
    if (elements.seed.value.trim() === "-1") {
      setStatus("Random seed mode remains armed. The next generation will use a fresh hidden seed.");
      return;
    }
    elements.seed.value = randomSeed();
    setStatus("Seed rerolled.");
  });
  elements.copyMarkdownButton.addEventListener("click", () => {
    copyMarkdown().catch((error) => setStatus(error.message));
  });
  elements.downloadJsonButton.addEventListener("click", handleDownloadJson);
  elements.detectModelsButton.addEventListener("click", () => {
    detectModels().catch((error) => setLmStudioStatus(error.message));
  });
  elements.summarizeButton.addEventListener("click", () => {
    generateSummary().catch((error) => setLmStudioStatus(error.message));
  });
}

initialize();

// ── Class Item Tab ───────────────────────────────────────────────────────────

const classElements = {
  tabForge:      document.querySelector("#tab-forge"),
  tabClassItem:  document.querySelector("#tab-class-item"),
  panelForge:    document.querySelector("#panel-forge"),
  panelClassItem:document.querySelector("#panel-class-item"),
  form:          document.querySelector("#classItemForm"),
  classSelect:   document.querySelector("#classSelect"),
  itemSelect:    document.querySelector("#classItemSelect"),
  seedInput:     document.querySelector("#classItemSeed"),
  resultRoot:    document.querySelector("#resultRoot"),
  appStatus:     document.querySelector("#appStatus")
};

const classOptions = getClassItemOptions();

function populateClassItems() {
  const classId = classElements.classSelect.value;
  const select = classElements.itemSelect;
  select.innerHTML = '<option value="random">Random for class</option>';

  const classData = classOptions.find((c) => c.id === classId);
  if (!classData) return;

  for (const item of classData.items) {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name;
    select.appendChild(opt);
  }
}

function renderClassItem(result) {
  const { name, prefix, suffix, quirk, purpose, sentience, secondary, minorProps, baseItem, seed } = result;

  const sentienceHtml = sentience
    ? `<article class="result-card">
        <p class="meta-kicker">Sentience</p>
        <h3>Sentient Item</h3>
        <ul class="detail-list">
          <li><span class="detail-label">Intelligence</span><div class="card-copy">${sentience.intelligence}</div></li>
          <li><span class="detail-label">Wisdom</span><div class="card-copy">${sentience.wisdom}</div></li>
          <li><span class="detail-label">Charisma</span><div class="card-copy">${sentience.charisma}</div></li>
          <li><span class="detail-label">Alignment</span><div class="card-copy">${escapeHtml(sentience.alignment)}</div></li>
          <li><span class="detail-label">Communication</span><div class="card-copy">${escapeHtml(sentience.communication)}</div></li>
          <li><span class="detail-label">Senses</span><div class="card-copy">${escapeHtml(sentience.senses)}</div></li>
          <li><span class="detail-label">Voice</span><div class="card-copy">${escapeHtml(sentience.voice)}</div></li>
          ${sentience.purpose ? `<li><span class="detail-label">Purpose</span><div class="card-copy">${escapeHtml(sentience.purpose)}</div></li>` : ""}
          <li><span class="detail-label">Ideal</span><div class="card-copy">${escapeHtml(sentience.ideal)}</div></li>
          <li><span class="detail-label">Bond</span><div class="card-copy">${escapeHtml(sentience.bond)}</div></li>
          <li><span class="detail-label">Flaw</span><div class="card-copy">${escapeHtml(sentience.flaw)}</div></li>
        </ul>
      </article>`
    : `<article class="result-card">
        <p class="meta-kicker">Sentience</p>
        <h3>Non-sentient</h3>
        <p class="card-copy">This item has no will or personality of its own.</p>
      </article>`;

  const abilityHtml = secondary
    ? `<article class="result-card">
        <p class="meta-kicker">Secondary Ability</p>
        <h3>${escapeHtml(secondary.label)}</h3>
        <p class="card-copy">${escapeHtml(secondary.effect)}</p>
        <p class="card-copy"><em>Activation: ${escapeHtml(secondary.activation)}</em></p>
      </article>`
    : `<article class="result-card">
        <p class="meta-kicker">Minor Properties</p>
        <h3>${escapeHtml(minorProps.beneficial.label)} / ${escapeHtml(minorProps.detrimental.label)}</h3>
        <ul class="detail-list">
          <li><span class="detail-label">Beneficial</span><div class="card-copy">${escapeHtml(minorProps.beneficial.description)}</div></li>
          <li><span class="detail-label">Detrimental</span><div class="card-copy">${escapeHtml(minorProps.detrimental.description)}</div></li>
        </ul>
      </article>`;

  classElements.resultRoot.innerHTML = `
    <article class="result-card">
      <p class="meta-kicker">Class Item — seed ${escapeHtml(String(seed))}</p>
      <h3>${escapeHtml(name)}</h3>
      <ul class="detail-list">
        <li><span class="detail-label">Base</span><div class="card-copy">${escapeHtml(baseItem.name)}${baseItem.damage ? ` — ${escapeHtml(baseItem.damage)}` : ""}${baseItem.armorClass ? ` — AC ${escapeHtml(baseItem.armorClass)}` : ""}</div></li>
        <li><span class="detail-label">Prefix</span><div class="card-copy">${escapeHtml(prefix.text)} <em>(${escapeHtml(prefix.category)})</em></div></li>
        <li><span class="detail-label">Suffix</span><div class="card-copy">${escapeHtml(suffix.text)} <em>(${escapeHtml(suffix.category)})</em></div></li>
      </ul>
    </article>
    <article class="result-card">
      <p class="meta-kicker">Quirk</p>
      <h3>Persistent Behaviour</h3>
      <p class="card-copy">${escapeHtml(quirk)}</p>
    </article>
    <article class="result-card">
      <p class="meta-kicker">Purpose</p>
      <h3>Why It Was Made</h3>
      <p class="card-copy">${escapeHtml(purpose)}</p>
    </article>
    ${sentienceHtml}
    ${abilityHtml}
  `;
}

function handleClassItemGenerate(event) {
  event.preventDefault();
  const characterClass = classElements.classSelect.value;
  const baseItemId     = classElements.itemSelect.value;
  const seedRaw        = classElements.seedInput.value.trim();

  const result = generateClassItem({ seed: seedRaw || undefined, characterClass, baseItemId });
  classElements.seedInput.value = String(result.seed);
  renderClassItem(result);
  setStatus(`Class item generated — seed ${result.seed}`);
}

function activateTab(tabName) {
  const isForge = tabName === "forge";
  classElements.tabForge.classList.toggle("tab-active", isForge);
  classElements.tabClassItem.classList.toggle("tab-active", !isForge);
  classElements.tabForge.setAttribute("aria-selected", String(isForge));
  classElements.tabClassItem.setAttribute("aria-selected", String(!isForge));
  classElements.panelForge.hidden = !isForge;
  classElements.panelClassItem.hidden = isForge;
}

function initClassItemTab() {
  populateClassItems();
  classElements.classSelect.addEventListener("change", populateClassItems);
  classElements.form.addEventListener("submit", handleClassItemGenerate);
  classElements.tabForge.addEventListener("click", () => activateTab("forge"));
  classElements.tabClassItem.addEventListener("click", () => activateTab("class-item"));
}

initClassItemTab();
