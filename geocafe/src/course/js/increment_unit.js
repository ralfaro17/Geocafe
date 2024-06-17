import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Cookies from 'js-cookie'

function increment_unit() {
    fetch("/increment-unit", {
        method: 'POST',
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
        }
    })
    .then(response => response.json())
    .then(result => {
        if(result?.message == "Unit not incremented"){
            Swal.fire({
                icon: 'info',
                title: 'Message',
                text: result.message,
            });
        }
        else{
            if(result?.course_completed != null){
                window.location.href = '/units?course_completed=1';
            }
            else{
                window.location.href = '/units?unit_incremented=1';
            }
        }
    })
}

export default increment_unit;