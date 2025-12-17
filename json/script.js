const button = document.querySelector("#getQuoteBtn")
const resultsEl = document.querySelector("#results")

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
  resultsEl.innerHTML = `
    <div class="card">
      <p>"${data.quote}"</p>
      <p class="small">– Kanye West</p>
    </div>
  `
}
