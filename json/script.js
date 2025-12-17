const button = document.querySelector("#getQuoteBtn")
const resultsEl = document.querySelector("#results")
const copyBtn = document.querySelector("#copyBtn")
let currentQuote = ""



button.addEventListener("click", () => {
  getQuote()
})

async function getQuote() {
  const response = await fetch("https://api.kanye.rest")
  console.log("Response status:", response.status)

  const data = await response.json()
  console.log("Raw data:", data)

  renderQuote(data)
}

function renderQuote(data) {
  currentQuote = data.quote
resultsEl.innerHTML = `<p>"${currentQuote}"</p>`
copyBtn.disabled = false

}
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(currentQuote)
  copyBtn.textContent = "Copied!"
  setTimeout(() => {
    copyBtn.textContent = "Copy quote"
  }, 1200)
})
