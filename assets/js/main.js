// Открытие/закрытие меню при клике на кнопку "menuSwitcherButton"
const menuSwitcherButton = document.querySelector('.menu-switcher');
const navigation = document.querySelector('.header__navigation');
menuSwitcherButton.addEventListener('click', (e) => {
    navigation.classList.toggle('header__navigation_opened');
    menuSwitcherButton.classList.toggle('menu-switcher_opened');
});

// Закрытие меню при клике на любую из ссылок в меню
navigation.querySelectorAll('.navigation__link').forEach(link => {
    link.addEventListener('click', e => {
        navigation.classList.toggle('header__navigation_opened');
        menuSwitcherButton.classList.toggle('menu-switcher_opened');
    })
})

class Accordion {
  constructor(el) {
    // Хранение элемента <details>
    this.el = el;
    // Хранение элемента <summary>
    this.summary = el.querySelector("summary");
    // Хранение элемента <div class="content">
    this.content = el.querySelector(".skill__text");

    // Хранение объекта анимации (чтобы при необходимости отменить его)
    this.animation = null;
    // Хранение информации о том, закрывается ли элемент
    this.isClosing = false;
    // Хранение информации о том, раскрывается ли элемент
    this.isExpanding = false;
    // Определение кликов пользователя на элементе summary
    this.summary.addEventListener("click", (e) => this.onClick(e));
  }

  async onClick(e) {
    // Остановка стандартного поведения браузера
    e.preventDefault();
    // Добавление overflow на элемент <details> для предотвращения выхода контента за границы
    this.el.style.overflow = "hidden";
    // Проверка, закрывается ли элемент или он уже закрыт
    if (this.isClosing || !this.el.open) {
      this.open();
      // Проверка, раскрывается ли элемент или он уже открыт
    } else if (this.isExpanding || this.el.open) {
      await this.shrink();
    }
  }

  async shrink() {
    // Установка элемента как "закрывающегося"
    this.isClosing = true;

    // Хранение текущей высоты элемента
    const startHeight = `${this.el.offsetHeight}px`;
    // Вычисление высоты summary
    const endHeight = `${this.summary.offsetHeight}px`;

    // Если уже идёт анимация
    if (this.animation) {
      // Отмена текущей анимации
      this.animation.cancel();
    }

    // Запуск WAAPI анимации
    this.animation = await this.el.animate(
      {
        // Установка keyframes от startHeight до endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: 200,
        easing: "ease-out",
      }
    );

    // По завершению анимации, вызов onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // Если анимация отменена, переменная isClosing устанавливается в false
    this.animation.oncancel = () => (this.isClosing = false);
  }

  open() {
    // Применение фиксированной высоты к элементу
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Принудительное установление атрибута [open] на элементе details
    this.el.open = true;
    // Ожидание следующего кадра для вызова функции expand()
    window.requestAnimationFrame(() => this.expand());
  }

  async expand() {
    // Установка элемента как "раскрывающегося"
    this.isExpanding = true;
    // Получение текущей фиксированной высоты элемента
    const startHeight = `${this.el.offsetHeight}px`;
    // Вычисление открытой высоты элемента (высота summary + высота content)
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight
    }px`;

    // Если уже идёт анимация
    if (this.animation) {
      // Отмена текущей анимации
      this.animation.cancel();
    }

    // Запуск WAAPI анимации
    this.animation = await this.el.animate(
      {
        // Установка keyframes от startHeight до endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: 200,
        easing: "ease-out",
      }
    );
    // По завершению анимации, вызов onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // Если анимация отменена, переменная isExpanding устанавливается в false
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  onAnimationFinish(open) {
    // Установка атрибута open на основе параметра
    this.el.open = open;
    // Очистка хранящейся анимации
    this.animation = null;
    // Сброс isClosing и isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Удаление overflow hidden и фиксированной высоты
    this.el.style.height = this.el.style.overflow = "";
  }
}
  document.querySelectorAll("details").forEach((el) => {
    new Accordion(el);
  });
  