<?php
require_once 'conexion db.php';

// Obtener el ID del departamento seleccionado desde la URL
$departmentId = $_GET['department_id'];

// Consulta SQL para obtener los municipios del departamento seleccionado
$sql = "SELECT * FROM municipios WHERE idDepartamento = $departmentId";
$result = $conn->query($sql);

// Obtener los resultados y almacenarlos en un array
$municipalities = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $municipalities[] = $row;
    }
}

// Devolver los resultados como JSON
header('Content-Type: application/json');
echo json_encode($municipalities);

// Cerrar la conexión a la base de datos
$conn->close();
?>

