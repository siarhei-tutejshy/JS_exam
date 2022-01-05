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
        arrowRight.classList.add('arrow','right')

        const arrowLeft = document.createElement('div');
        arrowLeft.classList.add('arrow','left');

        this.sliderElem.append(arrowRight,arrowLeft)
    }

    init() {
        this.renderSlides();
        this.renderArrows();
        const arrows = this.sliderElem.querySelectorAll('.arrow');
        const slideList = this.sliderElem.querySelector('.slide__list');
        console.log(slideList)
        console.log(100*(this.data.length - 1))
        let x = 0;
        arrows.forEach(button => {
            
            button.addEventListener('click',(event)=>{
                
                if(event.target.classList.contains('right') && x < (100*(this.data.length - 1))){
                    x+=100
                    slideList.style.transform = `translateX(-${x}%)`;
                   
                    console.log(x,'right')
                }

                if(event.target.classList.contains('left') && x > 0){
                    
                    x-=100
                    
                     slideList.style.transform = `translateX(-${x}%)`;
                     console.log(x,'left')
                }

            })
        })
        return this.sliderElem;
    }
}
 export default Slider