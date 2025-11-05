
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


