import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/random.ts"],
    format: ["cjs", "esm"],
    outDir: "./dist",
    dts: true,
    clean: true
})