const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const dayOutput = document.getElementById('DD');
const monthOutput = document.getElementById('MM');
const yearOutput = document.getElementById('YY');

const form = document.getElementById('age-form');

const errDayMessage = document.querySelector ('.day-error-message');
const errMonthMessage = document.querySelector ('.month-error-message');
const errYearMessage = document.querySelector ('.year-error-message');

const dayLabel = document.querySelector ('.day-label');
const monthLabel = document.querySelector ('.month-label');
const yearLabel = document.querySelector ('.year-label');

const date = new Date();

let currentDay = date.getDate();
let currentMonth = date.getMonth() + 1;
let currentYear = date.getFullYear();

const dayError = () => {
   dayLabel.classList.add("error");
   errDayMessage.classList.add("error");
   errDayMessage.classList.remove("hidden");
   day.classList.add('error-border');
}

const monthError = () => {
   monthLabel.classList.add("error")
   errMonthMessage.classList.add("error");
   errMonthMessage.classList.remove("hidden");
   month.classList.add('error-border');
}

const yearError = () => {
   yearLabel.classList.add("error")
   errYearMessage.classList.add("error");
   errYearMessage.classList.remove("hidden");
   year.classList.add('error-border');
}

const daysInMonth = (month, year) => {
   return new Date(year, month, 0).getDate();
}

const correctDay = () => {
   if (day.value === '') {
      errDayMessage.textContent = "This field is required";
      dayError();
      return false;
   }else if (day.value < 1 || day.value > 31) {
      errDayMessage.textContent = "Must be a valid day";
      dayError();
      return false;
    }else if (day.value > daysInMonth(month.value, year.value) || new Date() - new Date(year.value, month.value - 1, day.value) < 0) {
      errDayMessage.textContent = "Must be in the past";
      dayError();
      return false;
   } else {
      errDayMessage.textContent = "";
      day.classList.remove('error-border');
      dayLabel.classList.remove("error")
      return true;
}
}

const correctMonth = () => {
   if (month.value === '') {
   errMonthMessage.textContent = "This field is required";
   monthError();
   return false;
}else if (month.value < 1 || month.value > 12) {
   errMonthMessage.textContent = "Must be a valid month";
   monthError();
   return false;
} else {
   errMonthMessage.textContent = "";
   month.classList.remove('error-border');
   monthLabel.classList.remove("error");
   return true;
}
}

const correctYear = () => {
   if (year.value > currentYear) {
      errYearMessage.textContent = "Must be in the past";
      yearError();
      return false;
  }else if (year.value === '') {
      errYearMessage.textContent = "This field is required";
      yearError();
      return false;
  }else if (year.value < 1900) {
      errYearMessage.textContent = "Must be a valid year";
      yearError();
      return false;
  } else {
      errYearMessage.textContent = "";
      year.classList.remove('error-border');
      yearLabel.classList.remove("error");
      return true;
  }
}

 const isLeapYear = (day, month, year) => {
   month = month - 1;
   fullDate = new Date(year,month,day);
   if (day == fullDate.getDate() && month == fullDate.getMonth() && year == fullDate.getFullYear())
     return true;
   else
     return false
}

 const substractAge = () => {
   let newYear = Math.abs(currentYear - year.value);

   let newMonth = 0;
   if(currentMonth >= month.value){
       newMonth = currentMonth - month.value;
   }
   else{
       newYear--;
       newMonth = 12 + currentMonth - month.value;
   }

   let newDay = 0;
   if(currentDay >= day.value){
       newDay = currentDay - day.value;
   }
   else{
       newMonth--;
       if(isLeapYear(day.value, month.value, year.value)){
           newDay = 30 + currentDay - day.value;
       }
       else{
           newDay = currentDay - day.value;
       }

       if(newMonth < 0){
           newMonth = 11;
           newYear--;
       }
       if(newMonth < currentMonth){
           newDay++;
       }
   }

   yearOutput.innerHTML = newYear;
   monthOutput.innerHTML = newMonth;
   dayOutput.innerHTML = newDay;
}

 form.addEventListener('submit', (e)  => { 
   e.preventDefault();
   correctDay();
   correctMonth();
   correctYear();
   if (correctDay() && correctMonth() && correctYear()) {
      substractAge();
   }
});