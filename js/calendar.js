// ff
// =================
// File:js/calendar.js
// Dynamic Booking Calendar
// ==========
// -------- DOM Elements ---------
// Grab every HTML element the script needs once, up front, by its id
// (calendar grid, mont label, prev/next buttons time slots booking from feilds,message box)
const calendarGrid = document.getElementById("calendarGrid");
const calandarMonthLabel = document.getElementById("calendarMonthLabel");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const selectedDateText = document.getElementById("selectedDateText");
const timeSlots = document.getElementById("timeSlots");
const bookingForm = document.getElementById("bookingForm");
const customerName = document.getElementById("customerName");
const customerService = document.getElementById("customerService");
const selectedTimeInput = document.getElementById("selectedTimeInput");
const bookingMessage = document.getElementById("bookingMessage");
// Canlander State
// currentMonth/currentYear = month being displayed, selectedDate= clicked day (or null)
// selectedTime = clicked time slot('' if none)
const today =  new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null; // intentionally left blank
let selectedTime = "";
// ------Time Slot Data ---------
// the shops hours as list of bookable times: one list for Mon-Fri, one for saturday
// saturday has no list because the shop is closed
const weekdaySlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM"
];
const saturdaySlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
];
// ------Booked appoitnments (Sample Data) --------
// Example booked data for practice 
// format {"YYYY-MM-DD": [time,time] }.     l   ives 
const bookedAppointments = {
    "2026-03-28": ["10:00 AM", "2:00 PM "],
    "2026-03-29": [],
};
// ----- Helper Functions -------
// Small reusable functions for names, date formatting, and open/closed checks
const getMonthName = (monthIndex) => {
    const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return monthName[monthIndex];
};
const formatDateKey = (year, month, day) => {
    const safeMonth = String(month + 1).padStart(2, "0"); // August --> 08
    const safeDay = String(day).padStart(2, "0"); // 1 ---> 01
    return `${year}-${safeMonth}-${safeDay}`; // 2026-08-01
};
const formatReadableData = (year, month, day) => {
    const date = new Date(year, month, day);
    return date.toLocalDataString("en-US", {
weekday: "long",
month: "long",
day: "numeric",
year: "numeric",
    });
};
const isPastDate = (year, month, day) => {
    const compareDate = new Date(year, month, day);
    compareDate.setHours(0, 0, 0, 0);
    const todayOnly = new Date();
    todayOnly.setHours(0, 0, 0, 0);
    return compareDate < todayOnly;
};
const isDayClosed = (year, month, day) => {
    const date = new Date(year, month, day);
    const weekday = date.getDate();
    // Sunday closed
    if (weekday === 0) {
        return true;
    }
    return false;
};
const getSlotsForData = (year, month, day) => {
    const date = new Date(year, month, day);
    const weekday = day.getDate();
    if (weekday === 6) {
        return saturdaySlots;
    }
    if (weekday === 0) {
        return [];
    }
    return weekdaySlots;
};
// ------Render Calendar (draws the month grid of day buttons) ---------------
const renderCalendar = () => {
    if (!calendarGrid || !calandarMonthLabel) return;
// if the calendar not(!) available dont run
// if the monthLabel is not(!) available dont run
calandarMonthLabel.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
calendarGrid.innerHTML = "";
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDate(); // gets the current yeear/month and with that info finds the 1st
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDay(); // gets the next monthand then goes to that months zero day

for (let i = 0; i <firstDayOfMonth; i++) {
    const emptyCell = document.getElementById("div");
    emptyCell.className = "calendar-empty";
    calendarGrid.appendChild(emptyCell);
}

for (let day = 1; day <= daysInMonth; day++) {
    const dayButton = document.createElement("button");
    dayButton.textContent = day;
    dayButton.className = "calendar-day";

    const dateKey = formatDateKey(currentYear, currentMonth, day);

    if (
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear 
    ) {
dayButton.classList.add("today");
    }

    if (
        isPastDate(currentYear, currentMonth, day) ||
        isDayClosed(currentYear, currentMonth, day)
    ) {
        dayButton.classList.add("disabled");
    }

    if (
        selectedDate&&
        selectedDate.year === currentYear &&
        selectedDate.month === currentMonth &&
        selectedDate.day === day
    ) {
        dayButton.classList.add("selected");
    }

    dayButton.addEventListener("click", () => {
        if (isPastDate(currentYear, currentMonth, day)) return;
    if (isDayClosed(currentYear, currentMonth, day)) return;
    selectedDate = {
        year: currentYear,
        month: currentMonth,
        day: day,
        key: dateKey,
    };
    selectedTime = "";
    selectedTimeInput.value ="";
    selectedDateText.textContent = formatReadableData(
        currentYear,
        currentMonth,
        day,
    );
    renderCalendar();
    renderTimeSlots();
    bookingMessage.textContent = "";
    bookingMessage.className = "booking-message";
});
calendarGrid.appendChild(dayButton);
}
};
// ------- Render Time Slots (draws the time nuttons for the selected date) -----------
const renderTimeSlots = () => (
    if (!timeSlots) return;
    timeSlots.innerHTML = "";

    if (!selectedDate) {
        timeSlots.innerHTML = `<p class="selected-date-text">Choose a date</p>`
    }
)