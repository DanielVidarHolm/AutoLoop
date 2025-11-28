const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const srcDir = path.join(root, "src");
const distDir = path.join(root, "dist");

if (fs.existsSync(distDir)){
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

function copy(srcRelative, destRelative = srcRelative){
    const src = path.join(srcDir, srcRelative);
    const dest = path.join(distDir, destRelative);
    const destDirname = path.dirname(dest);

    if (!fs.existsSync(destDirname)) {
        fs.mkdirSync(destDirname, { recursive: true });
    }

    fs.copyFileSync(src, dest);
}

// Copy static files
copy("manifest.json");
copy("render/popup.html", "popup.html");
copy("assets/style.css", "style.css");

// Bundle JS
esbuild.buildSync({
    entryPoints: [
        path.join(srcDir, "scripts/content.js"),
        path.join(srcDir, "scripts/popup.js")
    ],
    outdir: distDir,
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ["chrome114"],
    format: "iife"
});

console.log("Build complete. Load ./dist in Chrome as unpacked extension.");