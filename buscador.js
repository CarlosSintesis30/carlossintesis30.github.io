/*******buscador */
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const itemContainer = document.getElementById('item-container');

searchButton.addEventListener('click', searchItems);
searchInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    searchItems();
  }
});

function searchItems() {
  const searchTerm = searchInput.value.toLowerCase();
  const items = Array.from(itemContainer.getElementsByClassName('item'));

  items.forEach(item => {
    const itemName = item.querySelector('h3').textContent.toLowerCase();

    if (itemName.includes(searchTerm)) {
      item.classList.remove('hidden1');
    } else {
      item.classList.add('hidden1');
    }
  });

  const visibleItems = Array.from(itemContainer.getElementsByClassName('item')).filter(item => !item.classList.contains('hidden1'));

  if (visibleItems.length === 0) {
    itemContainer.innerHTML = '<p>No se encontraron resultados.</p>';
  }
}
