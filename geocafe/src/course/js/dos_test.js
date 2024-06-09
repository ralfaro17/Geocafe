import Dosbox from 'js-dos';

document.addEventListener('DOMContentLoaded', function () {
    dosbox = new Dosbox({
        id: "dosbox",
        onload: function (dosbox) {
            dosbox.run("./PRUEBA.EXE");
        },
        onrun: function (dosbox, exe) {
            console.log(exe + " is runned");
        }
    });
})    
