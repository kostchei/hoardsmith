function normalizeBaseUrl(rawBaseUrl) {
  const trimmed = rawBaseUrl.trim().replace(/\/+$/, "");
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

function extractMessageContent(content) {
  if (typeof content === "string") {
    return content.trim();
  }
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "string" ? part : part?.text || ""))
      .join("")
      .trim();
  }
  return "";
}

async function parseJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(text || response.statusText || "LM Studio returned a non-JSON response.");
  }
}

export async function listModels(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl);
  const response = await fetch(`${normalized}/models`);
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(payload?.error?.message || `Model listing failed with status ${response.status}.`);
  }

  return payload.data || [];
}

export async function summarizeItem(baseUrl, model, item) {
  const normalized = normalizeBaseUrl(baseUrl);
  const response = await fetch(`${normalized}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      max_tokens: 220,
      messages: [
        {
          role: "system",
          content:
            "You write concise player-facing D&D item summaries. Keep the output to one tight paragraph, avoid rules-lawyer phrasing, and preserve a grounded fantasy tone."
        },
        {
          role: "user",
          content: `Summarize this item in under 140 words. Mention the item's identity, mood, and the most important mechanical hook without listing every rule.\n\n${JSON.stringify(
            {
              name: item.naming.name,
              rarity: item.identity.rarity,
              category: item.identity.categoryLabel,
              appearance: item.identity.appearance,
              aura: item.identity.aura,
              mechanics: item.mechanics.effect,
              drawback: item.drawbacks.cost,
              rumor: item.identity.rumor
            },
            null,
            2
          )}`
        }
      ]
    })
  });

  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(payload?.error?.message || `Summary generation failed with status ${response.status}.`);
  }

  const content = payload?.choices?.[0]?.message?.content;
  const summary = extractMessageContent(content);

  if (!summary) {
    throw new Error("LM Studio returned an empty summary.");
  }

  return summary;
}
