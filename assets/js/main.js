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


class DetailsBtn
{
  constructor(el) {
    this.el = el;
    this.checked = false;

    this.el.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    this.checked = !this.checked;
    if(this.checked)
    {
      this.el.setAttribute("checked", "");
    }else{
      this.el.removeAttribute("checked");
    }
  }
}

document.querySelectorAll('.skill__title').forEach((el) => {
  new DetailsBtn(el);
});
