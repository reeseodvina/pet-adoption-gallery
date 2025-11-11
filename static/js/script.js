
//calendar function
function getDay(date) {
    return date.getDay(); 
}

function eventCalendar(elem, year, month) {
    const mon = month - 1; 
    const date = new Date(year, mon, 1);
    const pad = n => (n < 10 ? "0" + n : n);

    let table = `
        <table>
        <caption>${date.toLocaleString('default', { month: 'long' })} ${year}</caption>
        <tr>
            <th>Sunday</th><th>Monday</th><th>Tuesday</th>
            <th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
        </tr><tr>
    `;

    // Empty cells before the 1st day
    for (let i = 0; i < getDay(date); i++) {
        table += '<td></td>';
    }

    // Generate days of the month
    while (date.getMonth() === mon) {
        const fullDate = `${year}-${pad(month)}-${pad(date.getDate())}`;
        table += `<td data-date="${fullDate}">${date.getDate()}</td>`;

        // If it's Saturday and not the last day, start a new row
        if (getDay(date) === 6 && new Date(year, mon, date.getDate() + 1).getMonth() === mon) {
            table += '</tr><tr>';
        }

        date.setDate(date.getDate() + 1);
    }

    // Fill remaining cells of the last week
    if (getDay(new Date(year, mon + 1, 0)) !== 6) {
        for (let i = getDay(new Date(year, mon + 1, 0)) + 1; i <= 6; i++) {
            table += '<td></td>';
        }
    }

    // Always close the last row and table
    table += '</tr></table>';

    elem.innerHTML = table;

    window.openScheduleForm = (date) => {
            var selectedDate = document.getElementById('selected-date')
            var scheduleContent= document.getElementById('schedule-content');
            var scheduleForm = document.getElementById('schedule-form');

            selectedDate.textContent = `Selected date: ${date}`
            scheduleForm.classList.remove("inactive");
            scheduleForm.classList.add("active");
        };

    elem.querySelectorAll("td[data-date]").forEach(td => {
        td.addEventListener('click',() => openScheduleForm(td.dataset.date));
    });

   
}

document.addEventListener("DOMContentLoaded", () => {
    var calendarSpace = document.getElementById("calendar-space");
    var scheduleContent= document.getElementById('schedule-content');
    var scheduleForm = document.getElementById('schedule-form');
            
    
    var today = new Date();
    eventCalendar(calendarSpace, today.getFullYear(), today.getMonth() + 1);

    var closeScheduleForm = document.getElementById("close-schedule-form");

    closeScheduleForm.addEventListener("click", () => {
        scheduleForm.classList.add("inactive")
        scheduleForm.classList.remove("active");
    });
});

//Calendar form

function meetPet(event) {
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');

    if (!email.value && !phone.value) {
        alert('Email or phone number required');
        event.preventDefault();
        return;
    };

    var pickPet = document.getElementById('pick-pet');

    if (!pickPet.value) {
        alert("Pick a friend to meet");
        event.preventDefault();
        return;
    };
    
}

    

    





//see more dropdown here
function openTab() {
    var addedList = document.getElementById('added-list');
    addedList.classList.toggle("inactive");
    addedList.classList.toggle("active");

    var seeMore = document.querySelector(".see-more");
    seeMore.classList.toggle("inactive");
    seeMore.classList.toggle("active");

    var morePets = document.getElementById("more-pets")
    if (addedList.classList.contains("active")) {
        morePets.textContent = "See Less";
    } else {
        morePets.textContent = "See More";
    }
}


//Scroll content


document.addEventListener('DOMContentLoaded', () => {
    var content = document.querySelector(".content");
    var rightArrow = document.getElementById('right-arrow');
    var leftArrow = document.getElementById('left-arrow');

    var scrollAmount = 350;
    if (content && rightArrow && leftArrow) {
        leftArrow.addEventListener('click', () => {
            content.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            })
        });

        rightArrow.addEventListener('click', () => {
            content.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            })
        });

        setInterval(()=> {
            content.scrollBy({ left: 350,
                behavior: "smooth"});
        }, 4000);
    }
})
