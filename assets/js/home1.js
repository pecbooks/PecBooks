var video = document.querySelector('#bgVideo video');
var splashLoad = document.querySelector('#splash-load');

function removeSplashDisplay(){
    splashLoad.classList.add('display-none');
}

function removeSplashOpacity(){
    splashLoad.classList.add('opacity-zero');
    setTimeout(removeSplashDisplay,1000);
}

document.addEventListener('DOMContentLoaded',function(){
    setTimeout(removeSplashOpacity,2000);
});

// console.log(video);
video.play();
setInterval(function(){
    video.play();
}, 1000);

var logo = document.getElementById("logo");
logo.innerHTML = "";

var filterButton = document.querySelectorAll('.search-filter');
for(var i=0;i<filterButton.length;i++)
{
    filterButton[i].addEventListener('click',function(){
        this.classList.toggle('selected');
    });

    filterButton[i].addEventListener('mousedown',function(){
        this.classList.add('scale-down');
    });

    filterButton[i].addEventListener('mouseup',function(){
        this.classList.remove('scale-down');
    });

}