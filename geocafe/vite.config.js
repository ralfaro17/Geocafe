import { defineConfig } from "vite";
import {resolve} from 'path';

export default defineConfig({
    base: "/static/",
    root: "./src",
    build: {
        manifest: "manifest.json",
        emptyOutDir: true,
        outDir: resolve("./assets"),
        rollupOptions: {
            input: {
                "main": './src/course/register.js',
            }
        }
    }
})