//prendiamo gli ID degli articoli che ci interessano
let container = document.querySelector("#container");

const getIDs = async () => {
  let loader = document.createElement("div");
  loader.classList.add("loader");

  try {
    loader.innerText = "Loading...";
    document.body.appendChild(loader);
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    loader.innerText = "";
    const IDs = await res.json();
    const myIDs = IDs.slice(0, 25);
    for (id of myIDs) {
      getData(id);
    }
  } catch (e) {
    loader.innerText = "";
    let error = document.createElement("div");
    error.classList.add("error");
    error.innerText = "Something went wrong, no stories available ):";
    container.appendChild(error);
    return;
  }
};

//Prendiamo gli oggetti dagli ID estrapolati
const getData = async (id) => {
  //const res = await fetch(
  // `https://hacker-news.hfirebaseio.com/v0/item/${id}.json`);
  try {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    const data = await res.json();
    createCards(data);
  } catch (e) {
    let secondError = document.createElement("div");
    secondError.classList.add("secondError");
    secondError.innerText = "Something went wrong, no stories available ):";
    container.appendChild(secondError);
    return;
  }
};

//creaiamo e appendiamo i div al container
const createCards = (data) => {
  let card = document.createElement("div");
  card.classList.add("card");
  container.appendChild(card);

  let title = document.createElement("h2");
  title.classList.add("h2");
  title.innerText = data.title;
  card.appendChild(title);

  let author = document.createElement("span");
  author.innerText = `Author: ${data.by}`;
  card.appendChild(author);

  let readArticle = document.createElement("a");
  readArticle.innerText = "Read full Article";
  readArticle.setAttribute("href", data.url);
  card.appendChild(readArticle);
};

//creiamo una funzione che previene lo spam del refresh
const preventSpam = () => {
  btn.disabled = true;

  setTimeout(() => {
    btn.disabled = false;
  }, "1000");
};

//creiamo il bottone del refresh
const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  let container = document.getElementById("container");
  container.innerHTML = "";
  preventSpam();
  getIDs();
});

getIDs();
