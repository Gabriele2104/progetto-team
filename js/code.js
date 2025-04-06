"use-strict";

//Begin Laboratorio: creazione di banner pubblicitari temporizzati.

let bannerIntervalID = null;
let bannersCounter = 0;
let bigbackground = null;
let bigImage = null;

const banner1 = {
  title: "Company 1",
  imageSrc: "images/company_1.jpeg",
  imageAlt: "Image of company 1!",
  description: "111 Aaa bbb ccc ddd eee",
};

const banner2 = {
  title: "Company 2",
  imageSrc: "images/company_2.webp",
  imageAlt: "Image of company 2!",
  description: "222 Aaa bbb ccc ddd eee",
};

const banner3 = {
  title: "Company 3",
  imageSrc: "images/company_3.webp",
  imageAlt: "Image of company 3!",
  description: "333 Aaa bbb ccc ddd eee",
};

const banner4 = {
  title: "Company 4",
  imageSrc: "x\" onerror=\"alert('Ti ho fregato!')",
  imageAlt: "Image of company 4!",
  description: "444 Aaa bbb ccc ddd eee",
};

const banners = [
  //banner4,
  banner1,
  banner2,
  banner3,
];

//End Laboratorio: creazione di banner pubblicitari temporizzati.

//Begin Laboratorio: creazione di banner pubblicitari temporizzati.

//function setBanner() {
const setBanner = () => {
  removeBanner();
  buildBanner();
};

const removeBanner = () => {
  const bannerSection = document.getElementById("bannerSection");
  bannerSection.innerHTML = "";
};

//const buildBanner = (title, imageSrc, imageAlt, description) => {
const buildBanner = () => {
  //removeBanner();

  const bannerCompany = banners[bannersCounter];

  const bannerSection = document.getElementById("bannerSection");
  const banner = document.createElement("section");

  banner.className = "rowSection aqua";

  const img = DOMPurify.sanitize(
    `<img src="${bannerCompany.imageSrc}" alt="${bannerCompany.imageAlt}" width="200px" height="200px" />`
  );

  const innerSection = document.createElement("section");
  innerSection.className = "columnSection pBlue";

  const h2 = DOMPurify.sanitize(`<h2>${bannerCompany.title}</h2>`);
  const p = DOMPurify.sanitize(`<p>${bannerCompany.description}</p>`);

  innerSection.innerHTML = h2;
  innerSection.innerHTML += p;

  banner.innerHTML = img;
  banner.append(innerSection);

  bannerSection.append(banner);

  if (bannersCounter < banners.length - 1) {
    bannersCounter++;
    console.log("bannersCounter: " + bannersCounter);
  } else {
    bannersCounter = 0;
  }
};

//End Laboratorio: creazione di banner pubblicitari temporizzati.

let isLoaded = false;
let pageCounter = 1;
let totalPages = 0;

const getData = async (pageCounterParam) => {
  //https://reqres.in/api/users?page=2

  //https://reqres.in/api/users?page=2
  let path = "https://reqres.in/api/users?page=" + pageCounterParam;
  //let path = "https://www.fghgkhfkf.com";

  try {
    const response = await axios.get(path);

    console.log(response.data);

    isLoaded = false;
    console.log("isLoaded from response: " + isLoaded);

    buildTable(response.data);
    window.onresize = pageResized;
  } catch (error) {
    console.log("error: " + error);

    isLoaded = false;
    console.log("isLoaded from error: " + isLoaded);
  }
};

/*
  const data = {
    page: 1,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: [
      {
        id: 1,
        email: "aaa",
        first_name: "L",
        last_name: "B",
        avatar: "percorso"
      },
      {
        id: 2,
        email: "aaa",
        first_name: "L",
        last_name: "B",
        avatar: "percorso"
      },
      ...
    ]
  }
*/

