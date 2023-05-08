const calendar = document.querySelector('.calendar'),
    date = document.querySelector('#current-date'),
    daysContainer = document.querySelector('.days'),
    prevBtn = document.querySelector('.prev-btn'),
    nextBtn = document.querySelector('.next-btn'),
    dateInput = document.querySelector('.date-input'),
    goToBtn = document.querySelector('.goto-btn'),
    addEventSubmit = document.querySelector('.add-event-btn'),
    todayBtn = document.querySelector('.today-btn'),
    eventDay = document.querySelector('.event-day'),
    eventDate = document.querySelector('.event-date'),
    eventContainer = document.querySelector('.events');

const addEventBtn = document.querySelector('#add-event'),
    addEventContainer = document.querySelector('#add-event-wrapper'),
    addEventCloseBtn = document.querySelector('.close'),
    addEventTitle = document.querySelector('.event-name'),
    addEventFrom = document.querySelector('.event-time-from '),
    addEventTo = document.querySelector('.event-time-to');

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let activeDay;

const months = ['January', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];



const eventsArr = [
    {
        day: 8,
        month: 05,
        year: 2023,
        events: [
            {
                title: "Event 1 orem ipsum dolor sit amet consectetur adipisicing elit. Sint, enim.",
                time: '10:00 AM'
            },
            {
                title: 'Event 2',
                time: '11:00 PM'
            }
        ]

    },
    {
        day: 9,
        month: 05,
        year: 2023,
        events: [
            {
                title: "Event 1 orem ipsum dolor sit amet consectetur adipisicing elit. Sint, enim.",
                time: '10:00 AM'
            },
            {
                title: 'Event 2',
                time: '11:00 PM'
            }
        ]

    },
];

// user name from local storage
window.addEventListener('load', () => {
    const nameInput = document.querySelector("#user-name");
    const userName = localStorage.getItem('username') || '';

    nameInput.value = userName;
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });
});

// funcion to add days

function initCalendar() {
    // first day of the current month
    const firstDay = new Date(year, month, 1);
    const day = firstDay.getDate();

    // last day of the current month
    const lastDay = new Date(year, month + 1, 0);
    const lastDate = lastDay.getDate();

    // last day of the prev month
    const prevlastDay = new Date(year, month, 0);
    const prevDays = prevlastDay.getDate();

    // firsts days for the next month
    const nextDays = 7 - lastDay.getDay() - 1;


    let days = '';

    // last day of the previous month
    for (let i = day; i > 0; i--) {
        days += `<div class='day prev-date'>${prevDays - i + 1}</div>`;
    }
    // days of the current month
    for (let i = 1; i <= lastDate; i++) {
        // create event and condition to be set
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year) {
                event = true;
            }
        });

        // if day is today add class today
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {// for current active day 

            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            (event)
                ? days += `<div class='day today active-day set-event'>${i}</div>`
                : days += `<div class='day today active-day'>${i}</div>`;
        } //for others days
        else {
            (event)
                ? days += `<div class='day set-event'>${i}</div>`
                : days += `<div class='day '>${i}</div>`;
        }
    }
    // days of the next month 
    for (let i = 1; i <= nextDays; i++) {
        days += `<div class='day next-date'>${i}</div>`;
    }
    // set current month on the calendar
    date.textContent = `${months[month]} ${year}`;

    // put all days in the container calendar
    daysContainer.innerHTML = days;
    // add listener after calendar initialized
    addListener();
};

// previous month
const prevMonth = () => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
};

// next month
const nextMonth = () => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
};

