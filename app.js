const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let step = 0;
let userDetails = {
    city: "",
    rooms: "",
    budget: "",
};

function addMessage(sender, text) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.textContent = text;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function handleUserResponse(response) {
    if (step === 0) {
        if (response.toLowerCase() === "yes") {
            addMessage("bot", "Great! Which city do you want to book a hotel in?");
            step++;
        } else {
            addMessage("bot", "Alright! Let me know if you need help later.");
        }
    } else if (step === 1) {
        userDetails.city = response;
        addMessage("bot", "How many rooms do you need?");
        step++;
    } else if (step === 2) {
        userDetails.rooms = response;
        addMessage("bot", "What is your budget per night (in USD)?");
        step++;
    } else if (step === 3) {
        userDetails.budget = response;
        addMessage(
            "bot",
            `Congratulations! Your hotel room in ${userDetails.city} has been booked for ${userDetails.rooms} room(s) within a budget of $${userDetails.budget} per night.`
        );
        step = 0; 
    }
}

sendBtn.addEventListener("click", () => {
    const userResponse = userInput.value.trim();
    if (userResponse) {
        addMessage("user", userResponse);
        handleUserResponse(userResponse);
        userInput.value = "";
    }
});

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});
