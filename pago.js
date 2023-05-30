document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const payButton = document.getElementById('pay-button');
    const departmentSelect = document.getElementById('department');
    const municipalitySelect = document.getElementById('municipality');
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
        console.log(allProducts)
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="product-item">
            <img src="${product.image}" alt="Product Image">
            <span>Cantidad: ${product.quantity}</span>
            <span>Nombre: ${product.title}</span>
            <span>Precio: ${product.price}</span>
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

    // Actualizar la lista de municipios según el departamento seleccionado
    departmentSelect.addEventListener('change', function() {
      const selectedDepartment = departmentSelect.value;
      municipalitySelect.innerHTML = '';
  
      if (selectedDepartment === 'sonsonate') {
        addOptionToSelect('izalco', 'Izalco');
        addOptionToSelect('armenia', 'Armenia');
      } else if (selectedDepartment === 'santaana') {
        addOptionToSelect('santaana', 'Santa Ana');
        addOptionToSelect('rosale', 'Rosale');
      } else if (selectedDepartment === 'ahuachapan') {
        addOptionToSelect('armenia2', 'Armenia');
        addOptionToSelect('armenia3', 'Armenia2');
      }
    });
  
    // Función auxiliar para agregar opciones a un elemento select
    function addOptionToSelect(value, label) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      municipalitySelect.appendChild(option);
    }
  
    // Realizar pago (enviar el formulario)
    payButton.addEventListener('click', function() {
      const form = document.getElementById('payment-form');
      form.submit();
    });
  });
  