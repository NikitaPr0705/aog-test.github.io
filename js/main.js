// sidebar
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const logoHeaderText = body.querySelector(".logo-header-text");
const logoHeaderTextLogo = body.querySelector(".logo-header-text img");
const cabinetClosed = document.querySelector('.cabinet-closed');
const cabinetOpened = document.querySelector('.cabinet-opened');


document.addEventListener('DOMContentLoaded', function()  {
    logoHeaderText.style.zIndex = "-2";
    logoHeaderTextLogo.style.width= "0";
    // sidebar.style.pointerEvents = 'none';

    // setTimeout(() => {
    //     sidebar.style.pointerEvents = 'auto';
    // }, 300);
});

sidebar.addEventListener("mouseenter", function () {
    if (window.innerWidth >= 541) {
      sidebar.classList.remove("hidden");
      //   sidebarOpen.classList.toggle("hidden");
      //   sidebarHidden.classList.toggle("hidden");
      cabinetClosed.classList.add('onhover');
      cabinetOpened.classList.add('onhover');
      logoHeaderText.classList.remove("hidden");
      logoHeaderText.style.zIndex = "1";
      logoHeaderTextLogo.style.width= "";
    }
  });
  
  sidebar.addEventListener("mouseleave", function () {
    if (window.innerWidth >= 541) {
      sidebar.classList.add("hidden");
      //   sidebarOpen.classList.toggle("hidden");
      //   sidebarHidden.classList.toggle("hidden");
      logoHeaderText.classList.add("hidden");
      cabinetClosed.classList.remove('onhover');
      cabinetOpened.classList.remove('onhover');
  
      setTimeout(() => {
        logoHeaderText.style.zIndex = "-2";
        logoHeaderText.style.width= "0";
        logoHeaderTextLogo.style.width= "0";
      }, 300);
    }
  });

  sidebar.addEventListener("mousemove", function () {
    if (window.innerWidth >= 541) {
        sidebar.classList.remove("hidden");
        cabinetClosed.classList.add('onhover');
        cabinetOpened.classList.add('onhover');
        logoHeaderText.classList.remove("hidden");
        logoHeaderText.style.zIndex = "1";
        logoHeaderTextLogo.style.width= "";
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const sidebar = body.querySelector(".sidebar");
    const logoHeaderText = body.querySelector(".logo-header-text");

    burger.addEventListener('click', function() {
        // Toggle the active class on the burger
        burger.classList.toggle('active');
        // Toggle the active class on the menu
        sidebar.classList.toggle("hidden");
        logoHeaderText.classList.toggle("hidden");

        if (window.innerWidth >= 541) {

        }

        if (window.innerWidth <= 540) {
            cabinetClosed.classList.toggle('onhover');
            cabinetOpened.classList.toggle('onhover');
        }
    });
});

const closeChatBtn = document.querySelector(".close-chat-btn");
const chatOpened = document.querySelector(".chatbox-wrapper");
const dialogItem = document.querySelectorAll(".dialog-item");

if(closeChatBtn) {
    closeChatBtn.addEventListener('click', function() {
        chatOpened.classList.remove('chat-opened');
    })
}

if(dialogItem) {
    dialogItem.forEach((item) => {
        item.addEventListener('click',() => {
            chatOpened.classList.add('chat-opened');
        });
    });
    
}






// grid cols count


const maxColumns = 7;
let lastOpenedCard = null; // Сохраняем последнюю открытую карточку
let initiallyHiddenItems = new Map(); // Для хранения скрытых элементов

// Получаем все карточки
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  const gridContainer = card.querySelector('.grid-cols');
  if (!gridContainer) {
    // console.error('Ошибка: контейнер сетки (grid-cols) не найден внутри карточки.');
    return;
  }

  const gridItems = gridContainer.querySelectorAll('.card__info-item');

  // Сохранение скрытых элементов при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    initiallyHiddenItems.set(card, Array.from(gridItems).filter(item => item.classList.contains('hidden')));
    // console.log('Загрузка страницы завершена. Сохранены изначально скрытые элементы:', initiallyHiddenItems.get(card).map(item => item.className));
    updateGridColumns(gridContainer, gridItems);
  });

  // Переключение состояния элементов при клике на элементы с классом card
  card.addEventListener('click', event => {
    if (!event.target.closest('.no-event')) {
      const parentCard = event.target.closest('.card');
      if (parentCard) {
        const gridContainer = parentCard.querySelector('.grid-cols');
        const cardItems = gridContainer.querySelectorAll('.card__info-item');
        toggleHiddenItems(gridContainer, cardItems, parentCard);
        toggleCard(parentCard);
      } else {
        console.error('Ошибка: родительская карточка не найдена.');
      }
    }
  });
});

