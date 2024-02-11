window.addEventListener('load', function () {
    document.getElementById('loadingOverlay').style.display = 'none';
});
const success = sessionStorage.getItem("success");
const masteryText = document.getElementById("masteryText")
if (success === null) {
    masteryText.style.display = "none";
}
else {
    masteryText.innerText = `Congratulations for mastering ${success}`
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize an empty array to store the texts
    let data = [];

    // Select all the items
    const items = document.querySelectorAll('#section1 .item');

    // Add click event listener to each item
    items.forEach(item => {
        item.addEventListener('click', function () {
            // Get the text content of the h4 element inside the clicked item
            const text = this.querySelector('h4').textContent;
            document.getElementById('loadingOverlay').style.display = 'block';
            fetch('http://127.0.0.1:8000/start', {
                method: 'POST',
                body: text,
            }).then(response => {
                if (response.ok) {
                    return response.json(); // Parse response body as JSON
                } else {
                    throw new Error('Network response was not ok.');
                }
            }).then(data => {
                // Set a value in sessionStorage
                document.getElementById('loadingOverlay').style.display = 'none';
                console.log(data);

                sessionStorage.setItem('topic', text)
                sessionStorage.setItem('questionInfo', JSON.stringify(data));
                window.location.assign("/game/game.html");
            }).catch(error => {
                document.getElementById('loadingOverlay').style.display = 'none';
                console.error('Error:', error);
            });
        });
    });
});