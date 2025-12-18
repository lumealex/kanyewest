const FAKE_QUOTES = [
  "I love fish sticks in my mouth",
  "My favorite color is Wednesday",
  "I invented the concept of breathing",
  "Sometimes I walk backwards to confuse my shadow",
  "Pizza is just a flat sandwich that gave up on life",
  "I can speak to plants but they never listen",
  "My greatest fear is running out of mirrors",
  "I don't trust stairs because they're always up to something",
  "I'm 50% genius, 50% genius, and 10% bad at math",
  "Water is just boneless ice",
  "I put googly eyes on all my furniture so they can watch me work",
  "The moon is just the sun's night shift",
  "I only wear socks on Tuesdays because other days don't deserve it",
  "My spirit animal is a confused parking meter",
  "I think clouds are just sky sheep",
]

const MILESTONE_GIFS = ["img/kanye1.gif", "img/kanye2.gif", "img/kanye3.gif", "img/kanye4.gif", "img/kanye5.gif"]

let currentQuote = ""
let isRealQuote = false
let score = 0
let streak = 0
let gameActive = false
let gameStarted = false

// DOM elemendid
const quoteText = document.getElementById("quoteText")
const startBtn = document.getElementById("startBtn")
const answerButtons = document.getElementById("answerButtons")
const trueBtn = document.getElementById("trueBtn")
const falseBtn = document.getElementById("falseBtn")
const scoreDisplay = document.getElementById("score")
const streakDisplay = document.getElementById("streak")
const gameCard = document.querySelector(".window-body")
const milestoneOverlay = document.getElementById("milestoneOverlay")
const milestoneText = document.getElementById("milestoneText")
const milestoneGif = document.getElementById("milestoneGif")

startBtn.addEventListener("click", startGame)
trueBtn.addEventListener("click", () => handleAnswer(true))
falseBtn.addEventListener("click", () => handleAnswer(false))

function startGame() {
  if (!gameStarted) {
    gameStarted = true
    startBtn.textContent = "NEXT QUOTE"
  }
  fetchNewQuote()
}

function showPage(pageName) {
  const pages = ["gamePage", "filePage", "editPage", "viewPage", "helpPage"]
  pages.forEach((page) => {
    document.getElementById(page).style.display = "none"
  })

  if (pageName === "game") {
    document.getElementById("gamePage").style.display = "block"
  } else if (pageName === "file") {
    document.getElementById("filePage").style.display = "block"
  } else if (pageName === "edit") {
    document.getElementById("editPage").style.display = "block"
  } else if (pageName === "view") {
    document.getElementById("viewPage").style.display = "block"
  } else if (pageName === "help") {
    document.getElementById("helpPage").style.display = "block"
  }
}

function refreshGallery() {
  const images = document.querySelectorAll(".gallery-img")
  images.forEach((img, index) => {
    const randomNum = Math.floor(Math.random() * 1000)
    img.src = `/placeholder.svg?height=200&width=200&query=kanye west portrait ${randomNum}`
  })
}

async function fetchNewQuote() {
  gameActive = true
  answerButtons.style.display = "flex"
  startBtn.style.display = "none"

  isRealQuote = Math.random() > 0.5

  try {
    if (isRealQuote) {
      const response = await fetch("https://api.kanye.rest/")
      const data = await response.json()
      currentQuote = data.quote
    } else {
      currentQuote = FAKE_QUOTES[Math.floor(Math.random() * FAKE_QUOTES.length)]
    }

    quoteText.textContent = `"${currentQuote}"`
  } catch (error) {
    quoteText.textContent = "Error loading quote..."
    console.error("Error fetching quote:", error)
    gameActive = false
  }
}