// Функция переключения состояния скрытых элементов
function toggleHiddenItems(gridContainer, cardItems, card) {
  if (!gridContainer) {
    console.error('Ошибка: gridContainer не найден.');
    return;
  }

  const currentHiddenItems = initiallyHiddenItems.get(card) || [];
  const cardItemsArray = Array.from(cardItems);

  // Удаляем класс hidden у элементов, которые изначально были скрыты
  cardItemsArray.forEach(item => {
    if (currentHiddenItems.includes(item)) {
    //   item.classList.remove('hidden');
      console.log(`Удален класс hidden у элемента:`, item);
    }
  });

  // Если карточка закрывается, возвращаем класс hidden к сохраненным элементам
  if (!card.classList.contains('opened')) {
    initiallyHiddenItems.set(card, Array.from(cardItems).filter(item => item.classList.contains('hidden')));
    // console.log('Обновлено сохраненное состояние видимости элементов:', initiallyHiddenItems.get(card).map(item => item.className));

    cardItemsArray.forEach(item => {
      if (initiallyHiddenItems.get(card).includes(item)) {
        item.classList.add('hidden');
        // console.log(`Добавлен класс hidden к элементу:`, item);
      }
    });
  }

  updateGridColumns(gridContainer, cardItemsArray);
}

// Функция обновления количества колонок в зависимости от видимых элементов
function updateGridColumns(gridContainer, gridItems) {
  if (!gridContainer) {
    console.error('Ошибка: gridContainer не найден.');
    return;
  }

  const visibleItems = gridContainer.querySelectorAll('.card__info-item:not(.hidden)');
  const visibleItemsCount = visibleItems.length;

//   console.log(`Количество видимых элементов: ${visibleItemsCount}`);

  // Удаляем все классы колонок, чтобы обновить состояние
  gridContainer.classList.remove(...getColumnClasses());

  if (visibleItemsCount <= maxColumns) {
    gridContainer.classList.add(`grid-cols-${visibleItemsCount}`);
    // console.log(`Добавлен класс: grid-cols-${visibleItemsCount}`);
  } else {
    gridContainer.classList.add(`grid-cols-${maxColumns}`);
    // console.log(`Добавлен класс: grid-cols-${maxColumns}`);
  }
}

// Функция получения всех классов колонок
function getColumnClasses() {
  const columnClasses = [];
  for (let i = 1; i <= maxColumns; i++) {
    columnClasses.push(`grid-cols-${i}`);
  }
  return columnClasses;
}

// Функция для переключения класса opened на карточке
function toggleCard(card) {
  if (!card) {
    console.error('Ошибка: card не найден.');
    return;
  }

  // Удаляем класс opened у всех карточек
  document.querySelectorAll('.card.opened').forEach(openedCard => {
    if (openedCard !== card) {
      openedCard.classList.remove('opened');
      // Возвращаем класс grid-cols для предыдущей открытой карточки
      const previousGridContainer = openedCard.querySelector('.grid-cols');
      if (previousGridContainer) {
        const visibleItemsCount = previousGridContainer.querySelectorAll('.card__info-item:not(.hidden)').length;
        previousGridContainer.classList.remove(...getColumnClasses());
        previousGridContainer.classList.add(`grid-cols-${Math.min(visibleItemsCount, maxColumns)}`);
      }
    }
  });

  // Добавляем или удаляем класс opened на текущей карточке
  const isOpened = card.classList.contains('opened');
  card.classList.toggle('opened');

  // Обновляем последнюю открытую карточку
  lastOpenedCard = isOpened ? null : card;
}


//   










// // Выбор всех карточек
// const cards = document.querySelectorAll('.card');

// cards.forEach(card => {
//     const openCardButtons = card.querySelectorAll('.open-card');
//     const closeCardButtons = card.querySelectorAll('.close-card');

//     const toggleCard = (shouldOpen) => {
//         // Проверяем, есть ли родитель с классом no-open
//         if (card.closest('.no-open')) {
//             return; // Если есть, выходим из функции
//         }

//         // Закрываем все остальные открытые карточки
//         document.querySelectorAll('.card.opened').forEach(openedCard => {
//             if (openedCard !== card) {
//                 openedCard.classList.remove('opened');
//             }
//         });

//         // Открываем или закрываем текущую карточку
//         card.classList.toggle('opened', shouldOpen);
//     };

