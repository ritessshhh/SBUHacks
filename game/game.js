// Retrieve the value from sessionStorage
var questionInfo = JSON.parse(sessionStorage.getItem('questionInfo'));
console.log(questionInfo); // Output: testValue

let candidates = {
    "Joe Biden": { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/1200px-Joe_Biden_presidential_portrait.jpg", description: "Joe Biden is here" },
    "Donald Trump": { image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg", description: "Donald Trump is here" },
    "Nikki Haley": { image: "https://cdn.britannica.com/02/193902-050-698C7C2B/Nikki-Haley.jpg", description: "Nicky Hailey is here" }
}

let questions = [
    { question: "Which candidate is Joe Biden?", candidates: [0, 2] },
    { question: "Which candidate is Donald Trump?", candidates: [0, 1] },
    { question: "Which candidate is Nicky Hailey?", candidates: [1, 2] }
]

const policyText = document.getElementById("policyText");
let card1 = document.getElementById("card1")
card1 = { image: card1.querySelector("img"), title: card1.querySelector("div > h5"), description: card1.querySelector("div > p"), button: card1.querySelector("a") }

let card2 = document.getElementById("card2")
card2 = { image: card2.querySelector("img"), title: card2.querySelector("div > h5"), description: card2.querySelector("div > p"), button: card2.querySelector("a") }

chooseQuestion();

function chooseQuestion() {
    policyText.innerText = questionInfo.question
    
    card1.image.src = candidates[questionInfo["correct_candidate"]].image
    card1.title.innerText = questionInfo["correct_candidate"]
    
    card2.image.src = candidates[questionInfo["incorrect_candidate"]].image
    card2.title.innerText = questionInfo["incorrect_candidate"]
}

function vote(candidate) {
    console.log(candidate);
}