document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.homepage__accordion .jet-listing-grid__item');
    let activeIndex = 0;

    function updateDisplay() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'next', 'next-next', 'prev', 'd-none', 'last-active', 'last-prev');
            if (index === activeIndex) {
                if (index === items.length - 1) {
                    item.classList.add('last-active');
                    if (index > 0) items[index - 1].classList.add('last-prev');
                } else {
                    item.classList.add('active');
                    if (index < items.length - 1) items[index + 1].classList.add('next');
                    if (index < items.length - 2) items[index + 2].classList.add('next-next');
                    if (index > 0) items[index - 1].classList.add('prev');
                }
            } else if (index !== activeIndex + 1 && index !== activeIndex - 1) {
                item.classList.add('d-none');
            }
        });
    }

    updateDisplay();

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index !== activeIndex) {
                activeIndex = index;
                updateDisplay();
            }
        });
    });
});
