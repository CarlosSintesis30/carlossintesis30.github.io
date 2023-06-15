(function() {
    const listElements = document.querySelectorAll('.menu_item--show');
    const list = document.querySelector('.menu_links');
    const menu = document.querySelector('.menu_hamburguer');

    const addClick = () => {
        listElements.forEach(element => {
            element.addEventListener('click', () => {
                let submenu = element.children[1];
                let height = 0;
                element.classList.toggle('menu_item_--active');

                if (submenu.clientHeight === 0) {
                    height = submenu.scrollHeight;
                }

                submenu.style.height = `${height}px`;
            });
        });
    };

    const deleteStyleHeight = () => {
        listElements.forEach(element => {
            if (element.children[1].getAttribute('style')) {
                element.children[1].removeAttribute('style');
                element.classList.remove('menu_item--active');
            }
        });
    };

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1023) {
            deleteStyleHeight();
            if (list.classList.contains('menu_links--show')) {
                list.classList.remove('menu_links--show');
            }
        } else {
            addClick();
        }
    });

    if (window.innerWidth <= 1023) {
        addClick();
    }

    menu.addEventListener('click', () => {
        list.classList.toggle('menu_links--show');
        deleteStyleHeight();
    });

    const menuLinks = document.querySelectorAll('.menu_link---inside');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            list.classList.remove('menu_links--show');
        });
    });
})();
