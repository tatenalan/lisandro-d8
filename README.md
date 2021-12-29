# Arnold

**TECNOLOGIAS**

    *Las tecnoligas usadas son Node Js., Express, Router.
    *Me base en la estructuracion de un framework MVC.
    *Hay un archivo .json que guarda los productos y otro los carritos.

**ENDPOINTS**

**PRODUCTOS**

    **GET**
    (Trae todos los productos)
    http://localhost:8080/api/productos/

*******************************************

    **GET**
    (Trae un producto especifico por id)
    http://localhost:8080/api/productos/:idProducto
    http://localhost:8080/api/productos/3

*******************************************

    **PUT**
    (Necesita ser ADMIN)
    Headers:
        Key: admin
        Value: 1
    (Actualiza un producto por id)
    http://localhost:8080/api/productos/:idProducto
    http://localhost:8080/api/productos/1

    body: {
            "id": 3,
            "email": "Camisaas",
            "price": 15,
            "data":"camisa.png"
    }

*******************************************

    **POST**
    (Necesita ser ADMIN)
    Headers:
        Key: admin
        Value: 1
    (Inserta un Nuevo producto)
    http://localhost:8080/api/productos/

    body: { 
            "title": "IPhone",
            "price": 320000,
            "thumnail": "nose"
    }

*******************************************

    **DELETE**
    (Necesita ser ADMIN)
    Headers:
        Key: admin
        Value: 1
    (Elimina un producto especifico por idProducto)
    http://localhost:8080/api/productos/:idProducto
    http://localhost:8080/api/productos/7


**MENSAJE**

    **GET**
    (Trae todos los mensajes)
    http://localhost:8080/api/mensajes

*******************************************

    **GET**
    (Trae mensajes especificos por email)
    http://localhost:8080/api/mensajes/:email

*******************************************

    **PUT**
    (Editar un Mensaje por id)
    http://localhost:8080/api/mensajes/:idMensaje
    http://localhost:8080/api/mensajes/1
    
    body: {
            "id": 3,
            "email": "Juan",
            "data":"Hola"
      }

*******************************************

    **POST**
    (Crea un mensaje)
    http://localhost:8080/api/mensajes/

    body: { 
            "email": "PEREz@gmail.com",
            "data": Chau
    }

*******************************************

    **DELETE**
    (Elimina un mensaje por id)
    http://localhost:8080/api/mensajes/:idMensaje
    http://localhost:8080/api/mensajes/13
