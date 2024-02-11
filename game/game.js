window.addEventListener('load', function () {
    document.getElementById('loadingOverlay').style.display = 'none';
});
// Retrieve the value from sessionStorage
const topic = sessionStorage.getItem('topic');
let questionInfo = JSON.parse(sessionStorage.getItem('questionInfo'));
let correctAns = undefined;
console.log(questionInfo); // Output: testValue

let candidates = {
    "Joe Biden": { party: "democrat", image: "../images/Biden.png", description:      "A centrist Democrat with a focus on unity and bipartisanship, advocating for progressive policies while emphasizing collaboration across the political spectrum." },
    "Donald Trump": { party: "republican", image: "../images/trump.png", description: "A populist Republican known for his nationalist and America-first agenda, often taking a confrontational approach to political adversaries and prioritizing issues like immigration reform and trade protectionism." },
    "Nikki Haley": { party: "republican", image: "../images/haley.png", description:  "A conservative Republican with a pragmatic approach to foreign policy and a strong advocate for American exceptionalism and conservative values on the global stage." },
    "Dean Phillips": { party: "democrat", image: "../images/philips.png", description:"A moderate Democrat committed to campaign finance reform and government accountability, prioritizing bipartisan solutions to address issues like healthcare and economic inequality." }
}

const progressBar = document.getElementById("progress");
const progressBarMaxWidth = 340;
const scoreIncrement = 300;

let score = 0;
progressBar.style.width = `${score}px`

const policyText = document.getElementById("policyText");



let card1 = document.getElementById("card1")
card1 = { self: card1, image: card1.querySelector("img"), title: card1.querySelector("div > h5"), description: card1.querySelector("div > p"), button: card1.querySelector("button") }
let card2 = document.getElementById("card2")
card2 = { self: card2, image: card2.querySelector("img"), title: card2.querySelector("div > h5"), description: card2.querySelector("div > p"), button: card2.querySelector("button") }
cards = [card1, card2]

let correctCard;
let incorrectCard;

chooseQuestion();

function answerQuestion(option) {
    const newElement = document.createElement('dotlottie-player');
    newElement.setAttribute('background', 'transparent');
    newElement.setAttribute('style', 'width: 300px; height: 300px;');
    newElement.setAttribute('loop', '');
    newElement.setAttribute('autoplay', '');
    card1.button.disabled = true;
    card2.button.disabled = true;

    if (option == correctAns) {
        score += scoreIncrement;
        progressBar.style.width = `${score}px`
        console.log("Correct!");
        newElement.setAttribute('src', 'https://lottie.host/21d6933f-3fcc-48e4-9d95-7b66f5ec8e93/Xl94Qp2IpM.json');
        correctCard.self.appendChild(newElement)
        newElement.setAttribute('speed', '0.9');

        setTimeout(() => {
            correctCard.self.removeChild(newElement);
        }, 3000);
    }
    else {
        console.log("Incorrect!");
        newElement.setAttribute('src', 'https://lottie.host/16cf6411-69cf-487e-84b9-56e7546e423a/83x9J6NMxd.json');
        incorrectCard.self.appendChild(newElement)
        newElement.setAttribute('speed', '0.8');
        setTimeout(() => {
            incorrectCard.self.removeChild(newElement);
        }, 2000);
    }

    if (score >= progressBarMaxWidth) {
        sessionStorage.setItem('success', topic);
        setTimeout(() => {
            window.location.assign("/index.html");
        }, 5000);
    }
    else {
        fetch('http://127.0.0.1:8000/start', {
            method: 'POST',
            body: topic,
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
            questionInfo = data;

            setTimeout(chooseQuestion, 3000);
        }).catch(error => {
            document.getElementById('loadingOverlay').style.display = 'none';
            console.error('Error:', error);
        });
    }
}

function chooseQuestion() {
    card1.button.disabled = false;
    card2.button.disabled = false;
    card1.self.classList.remove("democrat", "republican")
    card2.self.classList.remove("democrat", "republican")

    policyText.innerText = questionInfo.question

    correctAns = Math.floor(Math.random() * 2)

    correctCard = cards[correctAns];
    correctCard.image.src = candidates[questionInfo["correct_candidate"]].image
    correctCard.description.innerText = candidates[questionInfo["correct_candidate"]].description
    correctCard.title.innerText = questionInfo["correct_candidate"]
    correctCard.self.classList.add(candidates[questionInfo["correct_candidate"]].party)

    incorrectCard = cards[1 - correctAns]
    incorrectCard.image.src = candidates[questionInfo["incorrect_candidate"]].image
    incorrectCard.description.innerText = candidates[questionInfo["incorrect_candidate"]].description
    incorrectCard.title.innerText = questionInfo["incorrect_candidate"]
    incorrectCard.self.classList.add(candidates[questionInfo["incorrect_candidate"]].party)
}

function vote(candidate) {
    console.log(candidate);
}

function goBack() {
    window.location.assign("../index.html");
}