// go back to today with button today
todayBtn.addEventListener('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

// enter date using input date

dateInput.addEventListener('input', (e) => {
    // allow only number in the input placeholder
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, '');
    if (dateInput.value.length === 2) {
        // add slash after 2 numbers
        dateInput.value += '/';
    }
    // wont allow that input length is more than 7 characters
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }

    // backspace keyboard is pressed
    if (e.inputType === 'deleteContentBackward') {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

const goToDate = () => {
    const dateArr = dateInput.value.split('/');
    if (dateArr.length === 2) {
        // month value is between 0 and 12 and year length is 4 characters
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
        else {
            //if invalid date format input
            alert("Invalid date format");
        }
    }
};
goToBtn.addEventListener('click', goToDate);

// add eventListner on preBtn and nextBtn
prevBtn.addEventListener('click', prevMonth);
nextBtn.addEventListener('click', nextMonth);




// events section on the calendar



addEventBtn.addEventListener('click', () => {
    console.log(addEventContainer);
    addEventContainer.classList.toggle('addWindow');
});

addEventCloseBtn.addEventListener('click', () => {
    addEventContainer.classList.remove('addWindow');
});

// the container will be closed if click outside
document.addEventListener('click', (e) => {
    if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {

        addEventContainer.classList.remove('addWindow');
    }

});

addEventTitle.addEventListener('input', (e) => {
    // for the title up to 50 characters can be allowed for title
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

addEventFrom.addEventListener('input', (e) => {
    // only numbers are allow
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '');
    // after 2 numbers enterd , : added
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ':';
    }
    // dont allow , more than 5 numbers
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

addEventTo.addEventListener('input', (e) => {
    // only numbers are allow
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '');
    // after 2 numbers enter , : added
    if (addEventTo.value.length === 2) {
        addEventTo.value += ':';
    }
    // dont allow , more than 5 numbers
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }

});

// lets create functions to add listener on days after rendered

function addListener() {
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.addEventListener('click', (e) => {
            // set current day as active day
            activeDay = Number(e.target.innerHTML);


            // call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));



            // remove active from already active day
            days.forEach(day => {
                day.classList.remove('active');
            });

            // if previous month day clicked goto previous month and add active
            if (e.target.classList.contains('prev-date')) {
                prevMonth();
                setTimeout(() => {
                    // select all day of that month
                    const days = document.querySelectorAll('.day');
                    // after going to prev month add active to clicked
                    days.forEach(day => {
                        if (!day.classList.contains('prev-date') && day.innerHTML === e.target.innerHTML) {
                            day.classList.add('active');
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains('next-date')) {
                nextMonth();
                setTimeout(() => {
                    // select all day of that month
                    const days = document.querySelectorAll('.day');
                    // after going to next month add active to clicked
                    days.forEach((day) => {
                        if (!day.classList.contains('next-date') && day.innerHTML === e.target.innerHTML) {
                            day.classList.add('active');
                        }
                    });
                }, 100);
            } else {
                // remaining current month days
                e.target.classList.add('active');
            }
        });
    });
}

// // let show active day events and date at top
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(' ')[0];
    eventDay.innerHTML = `${dayName}`;
    eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

// // function to show events on that day
function updateEvents(date) {
    let events = '';
    eventsArr.forEach(event => {
        // get events on active day only
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            event.events.forEach(event => {
                events += `

                <div
                class="event relative w-[95%] min-h-[4.375rem] flex justify-center flex-col font-semibold gap-1.5 px-5 pl-5 cursor-pointer transition-all duration-500  rounded">
                <div class="title flex items-center pointer-events-none">
                    <i class="fas fa-circle text-xs text-[#2c7ca4] hover:text-white"></i>
                    <h3 class="event-title text-lg font-normal ml-2">${event.title}</h3>
                </div>
                <div
                    class="event-time text-sm font-normal text-[#878895] pointer-events-none ml-2 hover:text-white">
                    ${event.time}
                </div>
            </div>

                `;
            });
        }
    });

    //     // if nothing found

    if ((events === '')) {
        events = `<div class='no-event'><h3>No Events</h3></div>`;
    }

    eventContainer.innerHTML = events;
}

// // function to add events
addEventSubmit.addEventListener('click', () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    if (eventTitle === '' || eventTimeFrom === '' || eventTimeTo === '') {
        alert('Please fill all the fields');
    }
});

// initCalendar();
initCalendar();