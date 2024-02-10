// Retrieve the value from sessionStorage
let questionInfo = JSON.parse(sessionStorage.getItem('questionInfo'));
let correctAns = undefined;
console.log(questionInfo); // Output: testValue

let candidates = {
    "Joe Biden": { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/1200px-Joe_Biden_presidential_portrait.jpg", description: "Joe Biden is here" },
    "Donald Trump": { image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg", description: "Donald Trump is here" },
    "Nikki Haley": { image: "https://cdn.britannica.com/02/193902-050-698C7C2B/Nikki-Haley.jpg", description: "Nicky Hailey is here" },
    "Dean Phillips": { image: "https://mn.gov/mdva/assets/2023-03-15-rep-phillips-official_tcm1066-569607.png", description: "Dean Phillips was here" }
}

const policyText = document.getElementById("policyText");

let score = 0;
const scoreText = document.getElementById("points")

let card1 = document.getElementById("card1")
card1 = { self: card1, image: card1.querySelector("img"), title: card1.querySelector("div > h5"), description: card1.querySelector("div > p"), button: card1.querySelector("a") }
let card2 = document.getElementById("card2")
card2 = { self: card2, image: card2.querySelector("img"), title: card2.querySelector("div > h5"), description: card2.querySelector("div > p"), button: card2.querySelector("a") }
cards = [card1, card2]

let correctCard;
let incorrectCard;

chooseQuestion();

function answerQuestion(option) {
    const newElement = document.createElement('dotlottie-player');
    newElement.setAttribute('background', 'transparent');
    newElement.setAttribute('speed', '1');
    newElement.setAttribute('style', 'width: 300px; height: 300px;');
    newElement.setAttribute('autoplay', '');

    if (option == correctAns) {
        score += 100
        console.log("Correct!");
        // scoreText.innerText = score;
        newElement.setAttribute('src', 'https://lottie.host/16cf6411-69cf-487e-84b9-56e7546e423a/83x9J6NMxd.json');
        correctCard.self.appendChild(newElement)
    
    }
    else {
        console.log("Incorrect!");
        newElement.setAttribute('src', 'https://lottie.host/21d6933f-3fcc-48e4-9d95-7b66f5ec8e93/Xl94Qp2IpM.json');
        incorrectCard.self.appendChild(newElement)
    }
}

function chooseQuestion() {
    policyText.innerText = questionInfo.question

    correctAns = Math.floor(Math.random() * 2)

    correctCard = cards[correctAns];
    correctCard.image.src = candidates[questionInfo["correct_candidate"]].image
    correctCard.title.innerText = questionInfo["correct_candidate"]

    incorrectCard = cards[1 - correctAns]
    incorrectCard.image.src = candidates[questionInfo["incorrect_candidate"]].image
    incorrectCard.title.innerText = questionInfo["incorrect_candidate"]
}

function vote(candidate) {
    console.log(candidate);
}