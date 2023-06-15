document.addEventListener('DOMContentLoaded', function() {
  const productList = document.getElementById('product-list');
  const payButton = document.getElementById('pay-button');

  const idInput = document.getElementById('id');

  idInput.addEventListener('input', () => {
    const maxLength = 9;
    if (idInput.value.length > maxLength) {
      idInput.value = idInput.value.slice(0, maxLength);
    }
  });
  
  // Obtener lista de productos del Local Storage
  const allProducts = JSON.parse(localStorage.getItem('allProducts'));
  // Mostrar la lista de productos en el carrito
  if (allProducts && allProducts.length > 0) {
    allProducts.forEach(product => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
      <div class="product-item">
          <img src="${product.image}" alt="Product Image">
          <span>cantidad: ${product.quantity}</span>
          <span> ${product.title}</span>
          <span> ${product.price}</span>
      </div>
      `;
      productList.appendChild(listItem);
    });
              // Calcular el total a pagar
        const totalPagar = allProducts.reduce((total, product) => {
          return total + (product.price.slice(1) * product.quantity);
        }, 0);

        // Mostrar el total en el HTML
        const totalPagarSpan = document.querySelector('.total_pagar');
        totalPagarSpan.textContent = `$${totalPagar}`;

  }

  /* ------------------------------------------------------------------------ */
  /* document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario de forma tradicional
  
    // Obtener lista de productos del Local Storage
    const allProducts = JSON.parse(localStorage.getItem('allProducts'));
  
    // Realizar una solicitud AJAX a tu archivo PHP
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        // Aquí puedes realizar cualquier acción adicional después de enviar los datos a PHP
        console.log('Datos enviados a PHP');
        // Continuar con el envío del formulario de forma tradicional
        document.getElementById('payment-form').submit();
      }
    };
    xhttp.open('POST', './php/procesar_formulario.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send('allProducts=' + JSON.stringify(allProducts));
  }); */
  
  
});
