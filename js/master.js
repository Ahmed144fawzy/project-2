//check if there's local storage color option 
let mainColors = localStorage.getItem("color-option");



if(mainColors != null){
    // console.log('local storage is not empty you can set it on root now');
    document.documentElement.style.setProperty('--main-color', mainColors);

    //remove active class from all colors list items
    document.querySelectorAll(".colors-list li").forEach(Element => {
        Element.classList.remove("active");
    
        //Add active class on element with data colors == local storage items
        if(Element.dataset.color===mainColors){
            Element.classList.add("active");
        }
    
    });
    
};

//Random Background

let backgroundOption = true;

//variable to control the interval 
let backgroundInterval;

// check if there's local storage random background item
let backgroundlocalitem = localStorage.getItem("background_option"); 

//check if random background local storage is not empty
if (backgroundlocalitem != null){

    // //remove Active class from all spans
    document.querySelectorAll(".random-background span").forEach(Element => {
        Element.classList.remove("active");

    });

    if (backgroundlocalitem === 'true') {
        
        backgroundOption = true;
        document.querySelector(".random-background .yes").classList.add("active");

    } else{

        backgroundOption = false;
        document.querySelector(".random-background .no").classList.add("active");

    }

}

// click on toggle settings gear
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    
    //Toggle class fa-spin for Rotation on self
    this.classList.toggle("fa-spin");
    
    //toggle class open on main settings box
    document.querySelector(".setting-box").classList.toggle("open");
};

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li"); 

// loop on all list items
colorsLi.forEach(li => {
    
    //click on every list items 
    li.addEventListener("click" , (e) => {
        
        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        
        //set color in local storage
        localStorage.setItem("color-option", e.target.dataset.color );
        
        handleActive(e);

    });
});
//switch random background
const randomBackEl = document.querySelectorAll(".random-background span"); 

// loop on all spans
randomBackEl.forEach(span => {

    //click on every span 
    span.addEventListener("click" , (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes'){

            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option" , true);
            
        }
        else{
        
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option" , false);
        }
    
    });

});

//select landing page element
let landingpage = document.querySelector(".landing-page");

//Get array of images
let imgsArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];

//function to randomize
function randomizeImgs(){

    if (backgroundOption === true){
        backgroundInterval = setInterval(() => {
            //Get random number
            let randomNumber = Math.floor(Math.random()* imgsArray.length);
        
            //change background image url
            landingpage.style.backgroundImage='url("imgs/'+ imgsArray[randomNumber] +'")';
        
        } ,2000);
    }
}
randomizeImgs();

//select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //skills offset top 
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    //window scrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skills-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });

    }
};

//create popup with the images 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img =>{

    img.addEventListener('click' , (e) =>{

        //create overlay element
        let overlay = document.createElement("div");

        //Add class to overlay
        overlay.className = 'popup-overlay';

        //Append overlay to the body
        document.body.appendChild(overlay);

        //create popup
        let popupBox = document.createElement("div");

        //Add class to the popup box
        popupBox.className= 'popup-box';

        if (img.alt !== null) {

            //create heading
            let imgHading = document.createElement("h3");

            //create text for heading
            let imgText = document.createTextNode(img.alt);

            // append the text tp the heading
            imgHading.appendChild(imgText);

            //Append the heading to the popup box
            popupBox.appendChild(imgHading);

        }

        //create image 
        let popupImage = document.createElement("img");

        // set image source
        popupImage.src= img.src;

        //add image to popup box
        popupBox.appendChild(popupImage);

        ///Append the popup box to body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton = document.createElement("span");

        //create the close button
        let closeButtonText = document.createTextNode("X");

        //append text to close button 
        closeButton.appendChild(closeButtonText);

        //Add class to close button
        closeButton.className = 'close-button';

        //add close button to the popup box
        popupBox.appendChild(closeButton);

    });

});

//close popup
document.addEventListener("click",  function (e) {
    if (e.target.className == 'close-button') {

        //remove the current popup
        e.target.parentNode.remove();

        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

//select ALL BULLETS
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//select ALL Links
const allLinks = document.querySelectorAll(".landing-page .header-area .links a");

function scrollToSomewhere(elements){
    elements.forEach(ele =>{

        ele.addEventListener("click", (e) =>{
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
    
            });
    
        });
    
    });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

//Handle Active state
function handleActive(ev) {

    //remove Active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(Element => {
        
        Element.classList.remove("active");
    });

    //Add active class on self
    ev.target.classList.add("active");
    
}

let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
    
    bulletSpan.forEach(span => {

        span.classList.remove("active");

    });

if (bulletLocalItem === 'block') {

    bulletsContainer.style.display= 'block' ;
    document.querySelector(".bullets-option .yes").classList.add("active");

} else{

    bulletsContainer.style.display= 'none' ;
    document.querySelector(".bullets-option .no").classList.add("active");
}
}

bulletSpan.forEach(span => {
    
    span.addEventListener("click" , (e) => {

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display= 'block' ;

            localStorage.setItem("bullets-option", 'block');

        }
        else{

        bulletsContainer.style.display= 'none' ;

        localStorage.setItem("bullets-option", 'none');
    }
    
    handleActive(e);

    });

});

//reset button
document.querySelector(".reset-option").onclick = function () {

    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    window.location.reload();

};

//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick= function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");

};

document.addEventListener("click" , (e) =>{

    if (e.target !== toggleBtn && e.target !== tLinks) {

        //check if menu is open
        if (tLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");

        }

    }

});

tLinks.onclick = function (e) {
    e.stopPropagation(); 
}