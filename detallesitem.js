// Obtener todos los elementos de la clase "item" dentro de la clase "container-items"
const itemss = document.querySelectorAll('.container-items .item');

// Agregar un event listener a cada elemento
itemss.forEach(item => {
  item.addEventListener('click', (event) => {
    // Obtener el elemento que desencadenó el evento
    const targetElement = event.target;

    // Verificar si el evento se originó desde el botón "btn-add-cart"
    if (targetElement.classList.contains('btn-add-cart')) {
      // si se da click al boton agregar al carrito no hacer nada, ya que se invoca el codigo del evento,
      //agregar al carrito en el index,js

      }else{
        
      // Obtener la información del item
      const itemId = item.id;
      const imageSrc = item.querySelector('.img-item').src;
      const title = item.querySelector('h3').textContent;
      const price = item.querySelector('.price').textContent;

      // Crear un objeto con la información del item
      const itemInfo = {
        itemId,
        imageSrc,
        title,
        price
      };

      // Convertir el objeto en una cadena JSON
      const itemInfoJSON = JSON.stringify(itemInfo);

      // Codificar la cadena JSON para pasarla como parámetro en la URL
      const encodedItemInfo = encodeURIComponent(itemInfoJSON);

      // Redireccionar a la nueva página y pasar la información del item como parámetro en la URL
      window.location.href = `detallesitem.html?item=${encodedItemInfo}`;
    }
  });
});




window.addEventListener('DOMContentLoaded', (event) => {
    const itemDetailsContainer = document.getElementById('item-details');
    const itemTitulo=document.getElementById('titulo-detalles-item');
    // Obtener el parámetro "item" de la URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const encodedItemInfo = urlParams.get('item');

    // Decodificar y analizar la información del artículo
    const decodedItemInfo = JSON.parse(decodeURIComponent(encodedItemInfo));

    // Mostrar la información del artículo en el contenedor
    itemTitulo.innerHTML=`<h2>${decodedItemInfo.title}</h2>`;
    itemDetailsContainer.innerHTML = `
    <div class="item temp" category="laptops" id="${decodedItemInfo.itemId}">
        <figure style=" text-align: center;">
            <img class="img-item" src="${decodedItemInfo.imageSrc}"  alt="latop gamer"/>
        </figure>
        <div class="info-producto">
            <h3 class="ocultar">${decodedItemInfo.title}</h3>
            <h4 class="price">${decodedItemInfo.price}</h4>
            <button class="btn-add-cart">Anadir al carrito</button>
        </div>
        <hr/>
    </div>
    `;
  });
