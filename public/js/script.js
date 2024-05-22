document.addEventListener('DOMContentLoaded', function(){

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const header = document.getElementById('header');
    const searchClose = document.getElementById('searchClose');

    for (var i = 0; i < allButtons.length; i++){
            allButtons[i].addEventListener('click', function(){

            //show search bar
            searchBar.style.visibility = 'visible';
            header.style.marginTop = '50px';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');

            console.log(searchInput);
            searchInput.focus();
        })     
    }

    searchClose.addEventListener('click', function(){
        //remove search bar
        searchBar.style.visibility = 'hidden';
        header.style.marginTop = '0px';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
    });
    
});