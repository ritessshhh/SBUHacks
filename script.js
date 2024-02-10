const selectElement = document.getElementById("policySelect");
let selectedText;

selectElement.addEventListener("change", function () {
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];
    selectedText = selectedOption.textContent;
    console.log(selectedText);
});

const selectButton = document.getElementById("selectButton");

selectButton.addEventListener("click", function () {
    fetch('http://127.0.0.1:8000/start', {
        method: 'POST',
        body: selectedText,
    }).then(response => {
        if (response.ok) {
            return response.json(); // Parse response body as JSON
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(data => {
        console.log(data); // Log the response data
        // Here you can handle the response data as needed
    }).catch(error => {
        console.error('Error:', error);
    });
});

