const peliculaDiv = document.getElementById('pelicula');
const btnMostrar = document.querySelector('.btn_mostrar');
let iconoFav = document.querySelector('.corazon_favorito');
const btnFav = document.querySelector('.btn_favoritos');
const listaFav = document.querySelector('.listFav');
const listaul = document.querySelector('.listaul');
const modal = document.querySelector('.ventana_modal');



const db = new PouchDB('favoritos'); // Se crea la base de indexDB

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 //Se carga el service worker
 if( navigator.serviceWorker){
    
  navigator.serviceWorker.register('sw.js');

  } else {
      document.querySelector('main').innerHTML = '<h2> El navegador no ServiceWorker </h2>';
  };

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Cargo la API de la página y la guardo en obtenerPeliculas
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

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Aca muestro las peliculas

  btnMostrar.addEventListener('click', async () => {
  const peliculas = await obtenerPeliculas();
  listaFav.style.display = 'none';
  peliculaDiv.innerHTML = '';

  peliculas.forEach(pelicula => {

    //Toma de datos de la api y recorro y cargo en las variables

    const nombre = pelicula.title;
    const año = pelicula.release_date.slice(0, 4);
    const imagenURL = 'https://image.tmdb.org/t/p/w500' + pelicula.poster_path;
    const detalles = pelicula.overview;
    const idImagen = pelicula.poster_path;

    // cro el div de cada pelicula
    const peliculaItem = document.createElement('div');
    peliculaItem.classList.add('cuadro_pelicula');

    // Se muestra portada como lista de peliculas
    const imagen = document.createElement('img');
    imagen.setAttribute('data_titulo', nombre);
    imagen.src = imagenURL;
    imagen.alt = 'Portada de ' + nombre;

                // Se le da función de click a la imagen para que abra más detalles
                imagen.addEventListener('click', function () {               

                  const imagenModal = document.getElementById('imagen_ventanaModal');
                  imagenModal.src = imagenURL;
                  imagenModal.alt = 'Portada de ' + nombre;
                  //guardo el id de la imagen
                  iconoFav.id = idImagen;
                  
                  const titulo = document.getElementById('titulo_ventanaModal');
                  titulo.textContent = nombre;
                  const descripcion = document.getElementById('descripcion_ventaModal');
                  descripcion.textContent = detalles;
                  const añoPelicula = document.getElementById('año_ventanaModal');
                  añoPelicula.textContent = 'Año: ' + año;

                  
                  // Se cambia el display para que aparezca como modal
                  modal.style.display = 'block';

                  // Funcion de cerrar la ventana modal cambiando el display a none
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


//-------------------------------------------------------------------------------------------------------------------------------------------------


// Funcion mostrar desde el buscador
// carga de elementos a tomar

const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');

// Funcion de click del boton buscar

  btnBuscar.addEventListener('click', () => {

  const busqueda = inputBuscar.value.trim().toLowerCase();

  if (busqueda === '') {
    // Si no se ingresa ningún valor, no se realiza la búsqueda y se muestran todas las peliculas
    return;
  }

  // Recorro la Api con el valor que se ingreso en busqueda

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


      // en data genero lo mismo que al mostar pero solo de las que se buscaron 

      const peliculas = data.results;
      peliculaDiv.innerHTML = '';

      peliculas.forEach(pelicula => {
        const nombre = pelicula.title;
        
        
        const año = pelicula.release_date.slice(0, 4);
        const imagenURL = 'https://image.tmdb.org/t/p/w500' + pelicula.poster_path;
        const detalles = pelicula.overview;
        const idImagen = pelicula.poster_path;
        

        // Crea los elementos HTML para mostrar la película

        const peliculaItem = document.createElement('div');
        peliculaItem.classList.add('cuadro_pelicula');
        
        const imagen = document.createElement('img');
        imagen.setAttribute('data_titulo', nombre);
        imagen.src = imagenURL;
        imagen.alt = 'Portada de ' + nombre;


          // Se le da función de click a la imagen para que abra más detalles

                        imagen.addEventListener('click', function () {                          

                          const imagenModal = document.getElementById('imagen_ventanaModal');
                          imagenModal.src = imagenURL;
                          imagenModal.alt = 'Portada de ' + nombre;
                          //aca guardo el id de la imagen
                          iconoFav.id = idImagen;
                          
                          const titulo = document.getElementById('titulo_ventanaModal');
                          titulo.textContent = nombre;
                          const descripcion = document.getElementById('descripcion_ventaModal');
                          descripcion.textContent = detalles;
                          const añoPelicula = document.getElementById('año_ventanaModal');
                          añoPelicula.textContent = 'Año: ' + año;

                          // Se cambia el display para que aparezca como modal

                          modal.style.display = 'block';

                          // Funcion de cerrar la ventana modal cambiando el display a none

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

        // Agrega los elementos al contenedor adecuado (peliculaDiv)
        peliculaItem.appendChild(imagen);
        
        peliculaDiv.appendChild(peliculaItem);
      });
    })
    .catch(error => console.error(error));
    
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//click en corazon de me gusta y que se guarde



      iconoFav.addEventListener('click', ()=>{
        
          modal.style.display = 'none';
        
        const fecha = new Date().toISOString();

        const listaFav = {
            _id: fecha,
            NombrePeli : iconoFav.id,
          }
               
          db.put(listaFav).then(() => {
              console.log('Película guardada en favoritos');
            })
            .catch(error => {
              console.error(error);
            });


           
            modal.style.display = 'none';

        
      });



    
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Cargar peliculas guardadas

    btnFav.addEventListener('click', () => {
      
      db.allDocs({ include_docs: true })
        .then(result => {
          console.log(result)
          const peliculasFavoritas = result.rows;
          
          peliculaDiv.innerHTML = '';
    
          peliculasFavoritas.forEach(pelicula => {
            
            const idPeli = pelicula.doc.NombrePeli;
            
            // const año = pelicula.release_date.slice(0, 4);
            const imagenURL = 'https://image.tmdb.org/t/p/w500' + idPeli;
            
    
            // Crea los elementos HTML para mostrar la película
    
            const peliculaItem = document.createElement('div');
            peliculaItem.classList.add('cuadro_pelicula');
    
            const imagen = document.createElement('img');
            //creo el div contenedor del boton borrar
            const cuadroBton = document.createElement('div');
            cuadroBton.classList.add('cuadroBton');
            
            const botonBorrar = document.createElement('button');
            botonBorrar.classList.add('boton_borrar_fav');
            const idBoton = idPeli;

            botonBorrar.setAttribute('data-doc-id', idBoton); // le agrego el atributo del id que se guarda el indexdb
            botonBorrar.innerText ='Borrar'
            imagen.src = imagenURL;
            imagen.alt = 'Portada de pelicula ' ;
    
            peliculaItem.appendChild(imagen);
            peliculaDiv.appendChild(peliculaItem);
            cuadroBton.appendChild(botonBorrar);
            peliculaItem.appendChild(cuadroBton);

             

            function botonBorrarTodo(favoritos) {
              db.remove(favoritos);
            }
            
            
//----------------------------------------------------------------------------------------------------------------------------
            
          
            botonBorrar.addEventListener('click', botonBorrarTodo);
            
                    });
                  })
                  .catch(error => console.error(error));
              });
  //--------------------------------------------------------------------------------------------------------------------

            

