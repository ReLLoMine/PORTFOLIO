const menuSwitcherButton = document.querySelector('.menu-switcher');
const navigation = document.querySelector('.header__navigation');
menuSwitcherButton.addEventListener('click', (e) => {
    navigation.classList.toggle('header__navigation_opened');
    menuSwitcherButton.classList.toggle('menu-switcher_opened');
});

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

    this.el.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    if(this.el.hasAttribute("checked"))
    {
      this.el.removeAttribute("checked");
    }else{
      this.el.setAttribute("checked", "");
    }
  }
}

document.querySelectorAll('button').forEach((el) => {
  new DetailsBtn(el);
});

var main_image = document.querySelector(".project-gallery-main-item");

main_image.addEventListener('click', (e) => {
  main_image.removeAttribute("visible");
});

class GalleryBtn
{
  constructor(el) {
    this.el = el;

    this.el.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    main_image.children[0].src = this.el.children[0].src;
    main_image.setAttribute("visible", "");
  }
}

document.querySelectorAll('.project-gallery-item').forEach((el) => {
  new GalleryBtn(el);
});
