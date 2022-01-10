class Carousel {
    constructor(data) {
        this.data = data;
        this.carouselElem = document.createElement('div');
        this.carouselElem.classList.add('carousel');
    }

    renderCarouselItems() {
        const carouselWrapper = document.createElement('div');
        carouselWrapper.classList.add('carousel__wrapper');

        const carouselList = document.createElement('ul');
        carouselList.classList.add('carousel__list');

        this.data.forEach((item) => {
            const carouselItem = document.createElement('li');
            carouselItem.classList.add('carousel__item');

            const carouselLink = document.createElement('a');
            carouselLink.classList.add('carousel__link');
            carouselLink.href = item;
            carouselLink.style.backgroundImage = `url(${item})`;

            carouselItem.append(carouselLink);
            carouselList.append(carouselItem);
        });
        carouselWrapper.append(carouselList);
        this.carouselElem.append(carouselWrapper);
    }

    renderArrows() {
        const arrowRight = document.createElement('div');
        arrowRight.classList.add('arrow', 'right');

        const arrowLeft = document.createElement('div');
        arrowLeft.classList.add('arrow', 'left');

        this.carouselElem.prepend(arrowLeft);
        this.carouselElem.append(arrowRight);
    }

    showPopup(href) {
        const popUp = document.createElement('div');
        popUp.classList.add('popup');

        const popUpContent = document.createElement('div');
        popUpContent.classList.add('popup__content');

        const img = document.createElement('img');
        img.src = href;

        const closeBtn = document.createElement('div');
        closeBtn.classList.add('close');

        popUpContent.append(img, closeBtn);

        popUp.addEventListener('click', (event) => {
            if (event.target == img) {
                event.stopPropagation();
            } else {
                popUp.classList.add('hidden');
            }
        });

        popUp.append(popUpContent);

        return popUp;
    }

    init() {
        this.renderCarouselItems();
        this.renderArrows();

        const list = this.carouselElem.querySelector('.carousel__list');
        const arrows = this.carouselElem.querySelectorAll('.arrow');
        let x = 0;
        let width = 220;

        arrows.forEach((button) => {
            button.addEventListener('click', (event) => {
                let wrapWidth = this.carouselElem.querySelector('.carousel__wrapper').offsetWidth;
                let visibleElCount = Math.floor(wrapWidth / width);
                if (visibleElCount < 1) visibleElCount = 1;

                if (
                    event.target.classList.contains('right') &&
                    x < width * (this.data.length - visibleElCount)
                ) {
                    x += width * visibleElCount;
                    if (x >= width * (this.data.length - visibleElCount)) {
                        x += width * (this.data.length - visibleElCount) - x;
                    }

                    list.style.transform = `translateX(-${x}px)`;
                }

                if (event.target.classList.contains('left') && x > 0) {
                    x -= width * visibleElCount;
                    if (x <= 0) x = 0;

                    list.style.transform = `translateX(-${x}px)`;
                }
            });
        });

        list.addEventListener('click', (event) => {
            event.preventDefault();

            if (event.target.classList.contains('carousel__link'))
                document.body.append(this.showPopup(event.target.href));
        });

        return this.carouselElem;
    }
}
export default Carousel;
