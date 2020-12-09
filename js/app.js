//Variables

const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets = [];

cargarEventListener();

function cargarEventListener () {
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', traerStorage);
}


//Funciones
function agregarTweet (e) {
    e.preventDefault();    

    const tweet = document.querySelector('#tweet').value;
    
    
        if (tweet === '') {  
            mostrarError('El mensaje no puede ir vacio'); 

            return;
        }         

        const tweetObj = 
        {
            id: Date.now(),
            tweet
        }         
            
        tweets = [...tweets,tweetObj];    

        crearHTML ();         
        
        
        formulario.reset();

        
    
}

function mostrarError (mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');    

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 1500);
}

function crearHTML () {    
    limpiarHTML(); 

    if (tweets.length > 0) {
        tweets.forEach ( tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        });    
    }
    datosStorage();
}

function limpiarHTML () {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function datosStorage () {
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function traerStorage () {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    console.log(tweets);
    crearHTML();
}

function  borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    
    crearHTML();
}