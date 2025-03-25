import { execSync } from "child_process";
import fs from "fs-extra";

execSync("next build", { stdio: "inherit" });
execSync("next export", { stdio: "inherit" });

// Ensure public/static exists
fs.ensureDirSync("out/static");
console.log("Static site exported to /out");
