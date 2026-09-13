
  // ============================================
  // My training streak — by Salvador
  // ============================================

  // 1. Find the button and the counter line on the page
  const button = document.getElementById("trainButton");
  const streakText = document.getElementById("streakText");

  // 2. Load the saved number from the browser's memory (localStorage)
  let days = localStorage.getItem("trainingDays");

  // If nothing was saved yet, start at 0
  if (days === null) {
      days = 0;
  } else {
      days = Number(days);
  }

  // 3. Show the current number on the page
  function showDays() {
      streakText.textContent = days + " days so far";
  }
  showDays();

  // 4. When the button is clicked: add 1, save it, show it
  button.addEventListener("click", function () {
      days = days + 1;
      localStorage.setItem("trainingDays", days);
      showDays();
  });