 // ============================================
  // My training streak — by Salvador
  // ============================================

  // 1. Find the button and the counter line on the page
  const button = document.getElementById("trainButton");
  const countText = document.getElementById("streakText");
  const streakInfo = document.getElementById("streakInfo");

  // 2. Load the list of training dates from memory
  let trainedDates = localStorage.getItem("trainedDates");
  if (trainedDates === null) {
      trainedDates = [];                      // nothing saved yet → empty list
  } else {
      trainedDates = trainedDates.split(","); // "2026-9-13,2026-9-12" → a list
  }

  // 3. Today's date as text (like "2026-9-13")
  function dateText(d) {
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  const today = new Date();
  const todayText = dateText(today);

  // 4. Are we already done for today?
  const alreadyTrained = trainedDates.includes(todayText);

  if (alreadyTrained) {
      button.disabled = true;
      button.textContent = "Done for today — see you tomorrow 💪";
  }

  // 5. Pep-talk words for the streak banner
  function streakMessage(n) {
      if (n < 1) return "🔥 No streak yet — start today!";
      if (n === 1) return "🔥 1 day streak — keep it going!";
      return "🔥 " + n + " day streak — on fire!";
  }

  // 6. Count the current streak (days in a row)
  let streak = 0;
  let check = new Date(today);
  if (!alreadyTrained) {
      check.setDate(check.getDate() - 1);
  }
  while (trainedDates.includes(dateText(check))) {
      streak = streak + 1;
      check.setDate(check.getDate() - 1);
  }
  streakInfo.textContent = streakMessage(streak);

  // 7. Show the total count (correct "day"/"days")
  countText.textContent = trainedDates.length === 1
      ? "1 day so far"
      : trainedDates.length + " days so far";

  // 6. On click: record today ONE time, save, update
  button.addEventListener("click", function () {
      if (alreadyTrained) return;

      trainedDates.push(todayText);
      localStorage.setItem("trainedDates", trainedDates.join(","));

      streak = streak + 1;
      streakInfo.textContent = streakMessage(streak);

      countText.textContent = trainedDates.length === 1
          ? "1 day so far"
          : trainedDates.length + " days so far";

      button.disabled = true;
      button.textContent = "Done for today — see you tomorrow 💪";

      buildCalendar();   // re-draw so today gets its dumbbell instantly 🏋️
  });

  // 7. BUILD THE CALENDAR — a grid of the whole month
  function buildCalendar() {

      const calBox = document.getElementById("calendar");
      calBox.textContent = "";   // wipe the old grid so we can re-draw

      const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const year = today.getFullYear();
      const month = today.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();  // days this month
      const firstDay = new Date(year, month, 1).getDay();           // weekday of the 1st

      // heading — "September 2026"
      const heading = document.createElement("h3");
      heading.textContent = monthNames[month] + " " + year;
      calBox.appendChild(heading);

      // a row of weekday names
      const nameRow = document.createElement("div");
      nameRow.className = "cal-row cal-names";
      for (const name of dayNames) {
          const cell = document.createElement("div");
          cell.className = "cal-cell";
          cell.textContent = name;
          nameRow.appendChild(cell);
      }
      calBox.appendChild(nameRow);

      // the day grid
      const grid = document.createElement("div");
      grid.className = "cal-row";

      // blank squares until the 1st, so the calendar lines up
      for (let i = 0; i < firstDay; i++) {
          const blank = document.createElement("div");
          blank.className = "cal-cell blank";
          grid.appendChild(blank);
      }

      // one square per day of the month
      for (let d = 1; d <= daysInMonth; d++) {
          const cell = document.createElement("div");
          cell.className = "cal-cell";
          cell.textContent = d;

          const dayText = year + "-" + (month + 1) + "-" + d;
          if (trainedDates.includes(dayText)) {
              cell.textContent = d + " 🏋️";
              cell.classList.add("trained");
          }
          if (d === today.getDate()) {
              cell.classList.add("today");
          }
          grid.appendChild(cell);
      }

      calBox.appendChild(grid);
  }

  // 8. Draw the calendar when the page loads
  buildCalendar();