// import Dos from 'js-dos';
import {EditorState} from "@codemirror/state"
import {EditorView, keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"


document.addEventListener('DOMContentLoaded', function () {
/*     Dos(document.getElementById("dos"), {
        url: "",
    }); */
    
    let startState = EditorState.create({
        doc: "Hello World",
        extensions: [keymap.of(defaultKeymap)]
    })
    
    let view = new EditorView({
        state: startState,
        parent: document.getElementById("editor")
    })
})    
