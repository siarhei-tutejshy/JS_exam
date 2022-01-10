class Slider {
    constructor(data) {
        this.data = data;
        this.sliderElem = document.createElement('div');
        this.sliderElem.classList.add('slider');
    }

    renderSlides() {
        const slideList = document.createElement('div');
        slideList.classList.add('slide__list');
        this.data.forEach((item) => {
            const sliderItem = document.createElement('div');
            sliderItem.classList.add('slider__item');
            sliderItem.style.backgroundImage = `url(${item.backgroundSrc})`;

            const contentItem = document.createElement('div');
            contentItem.classList.add('content');

            const titleItem = document.createElement('h3');
            titleItem.classList.add('slider__title');
            titleItem.innerText = item.title;

            const descriptiontItem = document.createElement('p');
            descriptiontItem.classList.add('slider__description');
            descriptiontItem.innerText = item.description;

            contentItem.append(titleItem, descriptiontItem);
            sliderItem.append(contentItem);
            slideList.append(sliderItem);
        });
        this.sliderElem.append(slideList);
    }

    renderArrows() {
        const arrowRight = document.createElement('div');
        arrowRight.classList.add('arrow', 'right');

        const arrowLeft = document.createElement('div');
        arrowLeft.classList.add('arrow', 'left');

        this.sliderElem.append(arrowRight, arrowLeft);
    }

    init() {
        this.renderSlides();
        this.renderArrows();

        const arrows = this.sliderElem.querySelectorAll('.arrow');
        const slideList = this.sliderElem.querySelector('.slide__list');
        let x = 0;

        let intervalId = setInterval(() => {
            if (x < 100 * (this.data.length - 1)) {
                x += 100;
                slideList.style.transform = `translateX(-${x}%)`;
            }
            if (x >= 100 * (this.data.length - 1)) {
                x = -100;
                slideList.slideList.style.transform = `translateX(${x}%)`;
            }
        }, 3000);

        arrows.forEach((button) => {
            button.addEventListener('click', (event) => {
                clearInterval(intervalId);

                if (
                    event.target.classList.contains('right') &&
                    x <= 100 * (this.data.length - 1)
                ) {
                    x += 100;
                    slideList.style.transform = `translateX(-${x}%)`;
                }

                if (x > 100 * (this.data.length - 1)) {
                    x = 0;
                    slideList.style.transform = `translateX(${x}%)`;
                }

                if (event.target.classList.contains('left') && x > 0) {
                    x -= 100;
                    slideList.style.transform = `translateX(-${x}%)`;
                }
            });
        });
        return this.sliderElem;
    }
}

export default Slider;
