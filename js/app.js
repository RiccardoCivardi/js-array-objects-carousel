/*
  1 - creo array di oggetti secondo le specifiche
  2 - genero lo slider
  3 - genero le thumbnails
  4 - creo movimento con le frecce
  5 - autoplay
  6 - inverto l'ordine di scorrimento
  7 - interrompo lo scorrimento
  8 - il click sulla thumbnails mi mette la rispettiva foto
*/

// 1
const images = [
  {
   title: 'Svezia',
   description: 'Una vita senza amore è come un anno senza estate',
   url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg'  
  },
  {
   title: 'Perù',
   description: 'Signora Presidente, il Perù è sempre stata la nostra pecora nera in America latina',
   url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg' 
  },
  {
   title: 'Chile',
   description: 'Il Cile è un paese maschilista: l\'aria è talmente densa di testosterone che è un miracolo se alle donne non spuntano i peli in faccia',
   url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c' 
  },
  {
   title: 'Argentina',
   description: 'La storia di Buenos Aires sta scritta nel suo elenco telefonico',
   url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg' 
  },
  {
   title: 'Colombia',
   description: 'In Colombia avere le allucinazioni è una normalità',
   url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop' 
  }
];

// scorciatoia querySelector
const el = document.querySelector.bind(document); 

// prendo gli elementi dal dom
const carousel = el('.carousel');
const slider = el('.slider');
const thumbnail = el('.thumbnails-container');
const prevButton = el('#prev');
const nextButton = el('#next');
const invertButton = el('#invert');
const stopButton = el('#stop');
// creo HTML collection delle thumbnails 
const thumbnailImage = document.getElementsByClassName('thumbnail');

// variabili
const numImages = images.length;
let sliderCounter = 0;

let isOver = false;
let isNext = true;
let isStop = false;


//  2 - 3
print()
console.log(prevButton)
// 4
prevButton.addEventListener('click', function(){
  nextPrev(true);
})

nextButton.addEventListener('click', function(){
  nextPrev(false);
})

// 5
const autoplay = setInterval(function(){
  // l'autoplay parte solo se isOver e isStop sono falsi entrambi
  if(!isOver && !isStop) nextPrev(isNext);
}, 2000);

// fermo e accendo autoplay al passaggio del mouse
carousel.addEventListener('mouseenter', function(){
  isOver = true;
});
carousel.addEventListener('mouseleave', function(){
  isOver = false;
})

// 6
invertButton.addEventListener('click', function(){
  // inverto il senso di marcia scambio true in false e viceversa
  // con il sistema che ho creato posso stoppare, invertire il senso di marcia e ricomniciare....
  if(isNext) isNext = false;
  else isNext = true;
});

// 7
stopButton.addEventListener('click', function(){
  // inverto true e false per far fermare o ripartire la funzione al click
  if(!isStop) isStop = true;
  else isStop = false;
});

// 8
console.log(thumbnailImage)
// ciclo la collection per dare l'addEventListener ad ogni thumbnails
// thumbnailImage.map((thumb, index) => {
//   thumb.addEventListener('click', function(){
//     console.log(index);
//     onClick(index);
//   });
// }); 

 
  
// -------------------------------------------------------------

function print() {
  
  printSlider();

  printTumbnails();
  // assegno le classi alla prima immagini
  el('.text').classList.add('active');
  el('.image').classList.add('active');
  el('.thumbnail-container').classList.add('active');
  el('.thumbnail').classList.add('active');

  
}



function printSlider() {
  // filtro con map per avere un array di strighe. non do il parametro a map ma solo la funzione perchè è implicito 
  const printSliderArray = images.map(generateSlider);
  // trasformo array in stringa
  const printSliderHtml = printSliderArray.join('');
  // prendo html originale di slider
  let sliderHtml = slider.innerHTML;
  // gli concateno la stringa creata
  sliderHtml += printSliderHtml;
  // stampo il nuovo html
  slider.innerHTML = sliderHtml;
}

// alla funzione passo image che è il paramentro inplicito del map che la richiama in printSlider
function generateSlider(image) {
  // creo immagine 
  const imageHtml = `
    <img class="image" src="${image.url}" alt="${image.title}">
  `;
  // creo titolo e descrizione
  const textHtml = `
    <div class="text">
      <h3 class="title">${image.title.toUpperCase()}</h3>
      <p class="description">${image.description}</p>
    </div>
  `;
  // concateno i due template litteral
  const sliderHtml = imageHtml + textHtml;
  // ritorno il template litteral creato
  return sliderHtml;
}

function printTumbnails() {
  // filtro con map per avere un array di strighe. non do i parametri a map ma solo la funzione perchè sono impliciti 
  const printThumbnailsArray = images.map(generateThumbnails);
  // trasformo array in stringa
  const printThumbnailsHtml = printThumbnailsArray.join('');
  // stampo il nuovo html
  thumbnail.innerHTML = printThumbnailsHtml;
}

// alla funzione passo image che è il paramentro inplicito del map che la richiama in printSlider
function generateThumbnails(image) {
  //creo thumbnails
  const thumbnailsHtml = `
    <div class="thumbnail-container">
      <img class="thumbnail" src="${image.url}" alt="${image.title}">
    </div>
  `;
  // ritorno il template litteral creato
  return thumbnailsHtml;
}

function nextPrev(isNext) {
  // creo html collection di ogni elemento che si deve muovere
  const image = document.getElementsByClassName('image');
  const text = document.getElementsByClassName('text');
  const thumbnailContainer = document.getElementsByClassName('thumbnail-container');
  const thumbnail = document.getElementsByClassName('thumbnail');

  //rimuovo tutte le classi active attuali
  image[sliderCounter].classList.remove('active');
  text[sliderCounter].classList.remove('active');
  thumbnailContainer[sliderCounter].classList.remove('active');
  thumbnail[sliderCounter].classList.remove('active');

  // condizioni per incrementare o decrementare il contatore e creare il loop
  if(isNext) {
    sliderCounter++;
    if(sliderCounter === numImages) sliderCounter = 0;
  } else {
    sliderCounter--;
    if(sliderCounter < 0) sliderCounter = numImages - 1;
  }

  // aggiungo tutte le classi active attuali dopo aver modificato il contatore
  image[sliderCounter].classList.add('active');
  text[sliderCounter].classList.add('active');
  thumbnailContainer[sliderCounter].classList.add('active');
  thumbnail[sliderCounter].classList.add('active');
}

function onClick(index){
  console.log(index);
  sliderCounter = index;
}
