let candidates = [
    { name: "Joe Biden", image: "../images/biden.jpg", description: "Joe Biden is here" },
    { name: "Donald Trump", image: "../images/trump.jpg", description: "Donald Trump is here"},
    { name: "Nicky Haley", image: "../images/haley.webp", description: "Nicky Hailey is here"}
]

let questions = [
    { question: "Which candidate is Joe Biden?", candidates: [0, 2] },
    { question: "Which candidate is Donald Trump?", candidates: [0, 1] },
    { question: "Which candidate is Nicky Hailey?", candidates: [1, 2] }
]

let card1 = document.getElementById("card1")
card1 = { image: card1.querySelector("img"), title: card1.querySelector("div > h5"), description: card1.querySelector("div > p"), button: card1.querySelector("a")}
let card2 = document.getElementById("card2")
card2 = { image: card2.querySelector("img"), title: card2.querySelector("div > h5"), description: card2.querySelector("div > p"), button: card2.querySelector("a")}

chooseQuestion();

function chooseQuestion() {
    card1.image.src = candidates[0].image
    card2.image.src = candidates[1].image
}

function vote(candidate) {
    console.log(candidate);
}