/*
<table>
  <tr>
      <td>ID 1</td>
      <td>EMAIL george.bluth@reqres.in</td>
      <td>FIRST_NAME George</td>
      <td>LAST_NAME Bluth</td>
      <td>AVATAR https://reqres.in/img/faces/1-image.jpg</td>
  </tr>
  <tr>
      <td>ID 2</td>
      <td>EMAIL 2</td>
      <td>FIRST_NAME 2</td>
      <td>LAST_NAME 2</td>
      <td>AVATAR 2</td>
  </tr>
  <tr>
      <td>ID 3</td>
      <td>EMAIL 3</td>
      <td>FIRST_NAME 3</td>
      <td>LAST_NAME 3</td>
      <td>AVATAR 3</td>
  </tr>
  ...
</table>
*/

/*
  Esercizi:
  1) Inserire, nella tabella, una riga (prima di tutte le altre) contenente le stringhe "id", "email", "first_name", "last_name", "avatar".
  Per creare questa riga, usare il nodo <TH>.

  2) Basandovi su quello che si era fatto nel progetto Stelle, implementare la logica temporizzata che vi faccio vedere ora...
  Rivedere il pezzo di questa lezione dove abbiamo spiegato gli esercizi.
*/
let intervalId;

const buildTable = (data) => {
  console.log("----- buildTable() -----\n\n\n\n\n");
  /*console.log(data);
  console.log(data.page); //1.
  console.log(data.per_page); //6.
  console.log(data.total); //12.
  console.log(data.total_pages); //2.
  console.log(data.data);

  //1.
  console.log(data.data[0].email);
  console.log(data.data[3].last_name);
  console.log(data.data[5].avatar);*/

  //1.1.
  console.log(data.data[0].email);
  console.log(data.data[0]["email"]);

  //2.
  const container = document.getElementById("container");
  const table = document.createElement("table");

  /*document.body.addEventListener("click", e => {
    console.log("BODY BUBBLING e.target: " + e.target);
    console.log("BODY BUBBLING e.currentTarget: " + e.currentTarget);

    // if(e.target.id == "IMMAGINE")
    //   console.log("IMMAGINE");
    // else if(e.target.id == "CELLA")
    //   console.log("CELLA");
  });

  document.body.addEventListener("click", e => {
    console.log("BODY CAPTURE e.target: " + e.target);
    console.log("BODY CAPTURE e.currentTarget: " + e.currentTarget);

    // if(e.target.id == "IMMAGINE")
    //   console.log("IMMAGINE");
    // else if(e.target.id == "CELLA")
    //   console.log("CELLA");
  }, true);

  table.addEventListener("click", e => {
    console.log("TABLE BUBBLING e.target: " + e.target);
    console.log("TABLE BUBBLING e.currentTarget: " + e.currentTarget);
  });

  table.addEventListener("click", e => {
    console.log("TABLE CAPTURE e.target: " + e.target);
    console.log("TABLE CAPTURE e.currentTarget: " + e.currentTarget);
  }, true);*/

  const arrayTh = ["id", "email", "first_name", "last_name", "avatar"];

  for (let i = 0; i < arrayTh.length; i++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.innerHTML = arrayTh[i];
    tr.append(th);
    table.append(th);
  }

  //for(let i = 0; i < data.data.length; i++)
  for (let obj of data.data) {
    const tr = document.createElement("tr");

    //console.log("i: " + i);
    console.log("---- inizio oggetto -----");
    console.log(obj);

    //th
    for (let property in obj) {
      //console.log(element + " " + data.data[i][element]);

      //La prima volta element = "id" -> [element] -> ["id"]
      //La seconda volta element = "email" -> [element] -> ["email"]
      //La terza volta element = "first_name" -> [element] -> ["first_name"]

      const td = document.createElement("td");

      if (property === "avatar") {
        //1.
        // const img = document.createElement("img");
        // img.src = obj[property];
        // td.append(img);

        //2.
        td.id = "CELLA";
        td.innerHTML = DOMPurify.sanitize(
          '<img id="IMMAGINE" src=\'' + obj[property] + "'>"
        );
        td.path = DOMPurify.sanitize(obj[property]);
        td.addEventListener("click", (e) => {
          console.log("TD BUBBLING e.target: " + e.target);
          console.log("TD BUBBLING e.currentTarget: " + e.currentTarget);

          buildProductArticleBigBackground();
          buildProductArticleBig(e.currentTarget);
          /*window.addEventListener("mousemove", (e) => {
            console.log(e);

            bigbackground.style.left = e.clientX + "px";
            bigbackground.style.top = e.clientY + 'px';

          });*/
          //intervalId = setInterval(animateBigBackground, 10);
        });

        /*td.addEventListener("click", e => {
          console.log("TD CAPTURE e.target: " + e.target);
          console.log("TD CAPTURE e.currentTarget: " + e.currentTarget);
        }, true);*/
      } else {
        //1.
        //td.textContent = obj[property];

        //2.
        td.innerHTML = DOMPurify.sanitize(obj[property]);
      }

      console.log(property + ": " + obj[property]);
      tr.append(td);
    }

    console.log("---- fine oggetto -----");

    table.append(tr);
  }

  container.append(table);
};

