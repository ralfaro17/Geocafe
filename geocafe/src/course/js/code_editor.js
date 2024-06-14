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
import { getDjangoValue, getUserFiles, isValidFilename } from "./helpers.js";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Cookies from 'js-cookie'

document.addEventListener('DOMContentLoaded', function () {
/*     Dos(document.getElementById("dos"), {
        url: "",
    }); */
    
    let currentFile = null;
    const loadButton = document.querySelector("#load-button");
    const saveButton = document.querySelector("#save-button");
    const downloadButton = document.querySelector("#download-button");
    const saveAsButton = document.querySelector("#save-as-button");
    const deleteButton = document.querySelector("#delete-button");
    const downloadAndRun = document.querySelector("#turboc-button");
    let username = getDjangoValue('user_username');


    
    loadButton.addEventListener("click", () => {
        // this creates the select element with all the files of the user
        const select = document.createElement("select");
        select.id = "swal-select";
        select.classList.add("swal2-select");
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait while the operation is in progress.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        fetch('/get-user-files')
        .then(response => response.json())
        .then(data => {
            Swal.close();
            if (data.files[0]){
                data.files[1].forEach(file => {
                    const filename = file.replace(`user_files/${username}/`, "");
                    const option = document.createElement("option");
                    option.text = filename
                    option.value = filename.slice(0, filename.length - 2);
                    select.add(option);
                })
                // this fires a sweet alert with all the files of the user
                Swal.fire({
                    title: 'Select a file to load',
                    html: select,
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Load file",
                    focusConfirm: false,
                    preConfirm: () => {
                        const selectedOption = document.getElementById('swal-select').value;
                        if(selectedOption === "" || selectedOption === null){
                            Swal.showValidationMessage("You need to select a file");
                        }
                        else{
                            return selectedOption;
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Loading...',
                            text: 'Please wait while the operation is in progress.',
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading();
                            }
                        });
                        const selectedOption = result.value;
                        currentFile = selectedOption;
                        const csrftoken = Cookies.get('csrftoken'); 
                        fetch("/get-user-file", {
                            method: 'POST',
                            headers: {
                                'X-CSRFToken': csrftoken,
                            },
                            body: JSON.stringify({filename: selectedOption, option: "text"})
                        })
                        .then(response => response.json())
                        .then(data => {
                            Swal.close();
                            if(data.file[0]){
                                view.dispatch({
                                    changes: {from: 0, to: view.state.doc.length, insert: data.file[1]}
                                });
                                Swal.fire("File loaded successfully");
                            }
                            else{
                                currentFile = null;
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "An error ocurred while getting your file",
                                });
                            }
                        })
                    }
                });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error ocurred while getting your files",
                });
            }
        })

        
    });
    
    
    // function to save the file
    saveButton.addEventListener("click", () => {
        if(!view.state.doc.toString()){
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "You need to write something before saving the file",
            });
            return;
        }
        else if(currentFile){
            Swal.fire({
                title: `Do you want to overwrite the file ${currentFile}.C?`,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Overwrite file",
                focusConfirm: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    const csrftoken = Cookies.get('csrftoken'); 
                    Swal.fire({
                        title: 'Loading...',
                        text: 'Please wait while the operation is in progress.',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    fetch("/save-user-file", {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': csrftoken,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({filename: currentFile, content: view.state.doc.toString()})
                    })
                    .then(response => response.json())
                    .then(data => {
                        Swal.close()
                        if(data.message[0]){
                            Swal.fire("File saved successfully");
                        }
                        else{
                            currentFile = null;
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "An error ocurred while saving your file",
                            });
                        }
                    })
                }
            });
            return;
        }
        else{
            Swal.fire({
                title: 'Enter the name of the file (it will be capitalized)',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'words',
                    autocorrect: 'off'
                },
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Save file",
                focusConfirm: false,
                preConfirm: (filename) => {
                    if(!isValidFilename(filename)){
                        Swal.showValidationMessage("You need to enter a filename without special characters, dots, or spaces");
                    }
                    else{
                        return filename;
                    }
                }
            })
            .then((result) => {
                if (result.isConfirmed) {
                    const filename = result.value.toUpperCase();
                    const csrftoken = Cookies.get('csrftoken'); 
                    currentFile = filename;
                    Swal.fire({
                        title: 'Loading...',
                        text: 'Please wait while the operation is in progress.',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    fetch("/save-user-file", {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': csrftoken,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({filename: filename, content: view.state.doc.toString()})
                    })
                    .then(response => response.json())
                    .then(data => {
                    Swal.close();
                    if(data.message[0]){
                        Swal.fire("File saved successfully");
                    }
                    else{
                        filename = null;
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "An error ocurred while saving your file",
                        });
                    }
                })  
                }
            });
        }
    })


    downloadButton.addEventListener("click", () => {
        if(currentFile){
            const blob = new Blob([view.state.doc.toString()], {type: "text/plain"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${currentFile}.C`;
            a.click();
            URL.revokeObjectURL(url);
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "You need to save the file before downloading it",
            });
        }
    })


    saveAsButton.addEventListener("click", () => {
        Swal.fire({
            title: 'Enter the name of the file (it will be capitalized)',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'words',
                autocorrect: 'off'
            },
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Save file",
            focusConfirm: false,
            preConfirm: (filename) => {
                if(!isValidFilename(filename)){
                    Swal.showValidationMessage("You need to enter a filename without special characters, dots, or spaces");
                }
                else{
                    return filename;
                }
            }
        })
        .then((result) => {
            if (result.isConfirmed) {
                const filename = result.value.toUpperCase();
                Swal.fire({
                    title: 'Loading...',
                    text: 'Please wait while the operation is in progress.',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                const csrftoken = Cookies.get('csrftoken'); 
                currentFile = filename;
                fetch("/save-user-file", {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': csrftoken,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({filename: filename, content: view.state.doc.toString()})
                })
        .then(response => response.json())
        .then(data => {
            Swal.close();
                if(data.message[0]){
                    Swal.fire("File saved successfully");
                }
                else{
                    filename = null;
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error ocurred while saving your file",
                    });
                }
            })
            }
        });
    });


    deleteButton.addEventListener("click", () => {
        // this creates the select element with all the files of the user
        const select = document.createElement("select");
        select.id = "swal-select";
        select.classList.add("swal2-select");
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait while the operation is in progress.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        fetch('/get-user-files')
        .then(response => response.json())
        .then(data => {
            Swal.close()
            if (data.files[0]){
                data.files[1].forEach(file => {
                    const filename = file.replace(`user_files/${username}/`, "");
                    const option = document.createElement("option");
                    option.text = filename
                    option.value = filename.slice(0, filename.length - 2);
                    select.add(option);
                })
                // this fires a sweet alert with all the files of the user
                Swal.fire({
                    title: 'Select a file to delete',
                    html: select,
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Delete file",
                    focusConfirm: false,
                    preConfirm: () => {
                        const selectedOption = document.getElementById('swal-select').value;
                        if(selectedOption === "" || selectedOption === null){
                            Swal.showValidationMessage("You need to select a file");
                        }
                        else{
                            return selectedOption;
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const selectedOption = result.value;
                        const csrftoken = Cookies.get('csrftoken'); 
                        Swal.fire({
                            title: 'Loading...',
                            text: 'Please wait while the operation is in progress.',
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading();
                            }
                        });
                        fetch("/delete-user-file", {
                            method: 'POST',
                            headers: {
                                'X-CSRFToken': csrftoken,
                            },
                            body: JSON.stringify({filename: selectedOption})
                        })
                        .then(response => response.json())
                        .then(data => {
                            Swal.close()
                            if(data?.message[0]){
                                console.log(selectedOption);
                                console.log(currentFile);
                                if(selectedOption === currentFile){
                                    currentFile = null;
                                    view.dispatch({
                                        changes: {from: 0, to: view.state.doc.length, insert: `#include <stdio.h>\n\nint main() {\n    printf("Hello, ${username}!\\n");\n    return 0;\n}`}
                                    });
                                }
                                Swal.fire("File deleted successfully");
                            }
                            else{
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "An error ocurred while deleting your file",
                                });
                            }
                        })
                    }
                });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error ocurred while getting your files",
                });
            }
        })

        
    })


    downloadAndRun.addEventListener("click", () => {
        if(currentFile){
            const csrftoken = Cookies.get('csrftoken'); 
            fetch("/get-user-file", {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({filename: currentFile, option: "url"})
            })
            .then(response => response.json())
            .then(data => {
                if(data.file[0]){
                    console.log(data.file[1])
                    console.log(currentFile)
                    const url = `https://developerinsider.co/runturbocpp/?run=turbocpp:~developerinsider.co~${data.file[1]}~${currentFile}.C`

                    // Open the URL in a new window
                    var newWindow = window.open(url, '_blank');

                    // Focus on the new window/tab (optional)
                    if (newWindow) {
                        newWindow.focus();
                    }
                    Swal.fire("File downloaded successfully");
                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error ocurred while downloading your file",
                    });
                }
            })
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "You need to save the file before downloading it",
            });
        }
    })



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
