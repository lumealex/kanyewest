document.addEventListener("DOMContentLoaded", () => {
  // DOM elemendid
  const button = document.querySelector("#getQuoteBtn");
  const copyBtn = document.querySelector("#copyBtn");
  const likeBtn = document.querySelector("#likeBtn");
  const dislikeBtn = document.querySelector("#dislikeBtn");
  const quoteTextEl = document.querySelector("#quoteText");

  // Praegune tsitaat ja state
  let currentQuote = "";
  let liked = false;
  let disliked = false;

  // Library tsitaatide jaoks
  let likedQuotes = [];
  let dislikedQuotes = [];

  // GET quote nupp
  button.addEventListener("click", async () => {
    try {
      const response = await fetch("https://api.kanye.rest");
      const data = await response.json();
      renderQuote(data.quote);
    } catch (err) {
      console.error("Quote fetch error:", err);
    }
  });

  // Render quote ja reset nuppude state
  function renderQuote(quote) {
    currentQuote = quote;
    quoteTextEl.textContent = quote;

    copyBtn.disabled = false;

    // Reset like/dislike nuppude visuaal
    liked = false;
    disliked = false;
    likeBtn.classList.remove("liked");
    dislikeBtn.classList.remove("disliked");
  }

  // Copy nupp
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(currentQuote);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy quote";
    }, 1200);
  });

  // Like nupp
  likeBtn.addEventListener("click", () => {
    if (!liked) {
      liked = true;
      disliked = false;
      likeBtn.classList.add("liked");
      dislikeBtn.classList.remove("disliked");

      if (!likedQuotes.includes(currentQuote)) likedQuotes.push(currentQuote);
      dislikedQuotes = dislikedQuotes.filter(q => q !== currentQuote);
    } else {
      liked = false;
      likeBtn.classList.remove("liked");
      likedQuotes = likedQuotes.filter(q => q !== currentQuote);
    }

    logLibrary();
  });

  // Dislike nupp
  dislikeBtn.addEventListener("click", () => {
    if (!disliked) {
      disliked = true;
      liked = false;
      dislikeBtn.classList.add("disliked");
      likeBtn.classList.remove("liked");

      if (!dislikedQuotes.includes(currentQuote)) dislikedQuotes.push(currentQuote);
      likedQuotes = likedQuotes.filter(q => q !== currentQuote);
    } else {
      disliked = false;
      dislikeBtn.classList.remove("disliked");
      dislikedQuotes = dislikedQuotes.filter(q => q !== currentQuote);
    }

    logLibrary();
  });

  // Library logimine
  function logLibrary() {
    console.log("Liked Quotes:", likedQuotes);
    console.log("Disliked Quotes:", dislikedQuotes);
  }
});
