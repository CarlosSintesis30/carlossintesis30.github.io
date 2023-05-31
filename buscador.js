
/*******buscador *******************************************/
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const linea=document.querySelector('.linea');
const caja1 = document.querySelector('.caja1');
const titulo_container_item=document.querySelectorAll('.titulo-container-item');

// Obtener todos los elementos con la clase 'item' 
const items = Array.from(document.querySelectorAll('.container-items .item')).map(item => {
  return {
    name: item.querySelector('h3').textContent.trim().toLowerCase(),
    element: item
  };
});

searchInput.addEventListener('input', searchItems);
searchButton.addEventListener('click', searchItems);
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchItems();
  }
});

// Ocultar la lista de resultados al hacer clic fuera de ella
document.addEventListener('click', (event) => {
  if (!searchResults.contains(event.target) && event.target !== searchInput) {
    searchResults.style.display = 'none';
  }
});

function searchItems() {
  const searchTerm = searchInput.value.toLowerCase();
  const matchingItems = items.filter(item => item.name.includes(searchTerm));

  if(searchTerm===''){
    hideSelectedItem(); // Ocultar el elemento seleccionado
  }
  displayResults(matchingItems);
}

function displayResults(matchingItems) {
  searchResults.innerHTML = '';
  const uniqueItems = [];

  if (matchingItems.length > 0) {
    matchingItems.forEach(item => {
      if (!uniqueItems.includes(item.name)) {
        uniqueItems.push(item.name);

        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        listItem.addEventListener('click', () => {
          searchInput.value = item.name;
          showSelectedItem(item);
        });
        searchResults.appendChild(listItem);
      }
    });

    // Agregar animación al mostrar el resultado
    searchResults.classList.add('animate__animated', 'animate__fadeInDown');
    searchResults.style.display = 'block';
  } else {
    const listItem = document.createElement('li');
    listItem.textContent = 'No se encontraron resultados.';
    searchResults.appendChild(listItem);
    searchResults.style.display = 'block';
  }

  if (searchInput.value === '') {
    searchResults.style.display = 'none'; // Oculta la lista de resultados
    showAllItems();
  }
}

function showSelectedItem(item) {
  const containerItems = document.querySelectorAll('.container-items .item');

  containerItems.forEach(item => {
    item.classList.add('ocultarItem');
  });

  item.element.classList.remove('ocultarItem');
  item.element.classList.remove('ocultar');

  searchResults.innerHTML = '';
  searchResults.style.display = 'none';

  // Agrega la clase de animación al elemento
  item.element.classList.add('animate__animated', 'animate__fadeIn', 'selected-item');
  linea.style.display='none', //oculta la linea divisora
  caja1.style.display = 'none'; //oculta el slider y las imágenes
  titulo_container_item.forEach(titulo_container_item => { // oculta los títulos de los contenedores de items
    titulo_container_item.style.display = 'none';
  });
}

function showAllItems() {
  const containerItems = document.querySelectorAll('.container-items .item');

  containerItems.forEach(item => {
    item.classList.remove('ocultarItem');
  });
  
  // Elimina la clase 'selected-item' de todos los elementos
  containerItems.forEach(item => {
    item.classList.remove('selected-item');
  });

  // Agregar animación al mostrar los elementos
  containerItems.forEach(item => {
    item.classList.add('animate__animated', 'animate__fadeIn');
  });

  caja1.style.display = 'block'; // Mostrar el slider y las imágenes
  
  titulo_container_item.forEach(titulo_container_item => { // Mostrar los títulos de los contenedores de items
    titulo_container_item.style.display = 'block';
  });
}

function hideSelectedItem() {
  const selectedItems = document.querySelectorAll('.selected-item');

  selectedItems.forEach(item => {
    item.classList.remove('animate__animated', 'animate__fadeIn', 'selected-item');
    
    const category = item.getAttribute('category');
    if (category && category !== 'inicio') {
      item.classList.add('ocultar');
    }
  });

  const inicioItems = document.querySelectorAll('.temp[category="inicio"]');
  inicioItems.forEach(item => {
    item.classList.remove('selected-item');
  });

  linea.style.display = 'block'; // Mostrar la línea divisora
  caja1.style.display = 'block'; // Mostrar el slider y las imágenes

  titulo_container_item.forEach(titulo_container_item => {
    titulo_container_item.style.display = 'block';
  });
}






