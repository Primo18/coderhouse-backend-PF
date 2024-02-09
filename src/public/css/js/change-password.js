
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const errorMessage = document.getElementById('error-message'); // Accede al mensaje de error

    form.onsubmit = function (event) {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            event.preventDefault();
            errorMessage.textContent = 'Las nuevas contraseñas no coinciden. Por favor, inténtalo de nuevo.'; // Establece el mensaje de error
            errorMessage.style.display = 'block'; // Muestra el mensaje de error
            return false;
        }

        errorMessage.style.display = 'none'; // Asegúrate de ocultar el mensaje de error si todo está bien
        return true;
    };
});

