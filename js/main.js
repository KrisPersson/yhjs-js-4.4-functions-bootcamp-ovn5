const startBtn = document.querySelector('.start-btn')
const mainEl = document.querySelector('main')


startBtn.addEventListener('click', startGame)

const part1 = {
    part: 1,
    story: "Once upon a time, there was a little girl named Goldilocks. She went for a walk in the forest. Pretty soon, she came upon a house. She knocked, but no one answered the door. What should she do now?",
    choices: ['Open the door and walk right in anyway', 'Go home'],
    correctChoiceIndex: 0,
    correctChoice: "She opens the door and walks inside.",
    wrongChoice: "You don't want to commit trespassing and decide to go home instead."
}
const part2 = {
    part: 2,
    story: "At the table in the kitchen, there were three bowls of porridge. Goldilocks was hungry. Which bowl should she eat from?",
    choices: ['Bowl 1', 'Bowl 2', 'Bowl 3'],
    answers: [`"Ahhh, this porridge is just right," she said happily and she ate it all up.`, `"This porridge is too cold," she said. Better try the last bowl!`, `"This porridge is too hot!" she exclaimed. Which bowl should she try next?`]
}
const part3 = {
    part: 3,
    story: "After she'd eaten the three bears' breakfasts, she decided she was feeling a little tired. So, she walked into the living room where she saw three chairs. Which chair should she sit in?",
    choices: ['Chair 1', 'Chair 2', 'Chair 3'],
    answers: [`"Ahhh, this chair is just right," she sighed. But just as she settled down into the chair to rest, it broke into pieces!`, `"This chair is too big, too!" she whined. Better try the last chair!`, `"This chair is too big!" she exclaimed. Which chair should she try next?`]
}
const part4 = {
    part: 4,
    story: "Goldilocks was very tired by this time, she went upstairs to the bedroom where she saw three beds. Which bed should she sleep in?",
    choices: ['Bed 1', 'Bed 2', 'Bed 3'],
    answers: [`"Ahhh, this bed is just right," she yawned. Goldilocks fell asleep...`, `"This bed is too soft!" she whined. Better try the last bed!`, `"This bed is too hard!" she exclaimed. Which bed should she try next?`]
}
const part5 = {
    part: 5,
    story: `As she was sleeping, the three bears came home.
    <br>
    <br>
    "Someone's been eating my porridge," growled the Papa bear.
    <br>
    "Someone's been eating my porridge," said the Mama bear.
    <br>
    "Someone's been eating my porridge and they ate it all up!" cried the Baby bear.
    <br>
    "Someone's been sitting in my chair," growled the Papa bear.
    <br>
    "Someone's been sitting in my chair," said the Mama bear.
    <br>
    "Someone's been sitting in my chair and they've broken it to pieces," cried the Baby bear.
    <br>
    They decided to look around some more and when they got upstairs to the bedroom, Papa bear growled,
    <br>
    "Someone's been sleeping in my bed.”
    <br>
    "Someone's been sleeping in my bed, too" said the Mama bear.
    <br>
    "Someone's been sleeping in my bed and she's still there!" exclaimed the Baby bear. 
    <br>
    Just then, Goldilocks woke up. She saw the three bears. What should she do next?`,
    choices: ['Stay in bed and play dead', 'Scream "HELP!" and run out of the room', 'Confront the bears and fight them'],
    correctChoiceIndex: 1,
    correctChoice: `She screamed, "Help!" And she jumped up and ran out of the room.`,
    wrongChoice: `"Hurray, dinner is served!" yelled the bears and ate Goldilocks.`
}
const part6 = {
    part: 6,
    story: "Goldilocks ran down the stairs, opened the door, and ran away into the forest. She never returned to the home of the three bears. THE END"
}

const allParts = [part1, part2, part3, part4, part5, part6]
let currentPart = 0


function startGame() {
    cleanMain()
    startBtn.removeEventListener('click', startGame)
    currentPart = 0
    renderPart()
}
function startNextPart() {
    cleanMain()
    currentPart += 1
    renderPart()
}

function renderPart() {
    mainEl.innerHTML += `
    <section class='page'>
        <h3>Part ${allParts[currentPart].part}</h3>
        <p class='story-p'>${allParts[currentPart].story}</p>
        
    </section>
    `
    let pageEl = document.querySelector('.page')
    if (allParts[currentPart].part < 6) {

        allParts[currentPart].choices.map((choice, index) => {
            if (allParts[currentPart].part === 1 || allParts[currentPart].part === 5) {
                pageEl.innerHTML += `
                <button value='${index}' class='choice-btn' onclick='handleChoiceClick(${index})'>${choice}</button>
                `
            } else {
                pageEl.innerHTML += `
                <button value='${index}' class='choice-btn' onclick='handleReduceClick(${index})'>${choice}</button>
                `
            }
        })
    }

    if (allParts[currentPart].part == 6) {
        pageEl.innerHTML += `
        <p class='reaction-p'>Congratulations, you made it to the end! Play again?</p>
        <button class='choice-btn' onclick='startGame()'>Play again</button>
        `
    }
}

function handleChoiceClick(index) {
    let pageEl = document.querySelector('.page')

    while (document.querySelectorAll('button').length > 0) {
        pageEl.removeChild(document.querySelector('button'))
    }

    if (index === allParts[currentPart].correctChoiceIndex) {
        pageEl.innerHTML += `
        <p class='reaction-p'>${allParts[currentPart].correctChoice}</p>
        <button class='choice-btn' onclick='startNextPart()'>Next part</button>
        `
    } else {
        pageEl.innerHTML += `
        <p class='reaction-p'>${allParts[currentPart].wrongChoice} THE END</p>
        <button class='choice-btn' onclick='startGame()'>Play again</button>
        `
    }
}

function handleReduceClick(index) {
    let pageEl = document.querySelector('.page')
    let btnsLeft = pageEl.querySelectorAll('.choice-btn').length
    if (btnsLeft > 1) {
        for (let btn of pageEl.querySelectorAll('.choice-btn')) {
            if (btn.value == index) {
                pageEl.removeChild(btn)
            }
        }
        if (btnsLeft == 2) {
            pageEl.removeChild(document.querySelector('.reaction-p'))
        }
        pageEl.innerHTML += `
            <p class='reaction-p'>${allParts[currentPart].answers[btnsLeft - 1]}</p>
        `
    } else {
        pageEl.removeChild(pageEl.querySelector('.choice-btn'))
        pageEl.removeChild(pageEl.querySelector('.reaction-p'))

        pageEl.innerHTML += `
        <p class='reaction-p'>${allParts[currentPart].answers[btnsLeft - 1]}</p>
        <button class='choice-btn' onclick='startNextPart()'>Next part</button>
    `
    }
}

function cleanMain() {
    while (mainEl.childNodes.length > 0) {
        mainEl.removeChild(mainEl.childNodes[0])
    }
}