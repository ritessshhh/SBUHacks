// Retrieve the value from sessionStorage
let questionInfo = JSON.parse(sessionStorage.getItem('questionInfo'));

questionInfo = {'correct_candidate': 'Joe Biden', 'incorrect_candidate': 'Nikki Haley', 'policy_area': 'Climate', 'question': 'How can we innovate and implement policies to ensure a swift and sustainable transition to renewable energy sources, whilst maintaining economic stability and creating job opportunities in the face of climate change?'}

let correctAns = undefined;
console.log(questionInfo); // Output: testValue

let candidates = {
    "Joe Biden": { party: "democrat", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/1200px-Joe_Biden_presidential_portrait.jpg", description: "Joe Biden is here" },
    "Donald Trump": { party: "republican", image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg", description: "Donald Trump is here" },
    "Nikki Haley": { party: "republican", image: "https://cdn.britannica.com/02/193902-050-698C7C2B/Nikki-Haley.jpg", description: "Nicky Hailey is here" },
    "Dean Phillips": { party: "democrat", image: "https://mn.gov/mdva/assets/2023-03-15-rep-phillips-official_tcm1066-569607.png", description: "Dean Phillips was here" }
}

const progressBar = document.getElementById("progress");
const progressBarMaxWidth = 340;
const scoreIncrement = 30;
let score = 0;

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
        score += 30;
        progressBar.style.width = `${score}px`
        console.log("Correct!");
        newElement.setAttribute('src', 'https://lottie.host/16cf6411-69cf-487e-84b9-56e7546e423a/83x9J6NMxd.json');
        correctCard.self.appendChild(newElement)
        newElement.setAttribute('speed', '0.9');

        setTimeout(() => {
            correctCard.self.removeChild(newElement);
        }, 2000);
    }
    else {
        console.log("Incorrect!");
        newElement.setAttribute('src', 'https://lottie.host/21d6933f-3fcc-48e4-9d95-7b66f5ec8e93/Xl94Qp2IpM.json');
        incorrectCard.self.appendChild(newElement)
        newElement.setAttribute('speed', '0.8');

        setTimeout(() => {
            incorrectCard.self.removeChild(newElement);
        }, 2000);
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
    correctCard.title.innerText = questionInfo["correct_candidate"]
    correctCard.self.classList.add(candidates[questionInfo["correct_candidate"]].party)

    incorrectCard = cards[1 - correctAns]
    incorrectCard.image.src = candidates[questionInfo["incorrect_candidate"]].image
    incorrectCard.title.innerText = questionInfo["incorrect_candidate"]
    incorrectCard.self.classList.add(candidates[questionInfo["incorrect_candidate"]].party)
}

function vote(candidate) {
    console.log(candidate);
}