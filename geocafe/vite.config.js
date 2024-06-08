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
                "main": './src/course/js/register.js',
                "styles": './src/course/js/styles.js',
                "figure1": './src/course/js/index-figure1.js',
                "figure2": './src/course/js/index-figure2.js',
                "figure404": './src/course/js/figure404.js',
                "account_settings": './src/course/js/account_settings.js',
            }
        }
    }
})