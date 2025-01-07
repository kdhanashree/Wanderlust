// Access the geometry data from the global variable
const geometry = window.listingGeometry;
const coordinates = geometry.coordinates;
const l = window.listingloc;
const c = window.listingCountry;

// Initialize map
const map = L.map('map').setView([coordinates[1], coordinates[0]], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Add a marker for the listing's location
const marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);

// Bind a popup to the marker and open it
marker.bindPopup(`<b>Location:</b> ${l} <br> <b>Country:</b> ${c}`).openPopup();
