document.getElementById("startButton").addEventListener("click", function () {

    document.getElementById("planForm").scrollIntoView({
        behavior: "smooth"
    });

});
document.getElementById("generateButton").addEventListener("click", function () {
    const name = document.getElementById("studentName").value.trim();

    const subjectsInput =
        document.getElementById("subjects").value.trim();

    const days =
        Number(document.getElementById("days").value);

    const hours =
        Number(document.getElementById("hours").value);

    const weakSubjectsInput =
        document.getElementById("weakSubjects").value.trim();

    const strongSubjectsInput =
        document.getElementById("strongSubjects").value.trim();

    const studyTime =
        document.getElementById("studyTime").value;

    const studyGoal =
        document.getElementById("studyGoal").value;

    const studyMethod =
        document.getElementById("studyMethod").value;
    if (
        name === "" ||
        subjectsInput === "" ||
        days <= 0 ||
        hours <= 0
    ) {

        alert(
            "Please fill in your name, subjects, exam days and daily study hours."
        );

        return;
    }
    const subjects = subjectsInput
        .split(",")
        .map(subject => subject.trim())
        .filter(subject => subject !== "");


    const weakSubjects = weakSubjectsInput
        .split(",")
        .map(subject => subject.trim().toLowerCase())
        .filter(subject => subject !== "");


    const strongSubjects = strongSubjectsInput
        .split(",")
        .map(subject => subject.trim().toLowerCase())
        .filter(subject => subject !== "");
    let progress = 0;

    if (days <= 7) {
        progress = 75;
    }

    else if (days <= 15) {
        progress = 55;
    }

    else if (days <= 30) {
        progress = 35;
    }

    else {
        progress = 20;
    }
    let priorityMessage;

    if (weakSubjects.length > 0) {

        priorityMessage =
            "Your difficult subjects will receive extra practice and revision time.";

    }

    else {

        priorityMessage =
            "Your study time will be distributed evenly across your subjects.";

    }
    let timeMessage;

    if (studyTime === "morning") {

        timeMessage =
            "Your main study sessions are planned around the morning.";

    }

    else if (studyTime === "afternoon") {

        timeMessage =
            "Your main study sessions are planned around the afternoon.";

    }

    else if (studyTime === "evening") {

        timeMessage =
            "Your main study sessions are planned around the evening.";

    }

    else if (studyTime === "night") {

        timeMessage =
            "Your main study sessions are planned around the night.";

    }

    else {

        timeMessage =
            "Your study schedule will remain flexible.";

    }
    let goalMessage;

    if (studyGoal === "pass") {

        goalMessage =
            "The plan focuses on important topics, practice and regular revision.";

    }

    else if (studyGoal === "improve") {

        goalMessage =
            "The plan gives additional attention to weak areas to improve your marks.";

    }

    else if (studyGoal === "high") {

        goalMessage =
            "The plan combines concepts, practice, revision and mock-test preparation.";

    }

    else if (studyGoal === "consistent") {

        goalMessage =
            "The plan focuses on building a realistic and consistent daily routine.";

    }

    else {

        goalMessage =
            "The plan balances learning, practice and revision.";

    }
    let subjectCards = "";

    let totalRecommendedHours = 0;


    subjects.forEach(function (subject) {

        const lowerSubject = subject.toLowerCase();

        let subjectType = "Regular Priority";

        let recommendedHours =
            hours / subjects.length;

        let task =
            "Study important concepts and solve practice questions.";
        if (weakSubjects.includes(lowerSubject)) {

            subjectType = "High Priority";

            recommendedHours =
                hours / subjects.length + 0.5;

            task =
                "Focus on difficult concepts, practice questions and revision.";

        }
        else if (strongSubjects.includes(lowerSubject)) {

            subjectType = "Maintenance";

            recommendedHours =
                Math.max(
                    0.5,
                    hours / subjects.length - 0.3
                );

            task =
                "Revise important concepts and solve a few practice questions.";

        }


        recommendedHours =
            Math.min(
                recommendedHours,
                hours
            );
        totalRecommendedHours += recommendedHours;
        let priorityClass = "regular";

        if (subjectType === "High Priority") {

            priorityClass = "high";

        }

        else if (subjectType === "Maintenance") {

            priorityClass = "maintenance";

        }
        subjectCards += `

            <div class="subject-card">

                <div class="subject-top">

                    <h3>${subject}</h3>

                    <span class="subject-priority ${priorityClass}">
                        ${subjectType}
                    </span>

                </div>

                <p class="subject-hours">

                    <strong>
                        ${recommendedHours.toFixed(1)} hrs
                    </strong>

                    recommended today

                </p>

                <p>
                    ${task}
                </p>

                <div class="subject-progress">

                    <div class="subject-progress-bar"></div>

                </div>

            </div>

        `;

    });
    let dailyTasks = "";

    subjects.forEach(function (subject, index) {

        let taskType;

        if (weakSubjects.includes(subject.toLowerCase())) {

            taskType =
                "Learn difficult topics + practice questions";

        }

        else if (strongSubjects.includes(subject.toLowerCase())) {

            taskType =
                "Quick revision + practice";

        }

        else {

            taskType =
                "Concept learning + practice";

        }
        dailyTasks += `

            <div class="daily-task">

                <div class="task-number">
                    ${index + 1}
                </div>

                <div>

                    <h4>${subject}</h4>

                    <p>${taskType}</p>

                </div>

            </div>

        `;

    });
    let studyPlan =
        document.getElementById("studyPlan");


    if (!studyPlan) {

        studyPlan =
            document.createElement("section");

        studyPlan.id = "studyPlan";

        studyPlan.className = "study-plan";

        document
            .getElementById("planForm")
            .after(studyPlan);

    }
    studyPlan.innerHTML = `

        <!-- Dashboard Header -->

        <div class="dashboard-header">

            <div>

                <p class="dashboard-label">
                    YOUR PERSONALIZED DASHBOARD
                </p>

                <h2>
                    Hey ${name}, let's get you ready.
                </h2>

                <p>
                    Your study plan has been created based on
                    your subjects, available time and study preferences.
                </p>

            </div>

        </div>


        <!-- Summary Cards -->

        <div class="plan-summary">

            <div>

                <strong>${days}</strong>

                <span>
                    Days Left
                </span>

            </div>


            <div>

                <strong>${hours} hrs</strong>

                <span>
                    Daily Target
                </span>

            </div>


            <div>

                <strong>${subjects.length}</strong>

                <span>
                    Subjects
                </span>

            </div>


            <div>

                <strong>${progress}%</strong>

                <span>
                    Preparation Level
                </span>

            </div>

        </div>


        <!-- Preparation Progress -->

        <div class="progress-dashboard">

            <div class="progress-heading">

                <div>

                    <h3>
                        Overall Preparation
                    </h3>

                    <p>
                        Keep going. Consistency matters more than
                        studying everything in one day.
                    </p>

                </div>

                <strong>
                    ${progress}%
                </strong>

            </div>


            <div class="big-progress-container">

                <div
                    class="big-progress"
                    style="width: ${progress}%"
                ></div>

            </div>

        </div>


        <!-- Personalized Strategy -->

        <div class="personalized-message">

            <h3>
                Your Personalized Strategy
            </h3>

            <p>
                ${priorityMessage}
            </p>

            <p>
                ${timeMessage}
            </p>

            <p>
                ${goalMessage}
            </p>

        </div>


        <!-- Today's Tasks -->

        <div class="dashboard-section">

            <div class="section-heading">

                <div>

                    <p class="dashboard-label">
                        TODAY
                    </p>

                    <h2>
                        Your Study Tasks
                    </h2>

                </div>

            </div>


            <div class="daily-tasks">

                ${dailyTasks}

            </div>

        </div>


        <!-- Subject Breakdown -->

        <div class="dashboard-section">

            <p class="dashboard-label">
                SUBJECT BREAKDOWN
            </p>

            <h2>
                Your Subjects
            </h2>

            <div class="subjects-container">

                ${subjectCards}

            </div>

        </div>
        <!-- Revision Roadmap -->

        <div class="revision-box">

            <h3>
                Your Revision Roadmap
            </h3>

            <div class="revision-step">

                <strong>
                    Phase 1 — Learn
                </strong>

                <p>
                    Understand concepts and create short notes.
                </p>

            </div>
            <div class="revision-step">

                <strong>
                    Phase 2 — Practice
                </strong>

                <p>
                    Solve questions, examples and previous questions.
                </p>

            </div>
            <div class="revision-step">

                <strong>
                    Phase 3 — Revise
                </strong>

                <p>
                    Revise important formulas, concepts and mistakes.
                </p>

            </div>


            <div class="revision-step">

                <strong>
                    Phase 4 — Test
                </strong>

                <p>
                    Attempt mock tests and identify remaining weak areas.
                </p>

            </div>

        </div>
        <!-- SmartStudy Tip -->
        <div class="study-tip">
            <h3>
                SmartStudy Tip
            </h3>
            <p>
                Study in focused sessions, take short breaks and
                keep your difficult subjects earlier in your schedule.
            </p>
        </div>
    `;
    studyPlan.scrollIntoView({
        behavior: "smooth"
    });
});
// ==========================================
// SMARTSTUDY LEARNING HUB
// ==========================================

