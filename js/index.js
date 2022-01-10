import { corouselData } from './data/carouselData.js';
import { sliderData } from './data/sliderData.js';
import Carousel from './modules/Corousel.js';
import Slider from './modules/Slider.js';

const slider = new Slider(sliderData).init();
const carousel = new Carousel(corouselData).init();

document.body.prepend(slider, carousel);
