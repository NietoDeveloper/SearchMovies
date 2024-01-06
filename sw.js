console.log ('hola desde el service');


caches.open('mi-cache').then(cache =>{
    cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/sw.js',
        '/scripts/app.js',
        '/pouchdb-8.0.1.js',
        '/34255-espacio-jpg',
        '/manifest.json',
        
    ])
});


    self.addEventListener('fetch', event => {
    const respuesta = fetch(event.request).then( respuestaNetwork => {
    return caches.open( 'mi-cache' ).then( cache => {
    cache.put( event.request, respuestaNetwork.clone() );
    return respuestaNetwork;
    } )
    }).catch( error => {
    return caches.match( event.request)
    })
    event.respondWith( respuesta )
    })

