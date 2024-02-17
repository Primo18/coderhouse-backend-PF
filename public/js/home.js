document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const quantity = 1; // Asumimos que quieres agregar una cantidad fija de 1

            fetch('/api/carts/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // No es necesario incluir el token JWT explícitamente aquí, ya que usamos cookies
                },
                credentials: 'include', // Asegura que las cookies se envíen con la solicitud
                body: JSON.stringify({ pid: productId, quantity: quantity })
            })
                .then(response => response.json())
                .then(data => {
                    // Incrementa el contador del carrito en el DOM
                    const cartCountElement = document.getElementById('cart-count');
                    let currentCount = parseInt(cartCountElement.textContent) || 0;
                    cartCountElement.textContent = currentCount + 1;

                    alert('Producto agregado al carrito');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });
});
