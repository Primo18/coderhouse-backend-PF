document.getElementById('empty-cart-btn').addEventListener('click', function () {
    fetch('/api/carts/emptyCart', {
        method: 'POST',
        credentials: 'include', // Para asegurar de enviar las credenciales si el endpoint requiere autenticación
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Carrito vaciado con éxito');
                // Actualiza la interfaz de usuario aquí para reflejar el carrito vacío
                updateCartView();
            }
        })
        .catch(error => console.error('Error:', error));
});


function updateCartView() {
    const productList = document.querySelector('.product-list');

    // Limpia el contenido de la lista de productos
    productList.innerHTML = '';

    // Mostrar un mensaje indicando que el carrito está vacío
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Tu carrito está vacío.';
    productList.appendChild(emptyMessage);

    // Actualizar el contador del carrito a 0
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = '0';
    }
}
