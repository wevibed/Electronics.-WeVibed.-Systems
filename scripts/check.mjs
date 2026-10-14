
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

let errors = 0;
let warnings = 0;

function error(message) {
  console.error(`ERROR: ${message}`);
  errors++;
}

function readJson(relativePath, label) {
  const fullPath = path.join(root, relativePath);

  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (err) {
    error(`${label}: cannot read or parse (${err.message})`);
    return null;
  }
}

const site = readJson("src/data/site.json", "site.json");
const productData = readJson("src/data/products.json", "products.json");

if (site !== null && (typeof site !== "object" || Array.isArray(site))) {
  error("site.json: expected a JSON object");
}

let products = null;

if (Array.isArray(productData)) {
  products = productData;
} else if (productData && typeof productData === "object") {
  for (const key of ["products", "items", "data"]) {
    if (Array.isArray(productData[key])) {
      products = productData[key];
      break;
    }
  }
}

if (productData !== null && products === null) {
  error("products.json: expected an array or an object containing a products, items, or data array");
}

if (products) {
  const ids = new Set();

  for (const [index, product] of products.entries()) {
    if (!product || typeof product !== "object" || Array.isArray(product)) {
      error(`products.json: product ${index + 1} must be an object`);
      continue;
    }

    const id = product.id;

    if (id !== undefined && id !== null && id !== "") {
      if (ids.has(String(id))) {
        error(`products.json: duplicate product id "${id}"`);
      }
      ids.add(String(id));
    }
  }
}

for (const relativePath of [
  "index.html",
  "package.json",
  "src/App.jsx",
  "src/data/site.json",
  "src/data/products.json",
]) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    error(`Required file is missing: ${relativePath}`);
  }
}

console.log(`\ncheck: ${errors} error(s), ${warnings} warning(s)`);

if (errors > 0) {
  process.exit(1);
}
