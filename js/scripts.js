document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");



    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        // Ensure input elements exist before accessing them
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        if (!nameInput || !emailInput || !passwordInput) {
            console.error("One or more input fields not found!");
            return;
        }

        // Prepare user data
        const userData = {
            Name: nameInput.value,
            Email: emailInput.value,
            Password: passwordInput.value,
            Role: "User"
        };

        console.log("Sending Data:", userData);

        try {
            const response = await fetch("https://localhost:7259/api/Auth/Register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            console.log("API Response:", result);

            if (response.ok) {
                message.style.color = "green";
                message.innerText = "User registered successfully!";
                form.reset(); 
            } else {
                message.style.color = "red";
                message.innerText = "Error: " + (result.message || "Registration failed.");
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    });
});


//login

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userData = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    try {
        const response = await fetch("https://localhost:7259/api/Auth/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const text = await response.text(); // Debugging Response
        console.log("Raw API Response:", text);

        try {
            const result = JSON.parse(text); // Convert to JSON
            if (response.ok) {
                document.getElementById("message").innerHTML = `<div class="alert alert-success">Login Successful!</div>`;
                localStorage.setItem("token", result.token); // Store JWT Token
                setTimeout(() => {
                    window.location.href = "dashboard.html"; // Redirect to dashboard
                }, 1000);
            } else {
                document.getElementById("message").innerHTML = `<div class="alert alert-danger">${result.message || "Invalid credentials"}</div>`;
            }
        } catch (error) {
            console.error("JSON Parse Error:", error);
            document.getElementById("message").innerHTML = `<div class="alert alert-danger">Server Error: Invalid Response</div>`;
        }
    } catch (error) {
        console.error("API Error:", error);
        document.getElementById("message").innerHTML = `<div class="alert alert-danger">Login failed. Try again.</div>`;
    }
});

