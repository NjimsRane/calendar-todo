const calendar = document.querySelector('.calendar'),
    date = document.querySelector('#current-date'),
    daysContainer = document.querySelector('.days'),
    prevBtn = document.querySelector('.prev-btn'),
    nextBtn = document.querySelector('.next-btn'),
    dateInput = document.querySelector('.date-input'),
    gotoBtn = document.querySelector('.goto-btn'),
    todayBtn = document.querySelector('.today-btn');

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const months = ['January', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// funcion to add days

const initCalendar = () => {
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
    for (let i = day; i <= lastDate; i++) {
        (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        )
            ? days += `<div class='day today'>${i}</div>`
            : days += `<div class='day'>${i}</div>`;
    }
    // days of the next month 
    for (let i = 1; i <= nextDays; i++) {
        days += `<div class='day next-date'>${i}</div>`;
    }
    // set current month on the calendar
    date.textContent = `${months[month]} ${year}`;

    // put all days in the container calendar
    daysContainer.innerHTML = days;
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

    // backspace is pressed
    if (e.inputType === 'deleteContentBackward') {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

const gotoDate = () => {
    const dateArr = dateInput.value.split('/');
    if (dateArr.length === 2) {
        // month value is between 0 and 12 and year length is 4 characters
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    } else {
        alert("Invalid date format");
    }
};

gotoBtn.addEventListener('click', gotoDate);

// add eventListner on preBtn and nextBtn
prevBtn.addEventListener('click', prevMonth);
nextBtn.addEventListener('click', nextMonth);


initCalendar();

// events section on the calendar
const addEventBtn = document.querySelector('#add-event'),
    addEventContainer = document.querySelector('#add-event-wrapper'),
    addEventCloseBtn = document.querySelector('.close'),
    addEventTitle = document.querySelector('.event-name'),
    addEventFrom = document.querySelector('.event-time-from '),
    addEventTo = document.querySelector('.event-time-to');


addEventBtn.addEventListener('click', () => {
    addEventContainer.classList.add('active');
});

addEventCloseBtn.addEventListener('click', () => {
    addEventContainer.classList.remove('active');
});

// the container will be closed if click outside
document.addEventListener('click', (e) => {
    if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove('active');
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
    // after 2 numbers enterd , : added
    if (addEventTo.value.length === 2) {
        addEventTo.value += ':';
    }
    // dont allow , more than 5 numbers
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }

})

