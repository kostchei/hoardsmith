import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createServer, request as httpRequest } from "node:http";

const root = resolve(".");
const port = Number(process.env.PORT || 4173);
const lmStudioBase = new URL(process.env.LMSTUDIO_URL || "http://127.0.0.1:1234");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

function proxyLmStudio(request, response) {
  const upstreamPath = (request.url || "/").replace(/^\/api\/lmstudio/, "") || "/";
  const target = new URL(upstreamPath, lmStudioBase);
  const headers = { ...request.headers, host: target.host };

  const upstream = httpRequest(
    target,
    {
      method: request.method,
      headers
    },
    (upstreamResponse) => {
      response.writeHead(upstreamResponse.statusCode || 502, {
        ...upstreamResponse.headers,
        "Cache-Control": "no-store"
      });
      upstreamResponse.pipe(response);
    }
  );

  upstream.on("error", (error) => {
    response.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
    response.end(
      JSON.stringify({
        error: {
          message: `LM Studio proxy failed: ${error.message}`
        }
      })
    );
  });

  if (request.method === "GET" || request.method === "HEAD") {
    upstream.end();
    return;
  }

  request.pipe(upstream);
}

createServer((request, response) => {
  if ((request.url || "").startsWith("/api/lmstudio")) {
    proxyLmStudio(request, response);
    return;
  }

  const requestPath = request.url === "/" ? "/index.html" : request.url || "/index.html";
  const cleanPath = normalize(decodeURIComponent(requestPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = resolve(join(root, cleanPath));

  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const stat = statSync(filePath);
  const finalPath = stat.isDirectory() ? join(filePath, "index.html") : filePath;

  if (!existsSync(finalPath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": contentTypes[extname(finalPath)] || "application/octet-stream"
  });

  createReadStream(finalPath).pipe(response);
}).listen(port, () => {
  console.log(`ItemGen static server running at http://localhost:${port}`);
});
