const calendar = document.querySelector('.calendar'),
    date = document.querySelector('#current-date'),
    daysContainer = document.querySelector('.days'),
    prevBtn = document.querySelector('.prev-btn'),
    nextBtn = document.querySelector('.next-btn');

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    'January',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
];

// funcion to add days

const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevlastDay = new Date(year, month, 0);
    const prevDays = prevlastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDate();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.textContent = `${months[month]} ${year}`;

    let days = '';

    for (let i = day; i > 0; i--) {
        days += `<div class='day prev-date'>${prevDays - i + 1}</div>`;
    }
    for (let i = day; i < lastDate; i++) {

        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            days += `<div class='day today'>${i}</div>`;
        } else {
            days += `<div class='day'>${i}</div>`;
        }

    }


    for (let i = 1; i <= nextDays; i++) {
        days += `<div class='day next-date'>${i}</div>`;
    }

    daysContainer.innerHTML = days;
};

initCalendar();
