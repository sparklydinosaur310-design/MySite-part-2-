  // ============================================
  // My training streak — by Salvador
  // ============================================

  // 1. Find the button and the counter line on the page
  const button = document.getElementById("trainButton");
  const countText = document.getElementById("streakText");

  // 2. Load the list of training dates from memory
  let trainedDates = localStorage.getItem("trainedDates");
  if (trainedDates === null) {
      trainedDates = [];                      // nothing saved yet → empty list
  } else {
      trainedDates = trainedDates.split(","); // "2026-9-13,2026-9-12" → a list
  }

  // 3. Today's date as text (like "2026-9-13")
  const today = new Date();                              // grab the clock
  const todayText = today.getFullYear() + "-" +
                    (today.getMonth() + 1) + "-" +
                    today.getDate();

  // 4. Are we already done for today?
  const alreadyTrained = trainedDates.includes(todayText);

  if (alreadyTrained) {
      button.disabled = true;
      button.textContent = "Done for today — see you tomorrow 💪";
  }

  // 5. Show the total count
  countText.textContent = trainedDates.length + " days so far";

  // 6. On click: record today ONE time, save, update
  button.addEventListener("click", function () {
      if (alreadyTrained) return;

      trainedDates.push(todayText);
      localStorage.setItem("trainedDates", trainedDates.join(","));

      countText.textContent = trainedDates.length + " days so far";

      button.disabled = true;
      button.textContent = "Done for today — see you tomorrow 💪";
  });