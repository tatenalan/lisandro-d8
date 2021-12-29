const socket = io();


socket.on("newProduct", product => {
    $("#table").append(`<tr><th scope="row">${product.id}</th><td>${product.title}</td><td>$${product.price}</td><td><img style="width:50px;" src="${product.thumbnail}" alt=""></td></tr>`)
})
socket.on("newMessage", message => {
    $("#messages").append(message);
    $("#dataInput")[0].value = ""
})
socket.on("error", () => {
    alert("Hubo un error")
})

$("#form-product").submit( e => {
    e.preventDefault();
    createProduct()
})
$("#form-chat").submit( e => {
    e.preventDefault();
    sendMessage()
});

function createProduct() {
    socket.emit("newProduct", $("#title")[0].value, $("#price")[0].value, $("#thumbnail")[0].value);
}
function sendMessage() {
    socket.emit("newMessage", $("#emailInput")[0].value, $("#dataInput")[0].value);
}
