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
                "auto_complete_list": './src/course/js/auto_complete_list.js',
                "styles": './src/course/js/styles.js',
                "figure1": './src/course/js/index-figure1.js',
                "figure2": './src/course/js/index-figure2.js',
                "figure404": './src/course/js/figure404.js',
                "figure500": './src/course/js/figure500.js',
                "account_settings": './src/course/js/account_settings.js',
                "increment_unit": './src/course/js/increment_unit.js',
                "quiz": './src/course/js/quiz.js',
                "units": './src/course/js/units.js',
                "helpers": './src/course/js/helpers.js',
                "code_editor": './src/course/js/code_editor.js',
            }
        }
    }
})