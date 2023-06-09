
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
  containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelectorAll('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');
const btnPagar = document.querySelector('.btn-pagar');
const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');



const loadLocalStorage = () => {
  if (localStorage.getItem('allProducts')) {
    allProducts = JSON.parse(localStorage.getItem('allProducts'));
    showHTML();
  }
};

for (let i = 0; i < productsList.length; i++) {
  const notification = document.getElementById('notification');
  productsList[i].addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
      const product = e.target.closest('.item');

      const infoProduct = {
        id: product.getAttribute('id'),
        quantity: 1,
        title: product.querySelector('h3').textContent,
        price: product.querySelector('h4').textContent,
        image: product.querySelector('.img-item')
          ? product.querySelector('.img-item').getAttribute('src')
          : '',
      };
      // Mostrar la notificación
      notification.classList.add('show');

      // Ocultar la notificación después de 2 segundos
      setTimeout(() => {
        notification.classList.remove('show');
      }, 2000);

      const exists = allProducts.some(
        (product) => product.title === infoProduct.title
      );

      if (exists) {
        const updatedProducts = allProducts.map((product) => {
          if (product.title === infoProduct.title) {
            product.quantity++;
          }
          return product;
        });
        allProducts = [...updatedProducts];
      } else {
        allProducts.push(infoProduct);
      }
      
      
      saveLocalStorage();
      showHTML();
    }
  });
}

/* Evento del botón eliminar */
rowProduct.addEventListener('click', (e) => {
  if (e.target.classList.contains('icon-close')) {
    const product = e.target.parentElement;
    const title = product.querySelector('p').textContent;

    allProducts = allProducts.filter(
      (product) => product.title !== title
    );

    saveLocalStorage();
    showHTML();
  }
});

rowProduct.addEventListener('click', (e) => {
  if (e.target.classList.contains('restar-cantidad')) {
    const product = e.target.parentElement.parentElement;
    const title = product.querySelector('p').textContent;

    allProducts = allProducts.map((product) => {
      if (product.title === title && product.quantity > 1) {
        product.quantity--;
      }
      return product;
    });

    saveLocalStorage();
    showHTML();
  }

  if (e.target.classList.contains('sumar-cantidad')) {
    const product = e.target.parentElement.parentElement;
    const title = product.querySelector('p').textContent;

    allProducts = allProducts.map((product) => {
      if (product.title === title) {
        product.quantity++;
      }
      return product;
    });

    saveLocalStorage();
    showHTML();
  }
});

const updatePayButtonVisibility = () => {
  if (allProducts.length === 0) {
    btnPagar.style.display = 'none';
  } else {
    btnPagar.style.display = 'block';
  }
};

//funcion para truncar texto
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

// Función para mostrar HTML
const showHTML = () => {
  if (!allProducts.length) {
    cartEmpty.classList.remove('hidden');
    rowProduct.classList.add('hidden');
    cartTotal.classList.add('hidden');
  } else {
    cartEmpty.classList.add('hidden');
    rowProduct.classList.remove('hidden');
    cartTotal.classList.remove('hidden');
  }

  rowProduct.innerHTML = '';
  let total = 0;
  let totalOfProducts = 0;

  allProducts.forEach((product) => {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('cart-product');

    containerProduct.innerHTML = `
      <div class="info-cart-product">
        <img class="product-image" src="${product.image}" alt="Imagen del producto">
        <div class="cantidad-carrito">
         <i class='bx bx-minus-circle restar-cantidad' ></i>
          <span class="cantidad-producto-carrito">${product.quantity}</span>
          <i class='bx bx-plus-circle sumar-cantidad'></i>
        </div>
        <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio-producto-carrito">${product.price}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon-close"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    `;

    rowProduct.append(containerProduct);

    total = total + parseFloat(product.quantity * product.price.slice(1));
    totalOfProducts = totalOfProducts + product.quantity;
  });
  
  // Truncar el texto en el elemento con la clase "titulo-producto-carrito"
  const tituloProducto = document.querySelector('.titulo-producto-carrito');
  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalOfProducts;

  updatePayButtonVisibility();
};




loadLocalStorage();


const saveLocalStorage = () => {
  localStorage.setItem('allProducts', JSON.stringify(allProducts));
};






/* ****************slider **********************/
const slider = document.querySelector('.slider');
const sliderContainer = slider.querySelector('.slider-container');
const slides = sliderContainer.querySelectorAll('img');
const prevButton = slider.querySelector('.slider-button-prev');
const nextButton = slider.querySelector('.slider-button-next');
const slideWidth = slides[0].clientWidth;
let currentSlide = 0;

function goToSlide(slideIndex) {
sliderContainer.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
currentSlide = slideIndex;
}

function goToPrevSlide() {
if (currentSlide === 0) {
  goToSlide(slides.length - 1);
} else {
  goToSlide(currentSlide - 1);
}
}

function goToNextSlide() {
if (currentSlide === slides.length - 1) {
  goToSlide(0);
} else {
  goToSlide(currentSlide + 1);
}
}

let slideInterval = setInterval(goToNextSlide, 3000);

slider.addEventListener('mouseover', () => {
clearInterval(slideInterval);
});

slider.addEventListener('mouseout', () => {
slideInterval = setInterval(goToNextSlide, 3000);
});

prevButton.addEventListener('click', goToPrevSlide);
nextButton.addEventListener('click', goToNextSlide);


sliderNext.addEventListener("click", () => {
clearInterval(autoSlide);
moveSlide(1);
autoSlide = setInterval(() => {
  moveSlide(1);
}, 3000);
});





