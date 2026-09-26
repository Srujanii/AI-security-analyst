/* =========================================================
   SENTINELAI
   AI SECURITY ANALYST
   JAVASCRIPT
   ========================================================= */


/* =========================================================
   EXAMPLE SECURITY ALERTS
   ========================================================= */

const exampleAlerts = {

    bruteforce:
        "Multiple failed login attempts detected from IP 192.168.1.24. More than 50 authentication failures occurred within 2 minutes.",

    portscan:
        "Network monitoring detected a host scanning multiple ports. Source IP 10.0.0.52 attempted connections to ports 21, 22, 23, 80, 443 and 3389.",

    malware:
        "Suspicious executable file detected on workstation 192.168.1.18. The file attempted to modify system files and establish an external network connection.",

    normal:
        "User successfully logged into the company portal from registered device 192.168.1.10 using normal authentication credentials."
};


/* =========================================================
   LOAD EXAMPLE
   ========================================================= */

function loadExample(type) {

    const input = document.getElementById("alertInput");

    if (!input) {
        return;
    }

    if (exampleAlerts[type]) {

        input.value = exampleAlerts[type];

        input.focus();

        input.style.borderColor = "#28a9d8";

        setTimeout(() => {
            input.style.borderColor = "";
        }, 1000);
    }
}


/* =========================================================
   ANALYZE ALERT
   ========================================================= */

function analyzeAlert() {

    const input = document.getElementById("alertInput");
    const result = document.getElementById("resultContent");
    const status = document.getElementById("analysisStatus");

    if (!input || !result || !status) {
        return;
    }

    const text = input.value.trim();

    /* Empty input */

    if (text.length === 0) {

        status.textContent = "Waiting";
        status.className = "status waiting";

        result.innerHTML = `
            <div class="empty-result">

                <div class="empty-icon">⚠️</div>

                <h3>No Alert Provided</h3>

                <p>
                    Please enter a security alert and try again.
                </p>

            </div>
        `;

        return;
    }


    /* Show analyzing animation */

    status.textContent = "Analyzing...";
    status.className = "status analyzing";

    result.innerHTML = `
        <div class="loading-analysis">

            <div class="loading-spinner"></div>

            <h3>AI is analyzing the alert...</h3>

            <p>
                Detecting patterns and security indicators
            </p>

        </div>
    `;


    /* Simulated processing time */

    setTimeout(() => {

        const prediction = classifyAlert(text);

        displayAnalysis(prediction);

    }, 1200);
}


/* =========================================================
   CLASSIFY ALERT
   ========================================================= */

function classifyAlert(text) {

    const alert = text.toLowerCase();


    /* ---------------------------------------------
       BRUTE FORCE
       --------------------------------------------- */

    const bruteForce = [
        "brute force",
        "failed login",
        "failed logins",
        "multiple failed",
        "authentication failure",
        "authentication failures",
        "login attempts",
        "password attempts",
        "repeated login",
        "credential attack"
    ];


    /* ---------------------------------------------
       PORT SCAN
       --------------------------------------------- */

    const portScan = [
        "port scan",
        "port scanning",
        "scanning multiple ports",
        "scan multiple ports",
        "network reconnaissance",
        "port 21",
        "port 22",
        "port 23",
        "port 80",
        "port 443",
        "port 3389",
        "3389"
    ];


    /* ---------------------------------------------
       MALWARE
       --------------------------------------------- */

    const malware = [
        "malware",
        "virus",
        "trojan",
        "ransomware",
        "suspicious executable",
        "suspicious file",
        "malicious file",
        "malicious software",
        "infected",
        "modify system files",
        "external network connection"
    ];


    /* ---------------------------------------------
       NORMAL
       --------------------------------------------- */

    const normal = [
        "successful login",
        "successfully logged",
        "normal authentication",
        "registered device",
        "valid credentials",
        "normal login"
    ];


    /* Calculate scores */

    const scores = {

        bruteForce: getScore(alert, bruteForce),

        portScan: getScore(alert, portScan),

        malware: getScore(alert, malware),

        normal: getScore(alert, normal)
    };


    /* Find highest score */

    let prediction = "unknown";
    let highestScore = 0;


    for (const type in scores) {

        if (scores[type] > highestScore) {

            highestScore = scores[type];

            prediction = type;
        }
    }


    /* ---------------------------------------------
       BRUTE FORCE RESULT
       --------------------------------------------- */

    if (prediction === "bruteForce") {

        return {

            title: "Brute Force Attack",

            category: "Authentication Attack",

            severity: "CRITICAL",

            confidence: 96,

            icon: "🔴",

            explanation:
                "The alert shows repeated failed authentication attempts. This behavior is commonly associated with an attacker trying many passwords or credentials to gain unauthorized access.",

            reason:
                "Multiple authentication failures were detected within a short period of time.",

            action:
                "Block or restrict the source IP, review affected accounts and enable Multi-Factor Authentication (MFA)."
        };
    }


    /* ---------------------------------------------
       PORT SCAN RESULT
       --------------------------------------------- */

    if (prediction === "portScan") {

        return {

            title: "Port Scanning Activity",

            category: "Network Reconnaissance",

            severity: "HIGH",

            confidence: 93,

            icon: "🟠",

            explanation:
                "The source system is attempting connections to multiple network ports. Attackers often perform port scanning to discover available services before attempting further attacks.",

            reason:
                "A single source attempted connections to multiple ports on the network.",

            action:
                "Investigate the source IP, restrict unnecessary ports and check exposed services for vulnerabilities."
        };
    }


    /* ---------------------------------------------
       MALWARE RESULT
       --------------------------------------------- */

    if (prediction === "malware") {

        return {

            title: "Possible Malware",

            category: "Malware Detection",

            severity: "CRITICAL",

            confidence: 95,

            icon: "🔴",

            explanation:
                "The alert contains indicators of potentially malicious software. The suspicious file appears to perform behavior that could compromise the affected system.",

            reason:
                "A suspicious executable or file showed potentially malicious behavior.",

            action:
                "Isolate the affected device, block the suspicious file and perform a complete endpoint security scan."
        };
    }


    /* ---------------------------------------------
       NORMAL RESULT
       --------------------------------------------- */

    if (prediction === "normal") {

        return {

            title: "Normal Authentication",

            category: "Normal Activity",

            severity: "LOW",

            confidence: 97,

            icon: "🟢",

            explanation:
                "The alert appears consistent with normal user authentication. The login originated from a registered device using valid credentials.",

            reason:
                "No strong indicators of malicious authentication behavior were detected.",

            action:
                "No immediate action is required. Continue normal monitoring."
        };
    }


    /* ---------------------------------------------
       UNKNOWN RESULT
       --------------------------------------------- */

    return {

        title: "Suspicious Activity",

        category: "Unknown Activity",

        severity: "MEDIUM",

        confidence: 78,

        icon: "🟡",

        explanation:
            "The system detected activity that does not clearly match a known threat category.",

        reason:
            "The alert does not contain enough information for a high-confidence classification.",

        action:
            "Review the source IP, timestamp, affected system and related security events."
    };
}


