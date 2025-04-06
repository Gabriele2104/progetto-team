"use-strict";
/*<meta name="author" content="Luca Bonacorsi">*/

//Begin Laboratorio: creazione di banner pubblicitari temporizzati.

let bannerIntervalID = null;
let bannersCounter = 0;

const banner1 = {
  title: "Company 1",
  imageSrc: "images/company_1.jpeg",
  imageAlt: "Image of company 1!",
  description: "111 Aaa bbb ccc ddd eee",
}

const banner2 = {
  title: "Company 2",
  imageSrc: "images/company_2.webp",
  imageAlt: "Image of company 2!",
  description: "222 Aaa bbb ccc ddd eee",
}

const banner3 = {
  title: "Company 3",
  imageSrc: "images/company_3.webp",
  imageAlt: "Image of company 3!",
  description: "333 Aaa bbb ccc ddd eee",
}

// const banner4 = {
//   title: "Company 4",
//   imageSrc: 'x\" onerror="alert(\'Ti ho fregato!\')',
//   imageAlt: "Image of company 4!",
//   description: "444 Aaa bbb ccc ddd eee",
// }

const banners = [
  banner1, //[0]
  banner2,//[1]
  banner3, //[2]
          //[3]
  //banner4,
];

//End Laboratorio: creazione di banner pubblicitari temporizzati.


let intervalID = null;
let charsCounter = 0;
let classes = ["pBlue", "pAzzurro", "pRosso", "pRosa", "pGiallo"];
let classesCounter = 0;

let isLoaded = false;
let pageCounter = 1;
let totalPages = 0;

let founderSectionIntervalId = 0;

const founder = {
  name: "Francesco",
  surname: "Neri",
  companies: ["Company 1", "Company 2", "Company 3"],
  awards: ["Award 1", "Award 2"],

  getCompaniesList() {
      //console.log("getCompaniesList()");
      //console.log("getCompaniesList() -> this.name: " + this.name);

      let companiesList = '<ul>';

      this.companies.forEach(
          company => companiesList += '<li>' + company + ', ruled by ' + this.name + ' ' + this.surname + '</li>'
          //function(company) { companiesList += '<li>' + company + ', ruled by ' + this.name + ' ' + this.surname + '</li>'; }
      );

      companiesList += '</ul>';

      return companiesList;
  },

  getAward(n) {
      //console.log("getAward()");
      //console.log("getAward() -> this.name: " + this.name);

      const beautifyAward = (award) => '<p>******** ' + award + ' won by ' + this.name + ' ' + this.surname + ' ******** </p>'
      //const beautifyAward = function (award) { '*** ' + award + ' won by ' + this.name + ' ' + this.surname + ' ***' };

      if(n >= 0 && n < this.awards.length)
          return(beautifyAward(this.awards[n]));
      else
          return("<p>Not exists.</p>");
  }
};

const resetTimer = () => {
  charsCounter = 0;
  classesCounter = 0;
  clearInterval(intervalID);
}

const resetElement = id => {
  const element = document.getElementById(id);
  element.innerHTML = "";
}

//intervalID = setInterval(setLetter, 100, "pTitolo", "All my colleagues!");
const setLetter = (...args) => {

  const id = args[0];
  const message = args[1];

  if(charsCounter<message.length)
  {
    const element = document.getElementById(id);
    const currentChar = message.charAt(charsCounter); //Qui, estraggo una lettera dalla frase contenuta in message.

    element.textContent += currentChar;
    element.className = classes[classesCounter];

    if(classesCounter<classes.length - 1)
    {
      classesCounter++;
      console.log("classesCounter: " + classesCounter);
    }
    else
    {
      classesCounter = 0;
    }

    charsCounter++;
  }
  else
  {
    //clearInterval(intervalID);
    resetTimer();
  }
}

//intervalID = setInterval(setLetter, 100, "pTitolo", "All my colleagues!");
const setLetter2 = (id, message) => {

  if(charsCounter<message.length)
  {
    const element = document.getElementById(id);
    const currentChar = message.charAt(charsCounter);

    //element.innerHTML += "<span class=" + classes[classesCounter] + ">" + currentChar + "</span>"; //Concatenazione.
    element.innerHTML += `<span class="${classes[classesCounter]}">${currentChar}</span>`; //Interpolazione.

    if(classesCounter<classes.length - 1)
    {
      classesCounter++;
      console.log("classesCounter: " + classesCounter);
    }
    else
    {
      classesCounter = 0;
    }

    charsCounter++;
  }
  else
  {
    //clearInterval(intervalID);
    resetTimer();
  }
}

