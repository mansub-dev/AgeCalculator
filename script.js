document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('age-form');

    function createLabelAndInput(labelText, inputId, inputType, min, max, placeholder) {
        const label = document.createElement('label');
        label.setAttribute('for', inputId);
        label.textContent = labelText;

        const input = document.createElement('input');
        input.setAttribute('type', inputType);
        input.setAttribute('id', inputId);
        input.setAttribute('min', min);
        input.setAttribute('max', max);
        input.setAttribute('placeholder', placeholder);
        input.setAttribute('required', true);

        form.appendChild(label);
        form.appendChild(input);
    }

    createLabelAndInput('Day:', 'day', 'number', '1', '31', '00');
    createLabelAndInput('Month:', 'month', 'number', '1', '12', '00');
    createLabelAndInput('Year:', 'year', 'number', '1900', new Date().getFullYear(), '0000');

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.className = 'button';
    button.textContent = 'Calculate Age';
    form.appendChild(button);

    function calculateAge() {
        const day = parseInt(document.getElementById('day').value);
        const month = parseInt(document.getElementById('month').value) - 1; // Month is 0-based in JS Date
        const year = parseInt(document.getElementById('year').value);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            document.getElementById('result').innerText = "Please enter a valid date of birth.";
            return;
        }

        const dob = new Date(year, month, day);

        if (dob.getDate() !== day || dob.getMonth() !== month || dob.getFullYear() !== year) {
            document.getElementById('result').innerText = "Please enter a valid date.";
            return;
        }

        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const mon = today.getMonth() - dob.getMonth();

        if (today.getMonth() < dob.getMonth() ||
            (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
            age--;
        }

        document.getElementById('result').innerText = `Your age is ${age} years.`;
    }

    button.addEventListener('click', calculateAge);
});