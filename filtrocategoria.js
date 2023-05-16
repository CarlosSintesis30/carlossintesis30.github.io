const categoryLinks = document.querySelectorAll('.category-item');
categoryLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const category = link.getAttribute('category');
    filterItems(category);
  });
});

function filterItems(category) {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      if (category === 'all' || item.getAttribute('category') === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  window.addEventListener('load', () => {
    filterItems('all');
  });
  