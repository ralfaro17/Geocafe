function myFunction() {
    var dropdown = document.getElementById("myDropdown");
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        setTimeout(function() {
            dropdown.style.display = 'none';
        }, 300); // Coincide con la duración de la transición en CSS
    } else {
        dropdown.style.display = 'block';
        setTimeout(function() {
            dropdown.classList.add('show');
        }, 10); // Pequeño retraso para asegurar que la transición ocurra
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.drop-img-users')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                setTimeout(function() {
                    openDropdown.style.display = 'none';
                }, 300); // Coincide con la duración de la transición en CSS
            }
        }
    }
}