const buildTable = (data) => {
  console.log(data.page);
  console.log(data.per_page);
  console.log(data.total);
  console.log(data.total_pages);

  let container = document.querySelector("#container");

  let table = document.createElement('table');
  container.append(table);

  let tr = document.createElement("tr");
  table.append(tr);

  let isFirstTime = true;

  for(const currentObject of data.data)
  {
    console.log(currentObject);

    let trn = document.createElement("tr");
    table.append(trn);
    
    for(const currentProperty in currentObject)
    {
      if(isFirstTime === true)
      {
        let thTable = document.createElement('th');
        thTable.innerHTML=`${currentProperty}`;

        tr.append(thTable);
      }

      let td = document.createElement("td");

      if(currentProperty === "avatar")
      {
        td.innerHTML=`<img src="${currentObject[currentProperty]}" />`;
        td.className = 'interactiveTd';
        td.addEventListener("click", () => {
          console.log(this);

          resetTimer();
          resetElement("pTitolo");

          intervalID = setInterval(setLetter2, 100, "pTitolo", `${currentObject.first_name} ${currentObject.last_name}`);
        });
      }
      else
      {
        td.innerHTML=`${currentObject[currentProperty]}`;
      }
    
      trn.append(td);
    }

    isFirstTime = false;
  }
}

const getData = async pageCounterParam => {
  //https://reqres.in/api/users?page=2
  let path = "https://reqres.in/api/users?page=" + pageCounterParam;
  //let path = "https://www.fghgkhfkf.com";

  try {
    const response = await axios.get(path);

    console.log(response.headers);

    for(let [headerKey, headerValue] of response.headers)
    {
      console.log(`${headerKey} = ${headerValue}`);
    }

    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    //console.log(response.headers);
    console.log(response.config);

    totalPages = response.data.total_pages;

    if(pageCounter < totalPages)
      pageCounter++;
    else
      pageCounter = 1;

    buildTable(response.data);

    isLoaded = false;
    console.log("isLoaded from response: " + isLoaded);
  }
  catch(error)
  {
    console.log("error: " + error);

    isLoaded = false;
    console.log("isLoaded from error: " + isLoaded);
  }
}

const resetContainer = () => {
  let container = document.querySelector("#container");
  container.innerHTML = "";
}

const callData = pageCounterParam => {
  console.log("pageCounterParam: " + pageCounterParam);

  if(!isLoaded)
  {
    console.log("Getting data...");

    isLoaded = true;

    resetContainer();
    getData(pageCounterParam);
  }
}


//Begin Laboratorio: creazione di banner pubblicitari temporizzati.
//function setBanner() {
const setBanner = () => {
  removeBanner();
  buildBanner();
}

const removeBanner = () => {
  const bannerSection = document.getElementById("bannerSection");
  bannerSection.innerHTML = "";
}


//const buildBanner = (title, imageSrc, imageAlt, description) => {
const buildBanner = () => {
  //removeBanner();

  const bannerCompany = banners[bannersCounter];

  const bannerSection = document.getElementById("bannerSection");
  const banner = document.createElement("section");

  banner.className = "rowSection aqua";
  
  const img = `<img src="${bannerCompany.imageSrc}" alt="${bannerCompany.imageAlt}" width="200px" height="200px" />`;

  const innerSection = document.createElement("section");
  innerSection.className = "columnSection pBlue";
  
  //Soluzione 1.
  //const h2 = "<h2>" + bannerCompany.title + "</h2>";

  //Soluzione 2.
  const h2 = `<h2>${bannerCompany.title}</h2>`;

  const p = `<p>${bannerCompany.description}</p>`;

  // //Soluzione 1.
  // const bc = document.createElement("h2");
  // bc.textContent = bannerCompany.title;
  // innerSection.append(bc);

  //Soluzione 2.
  innerSection.innerHTML = h2;
  innerSection.innerHTML += p;

  banner.innerHTML = img;
  banner.append(innerSection);
  
  bannerSection.append(banner);

  if(bannersCounter < banners.length - 1)
  {
    bannersCounter++;
    console.log("bannersCounter: " + bannersCounter);
  }
  else
  {
    bannersCounter = 0;
  }

  /*
    Al posto di prendere gli oggetti banner in maniera sequenziale,
    provare ad estrarre random gli oggetti dall'array (estrarre casualmente un valore da 0 a 2 compresi)
    Questo valore deve diventare il valore di bannersCounter
    Math.random() -> [0, 1, 2];
  */
}
//End Laboratorio: creazione di banner pubblicitari temporizzati.


const buildFounderSection = (founder) => {
  clearTimeout(founderSectionIntervalId);
  
  const founderSection = document.getElementById("founderSection");

  founderSection.innerHTML = '<section class="columnSection aqua">' + founder.getCompaniesList() + founder.getAward(0) + '</section>';
}

//function pageLoaded() {
const pageLoaded = () => {
  let dataButton = document.querySelector("#dataButton");

  dataButton.addEventListener("click", e => {
    console.log("pageCounter: " + pageCounter);
    
    callData(pageCounter);
  });

  //intervalID = setInterval(setLetter2, 100, "pTitolo", "All my colleagues!");
  //bannerIntervalID = setInterval(buildBanner, 3000);
  bannerIntervalID = setInterval(setBanner, 3000);
  //founderSectionIntervalId = setTimeout(buildFounderSection, 5000, founder); //Da provare dopo.
  //buildBanner();
}

//function pageLoaded() {
//const pageLoaded = () => bannerIntervalID = setInterval(setBanner, 3000);

window.onload = () => pageLoaded();

// window.onload = avvia;

// function avvia() {
//   pageLoaded();
// }