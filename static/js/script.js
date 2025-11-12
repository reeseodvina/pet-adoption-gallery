function getDay(date) {
    return date.getDay(); 
}

function eventCalendar(elem, year, month) {
    const mon = month - 1; 
    const date = new Date(year, mon, 1);
    const pad = n => (n < 10 ? "0" + n : n);

    let table = `
        <table>
        <caption><i class="fa-solid fa-arrow-left left-arrow"></i>${date.toLocaleString('default', { month: 'long' })} ${year}<i class="fa-solid fa-arrow-right right-arrow"></caption>
        <tr>
            <th>Sunday</th><th>Monday</th><th>Tuesday</th>
            <th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
        </tr><tr>
    `;

   
    for (let i = 0; i < getDay(date); i++) {
        table += '<td></td>';
    }

    while (date.getMonth() === mon) {
        var fullDate = `${year}-${pad(month)}-${pad(date.getDate())}`;
        table += `<td data-date="${fullDate}">${date.getDate()}</td>`;


        if (getDay(date) === 6 && new Date(year, mon, date.getDate() + 1).getMonth() === mon) {
            table += '</tr><tr>';
        }

        date.setDate(date.getDate() + 1);
    }


    if (getDay(new Date(year, mon + 1, 0)) !== 6) {
        for (let i = getDay(new Date(year, mon + 1, 0)) + 1; i <= 6; i++) {
            table += '<td></td>';
        }
    }


    table += '</tr></table>';

    elem.innerHTML = table;

    var leftArrow = document.querySelector(".left-arrow");
    var rightArrow = document.querySelector(".right-arrow");

    

        leftArrow.addEventListener('click', () => {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            eventCalendar(elem, currentDate.getFullYear(), currentDate.getMonth() + 1);
        });

        rightArrow.addEventListener('click', () => {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
            eventCalendar(elem, currentDate.getFullYear(), currentDate.getMonth() + 1);
        });


    window.openScheduleForm = (date) => {
            var selectedDate = document.getElementById('selected-date')
            var scheduleContent= document.getElementById('schedule-content');
            var scheduleForm = document.getElementById('schedule-form');

            selectedDate.textContent = `Selected date: ${date}`
            scheduleForm.classList.remove("inactive");
            scheduleForm.classList.add("active");
        };

    elem.querySelectorAll("td[data-date]").forEach(td => {
        
        td.addEventListener('click',() => {
            var selectedDate = new Date(td.dataset.date)
            selectedDate.getTime(0, 0, 0, 0);
            var today = new Date();  

            var maxDate = new Date(); 
            maxDate.setDate(today.getDate() + 7);

            if (selectedDate < today || selectedDate > maxDate) {
                alert(`You can only schedule from today to ${maxDate}`);
                return;
            }


            openScheduleForm(td.dataset.date);
        });
    });

   
}

document.addEventListener("DOMContentLoaded", () => {
    var calendarSpace = document.getElementById("calendar-space");
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
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var time = document.getElementById('time').value.trim();
    var pickPet = document.getElementById('pick-pet').value.trim();
    var name = document.getElementById('name').value.trim();

    var selectedDate = document.getElementById('selected-date').textContent.replace('Selected date: ', '');


    var [hours, minutes] = time.split(':');
    var selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0)

    var earlyHour = new Date();
    earlyHour.setHours(9, 0 , 0, 0);

    var lateHour = new Date();
    lateHour.setHours(17, 0, 0, 0);

    

    
    if (!selectedTime || selectedTime < earlyHour || selectedTime > lateHour || selectedTime.getMinutes() !== 0 && selectedTime.getMinutes() !== 30) {
        alert('Please put a valid time')
        event.preventDefault();
        return;
    } else if (!email && !phone) {
        alert('Email or phone number required');
        event.preventDefault();
        return;
    } else if (!name) {
        alert('Give us a name so we know who to look for when you come');
        event.preventDefault();
        return;
    } else if (!pickPet) {
        alert("Pick a friend to meet");
        event.preventDefault();
        return;
    }
    
            

    var chosenDate = document.querySelector(`td[data-date="${selectedDate}"]`);

    var Header = document.createElement("h4");
    var HeaderText = document.createTextNode(`Meet ${pickPet}!`);

    var Des = document.createElement("p");
    var DesText = document.createTextNode(`${name} will meet with ${pickPet} at ${selectedDate}, ${time}!`);

    var Event = document.createElement("div");
    Event.setAttribute("class", "event");

    Des.appendChild(DesText);
    Header.appendChild(HeaderText);
    Header.appendChild(Des);
    Event.appendChild(Header);
    
    chosenDate.appendChild(Event);

    var scheduleForm = document.getElementById('schedule-form');
    scheduleForm.classList.add('inactive');
    scheduleForm.classList.remove('active');
            alert(`You're set to meet ${pickPet}!`)
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