//     // Обработчики для кнопок открытия карточки
//     openCardButtons.forEach(openCardButton => {
//         openCardButton.addEventListener('click', (event) => {
//             event.stopPropagation(); // предотвращаем всплытие события
//             toggleCard(true);
//         });
//     });

//     // Обработчики для кнопок закрытия карточки
//     closeCardButtons.forEach(closeCardButton => {
//         closeCardButton.addEventListener('click', (event) => {
//             event.stopPropagation(); // предотвращаем всплытие события
//             toggleCard(false);
//         });
//     });

//     // Обработчик для клика по карточке
//     card.addEventListener('click', (event) => {
//         const isButton = event.target.classList.contains('btn') || event.target.classList.contains('btn--border');
//         if (!isButton) {
//             toggleCard(!card.classList.contains('opened'));
//         }
//     });
// });




// validation
let validationCreateAcc;
let formCreateAcc = document.querySelector("#form-create-acc");

if (formCreateAcc) {
    validationCreateAcc = new JustValidate("#form-create-acc");

  let selector = document.querySelector("#phone-create-acc");
  if (selector) {
    let im = new Inputmask("99-9999999");
    im.mask(selector);
  }

  let emailField = document.querySelector("#email-create-acc");
  if (emailField) {
    validationCreateAcc.addField("#email-create-acc", [
      {
        rule: "required",
        errorMessage: "Enter your email",
      },
      {
        rule: "minLength",
        value: 2,
        // errorMessage: 'Minimun 2 symbols',
      },
      {
        rule: "email",
        // errorMessage: 'Minimun 2 symbols',
      },
    ]);
  }

  let phoneField = document.querySelector("#phone-create-acc");
  if (phoneField) {
    validationCreateAcc.addField("#phone-create-acc", [
      {
        rule: "required",
        errorMessage: "Enter your phone",
      },
    ]);
  }


}


let validationLogin;
let formLogin = document.querySelector("#form-login");

if (formLogin) {
    validationLogin = new JustValidate("#form-login");


  let emailField = document.querySelector("#email-login");
  if (emailField) {
    validationLogin.addField("#email-login", [
      {
        rule: "required",
        errorMessage: "Enter your email",
      },
      {
        rule: "minLength",
        value: 2,
        // errorMessage: 'Minimun 2 symbols',
      },
      {
        rule: "email",
        // errorMessage: 'Minimun 2 symbols',
      },
    ]);
  }
}


let validationProfileInfo;
let formProfileInfo = document.querySelector("#form-profile-info");

if (formProfileInfo) {
    validationProfileInfo = new JustValidate("#form-profile-info");

  let selector = document.querySelector("#phone-profile-info");
  if (selector) {
    let im = new Inputmask("99-9999999");
    im.mask(selector);
  }

  let emailField = document.querySelector("#email-profile-info");
  if (emailField) {
    validationProfileInfo.addField("#email-profile-info", [
      {
        rule: "required",
        errorMessage: "Enter your email",
      },
      {
        rule: "minLength",
        value: 2,
        // errorMessage: 'Minimun 2 symbols',
      },
      {
        rule: "email",
        // errorMessage: 'Minimun 2 symbols',
      },
    ]);
  }

  let phoneField = document.querySelector("#phone-profile-info");
  if (phoneField) {
    validationProfileInfo.addField("#phone-profile-info", [
      {
        rule: "required",
        errorMessage: "Enter your phone",
      },
    ]);
  }

    let fileField = document.querySelector("#file");
  if (fileField) {
    validationProfileInfo.addField("#file", [
      {
        rule: "maxFilesCount",
        value: 1,
      },
      {
        rule: "files",
        value: {
          files: {
            extensions: ["jpeg", "png", "svg"],
            maxSize: 1000000,
            types: ["image/jpeg", "image/png", "image/svg"],
          },
        },
      },
    ]);
  }
  
}



//modal

MicroModal.init({
  openTrigger: "data-micromodal-trigger",
  closeTrigger: "data-micromodal-close",
  openClass: "is-open",
  disableScroll: true,
  disableFocus: false,
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
  debugMode: true,
});


document.querySelectorAll('[data-micromodal-trigger]').forEach(trigger => {
    trigger.addEventListener('click', function() {
        // Закрываем все открытые модальные окна
        const openModals = document.querySelectorAll('.is-open');
        openModals.forEach(modal => {
            const modalId = modal.getAttribute('id');
            // Закрываем все модальные окна, кроме текущего
            if (modalId !== this.getAttribute('data-micromodal-trigger')) {
                MicroModal.close(modalId);
            }
        });
    });
});
//   toggle password input type

const togglePassword = document.querySelectorAll(".toggle-password");

