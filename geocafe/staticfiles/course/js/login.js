document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        document.querySelector("button[type='submit']").disabled = true;
    })
});