function handleAnswer(userSaysTrue) {
  if (!gameActive) return

  const correct = (userSaysTrue && isRealQuote) || (!userSaysTrue && !isRealQuote)

  if (correct) {
    const srFeedback = document.getElementById("srFeedback")
if (srFeedback) {
  srFeedback.textContent = "Correct answer."
}

    score++
    streak++
    showFeedback(true)
    showCelebrationGif(score)

    // Update displays
    scoreDisplay.textContent = score
    streakDisplay.textContent = streak

    trueBtn.disabled = true
    falseBtn.disabled = true
    gameActive = false
    

    // Show feedback text briefly
    setTimeout(() => {
      quoteText.textContent = `✓ REAL Kanye quote: "${currentQuote}"`
    }, 500)

    setTimeout(() => {
      trueBtn.disabled = false
      falseBtn.disabled = false
      fetchNewQuote()
    }, 2500)
  } else {
    const srFeedback = document.getElementById("srFeedback")
if (srFeedback) {
  srFeedback.textContent = isRealQuote
    ? "Wrong answer. It was a real Kanye quote."
    : "Wrong answer. It was a fake quote."
}

    streak = 0
    score = 0
    showFeedback(false)
    gameStarted = false
    startBtn.textContent = "START AGAIN"

    scoreDisplay.textContent = score
    streakDisplay.textContent = streak

    trueBtn.disabled = true
    falseBtn.disabled = true
    gameActive = false

    setTimeout(() => {
      quoteText.textContent = isRealQuote
        ? `✗ WRONG! It was REAL: "${currentQuote}"`
        : `✗ WRONG! It was FAKE: "${currentQuote}"`
    }, 500)

    setTimeout(() => {
      trueBtn.disabled = false
      falseBtn.disabled = false
      answerButtons.style.display = "none"
      startBtn.style.display = "block"
      quoteText.textContent = 'Game Over! Press "START AGAIN" to try again...'
    }, 3000)
  }
}

function showFeedback(correct) {
  gameCard.classList.remove("correct-flash", "wrong-flash")

  setTimeout(() => {
    gameCard.classList.add(correct ? "correct-flash" : "wrong-flash")
  }, 10)
}

function showCelebrationGif(currentScore) {
  const randomGif = MILESTONE_GIFS[Math.floor(Math.random() * MILESTONE_GIFS.length)]

  let message = ""

  // Special messages for milestones
  if (currentScore === 2) message = "🔥 NICE START!"
  else if (currentScore === 5) message = "🔥 YOU'RE ON FIRE!"
  else if (currentScore === 10) message = "⚡ UNSTOPPABLE!"
  else if (currentScore === 15) message = "👑 LEGENDARY!"
  else if (currentScore === 20) message = "🐐 KANYE APPROVED!"
  else message = "✓ CORRECT!"

  milestoneText.textContent = message
  milestoneGif.src = randomGif
  milestoneOverlay.classList.add("show")

  setTimeout(() => {
    milestoneOverlay.classList.remove("show")
  }, 2000)
}

function playTrack(trackName) {
  const audioPlayer = document.getElementById("audioPlayer")
  const audioElement = document.getElementById("audioElement")
  const trackNameDisplay = document.getElementById("trackName")

  // Map track IDs to file paths
  const trackPaths = {
    stronger: "music/stronger.mp3",
    "gold-digger": "music/gold-digger.mp3",
    heartless: "music/heartless.mp3",
    power: "music/power.mp3",
    runaway: "music/runaway.mp3",
    "all-of-the-lights": "music/all-of-the-lights.mp3",
    paris: "music/paris.mp3",
    "black-skinhead": "music/black-skinhead.mp3",
    "bound-2": "music/bound-2.mp3",
    famous: "music/famous.mp3",
    ultralight: "music/ultralight.mp3",
    "ghost-town": "music/ghost-town.mp3",
  }

  const trackDisplayNames = {
    stronger: "Stronger",
    "gold-digger": "Gold Digger",
    heartless: "Heartless",
    power: "Power",
    runaway: "Runaway",
    "all-of-the-lights": "All of the Lights",
    paris: "Ni**as in Paris",
    "black-skinhead": "Black Skinhead",
    "bound-2": "Bound 2",
    famous: "Famous",
    ultralight: "Ultralight Beam",
    "ghost-town": "Ghost Town",
  }

  audioPlayer.style.display = "block"
  trackNameDisplay.textContent = trackDisplayNames[trackName]
  audioElement.src = trackPaths[trackName]
  audioElement.play()
}

function handleImageUpload(event) {
  const files = event.target.files
  const galleryGrid = document.getElementById("galleryGrid")

  // Clear existing placeholders
  galleryGrid.innerHTML = ""

  // Add uploaded images
  Array.from(files).forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = document.createElement("img")
      img.src = e.target.result
      img.className = "gallery-img"
      img.alt = "Kanye"
      galleryGrid.appendChild(img)
    }
    reader.readAsDataURL(file)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  showPage("game")
})