const studyHub = document.getElementById("studyHub");
const hubSubject = document.getElementById("hubSubject");
const subjectMaterial = document.getElementById("subjectMaterial");


// Hide Study Hub until a plan is generated

studyHub.style.display = "none";


// ==========================================
// SUBJECT MATERIAL
// ==========================================

function getSubjectMaterial(subject) {

    const lowerSubject = subject.toLowerCase();


    // --------------------------------------
    // DBMS
    // --------------------------------------

    if (lowerSubject.includes("dbms") || lowerSubject.includes("database")) {

        return {

            topics: [
                "Database Fundamentals",
                "ER Model",
                "Relational Model",
                "Normalization",
                "SQL",
                "Transactions",
                "Indexing"
            ],

            notes:
                "Focus on database concepts, keys, relationships, normalization and SQL commands.",

            practice: [
                {
                    question:
                        "Which normal form removes partial dependency?",

                    options: [
                        "1NF",
                        "2NF",
                        "3NF",
                        "BCNF"
                    ],

                    answer: 1
                },

                {
                    question:
                        "Which SQL command is used to retrieve data?",

                    options: [
                        "INSERT",
                        "UPDATE",
                        "SELECT",
                        "DELETE"
                    ],

                    answer: 2
                },

                {
                    question:
                        "Which key uniquely identifies a record in a table?",

                    options: [
                        "Foreign Key",
                        "Primary Key",
                        "Candidate Key",
                        "Composite Key"
                    ],

                    answer: 1
                }
            ]

        };

    }


    // --------------------------------------
    // JAVA
    // --------------------------------------

    if (lowerSubject.includes("java")) {

        return {

            topics: [
                "Java Basics",
                "Classes and Objects",
                "Inheritance",
                "Polymorphism",
                "Exception Handling",
                "Multithreading",
                "Collections"
            ],

            notes:
                "Revise Java syntax, OOP concepts, classes, inheritance, exceptions and threads.",

            practice: [
                {
                    question:
                        "Which keyword is used to inherit a class in Java?",

                    options: [
                        "implements",
                        "extends",
                        "inherits",
                        "super"
                    ],

                    answer: 1
                },

                {
                    question:
                        "Which method is the starting point of a Java program?",

                    options: [
                        "start()",
                        "run()",
                        "main()",
                        "execute()"
                    ],

                    answer: 2
                },

                {
                    question:
                        "Which concept allows the same method name to have different forms?",

                    options: [
                        "Inheritance",
                        "Polymorphism",
                        "Encapsulation",
                        "Abstraction"
                    ],

                    answer: 1
                }
            ]

        };

    }
    if (
        lowerSubject.includes("math") ||
        lowerSubject.includes("mathematics")
    ) {

        return {

            topics: [
                "Algebra",
                "Functions",
                "Probability",
                "Statistics",
                "Matrices",
                "Calculus",
                "Important Formulas"
            ],

            notes:
                "Start with formulas and concepts, then solve examples and gradually move to timed practice.",

            practice: [
                {
                    question:
                        "What is the probability of getting a head when a fair coin is tossed once?",

                    options: [
                        "0",
                        "1/4",
                        "1/2",
                        "1"
                    ],

                    answer: 2
                },

                {
                    question:
                        "What is the derivative of x²?",

                    options: [
                        "x",
                        "2x",
                        "x²",
                        "2"
                    ],

                    answer: 1
                },

                {
                    question:
                        "What is the mean of 2, 4 and 6?",

                    options: [
                        "3",
                        "4",
                        "5",
                        "6"
                    ],

                    answer: 1
                }
            ]

        };

    }
    if (
        lowerSubject.includes("c++") ||
        lowerSubject === "c" ||
        lowerSubject.includes("cpp")
    ) {

        return {

            topics: [
                "Variables and Data Types",
                "Functions",
                "Arrays",
                "Pointers",
                "Structures",
                "Linked Lists",
                "Trees"
            ],

            notes:
                "Practice syntax along with programs. Focus on understanding how data structures work.",

            practice: [
                {
                    question:
                        "Which symbol is used to access the address of a variable in C/C++?",

                    options: [
                        "*",
                        "&",
                        "#",
                        "@"
                    ],

                    answer: 1
                },

                {
                    question:
                        "Which data structure follows FIFO?",

                    options: [
                        "Stack",
                        "Queue",
                        "Tree",
                        "Graph"
                    ],

                    answer: 1
                },

                {
                    question:
                        "Which data structure follows LIFO?",

                    options: [
                        "Queue",
                        "Array",
                        "Stack",
                        "Linked List"
                    ],

                    answer: 2
                }
            ]

        };

    }
    return {

        topics: [
            "Important Concepts",
            "Definitions",
            "Core Topics",
            "Examples",
            "Important Questions",
            "Revision Topics"
        ],

        notes:
            "Start with the important concepts of this subject, make short notes and practise questions after each topic.",

        practice: [
            {
                question:
                    `Which approach is useful when preparing ${subject}?`,

                options: [
                    "Only reading",
                    "Only memorizing",
                    "Understanding concepts and practising",
                    "Skipping difficult topics"
                ],

                answer: 2
            },

            {
                question:
                    `What should you do after learning a topic in ${subject}?`,

                options: [
                    "Move to another subject immediately",
                    "Practice questions",
                    "Skip revision",
                    "Stop studying"
                ],

                answer: 1
            }
        ]

    };

}
function displaySubjectMaterial(subject) {

    const material = getSubjectMaterial(subject);


    let topicHTML = "";

    material.topics.forEach(function(topic) {

        topicHTML += `
            <div class="topic-item">
                ${topic}
            </div>
        `;

    });


    let questionHTML = "";


    material.practice.forEach(function(question, index) {

        let optionsHTML = "";

        question.options.forEach(function(option, optionIndex) {

            optionsHTML += `
                <div
                    class="mcq-option"
                    onclick="checkAnswer(
                        this,
                        ${optionIndex},
                        ${question.answer}
                    )"
                >
                    ${option}
                </div>
            `;

        });


        questionHTML += `

            <div class="question-card">

                <div class="question-number">
                    QUESTION ${index + 1}
                </div>

                <div class="question-text">
                    ${question.question}
                </div>

                <div class="mcq-options">

                    ${optionsHTML}

                </div>

                <div class="answer-feedback"></div>

            </div>

        `;

    });


    subjectMaterial.innerHTML = `

        <div class="material-header">

            <p class="dashboard-label">
                STUDYING
            </p>

            <h3>
                ${subject}
            </h3>

            <p>
                Your personalized study material for this subject.
            </p>

        </div>


        <div class="material-grid">

            <div class="material-card">

                <h4>
                    Quick Notes
                </h4>

                <p>
                    ${material.notes}
                </p>

            </div>


            <div class="material-card">

                <h4>
                    Topics to Cover
                </h4>

                <div class="topic-list">

                    ${topicHTML}

                </div>

            </div>


            <div class="material-card">

                <h4>
                    Revision Strategy
                </h4>

                <p>
                    Learn the concept → make short notes →
                    practise questions → revise mistakes.
                </p>

            </div>

        </div>


        <div class="practice-section">

            <p class="dashboard-label">
                PRACTICE
            </p>

            <h3>
                Test Your Knowledge
            </h3>

            ${questionHTML}

        </div>

    `;

}
function checkAnswer(element, selectedAnswer, correctAnswer) {

    const questionCard =
        element.closest(".question-card");

    const feedback =
        questionCard.querySelector(".answer-feedback");


    if (selectedAnswer === correctAnswer) {

        feedback.textContent =
            "Correct! Great job.";

        feedback.className =
            "answer-feedback answer-correct";

    }

    else {

        feedback.textContent =
            "Not quite. Try again!";

        feedback.className =
            "answer-feedback answer-wrong";

    }

}
document
    .getElementById("generateButton")
    .addEventListener("click", function() {

        const subjectsInput =
            document.getElementById("subjects").value.trim();


        if (subjectsInput === "") {
            return;
        }
        const subjects =
            subjectsInput
                .split(",")
                .map(subject => subject.trim())
                .filter(subject => subject !== "");
        studyHub.style.display = "block";
        hubSubject.innerHTML = `

            <option value="">
                Select a subject
            </option>

        `;
        subjects.forEach(function(subject) {

            const option =
                document.createElement("option");

            option.value = subject;

            option.textContent = subject;

            hubSubject.appendChild(option);

        });
        if (subjects.length > 0) {

            hubSubject.value = subjects[0];

            displaySubjectMaterial(subjects[0]);

        }

    });
