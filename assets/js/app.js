const peliculaDiv = document.getElementById('.pelicula');
const btnMostrar = document.querySelector('.btn_mostrar');
const btnFav = document.querySelector('.btn_favoritos');
const listaFav = document.querySelector('.listFav');
const listaul = document.querySelector('.listaul');
const modal = document.querySelector('.ventana_modal');



const db = new PouchDB('favoritos'); 

 if( navigator.serviceWorker){
    
  navigator.serviceWorker.register('sw.js');

  } else {
      document.querySelector('main').innerHTML = '<h2> El navegador no ServiceWorker </h2>';
  };

function obtenerPeliculas(){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWVkZTRjMGJhNzczYzJkNGRlYzEyMDYzODViYTI5YiIsInN1YiI6IjY0OWIwMjNiZmVkNTk3MDBlYTA5YWI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wygduOri8MjwIKT6-pVjZEoxmJElT0epR5R4kiWspVg'
    }
  };

  return fetch('https://api.themoviedb.org/3/movie/popular?api_key=47e33bf29ef2fc5eaefdc1cd1ed4b0df&language=es-MX', options)
    .then(response => response.json())
    .then(data => data.results)
    .catch(error => {
      console.error(error);
      return []; // Devolver un array vacío en caso de error
    });
}



  btnMostrar.addEventListener('click', async () => {
  const peliculas = await obtenerPeliculas();
  listaFav.style.display = 'none';
  peliculaDiv.innerHTML = '';

  peliculas.forEach(pelicula => {



    const nombre = pelicula.title;
    const año = pelicula.release_date.slice(0, 4);
    const imagenURL = 'https://image.tmdb.org/t/p/w500' + pelicula.poster_path;
    const detalles = pelicula.overview;
    const idImagen = pelicula.poster_path;

    const peliculaItem = document.createElement('div');
    peliculaItem.classList.add('cuadro_pelicula');

    const imagen = document.createElement('img');
    imagen.setAttribute('data_titulo', nombre);
    imagen.src = imagenURL;
    imagen.alt = 'Portada de ' + nombre;

                imagen.addEventListener('click', function () {               

                  const imagenModal = document.getElementById('imagen_ventanaModal');
                  imagenModal.src = imagenURL;
                  imagenModal.alt = 'Portada de ' + nombre;
                 
                  iconoFav.id = idImagen;
                  
                  const titulo = document.getElementById('titulo_ventanaModal');
                  titulo.textContent = nombre;
                  const descripcion = document.getElementById('descripcion_ventaModal');
                  descripcion.textContent = detalles;
                  const añoPelicula = document.getElementById('año_ventanaModal');
                  añoPelicula.textContent = 'Año: ' + año;

                  modal.style.display = 'block';

                  const cerrar = document.querySelector('.close');
                  cerrar.addEventListener('click', function () {
                    modal.style.display = 'none';
                  });
                });

    const descripcion = document.createElement('p');
    descripcion.textContent = detalles;

    const titulo = document.createElement('h3');
    titulo.textContent = nombre;

    const info = document.createElement('p');
    info.textContent = 'Año: ' + año;

    peliculaItem.appendChild(imagen);
    peliculaDiv.appendChild(peliculaItem);
  });
});



const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');

// Funcion de click del boton buscar

  btnBuscar.addEventListener('click', () => {

  const busqueda = inputBuscar.value.trim().toLowerCase();

  if (busqueda === '') {
    return;
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWVkZTRjMGJhNzczYzJkNGRlYzEyMDYzODViYTI5YiIsInN1YiI6IjY0OWIwMjNiZmVkNTk3MDBlYTA5YWI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wygduOri8MjwIKT6-pVjZEoxmJElT0epR5R4kiWspVg'
    }
  };

  fetch('https://api.themoviedb.org/3/search/movie?query=' + busqueda + '&language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {

      const peliculas = data.results;
      peliculaDiv.innerHTML = '';

      peliculas.forEach(pelicula => {
        const nombre = pelicula.title;
        
        
        const año = pelicula.release_date.slice(0, 4);
        const imagenURL = 'https://image.tmdb.org/t/p/w500' + pelicula.poster_path;
        const detalles = pelicula.overview;
        const idImagen = pelicula.poster_path;

        const peliculaItem = document.createElement('div');
        peliculaItem.classList.add('cuadro_pelicula');
        
        const imagen = document.createElement('img');
        imagen.setAttribute('data_titulo', nombre);
        imagen.src = imagenURL;
        imagen.alt = 'Portada de ' + nombre;

                        imagen.addEventListener('click', function () {                          

                          const imagenModal = document.getElementById('imagen_ventanaModal');
                          imagenModal.src = imagenURL;
                          imagenModal.alt = 'Portada de ' + nombre;
                     
                          iconoFav.id = idImagen;
                          
                          const titulo = document.getElementById('titulo_ventanaModal');
                          titulo.textContent = nombre;
                          const descripcion = document.getElementById('descripcion_ventaModal');
                          descripcion.textContent = detalles;
                          const añoPelicula = document.getElementById('año_ventanaModal');
                          añoPelicula.textContent = 'Año: ' + año;

                          modal.style.display = 'block';

                          const cerrar = document.querySelector('.close');
                          cerrar.addEventListener('click', function () {
                            modal.style.display = 'none';
                          });
                        });

                        


        const titulo = document.createElement('h3');
        titulo.textContent = nombre;

        const info = document.createElement('p');
        info.textContent = 'Año: ' + año;

        const descripcion = document.createElement('p');
        descripcion.textContent = detalles;

        peliculaItem.appendChild(imagen);
        
        peliculaDiv.appendChild(peliculaItem);
      });
    })
    .catch(error => console.error(error));
    
});
            

