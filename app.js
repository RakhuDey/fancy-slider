const imagesArea = document.querySelector(".images");
const gallery = document.querySelector(".gallery");
const galleryHeader = document.querySelector(".gallery-header");
const searchBtn = document.getElementById("search-btn");
const sliderBtn = document.getElementById("create-slider");
const sliderContainer = document.getElementById("sliders");
let spinner = (document.getElementById("loading-spinner").style.display =
    "none");
// selected image
let sliders = [];

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = "15674931-a9d714b6e9d654524df198e00&q";

// show images
const showImages = (images) => {
    // i added this part after submitted assignment....
    const result = images.length;
    if (result <= 0) {
        alert("reload and search again after pressing ok");
    }
    imagesArea.style.display = "block";
    gallery.innerHTML = "";
    // show gallery title
    galleryHeader.style.display = "flex";
    images.forEach((image) => {
        let div = document.createElement("div");
        div.className = "col-lg-3 col-md-4 col-xs-6 img-item mb-2";
        div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
        gallery.appendChild(div);
        toggleSpinner(false);
    });
};

const getImages = (query) => {
    toggleSpinner(true);
    fetch(
            `https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`
        )
        .then((response) => response.json())
        .then((data) => showImages(data.hits))
        .catch((err) => console.log(err));
};

let slideIndex = 0;
const selectItem = (event, img) => {
    let element = event.target;
    element.classList.add("added");
    let item = sliders.indexOf(img);
    if (item === -1) {
        sliders.push(img);
    } else {
        element.classList.remove("added");
    }
};
var timer;
const createSlider = () => {
    // check slider image length
    if (sliders.length < 2) {
        alert("Select at least 2 image.");
        return;
    }
    // crate slider previous next area
    sliderContainer.innerHTML = "";
    const prevNext = document.createElement("div");
    prevNext.className =
        "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

    sliderContainer.appendChild(prevNext);
    document.querySelector(".main").style.display = "block";
    // hide image aria
    imagesArea.style.display = "none";
    const duration = document.getElementById("duration").value || 1000;
    sliders.forEach((slide) => {
        let item = document.createElement("div");
        item.className = "slider-item";
        item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
        sliderContainer.appendChild(item);
    });
    changeSlide(0);
    timer = setInterval(function() {
        slideIndex++;
        changeSlide(slideIndex);
    }, changeDuration(duration));
};

function changeDuration(duration) {
    if (duration >= 1000) {
        return duration;
    } else {
        alert(
            "negative value or 1000 less value is not right value,is continue to default"
        );
        return 1000;
    }
}

// change slider index
const changeItem = (index) => {
    changeSlide((slideIndex += index));
};

// change slide item
const changeSlide = (index) => {
    const items = document.querySelectorAll(".slider-item");
    if (index < 0) {
        slideIndex = items.length - 1;
        index = slideIndex;
    }

    if (index >= items.length) {
        index = 0;
        slideIndex = 0;
    }

    items.forEach((item) => {
        item.style.display = "none";
    });

    items[index].style.display = "block";
};

searchBtn.addEventListener("click", function() {
    document.querySelector(".main").style.display = "none";
    clearInterval(timer);
    const search = document.getElementById("search");
    getImages(search.value);
    sliders.length = 0;
});

sliderBtn.addEventListener("click", function() {
    createSlider();
});
// enter button press to go....
var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});
var input = document.getElementById("duration");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("create-slider").click();
    }
});

const preloader = document.getElementById("loading");

function loadFunction() {
    preloader.style.display = "none";
}

function toggleSpinner(show) {
    const spinner = document.getElementById("loading-spinner");
    if (show) {
        spinner.style.display = "block";
    } else {
        spinner.style.display = "none";
    }
}