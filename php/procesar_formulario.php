<?php
require_once 'conexion db.php';

// Verificar si se ha enviado el formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Obtener los datos del formulario
        $dui = isset($_POST["id"]) ? $_POST["id"] : 0; 
        $nombre = isset($_POST["name"]) ? $_POST["name"] : "";
        $apellido = isset($_POST["lastname"]) ? $_POST["lastname"] : "";
        $direccion = isset($_POST["address"]) ? $_POST["address"] : "";
        $departamento = isset($_POST["department"]) ? intval($_POST["department"]) : 0; // Convertir a entero;
        $municipio = isset($_POST["municipality"]) ? intval($_POST["municipality"]) : 0; // Convertir a entero;
        $email = isset($_POST["emailpagar"]) ? $_POST["emailpagar"] : "";
        $telefono = isset($_POST["telefono"]) ? intval($_POST["telefono"]) : 0; // Convertir a entero

        // Escapar los valores para evitar problemas de seguridad
        $dui = mysqli_real_escape_string($conn, $dui);
        $nombre = mysqli_real_escape_string($conn, $nombre);
        $apellido = mysqli_real_escape_string($conn, $apellido);
        $direccion = mysqli_real_escape_string($conn, $direccion);
        $departamento = mysqli_real_escape_string($conn, $departamento);
        $municipio = mysqli_real_escape_string($conn, $municipio);
        $email = mysqli_real_escape_string($conn, $email);
        $telefono = mysqli_real_escape_string($conn, $telefono);
        
        // Obtener la fecha y hora actual
        $fechaHora = date('Y-m-d');

         // Crear la consulta SQL INSERT con la fecha y hora
        $sql = "INSERT INTO ordenes (dui, nombre, apellido, direccion, idDepartamento, idMunicipio, email, telefono, fechaorden)
        VALUES ('$dui', '$nombre', '$apellido', '$direccion', '$departamento', '$municipio', '$email', '$telefono', '$fechaHora')";

        // Ejecutar la consulta
        if ($conn->query($sql) === TRUE) {
                // Mostrar mensaje de confirmación
                echo '<!DOCTYPE html>
                <html>
                <head>
                    <title>Confirmación de Pedido</title>
                    <link rel="stylesheet" type="text/css" href="../css/pagar.css">
                </head>
                <body>
                    <div class="container">
                        <h1>¡Pedido realizado correctamente!</h1>
                        <p>Gracias por tu compra. El pedido se ha realizado exitosamente.</p>
                    </div>
                </body>
                </html>';
        } else {
            echo "Error al insertar el registro: " . $conn->error;
        }

    }



    // Verificar si se ha recibido el arreglo allProducts
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['allProducts'])) {
            // Obtener el JSON de allProducts enviado desde JavaScript
            $allProductsJSON = $_POST['allProducts'];

            // Decodificar el JSON a un array de productos
            $allProducts = json_decode($allProductsJSON, true);

            // Verificar si la decodificación fue exitosa
            if (is_array($allProducts)) {
                    foreach ($allProducts as $product) {
                        // Procesar cada producto en el arreglo
                        $productID = intval($product['id']);
                        $price = floatval(str_replace('$', '', $product['price']));
                        //$title = mysqli_real_escape_string($conn, $product['title']);
                        $quantity = intval($product['quantity']);
                        
                        
                        // Ejemplo de consulta de inserción
                        $sql = "CALL sp_agregarOrdenDetalle('$productID', '$price', '$quantity')";

                        // Ejecutar la consulta
                        if ($conn->query($sql) === TRUE) {
                            //echo "Registro insertado correctamente.";
                        } 
                        else {
                            echo "Error al insertar el registro: " . $conn->error;
                        }
                    }
            } 
            else {
                var_dump($allProducts);
                echo "Error al decodificar el JSON de allProducts.";
            }
            } 
            else {
            echo "No se recibieron los datos del arreglo allProducts correctamente.";
            }
            
         // Cerrar la conexión a la base de datos
         $conn->close();
?>
