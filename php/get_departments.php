<?php

// Consulta SQL para obtener los departamentos
$sql = "SELECT * FROM departamentos";
$result = $conn->query($sql);

// Obtener los resultados y almacenarlos en un array
$departments = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $departments[] = $row;
    }
}

// Cerrar la conexión a la base de datos
$conn->close();

// Guardar los departamentos en el localStorage
echo '<script>';
echo 'localStorage.setItem("departments", ' . json_encode($departments) . ');';
echo 'console.log(departments);';
echo '</script>';
?>
