
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const errorMessage = document.getElementById('error-message');

    form.onsubmit = function (event) {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            event.preventDefault();
            errorMessage.textContent = 'Las nuevas contraseñas no coinciden. Por favor, inténtalo de nuevo.';
            errorMessage.style.display = 'block';
            return false;
        }

        errorMessage.style.display = 'none';
        return true;
    };
});

