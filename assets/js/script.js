
document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let response = document.getElementById("response");

    if (name === "" || email === "" || message === "") {
        response.innerText = "Пожалуйста, заполните все поля!";
    } else if (!email.includes("@")) {
        response.innerText = "Пожалуйста, введите корректный email!";
    } else if (message.length < 10) {
        response.innerText = "Сообщение должно содержать минимум 10 символов!";
    } else {
        response.innerText = "Спасибо за обратную связь, " + name + "!";
    }
});

const commentField = document.getElementById('comment');
const charCountDisplay = document.getElementById('charCount');

commentField.addEventListener('input', () => {
    const currentLength = commentField.value.length;
    charCountDisplay.textContent = `${currentLength}/200 символов`;
});

document.addEventListener("DOMContentLoaded", function() {
    const addInterestButton = document.getElementById("addInterestButton");
    const interestModal = document.getElementById("interestModal");
    const saveInterestButton = document.getElementById("saveInterestButton");
    const cancelInterestButton = document.getElementById("cancelInterestButton");
    const newInterestText = document.getElementById("newInterestText");
    const dynamicInterests = document.getElementById("dynamic-interests");
    const interestsForm = document.getElementById("interestsForm");
    const formOutput = document.getElementById("formOutput");

    function toggleModal(display) {
        interestModal.style.display = display;
        if (display === "none") newInterestText.value = "";
    }

    function createNewInterest(text) {
        const checkboxId = `interest-${Date.now()}`;
        const checkbox = `<input type="checkbox" name="interests" value="${text}" id="${checkboxId}">
                          <label for="${checkboxId}" class="size">${text}</label><br>`;
        dynamicInterests.insertAdjacentHTML('beforeend', checkbox);
    }

    addInterestButton.addEventListener("click", () => toggleModal("block"));
    cancelInterestButton.addEventListener("click", () => toggleModal("none"));

    saveInterestButton.addEventListener("click", () => {
        const interestText = newInterestText.value.trim();
        if (interestText) {
            createNewInterest(interestText);
            toggleModal("none");
        }
    });

    interestsForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const checkboxes = document.querySelectorAll('#interestsForm input[name="interests"]');
        const isChecked = Array.from(checkboxes).some(x => x.checked);
        const name = document.getElementById("name1").value;
        const age = document.getElementById("age1").value;
        const comment = document.getElementById("comment").value;
        const response = document.getElementById("response1");

        if (name === "" || age === "") {
            response.innerText = "Пожалуйста, заполните все поля!";
        } else if (!isChecked) {
            response.innerText = "Нужно выбрать хотя бы один интерес!";
        } else {
            response.innerText = "Спасибо за обратную связь, " + name + "!";

            let output = "<h3>Введенные данные:</h3>";
            output += `<p><strong>Имя:</strong> ${name}</p>`;
            output += `<p><strong>Возраст:</strong> ${age}</p>`;

            const gender = document.querySelector('input[name="gender"]:checked');
            if (gender) {
                output += `<p><strong>Пол:</strong> ${gender.nextElementSibling.textContent}</p>`;
            }

            output += "<h4>Интересы:</h4>";
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const label = document.querySelector(`label[for="${checkbox.id}"]`);
                    output += `<p>${label ? label.textContent : checkbox.value}</p>`;
                }
            });

            if (comment.length > 0) {
                output += `<br><p><strong>Комментарий:</strong> ${comment}</p>`;
            }

            formOutput.innerHTML = output;
            
        }
    });
});