togglePassword.forEach((item) => {
  item.addEventListener("click", function () {
    const input = this.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  });
});

// tabs


const tabs = document.querySelectorAll(".tab__btn");
const allContent = document.querySelectorAll(".content");
let line = document.querySelector(".line");

if (tabs.length > 0 && line) {
  const activeTab = document.querySelector(".tab__btn.active"); // Находим активный таб при загрузке
  if (activeTab) {
    const activeTabWidth = activeTab.offsetWidth;
    line.style.width = `${activeTabWidth}px`; // Устанавливаем ширину элемента .line
    line.style.left = `${activeTab.offsetLeft}px`; // Позиционируем элемент .line по левую сторону активного таба
  } else {
    // Если активного таба нет, позиционируем и задаем ширину по первому табу
    const firstTabWidth = tabs[0].offsetWidth;
    line.style.width = `${firstTabWidth}px`;
    line.style.left = `${tabs[0].offsetLeft}px`;
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");

    line.style.width = tab.offsetWidth + "px";
    line.style.left = tab.offsetLeft + "px";

    allContent.forEach((content) => content.classList.remove("active"));
    allContent[index].classList.add("active");
  });
});


// animation

const todayIcon = document.querySelector(".today-icon");

if (todayIcon) {
  gsap.fromTo(
    todayIcon,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
    }
  );
}

const shadowBg = document.querySelector(".shadow-bg");

if (shadowBg) {
  gsap.fromTo(
    shadowBg,
    {
        opacity: 0.3,
      },
      {
        opacity: 1,
        duration: 1.5,
      }
  );
}


const planeImg = document.querySelector(".plane-img");

if (planeImg) {
  gsap.fromTo(
    planeImg,
    {
        y: 1000,
        bottom: "0%",
      },
      {
        y: "50%",
        bottom: "50%",
        duration: 1,
      }
  );
}


const cloudsImg = document.querySelector(".clouds-img");

if (planeImg) {
  gsap.fromTo(
    cloudsImg,
    {
        y: -1000,
        top: "0%",
      },
      {
        y: "-50%",
        top: "50%",
        duration: 1,
      }
  );
}


document.addEventListener("DOMContentLoaded", () => {
    const greenLights = document.querySelectorAll('.green-light');
    const redLights = document.querySelectorAll('.red-light');

    function lightUp(lights) {
        let index = 0;

        function showNextLight() {
            if (index < lights.length) {
                lights[index].style.opacity = 1; // Показать лампочку
                index++;
                setTimeout(showNextLight, 83); // Пауза перед показом следующей лампочки
            } else {
                // После того, как все лампочки показаны, начинаем их затухание
                setTimeout(() => {
                    index = lights.length - 1; // Начинаем с последней лампочки
                    fadeOutNextLight();
                }, 333); // Пауза перед началом затухания
            }
        }

        function fadeOutNextLight() {
            if (index >= 0) {
                lights[index].style.opacity = 0; // Скрыть лампочку
                index--;
                setTimeout(fadeOutNextLight, 83); // Пауза перед скрытием следующей лампочки
            }
        }

        showNextLight(); // Начинаем показывать лампочки
    }

    function startAnimation() {
        lightUp(greenLights);
        setTimeout(() => lightUp(redLights), 1000); // Запускаем красные лампочки через 4 секунды
    }

    startAnimation(); // Запускаем анимацию

    // Повторяем анимацию каждые 8000 миллисекунд (4 секунды для зеленых + 4 секунды для красных)
    setInterval(startAnimation, 2000);
});



const textElement = document.querySelector("h1");
const initialGradient =
  "linear-gradient(0deg, #2f2f2f, #2f2f2f 50%, #ffffff 0)";
const dynamicGradient =
  "linear-gradient(0deg, #3F51B5, #344ee1 30%, #3374e5 50%, #7810eb 70%, #FC0000 100)";

// Function to change the text color on button click

document.addEventListener("DOMContentLoaded", function() {
    // Your code to run since DOM is loaded and ready
    textElement.classList.toggle("color-change");

    // Check if the animation is already running
      animateGradient(); // Start the gradient animation only if it's not already running
});

// Function to animate the gradient background position using GSAP
function animateGradient() {

  // Create a GSAP timeline
  const tl = gsap.timeline({});

  // Add animation steps to the timeline
  tl.to(textElement, {
    background: dynamicGradient, // Animate to the dynamic gradient
    duration: 1, // Animation duration in seconds
    ease: "linear",
  })
  // Play the timeline
  tl.play();
}

gsap.fromTo(textElement, {
    opacity: 0,
}, {
    opacity: 1,
    duration: 1,
})


