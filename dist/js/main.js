// select DOM items

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// set iniital state of menu

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu(){
    // caso o menu esteja fechado
    if(!showMenu){
        // adicionando a classe close ao botao
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuBranding.classList.add('show');

        // para cada item da lista sera adicionado a classe show
        navItems.forEach(item => item.classList.add('show'));

        // set menu state
        showMenu = true;
    // caso o menu esteja aberto
    }else{

        // removendo a classe close do botao
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuBranding.classList.remove('show');

        // para cada item da lista sera removido a classe show
        navItems.forEach(item => item.classList.remove('show'));

        // set menu state
        showMenu = false;
    }
}