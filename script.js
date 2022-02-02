document.addEventListener("DOMContentLoaded", start);

let temp;
let container;
let actors;
let filter = "alle";
const fil = "actors.json";

const movieOverskrift = document.querySelector(".underoverskrift");

function start() {
  container = document.querySelector(".container");
  temp = document.querySelector("template");

  const filterKnapper = document.querySelectorAll("nav button");

  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerActors)
  );

  hentdata(fil);
}

function filtrerActors() {
  filter = this.dataset.movie;

  document.querySelector(".valgt").classList.remove("valgt");

  this.classList.add("valgt");

  visActors(); // kald funktionen visPersoner efter det nye filter er sat paa
  movieOverskrift.textContent = this.textContent;
}

async function hentdata(fil) {
  const resultat = await fetch(fil);
  actors = await resultat.json();
  visActors();
}

function visActors() {
  container.textContent = ""; //ryd container inden ny loop

  actors.forEach((actor) => {
    if (filter == actor.movie || filter == "alle") {
      const klon = temp.cloneNode(true).content;
      klon.querySelector("#fullname").textContent = actor.fullname;
      klon.querySelector("#movie").textContent = actor.movie;

      klon
        .querySelector("button")
        .addEventListener("click", () => visDetaljer(actor));
      container.appendChild(klon);
    }
  });
}

function visDetaljer(actorData) {
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.querySelector("#popup_fullname").textContent = actorData.fullname;
  popup.querySelector("#popup_movie").textContent = actorData.movie;

  console.log(actorData);
}

document.querySelector("#tilbage").addEventListener("click", lukPopup);

function lukPopup() {
  document.querySelector("#popup").style.display = "none";
}

hentdata(fil);