/* =========================================================
   CALCULATE KEYWORD SCORE
   ========================================================= */

function getScore(text, keywords) {

    let score = 0;

    keywords.forEach(keyword => {

        if (text.includes(keyword)) {
            score++;
        }

    });

    return score;
}


/* =========================================================
   DISPLAY ANALYSIS
   ========================================================= */

function displayAnalysis(data) {

    const result = document.getElementById("resultContent");
    const status = document.getElementById("analysisStatus");

    if (!result || !status) {
        return;
    }


    /* Update status */

    status.textContent = "Analysis Complete";
    status.className = "status complete";


    /* Severity class */

    let severityClass = "medium";

    if (data.severity === "CRITICAL") {

        severityClass = "critical";

    } else if (data.severity === "HIGH") {

        severityClass = "high";

    } else if (data.severity === "LOW") {

        severityClass = "low";
    }


    /* Create result */

    result.innerHTML = `

        <div class="analysis-main">

            <!-- Prediction -->

            <div class="prediction-header">

                <div class="prediction-icon">
                    ${data.icon}
                </div>

                <div>

                    <span class="result-label">
                        AI PREDICTION
                    </span>

                    <h2>
                        ${data.title}
                    </h2>

                    <span class="category">
                        ${data.category}
                    </span>

                </div>

            </div>


            <!-- Severity -->

            <div class="result-severity">

                <span>
                    Threat Severity
                </span>

                <strong class="${severityClass}">
                    ${data.severity}
                </strong>

            </div>


            <!-- Confidence -->

            <div class="confidence-section">

                <div class="confidence-header">

                    <span>
                        AI Confidence
                    </span>

                    <strong>
                        ${data.confidence}%
                    </strong>

                </div>

                <div class="confidence-bar">

                    <div
                        class="confidence-progress"
                        style="width: 0%"
                    ></div>

                </div>

            </div>


            <!-- Explanation -->

            <div class="explanation-box">

                <div class="box-icon">
                    💬
                </div>

                <div>

                    <h3>
                        What is happening?
                    </h3>

                    <p>
                        ${data.explanation}
                    </p>

                </div>

            </div>


            <!-- Reason -->

            <div class="reason-box">

                <div class="box-icon">
                    🧠
                </div>

                <div>

                    <h3>
                        Why did AI flag this?
                    </h3>

                    <p>
                        ${data.reason}
                    </p>

                </div>

            </div>


            <!-- Action -->

            <div class="action-box">

                <div class="box-icon">
                    🛠️
                </div>

                <div>

                    <h3>
                        Recommended Action
                    </h3>

                    <p>
                        ${data.action}
                    </p>

                </div>

            </div>

        </div>
    `;


    /* Animate confidence bar */

    setTimeout(() => {

        const progress =
            document.querySelector(".confidence-progress");

        if (progress) {

            progress.style.width =
                data.confidence + "%";
        }

    }, 100);
}


/* =========================================================
   NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item => {

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });

});


/* =========================================================
   ACTIVE SECTION WHILE SCROLLING
   ========================================================= */

window.addEventListener("scroll", function () {

    const sections =
        document.querySelectorAll(".page-section");

    const navLinks =
        document.querySelectorAll(".nav-link");


    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >=
            sectionTop - 250
        ) {

            currentSection =
                section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href === "#" + currentSection
        ) {

            link.classList.add("active");
        }

    });

});


/* =========================================================
   KEYBOARD SHORTCUT
   CTRL + ENTER = ANALYZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const input =
        document.getElementById("alertInput");


    if (input) {

        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.ctrlKey &&
                    event.key === "Enter"
                ) {

                    analyzeAlert();
                }

            }
        );

    }

});


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "🛡️ SentinelAI Security Analyst initialized."
);

console.log(
    "AI Alert Analyzer is ready."
);