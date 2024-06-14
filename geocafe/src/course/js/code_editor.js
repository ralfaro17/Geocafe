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
import { getDjangoValue, getUserFiles } from "./helpers.js";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Cookies from 'js-cookie'

document.addEventListener('DOMContentLoaded', function () {
/*     Dos(document.getElementById("dos"), {
        url: "",
    }); */
    const loadButton = document.querySelector("#load-button");
    const saveButton = document.querySelector("#save-button");
    let username = getDjangoValue('user_username');
    
    
    loadButton.addEventListener("click", () => {
        const select = document.createElement("select");
        select.id = "swal-select";
        select.classList.add("swal2-select");
        fetch('/get-user-files')
        .then(response => response.json())
        .then(data => {
            if (data.files[0]){
                data.files[1].forEach(file => {
                    const filename = file.replace(`user_files/${username}/`, "");
                    const option = document.createElement("option");
                    option.text = filename
                    option.value = filename.slice(0, filename.length - 2);
                    select.add(option);
                })
                files = data.files[1];
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error ocurred while getting your files",
                });
            }
        })

        
        Swal.fire({
            title: 'Select your option',
            html: select,
            focusConfirm: false,
            preConfirm: () => {
                const selectedOption = document.getElementById('swal-select').value;
                return selectedOption;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedOption = result.value;
                console.log(selectedOption);
                const csrftoken = Cookies.get('csrftoken'); 
                fetch("/get-user-file", {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({filename: selectedOption})
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(data.file[0]){
                        view.dispatch({
                            changes: {from: 0, to: view.state.doc.length, insert: data.file[1]}
                        });
                        Swal.fire("File loaded successfully");
                    }
                    else{
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "An error ocurred while getting your file",
                        });
                    }
                })
            }
        });
    });
    
    



    const tabSize = indentUnit.of("    ");

    const editorContainer = document.getElementById('editor');
    
    // This creates the starting state of the editor
    let startState = EditorState.create({
        doc: `#include <stdio.h>\n\nint main() {\n    printf("Hello, ${username}!\\n");\n    return 0;\n}`,
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
