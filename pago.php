
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0"
		/>
  <title>Confirmar Pago</title>
  <link rel="stylesheet" href="css/footer.css">
  <link rel="stylesheet" href="css/pagar.css">
  <link rel="stylesheet" href="estilo.css">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
<div class="payment-container">
  <form id="payment-form" class="payment-form" method="POST" action="./php/procesar_formulario.php">
    <label for="id">DUI (SIN GUION)</label>
    <input type="number" id="id" name="id" required>

    <label for="name">Nombre:</label>
    <input type="text" id="name" name="name" required>

    <label for="lastname">Apellido:</label>
    <input type="text" id="lastname" name="lastname" required>

    <label for="department">Departamento:</label>
    <select id="department" required name="department">
      <option value="">Selecciona un departamento</option>
      <?php
        require_once './php/conexion db.php';

        // Consulta SQL para obtener los departamentos
        $sql = "SELECT * FROM departamentos";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
            echo '<option value="' . $row['idDepartamento'] . '">' . $row['nombre_departamento'] . '</option>';
          }
        }

        $conn->close();
      ?>
    </select>

    <label for="municipality">Municipio:</label>
    <select id="municipality" name="municipality" required>
      <!-- Opciones de municipios se cargarán dinámicamente mediante JavaScript -->
    </select>

    <label for="address">Dirección:</label>
    <input type="text" id="address" name="address" required>

    <label for="email">Correo Electrónico:</label>
    <input type="email" id="emailpagar" name="emailpagar" required>

    <label for="telefono">Teléfono:</label>
    <input type="number" id="telefono" name="telefono" maxlength="8" required>
  
    <input type="hidden" name="allProducts" id="allProducts" value="" >

    <h2>Lista de Productos</h2>
    <ul id="product-list"></ul>

    <div class="cart-total">
      <h3>Total:</h3>
      <span class="total_pagar">$200</span>
    </div>

    <button type="submit">Realizar pedido</button>
  </form>
  <a href="index.html"><button>Regresar</button></a>
</div>
<script>
      // Obtener lista de productos del Local Storage
    const AllProducts = JSON.parse(localStorage.getItem('allProducts'));

    // Verificar si el arreglo tiene contenido
    if (Array.isArray(AllProducts) && AllProducts.length > 0) {
      // Convertir el arreglo a una cadena JSON
      const allProductsJSON = JSON.stringify(AllProducts);

      // Asignar el valor al campo oculto
      const allProductsField = document.getElementById('allProducts');
      allProductsField.value = allProductsJSON;

      // Realizar el envío del formulario al hacer clic en el botón "Realizar pedido"
      const submitButton = document.querySelector('button[type="submit"]');
      submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        document.getElementById('payment-form').submit(); // Enviar el formulario manualmente
      });
    } else {
      console.log('El arreglo allProducts está vacío o no existe.');
    }

</script>
  <script>
    document.getElementById('department').addEventListener('change', function() {
      var selectedDepartmentId = this.value;
      var municipalitySelect = document.getElementById('municipality');
    
      // Limpiar opciones de municipios
      while (municipalitySelect.firstChild) {
        municipalitySelect.removeChild(municipalitySelect.firstChild);
      }

      if (selectedDepartmentId !== '') {
        console.log(selectedDepartmentId);
        // Enviar solicitud AJAX para obtener los municipios del departamento seleccionado
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            // Parsear la respuesta JSON y agregar las opciones de municipios
            var municipalities = JSON.parse(this.responseText);
            for (var i = 0; i < municipalities.length; i++) {
              var option = document.createElement('option');
              option.value = municipalities[i].idMunicipio;
              option.text = municipalities[i].nombre_municipio;
              municipalitySelect.appendChild(option);
            }
          }
        };
        xhttp.open('GET', './php/obtener_municipios.php?department=' + selectedDepartmentId, true);
        xhttp.send();
      }
    });
  </script>
  <script src="index.js"></script>
  <script src="pago.js"></script>
</body>

<footer class="footer">
  <div class="footer-content">
    <div class="footer-section">
      <h3 class="footer-title">Servicios</h3>
      <ul class="footer-links">
        <li><a href="#">Reparación de computadoras</a></li>
        <li><a href="#">Reparación de impresoras</a></li>
        <li><a href="#">Soporte al cliente</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3 class="footer-title">Métodos de Pago</h3>
      <ul class="footer-links">
        <li><a href="#">Tarjeta de crédito</a></li>
        <li><a href="#">Transferencia bancaria</a></li>
        <li><a href="#">PayPal</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3 class="footer-title">Suscripción por Correo</h3>
      <p class="footer-description">Recibe las últimas ofertas y novedades en tu correo electrónico.</p>
      <form class="footer-form">
        <input type="email"  placeholder="Ingresa tu correo electrónico" required>
        <button type="submit" id="email">Suscribirse</button>
      </form>
    </div>
    <div class="footer-section">
      <h3 class="footer-title">Ubicación</h3>
      <p class="footer-description">Digital City</p>
      <p class="footer-description">123 Calle Principal</p>
      <p class="footer-description">Ciudad, País</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p class="footer-text">© 2023 Digital City. Todos los derechos reservados. Atentamente Las monas Chinas</p>
    <div class="footer-social-icons">
      <a href="#"><i class="bx bxl-facebook"></i></a>
      <a href="#"><i class="bx bxl-twitter"></i></a>
      <a href="#"><i class="bx bxl-instagram"></i></a>
      <a href="#"><i class="bx bxl-youtube"></i></a>
    </div>
  </div>
</footer>

</html>



