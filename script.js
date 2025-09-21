document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Quiz logic
    let currentQuestion = 0;
    let score = 0;

    const questions = [
        {
            question: "What is the most secure way to store your passwords?",
            options: ["Writing them on a notepad", "Using a password manager", "Saving them in your browser", "Memorizing them all"],
            answer: 1
        },
        {
            question: "What does 'phishing' typically involve?",
            options: ["A type of fish", "Fraudulent emails to steal information", "Catching malware", "Updating software"],
            answer: 1
        },
        {
            question: "What is the primary purpose of 2FA?",
            options: ["Faster login", "Additional security layer", "Storing data", "Blocking ads"],
            answer: 1
        },
        {
            question: "What type of attack involves exploiting software bugs?",
            options: ["Physical theft", "Vulnerability exploit", "Social networking", "Password cracking"],
            answer: 1
        },
        {
            question: "What should you do when receiving an unexpected email attachment?",
            options: ["Open it immediately", "Scan it first and verify sender", "Delete it without opening", "Reply to confirm"],
            answer: 2
        }
    ];

    function loadQuestion() {
        const questionEl = document.getElementById('question');
        const options = document.querySelectorAll('.option-button');
        questionEl.textContent = `${currentQuestion + 1}: ${questions[currentQuestion].question}`;
        options.forEach((btn, idx) => btn.textContent = questions[currentQuestion].options[idx]);
        updateProgress();
    }

    function selectOption(idx) {
        if (idx === questions[currentQuestion].answer) score++;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function updateProgress() {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${currentQuestion + 1}/${questions.length}`;
    }

    function showResults() {
        document.getElementById('question-container').classList.add('hidden');
        document.getElementById('result-container').classList.remove('hidden');
        const scoreText = document.getElementById('score-text');
        scoreText.textContent = `You scored ${score}/${questions.length}. ${score > 3 ? 'Great job!' : 'Keep learning to improve your security knowledge!'}`;
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        document.getElementById('result-container').classList.add('hidden');
        document.getElementById('question-container').classList.remove('hidden');
        loadQuestion();
    }

    // Initialize quiz
    if (window.location.hash === '#quiz') loadQuestion();

    // Expose functions to global scope for inline onclick
    window.selectOption = selectOption;
    window.restartQuiz = restartQuiz;
});
