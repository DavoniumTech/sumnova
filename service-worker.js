/*
    SumNova
    Davonium Technologies

    Production Progressive Web App Service Worker

    Responsibilities:
    - Application shell caching
    - Offline experience
    - Cache version management
    - Safe updates

    Does NOT handle:
    - Authentication
    - Firebase
    - AI requests
    - User data
*/


const CACHE_VERSION = "sumnova-cache-v4";


const APP_SHELL = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",

    "./assets/icon-192.png",

    "./assets/icon-512.png",

    "./assets/davonium-technologies-logo.png"

];



/*
    Install Event

    Creates application cache safely.

    Missing optional files will not
    completely break installation.
*/


self.addEventListener(
    "install",
    event => {


        event.waitUntil(

            caches.open(CACHE_VERSION)

                .then(

                    async cache => {


                        const cacheRequests =
                            APP_SHELL.map(

                                async file => {


                                    try {


                                        await cache.add(file);


                                    } catch(error) {


                                        console.warn(

                                            "Cache skipped:",
                                            file

                                        );


                                    }


                                }

                            );


                        await Promise.all(cacheRequests);


                    }

                )

                .then(

                    () => {


                        return self.skipWaiting();


                    }

                )


        );


    }

);





/*
    Activate Event

    Removes old versions
    and controls pages immediately.
*/


self.addEventListener(
    "activate",
    event => {


        event.waitUntil(

            caches.keys()

                .then(

                    cacheNames => {


                        return Promise.all(

                            cacheNames.map(

                                cacheName => {


                                    if (

                                        cacheName !== CACHE_VERSION

                                    ) {


                                        return caches.delete(cacheName);


                                    }


                                    return null;


                                }

                            )

                        );


                    }

                )

                .then(

                    () => {


                        return self.clients.claim();


                    }

                )


        );


    }

);

          

/*
    Fetch Event

    Navigation:
    Network first
    Offline fallback

    Static files:
    Cache first
    Network update
*/


self.addEventListener(
    "fetch",
    event => {


        const request = event.request;



        if (

            request.method !== "GET"

        ) {

            return;

        }




        if (

            request.mode === "navigate"

        ) {


            event.respondWith(

                fetch(request)

                    .then(

                        response => {


                            const responseClone =
                                response.clone();



                            caches.open(CACHE_VERSION)

                                .then(

                                    cache => {


                                        cache.put(

                                            request,

                                            responseClone

                                        );


                                    }

                                );



                            return response;


                        }

                    )

                    .catch(

                        async () => {


                            const offlinePage =
                                await caches.match(
                                    "./index.html"
                                );



                            return offlinePage;


                        }

                    )


            );


            return;

        }





        event.respondWith(

            caches.match(request)

                .then(

                    cachedResponse => {


                        if (cachedResponse) {


                            return cachedResponse;


                        }



                        return fetch(request)

                            .then(

                                networkResponse => {


                                    if (

                                        !networkResponse ||

                                        networkResponse.status !== 200

                                    ) {


                                        return networkResponse;


                                    }



                                    const responseClone =
                                        networkResponse.clone();



                                    caches.open(CACHE_VERSION)

                                        .then(

                                            cache => {


                                                cache.put(

                                                    request,

                                                    responseClone

                                                );


                                            }

                                        );



                                    return networkResponse;


                                }

                            );


                    }

                )


        );


    }

);







/*
    Service Worker Messages

    Allows the application
    to request updates.
*/


self.addEventListener(
    "message",
    event => {


        if (

            event.data &&

            event.data.type === "SKIP_WAITING"

        ) {


            self.skipWaiting();


        }


    }

);