hubSubject.addEventListener("change", function() {
    const selectedSubject =
        hubSubject.value;
    if (selectedSubject !== "") {

        displaySubjectMaterial(selectedSubject);

    }
});
function formatAIResponse(text) {
    return text
        .replace(/^### (.*)$/gm, "<h3>$1</h3>")
        .replace(/^## (.*)$/gm, "<h2>$1</h2>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/^\* (.*)$/gm, "<li>$1</li>")
        .replace(/^- (.*)$/gm, "<li>$1</li>")
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");
}
async function askSmartStudyAI(question) {

    try {

        const response = await fetch("https://smartstudyai-7bex.onrender.com/ask-ai", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });

        const data = await response.json();

        return data.answer;

    } catch (error) {

        console.error(error);

        return "Sorry, I couldn't connect to SmartStudy AI right now.";

    }

}
const sendChatButton = document.getElementById("sendChatButton");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
sendChatButton.addEventListener("click", async function () {
    console.log("CHAT BUTTON CLICKED");
    const question = chatInput.value.trim();
    if (question === "") {
        return;
    }
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = question;
    chatMessages.appendChild(userMessage);
    chatInput.value = "";
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "ai-message";
    loadingMessage.textContent = "Thinking...";
    chatMessages.appendChild(loadingMessage);
    const answer = await askSmartStudyAI(question);
    loadingMessage.innerHTML = formatAIResponse(answer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
console.log("SmartStudy script loaded");