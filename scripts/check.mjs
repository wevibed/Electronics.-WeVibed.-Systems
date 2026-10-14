
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const errors = [];
const warnings = [];

function readJson(relativePath, label) {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(root, relativePath), "utf8")
    );
  } catch (error) {
    errors.push(`${label}: ${error.message}`);
    return null;
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

const site = readJson("src/data/site.json", "site.json");
const productsData = readJson("src/data/products.json", "products.json");

let products = [];

if (Array.isArray(productsData)) {
  products = productsData;
} else if (productsData && typeof productsData === "object") {
  const possibleKeys = ["products", "items", "data"];
  const key = possibleKeys.find(
    (name) => Array.isArray(productsData[name])
  );

  if (key) {
    products = productsData[key];
  } else {
    errors.push(
      "products.json: could not find a product array at the root or under products, items, or data"
    );
  }
}

if (site !== null && (typeof site !== "object" || Array.isArray(site))) {
  errors.push("site.json: expected an object");
}

if (productsData !== null) {
  if (products.length === 0) {
    warnings.push("Product catalogue is empty or has no recognized array");
  }

  const ids = new Set();

  for (const [index, product] of products.entries()) {
    if (!product || typeof product !== "object") {
      errors.push(`Product ${index + 1}: expected an object`);
      continue;
    }

    const id = product.id;
    if (id && ids.has(id)) {
      errors.push(`Duplicate product id: ${id}`);
    }
    if (id) ids.add(id);
  }
}

for (const file of [
  "index.html",
  "package.json",
  "src/main.jsx",
  "src/App.jsx",
  "src/data/site.json",
  "src/data/products.json",
]) {
  if (!exists(file)) errors.push(`Required file missing: ${file}`);
}

for (const warning of warnings) console.warn(`WARNING: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

console.log(`\ncheck: ${errors.length} error(s), ${warnings.length} warning(s)`);

if (errors.length) process.exitCode = 1;
