// import Dos from 'js-dos';
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { cpp } from "@codemirror/lang-cpp";
import { indentWithTab } from "@codemirror/commands";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";
import { indentUnit } from "@codemirror/language";
import rainbowBrackets from 'rainbowbrackets'
import autoCompleteList from './auto_complete_list.js'


document.addEventListener('DOMContentLoaded', function () {
/*     Dos(document.getElementById("dos"), {
        url: "",
    }); */

    const tabSize = indentUnit.of("    ");

    const editorContainer = document.getElementById('editor');
    
    // This creates the starting state of the editor
    let startState = EditorState.create({
        doc: `#include <stdio.h>\n\nint main() {\n    printf("Hello, Geocafe!\\n");\n    return 0;\n}`,
        extensions: [
            basicSetup, 
            cpp(),
            keymap.of([indentWithTab, ...defaultKeymap]),
            autocompletion({
                override: [completeFromList(autoCompleteList)], // Use custom completions
            }),
            tabSize,
            rainbowBrackets(),
        ]
    });
        
    // Create the editor view
    let view = new EditorView({
        state: startState,
        parent: editorContainer
    });
})    
