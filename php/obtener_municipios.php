<?php
    require_once 'conexion db.php';
    // obtener_municipios.php

    // Verificar si se recibió el parámetro 'department' en la URL
    if (isset($_GET['department'])) {
        $selectedDepartmentId = $_GET['department'];

        // Realizar la consulta SQL para obtener los municipios del departamento seleccionado
        $sql = "SELECT * FROM municipios WHERE idDepartamento = $selectedDepartmentId";
        $result = $conn->query($sql);

        // Crear un arreglo para almacenar los municipios
        $municipalities = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
            $municipality = [
                'idMunicipio' => $row['idMunicipio'],
                'nombre_municipio' => $row['nombre_municipio']
            ];
            $municipalities[] = $municipality;
            }
        }

        $conn->close();

        // Devolver la respuesta en formato JSON
        header('Content-Type: application/json');
        echo json_encode($municipalities);
        exit(); // Salir del script para evitar cualquier salida adicional
    }
?>
