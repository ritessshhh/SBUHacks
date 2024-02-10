const selectElement = document.getElementById("policySelect");
let selectedText; 

selectElement.addEventListener("change", function() {
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];
    selectedText = selectedOption.textContent;
    console.log(selectedText);
});

const selectButton = document.getElementById("selectButton");

selectElement.addEventListener("click", function() {
    fetch('http://127.0.0.1:8000/start', {
        method: 'POST',
        body: selectedText,

    }).then(response => {
        if (response.ok) {


        } else {
            
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});

