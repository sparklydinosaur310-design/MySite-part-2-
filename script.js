// ============================================
// "Which sport are you?" quiz
// Salvador's quiz — his questions, his words
// ============================================

// 1. THE QUESTIONS — Salvador's 4 scenarios, each with 3 options.
//    Each option secretly maps to a sport via the "sport" key.

const questions = [
    {
        q: "You wake up and you're feeling energetic. Do you...",
        options: [
            { text: "get a ball and try to do something with your feet",   sport: "soccer"    },
            { text: "find a nerf gun and shoot some targets",             sport: "air guns"  },
            { text: "pick up a broom and attack the wall with it",        sport: "fencing"   }
        ]
    },
    {
        q: "You're taking a stroll down the road. Do you...",
        options: [
            { text: "start kicking a pebble as you walk",                sport: "soccer"    },
            { text: "get a stick and hold it like it's a sword",         sport: "fencing"   },
            { text: "pick up a rock and launch it with your slingshot",  sport: "air guns"  }
        ]
    },
    {
        q: "You're in school, do you...",
        options: [
            { text: "go to the field with your friends",                 sport: "soccer"    },
            { text: "go to the indoor sports hall with your friends",    sport: "volleyball"},
            { text: "go to the library with your friends",               sport: "nerd"      }
        ]
    },
    {
        q: "You're at home, do you...",
        options: [
            { text: "go to the lake and paddle around in a kayak",       sport: "kayaking"  },
            { text: "go outside and kick a ball",                        sport: "soccer"    },
            { text: "stay in your room and bounce a ball off the wall with your arms", sport: "volleyball" }
        ]
    }
];

// 2. THE SCOREBOARD — starts at 0 for every sport.

const scores = {
    soccer: 0,
    volleyball: 0,
    fencing: 0,
    "air guns": 0,
    kayaking: 0,
    nerd: 0
};

// 3. TRACK WHICH QUESTION WE'RE ON (starts at the first one, index 0)

let qIndex = 0;

// 4. SHOW A QUESTION — fills the <p id="question"> with text,
//    then builds buttons for each option and sticks them in the page.

function showQuestion(index) {

    // set the question text
    document.getElementById("question").textContent = questions[index].q;

    // grab the <div id="answers"> and empty it (so old buttons vanish)
    const box = document.getElementById("answers");
    box.textContent = "";

    // loop through the options and create a button for each one
    for (const option of questions[index].options) {

        const button = document.createElement("button");   // create a button element
        button.textContent = option.text;                  // give it the option text

        // when clicked, call choose() with that option's sport
        button.addEventListener("click", function () {
            choose(option.sport);
        });

        box.appendChild(button);   // put the button on the page
    }
}

// 5. CHOOSE — adds 1 point to that sport, then moves on
//    (or finishes if we've reached the last question).

function choose(sport) {

    scores[sport] = scores[sport] + 1;   // score a point

    qIndex = qIndex + 1;                 // move to next question

    if (qIndex < questions.length) {
        showQuestion(qIndex);            // show next question
    } else {
        showResult();                    // we're done — tally up
    }
}

// 6. RESULT — loops through the scoreboard, finds the winner,
//    and announces it on the page.

function showResult() {

    let winner = "";       // the sport name with the most points
    let topScore = 0;      // how many points the leader has

    for (const sport in scores) {
        if (scores[sport] > topScore) {
            winner = sport;
            topScore = scores[sport];
        }
    }

    document.getElementById("result").textContent =
        "You are a " + winner + " person!";

    // hide the question and buttons so only the result shows
    document.getElementById("question").textContent = "";
    document.getElementById("answers").textContent = "";
}

// 7. START — show the first question as soon as the page loads

showQuestion(0);