function removeProductArticleBigBackground() {
  if (bigbackground != null) bigbackground.remove();
}

let x = 20;

function buildProductArticleBigBackground() {
  bigbackground = document.createElement("div");

  bigbackground.style.position = "fixed";
  bigbackground.style.backgroundColor = "gray";
  bigbackground.style.opacity = 0.8;
  // bigbackground.style.width = document.documentElement.clientWidth + 'px';
  // bigbackground.style.height = document.documentElement.clientHeight + 'px';
  updateBigBackground();
  console.log(document.documentElement.clientWidth);
  console.log(document.documentElement.clientHeight);
  //bigbackground.style.left = x + "px";
  bigbackground.style.left = "0px";
  bigbackground.style.top = "0px";

  document.body.append(bigbackground);
}

function removeProductArticleBig() {
  if (bigImage != null) bigImage.remove();
}

function buildProductArticleBig(td) {
  bigImage = document.createElement("div");
  const img = document.createElement("img");

  bigImage.style.position = "fixed";

  img.onload = (e) => {
    const scale = 3;

    const w = img.clientWidth * scale;
    const h = img.clientHeight * scale;

    img.style.width = w + "px";
    img.style.height = "auto";

    bigImage.style.width = w + "px";
    bigImage.style.height = "auto";
    // bigImage.style.padding = "10px";
    // bigImage.style.backgroundColor = "red"; //background-color;
    // bigImage.style.left = (document.documentElement.clientWidth/2 - w/2) + 'px';
    // bigImage.style.top = (document.documentElement.clientHeight/2 - h/2) + 'px';
    updateBigImage();
    buildProductArticleBigCloseButton();
  };

  img.onerror = (e) => {
    console.log("ERRORE!");
  };

  img.src = td.path; //https://reqres.in/img/faces/1-image.jpg

  bigImage.append(img);
  document.body.append(bigImage);
}

function animateBigBackground() {
  //console.log("animateBigBackground()");
  //x = x + 10;
  if (x < 400) {
    x += 3;
    bigbackground.style.left = x + "px";
    bigbackground.style.top = "100px";
  } else {
    console.log("sto fermo");
    clearInterval(intervalId);
  }
}

function pageResized() {
  if (bigbackground != null) {
    updateBigBackground();
  }
  // else
  // {
  //   console.log("non c'è lo sfondo!")
  // }

  if (bigImage != null) {
    updateBigImage();
  }
}

function updateBigBackground() {
  bigbackground.style.width = document.documentElement.clientWidth + "px";
  bigbackground.style.height = document.documentElement.clientHeight + "px";

  //bigbackground.style.width = window.innerWidth + 'px';
  //bigbackground.style.height = window.innerHeight +'px';
}

function updateBigImage() {
  bigImage.style.left =
    document.documentElement.clientWidth / 2 - bigImage.clientWidth / 2 + "px";
  bigImage.style.top =
    document.documentElement.clientHeight / 2 -
    bigImage.clientHeight / 2 +
    "px";

  // bigImage.style.left = (window.innerWidth/2 - bigImage.clientWidth/2) + 'px';
  // bigImage.style.top = (window.innerHeight/2 - bigImage.clientHeight/2) + 'px';
}

