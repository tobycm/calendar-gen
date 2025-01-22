import "./style.css";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

let yearInput = prompt("Enter year:", "2025");

const year = yearInput ? parseInt(yearInput) : new Date().getFullYear();

const daysSince1 = Math.floor((year - 1) * 365.25);

let firstWeekday = daysSince1 % 7;

interface Day {
  day: number;
  weekday: (typeof weekdays)[number];
}

const leapYear = new Date(year, 1, 29).getDate() === 29;

const monthNames = [
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
] as const;
const monthLengths = leapYear ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const months = [];

for (let i = 0; i < 12; i++) {
  const month = [];
  for (let j = 0; j < monthLengths[i]; j++) {
    month.push({ day: j + 1, weekday: weekdays[(firstWeekday + j) % 7] });
  }
  months.push(month);

  firstWeekday = (firstWeekday + monthLengths[i]) % 7;
}

console.log(months);

months.forEach((month, i) => {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const thr = document.createElement("tr");
  thr.classList.add("weekdays");

  weekdays.forEach((weekday) => {
    const th = document.createElement("th");
    th.textContent = weekday;
    thr.appendChild(th);
  });

  thead.appendChild(thr);

  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  const padding = weekdays.indexOf(month[0].weekday);

  let tr = document.createElement("tr");

  // add empty cells padding
  for (let i = 0; i < padding; i++) {
    const td = document.createElement("td");
    td.textContent = "";
    tr.appendChild(td);
  }

  month.forEach((day, i) => {
    if ((i + padding) % 7 === 0) {
      tbody.appendChild(tr);
      tr = document.createElement("tr");
    }

    const td = document.createElement("td");

    if (day.weekday === "Saturday" || day.weekday === "Sunday") {
      td.classList.add("weekend");
    }

    td.innerHTML = `<textarea></textarea><span>${day.day}</span>`;

    tr.appendChild(td);
  });

  tbody.appendChild(tr);

  table.appendChild(tbody);

  const monthTitle = document.createElement("h1");
  monthTitle.textContent = monthNames[i];
  document.body.appendChild(monthTitle);

  document.body.appendChild(table);
});

const spans = document.querySelectorAll("span");

spans.forEach((span) => {
  span.addEventListener("click", () => {
    span.classList.toggle("selected");
  });
});
