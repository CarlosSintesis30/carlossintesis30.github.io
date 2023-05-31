
/* --------------------------filtrar por categorias -------------*/
/* Este código agrega un event listener a cada elemento de categoría, 
y cuando se hace clic en uno de ellos, obtiene su atributo "category" 
y recorre todos los elementos de la clase "item" para compararlos con 
la categoría seleccionada. Si el elemento tiene la misma categoría, 
se quita la clase "ocultar" para mostrarlo; si no, se agrega la
clase "ocultar" para ocultarlo. */

// Obtener todos los elementos de categoría
const categoryItems = document.querySelectorAll('.category-item');

// Agregar un event listener a cada elemento de categoría
categoryItems.forEach(item => {
  item.addEventListener('click', () => {
    const category = item.getAttribute('category');
    const items = document.querySelectorAll('.temp');
    
    items.forEach(item => {
      if (category === 'inicio') {
        item.classList.remove('ocultar');
      } else {
        if (item.getAttribute('category') === category) {
          item.classList.remove('ocultar');
          item.classList.remove('ocultarItem');
          item.classList.remove('selected-item');
        } else {
          item.classList.add('ocultar');
        }
      }
    });
  });
});



const categoryLinks = document.querySelectorAll('.category-item');
for (let i = 0; i < categoryLinks.length; i++) {
categoryLinks[i].addEventListener('click', function() {
  // Obtener la categoría de la etiqueta "category"
  const category = this.getAttribute('category');
  
  // Remover la clase "selected" de todos los elementos
  for (let j = 0; j < categoryLinks.length; j++) {
    categoryLinks[j].classList.remove('ct-item-active');
  }
  
  // Agregar la clase "selected" al elemento seleccionado
  this.classList.add('ct-item-active');
});
}
