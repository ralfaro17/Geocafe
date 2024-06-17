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
        Swal.fire({
            icon: 'info',
            title: 'Message',
            text: result.message,
        });
    })
}

export default increment_unit;