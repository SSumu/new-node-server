import { worker } from "workerpool";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
// import { __dirname } from "./index.js";

// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = dirname(__filename);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readHTMLFile = (filename) => {
  const data = readFileSync(join(__dirname, "public", filename));
  // return filename;
  return data;
};

worker({
  html: readHTMLFile,
  // about: readHTMLFile,
});
