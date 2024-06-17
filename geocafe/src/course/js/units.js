import { getDjangoValue } from "./helpers";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

var coll = document.getElementsByClassName("collapsible");
var i;
let newUnit = getDjangoValue("new_unit");
let courseCompleted = getDjangoValue("course_completed");


for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}


if(newUnit != null && newUnit != ""){
  Swal.fire({
    title: 'Unit Completed',
    text: 'You have completed a unit check out the next one!',
    icon: 'success',
    confirmButtonText: 'Ok'
  })
}

if(courseCompleted != null && courseCompleted != ""){
  Swal.fire({
    title: 'Course completed',
    text: 'Congratulations you have completed the course!',
    icon: 'success',
    confirmButtonText: 'Ok'
  })
}