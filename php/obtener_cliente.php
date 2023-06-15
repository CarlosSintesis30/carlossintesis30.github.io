<?php
    require_once 'conexion db.php';

    $id = $_GET['id'];

    $sql = "SELECT * FROM clientes WHERE id = '$id'";
    $result = $conn->query($sql);

    $details=[];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $detail =[
                'name' => $row['nombre'],
                'lastname' => $row['apellido'],
                'department' => $row['idDepartamento'],
                'municipality' => $row['idMunicipio'],
                'address' => $row['direccion'],
                'email' => $row['email'],
                'telefono' => $row['telefono']
                // Agregar detalles de la lista de productos aquí
            ];
            $details[]=detail;
        }
    
   

            $conn->close();

            header('Content-Type: application/json');
            echo json_encode($details);
            exit(); // Salir del script para evitar cualquier salida adicional
    } else {
    // echo 'error';
    }


?>