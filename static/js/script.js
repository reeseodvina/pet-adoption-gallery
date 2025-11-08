
//calendar function
function eventCalendar() {
    //insert calendar here
}




//see more dropdown here
function openTab() {
    var addedList = document.getElementById('added-list');
    addedList.classList.toggle("inactive");
    addedList.classList.toggle("active");

    var seeMore = document.querySelector("see-more");
    seeMore.classList.toggle("inactive");
    seeMore.classList.toggle("active");

    var morePets = document.getElementById("more-pets")
    if (addedList.classList.contains("active")) {
        morePets.textContent("See Less");
    } else {
        morePets.textContent("See More");
    }
}


//Scroll content
document.addEventListener('DOMContentLoaded', () => {
    var content = document.querySelector(".content");
    var rightArrow = document.getElementById('right-arrow');
    var leftArrow = document.getElementById('left-arrow');

    var scrollAmount = 350;

    leftArrow.addEventListener('click', () => {
        content.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        })
    })

    rightArrow.addEventListener('click', () => {
        content.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        })
    })

    setInterval(()=> {
        carousel.scrollBy({ left: 350,
            behavior: "smooth"});
    }, 4000);
})
