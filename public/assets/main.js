// Variables globales pour les coordonnées
let latitude;
let longitude;

// Fonction pour obtenir la géolocalisation de l'utilisateur et afficher la carte
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Récupérer les coordonnées
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            // Créer une carte Leaflet
            let map = L.map('map').setView([latitude, longitude], 16);

            let newPoint = [latitude + 0.01, longitude + 0.01];

            // Ajouter une couche de carte
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Créer un marqueur pour la position actuelle de l'utilisateur
            var markerFrom = L.marker([latitude, longitude]).addTo(map).bindPopup('Votre position actuelle').openPopup();

            // Créer un marqueur pour le nouveau point
            var markerTo = L.marker([newPoint[0], newPoint[1]]).addTo(map).bindPopup('Nouveau point').openPopup();

            // Créer un itinéraire depuis la position actuelle jusqu'au nouveau point
            L.Routing.control({
                waypoints: [
                    L.latLng(latitude, longitude),
                    L.latLng(newPoint[0], newPoint[1])
                ],
            }).addTo(map);
        });
    } else {
        alert("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
}

// Appeler la fonction au chargement de la page
window.onload = getLocation;
