const CACHE_NAME = 'drinkring-front-cache';

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      // Tutaj możesz dodać dodatkową obsługę, np. próbę pobrania z sieci
      return fetch(event.request).then((networkResponse) => {
        // Dodaj pobraną odpowiedź do pamięci podręcznej, aby była dostępna przy kolejnych żądaniach
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });

        // Zwróć odpowiedź pobraną z sieci
        return networkResponse;
      }).catch((error) => {
        // Obsługa błędów pobierania
        console.error('Błąd podczas pobierania z sieci:', error);
      });
    }).catch((error) => {
      // Obsługa błędów matchowania w cache'u
      console.error('Błąd podczas dopasowywania do cache\'u:', error);
    })
  );
});