const quote = document.querySelector(".quote");
const generate = document.getElementById("generate");
const category = document.getElementById("category");
const likeQuote = document.getElementById("likeQuote");
const likeList = document.getElementById("likeList");
const quoteArea = document.querySelector(".quoteArea");
const favoriteList = document.querySelector(".favoriteList");
const favoriteData = document.getElementById("favoriteData");

let favoriteListArr = localStorage.getItem("favoriteListItems")
  ? JSON.parse(localStorage.getItem("favoriteListItems"))
  : [];

window.addEventListener("load", () => {
  generateQuotes();
  favoriteList.style.display = "none";

  if (favoriteListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1";
    likeList.style.pointerEvents = "auto";
  }
});

function generateQuotes() {
  let div = document.createElement("div");
  quote.innerHTML =
    'Loading New Quotes... <i class="fa-solid fa-sync fa-spin"></i>';
  generate.innerHTML = "Generating...";
  fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: {
      "X-Api-Key": "GwWB1MTDpdx6h+7jb4js+Q==pC7an3aFcGU93nFA",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      generate.innerHTML = "New Quote";

      quote.innerHTML = ""; // Clear previous content

      // Create quote element
      div.innerHTML += '<i class="fa-solid fa-quote-left"></i> &nbsp;';
      div.innerHTML += data[0].quote;
      div.innerHTML += '&nbsp; <i class="fa-solid fa-quote-right"></i>';
      div.innerHTML += `<div class="author"><span>-</span> ${data[0].author}</div>`;

      // Append quote element to quote container
      quote.append(div);

      // Update category
      category.innerHTML = data[0].category;

      // Reset likeQuote button style
      likeQuote.removeAttribute("class");
      likeQuote.setAttribute("class", "fa-regular fa-heart");
      likeQuote.style.color = "black";
    });
}

function LikeQuote() {
  if (likeQuote.style.color == "red") {
    likeQuote.removeAttribute("class");
    likeQuote.setAttribute("class", "fa-regular fa-heart");
    likeQuote.style.color = "black";

    favoriteListArr = favoriteListArr.filter(function (e) {
      return e !== quote.innerHTML;
    });
    localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr));
  } else {
    likeQuote.setAttribute("class", "fa-solid fa-heart");
    likeQuote.style.color = "red";

    favoriteListArr.push(quote.innerHTML);
    localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr));
  }

  if (favoriteListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1";
    likeList.style.pointerEvents = "auto";
  }
}

function CopyQuote() {
  navigator.clipboard.writeText(quote.innerText);
}

function TwitterQuote() {
  let twitterUrl = `https://twitter.com/intent/tweet?url=${quote.innerText}`;
  window.open(twitterUrl, "_blank");
}

likeList.addEventListener("click", () => {
  favoriteData.innerHTML = "";
  document.querySelector(".quoteArea").style.display = "none";
  document.querySelector(".favoriteList").style.display = "block";

  favoriteListArr.forEach((item) => {
    // Removed extra parenthesis
    console.log(item);
    let li = document.createElement("li");
    li.innerHTML = item;
    document.getElementById("favoriteData").appendChild(li); // Changed favoriteData to getElementById
  });
});

function switchQuotes() {
  quoteArea.style.display = "block";
  favoriteList.style.display = "none";

  if (favoriteListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1";
    likeList.style.pointerEvents = "auto";
  }
}

function clearFavoriteList() {
  favoriteData.innerHTML = ""; // Clear favoriteData content
  favoriteListArr = []; // Clear favoriteListArr
  localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr));

  // Reset likeQuote button style
  likeQuote.removeAttribute("class");
  likeQuote.setAttribute("class", "fa-regular fa-heart");
  likeQuote.style.color = "black";
}