function buildProductArticleBigCloseButton() {
  const bigCloseButton = document.createElement("div");

  bigCloseButton.textContent = "X";

  bigCloseButton.style.position = "absolute";
  bigCloseButton.style.left = bigImage.clientWidth - 12 + "px";
  bigCloseButton.style.top = "0px";
  bigCloseButton.style.cursor = "pointer";

  bigCloseButton.addEventListener("click", (e) => {
    removeProductArticleBigBackground();
    removeProductArticleBig();
    //enableScrolling();
  });

  bigImage.append(bigCloseButton);
}

const callData = (pageCounterParam) => {
  console.log("pageCounterParam: " + pageCounterParam);

  if (!isLoaded) {
    console.log("INIZIO A CARICARE I DATI!");

    isLoaded = true;

    //resetContainer();
    getData(pageCounterParam);
  }
};

const pageLoaded = () => {
  let dataButton = document.querySelector("#dataButton");

  dataButton.addEventListener("click", (e) => {
    console.log("pageCounter: " + pageCounter);

    // for(let p in e)
    // {
    //   console.log(p + " " + e[p]);
    // }

    callData(pageCounter);

    /*const banner1 = {
      title: "Company 1",
      imageSrc: "images/company_1.jpeg",
      imageAlt: "Image of company 1!",
      description: "111 Aaa bbb ccc ddd eee",
    }

    console.log(banner1.title);
    console.log(banner1["title"]);*/

    // for(let p in banner1)
    // {
    //   console.log(p + " " + banner1[p]); //p vale "title" nella prima iterazione.
    // }
  });

  setBanner();
  bannerIntervalID = setInterval(setBanner, 2000);
};

window.onload = () => pageLoaded();

/*
*Agli articoli relativi ai libri che avete creato nell'esercizio precedente, associate la gestione dell'evento click
tramite addEventListener in maniera tale che, l'articolo che viene cliccato dovrà essere messo in evidenza con dei css (da valutare a paicere)
Al click su un articolo, un eventuale articolo già evidenziato dalla selezione precedente deve essere resettato al suo stile normale
*/

let message = "All Colleagues!";
let counter = 0;
let currentChar = " ";

const pTitolo = document.getElementById("pTitolo");

const intervalID = setInterval(aggiungiCarattere, 500);

pTitolo.textContent = currentChar;

function aggiungiCarattere() {
  if (counter < message.length) {
    currentChar += message.charAt(counter);
    counter++;
    refreshPTitolo(currentChar);
  } else {
    clearInterval(intervalID);
  }
  for (let i = 0; i < currentChar.length; i++) {
    let colorBackground = Math.floor(Math.random() * 16777215).toString(16);
    pTitolo.style.backgroundColor = "#" + colorBackground;
  }
}

function refreshPTitolo() {
  document.getElementById("pTitolo").textContent = currentChar;
}

// const randomColor = () => {
//   // let colorBackground = Math.floor(Math.random() * 16777215).toString(16)
//   // pTitolo.style.backgroundColor = "#" + colorBackground;
// }

function aggiungiCarattere() {
  if (counter < message.length) {
    let char = message.charAt(counter);
    let span = document.createElement("span"); // Crea uno span per ogni carattere.
    span.textContent = char; // Inserisce ogni carattere del messaggio.
    span.style.backgroundColor = getRandomColor(); // Imposta un colore di sfondo casuale per ogni carattere
    pTitolo.append(span); // Appendiamo lo span al paragrafo.
    counter++;
  } else {
    clearInterval(intervalID); // Ferma l'intervallo quando tutti i caratteri sono stati generati.
  }
}

// Funzione per ottenere un colore random
function getRandomColor() {
  const allColors = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += allColors[Math.floor(Math.random() * allColors.length)];
  }
  return color; // Ritorna un colore esadecimale random
}
