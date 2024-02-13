const socket = io();

function deleteProduct(id) {
    socket.emit('deleteProduct', id);
    window.location.reload();
}
