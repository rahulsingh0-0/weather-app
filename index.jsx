"use-strict";
function loadmap() {
  const map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([51.5, -0.09])
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();
}
loadmap();

const whereAmI = async function (city, country) {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=da85c744c80df21954f51c4d06443aba`
  );
  let data = await res.json();
  console.log(data);
};
whereAmI("delhi", "in");
