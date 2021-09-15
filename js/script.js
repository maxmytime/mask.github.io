'use strict';

// Menu

const burger = document.querySelector('.burger'),
      menu = document.querySelector('.menu'),
      menuClose = document.querySelector('.close');

burger.addEventListener('click', (e) => {
    menu.classList.toggle('menu_active');
});

menuClose.addEventListener('click', (e) => {
    menu.classList.toggle('menu_active');
});

// Slider

const slider = document.querySelector('.slider'),
      sliderContent = document.querySelector('.slider__content'),
      slidItem = document.querySelectorAll('.slider__item'),
      sliderDots = document.querySelector('.slider__dots');

let settings = {
    showSlideItem: 3, // Устанавливаем количество слайдеров которое должно быть видно
    dots: true,       // Разрешаем отображение точек для прокрутки слайдера
    responsive: {

    }
};


// Расчет ширины контента и элементов
function widthCalculation() {
    // Расчитываем ширину контейнера слайдера в котором будут находится элементы слайдера
    settings.sliderContentWidth = (slider.clientWidth / settings.showSlideItem) * slidItem.length;
    // Расчитываем ширину элемента слайдера
    settings.sliderItemWidth = slider.clientWidth / settings.showSlideItem;
}

// Функция устанавливает ширину элемента слайдера
function settingWidth() {
    sliderContent.style.width = `${settings.sliderContentWidth}px`;
    slidItem.forEach(item => {
        item.style.width = `${settings.sliderItemWidth}px`;
    });
}

// Функция создает точки для прокрутки слайдера
function createDots() {

    let amountDots,
        dot;

    if (settings.dots) {
        sliderDots.style.display = 'flex';
        amountDots = settings.sliderContentWidth / (settings.showSlideItem * settings.sliderItemWidth);
        for (let i = 0; i < amountDots; i++) {
            dot = document.createElement('span');
            dot.classList.add('slider__dot');
            sliderDots.append(dot);
        }
    }
}

// Функция перемещает слайдер в точку по которой совершен клик
function moveSliderToDot() {
    const sliderDot = document.querySelectorAll('.slider__dot');

    sliderDot[0].classList.add('slider__dot_active');

    sliderDot.forEach((dot) => {
        dot.addEventListener('click', (e) => {

            sliderDot.forEach((dot, i) => {

                if (dot.classList.contains('slider__dot_active')) {
                    sliderDot[i].classList.remove('slider__dot_active');
                }

                if (e.target == dot) {
                    sliderDot[i].classList.add('slider__dot_active');
                    moveSlider(i);
                }
            });

        });
    });

}

// Функция перемещения слайдера
function moveSlider(i) {
    const step = settings.sliderItemWidth * settings.showSlideItem * (i);
    sliderContent.style.transform = `translateX(-${step}px)`;
}

// Функция определяет ширину экрана и устанавливает количиство отображаемых слайдов при изменении ширины экрана
function responsive() {
    if (window.innerWidth <= 992 && window.innerWidth > 576) {
        settings.showSlideItem = 2;
        let dot = document.querySelectorAll('.slider__dot');
        dot.forEach(e => {
            e.remove();
        });
        console.log(992);
    } else if (window.innerWidth <= 576) {
        settings.showSlideItem = 1;
        let dot = document.querySelectorAll('.slider__dot');
        dot.forEach(e => {
            e.remove();
        });
        console.log(576);
    } else {
        settings.showSlideItem = 3;
        let dot = document.querySelectorAll('.slider__dot');
        dot.forEach(e => {
            e.remove();
        });
        console.log('larget');
    }
}

responsive();
widthCalculation();
settingWidth();
createDots();
moveSliderToDot();

window.addEventListener('resize', (e) => {


    responsive();
    createDots();
    moveSliderToDot();
    widthCalculation();
    settingWidth();

});
