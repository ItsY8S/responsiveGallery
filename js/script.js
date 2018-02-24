// Selectors
const logo = document.querySelector("#logo");
const logoLink = document.querySelector("nav a");
const image = document.querySelectorAll("main > img");
const main = document.querySelector("main");
const quote = document.querySelector("#quote q");
const author = document.querySelector("#author");
const apikey = "ec8972b23e307b45b0f47bcdf678155caf306bfe075174393a67c1b8c25e59ac";
const endpoint = `https://api.unsplash.com/photos/?per_page=9&client_id=${apikey}`;
let content = "";
let count = 1;

function buildHTML(data) {
  data.forEach(image => {
    content +=
      `<article>
          <ul>
            <li>${image.user.name}</li>
            <li>${image.likes}</li>
          </ul>

          <img src="${image.urls.small}"  alt="${image.description}"/></article>`;
  })
  // Commented srcset out and moved it down here because it makes the page very buggy.
  // srcset="${image.urls.small} 400w, ${image.urls.regular} 1080w, ${image.urls.full} 2560w"

  main.innerHTML = content;
}

function getImages(endpoint) {
  fetch(endpoint)
    .then(response => {
      if (response.ok) {
        return response.json();
        console.log(response.json());
      } else {
        return Promise.reject("Error!")
      }
    })
    .then(data => buildHTML(data))
    .catch(error => console.log("Error is", error));
}

getImages(endpoint);


function getDistFromBottom() {
  const scrollPosition = window.pageYOffset;
  const windowSize = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;
  return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
}

window.addEventListener("scroll", (event) => {
  const distance = getDistFromBottom();
  console.log(distance);
  if (distance <= Math.floor(window.innerHeight / 8)) {
    count++;
    getImages(`${endpoint}&page=${count}`);
  }
});


logo.addEventListener("click", (event) => {
  logo.classList.toggle("transform");
  generateQuote();
})


let quotes = [{
  "attrib": "Steve Jobs",
  "quote": "Design is not just what it looks like and feels like. Design is how it works."
}, {
  "attrib": "Steve Jobs",
  "quote": "Innovation distinguishes between a leader and a follower."
}, {
  "attrib": "Albert Einstein",
  "quote": "Reality is merely an illusion, albeit a very persistent one."
}, {
  "attrib": "Albert Einstein",
  "quote": "If you can't explain it simply, you don't understand it well enough."
}, {
  "attrib": "Albert Einstein",
  "quote": "Strive not to be a success, but rather to be of value."
}, {
  "attrib": "Steve Jobs",
  "quote": "Your time is limited, so don’t waste it living someone else’s life."
}, {
  "attrib": "Bill Gates",
  "quote": "Success is a lousy teacher. It seduces smart people into thinking they can't lose."
}, {
  "attrib": "Albert Einstein",
  "quote": "Science without religion is lame, religion without science is blind."
}, {
  "attrib": "Henry Ford",
  "quote": "Whether you think you can or you think you can’t, you’re right."
}];


function generateQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  quote.innerHTML = quotes[random].quote;
  author.innerHTML = ` &mdash; ${quotes[random].attrib}`;
}

generateQuote();