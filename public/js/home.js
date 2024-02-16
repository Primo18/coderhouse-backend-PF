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
                    updateCartCount();
                    console.log(data);
                    // Código para actualizar la UI basado en la respuesta, por ejemplo:
                    alert('Producto agregado al carrito');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });
});


function updateCartCount() {
    // Realiza una solicitud para obtener la cantidad actual de productos en el carrito
    fetch('/api/carts/count', {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('cart-count').textContent = data.count;
        })
        .catch(error => console.error('Error:', error));
}
