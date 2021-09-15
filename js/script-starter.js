'use strict';

// Select
const selectActive = document.querySelector('.select__active'),
      selectList = document.querySelector('.select__list'),
      selectItem = document.querySelectorAll('.select__list .select__item');

// Открытие меню селекта и закрытие по клику в не селекта или по пункту меню селекта
document.addEventListener('click', (e) => {
    if (e.target.parentNode.classList.contains('select__active') || e.target.parentNode.parentNode.classList.contains('select__active')) {
        selectList.classList.toggle('select__list_active');
    } else {
        if (selectList.classList.contains('select__list_active')) {
            selectList.classList.remove('select__list_active');
        }
    }
});

// Выбор пункта меню селекта
selectList.addEventListener('click', (item) => {
    if (item.target.classList.contains('select__item')) {
        selectActive.innerHTML = item.target.outerHTML;
    } else {
        selectActive.innerHTML = item.target.parentNode.outerHTML;
    }
});

// Menu
const burger = document.querySelector('.nav__burger'),
      menu = document.querySelector('.menu'),
      menuClose = document.querySelector('.nav__menu-close');

burger.addEventListener('click', (e) => {
    menu.classList.toggle('menu_active');
});

menuClose.addEventListener('click', (e) => {
    menu.classList.toggle('menu_active');
});

// Modal
const buttonModalOpen = document.querySelectorAll('[data-modal]'),
      overlay = document.querySelector('.overlay'),
      buttonModalClose = document.querySelectorAll('.modal .modal__close'),
      modalOpenSetTimeout = document.querySelectorAll('[data-timer]');

// Вешаем обработчик события на каждую кнопку, которая вызывает открытие модального окна
buttonModalOpen.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const dataModalAttribute = event.target.getAttribute('data-modal'),
              idModal = '#' + dataModalAttribute,
              modal = document.querySelector(idModal);

        openModal(modal);

    });
});

// Вешаем обработчик события на каждую кнопку, которая вызывает функцию закрытия модального окна
buttonModalClose.forEach((button) => {
    button.addEventListener('click', (event) => {
        const modal = event.target.parentNode;
        closeModal(modal);
    });
});

// Вызываем функцию закрытие модального окна если клик был по .overlay
overlay.addEventListener('click', (event) => {

    if (event.target.classList.contains('overlay')) {
        const modal = document.querySelector('.modal.modal_active');
        closeModal(modal);
    }

});

// Вызываем функцию закрытие модального окна если нажата клавиша Esc
document.addEventListener('keydown', (event) => {
    if (event.code == 'Escape') {
        if (overlay.classList.contains('overlay_active')) {
            const modal = document.querySelector('.modal.modal_active');
            closeModal(modal);
        }
    }

});

// Вешаем обработчик события на каждое модальное окно,
// которое должно появится через определенный промежуток времяни
modalOpenSetTimeout.forEach((item) => {
    const attribute = item.getAttribute('data-timer'),
          idModal = '#' + attribute,
          modal = document.querySelector(idModal);

          setTimeout(function () {
            openModal(modal);
          }, 10000);
});

// Функция открытия модального окна
function openModal(modal) {
    overlay.classList.add('overlay_active');
    overlay.classList.add('overlay_show');
    modal.classList.add('modal_active');
};

// Функция закрытия модального окна
function closeModal(modal) {
    overlay.classList.remove('overlay_show');
    overlay.classList.remove('overlay_active');
    modal.classList.remove('modal_active');
};