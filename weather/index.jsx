"use-strict";

const searchBar = document.querySelector("#search-bar");
const getBtn = document.querySelector("#button");
const clearBtn = document.querySelector("#button2");
const loc = document.querySelector(".area");
const time = document.querySelector(".time");
const container = document.querySelector(".adjust1");
const container2 = document.querySelector(".adjust2");
const displayInfo = document.querySelector(".info-data");

let city;
let area;
let userLat;
let userrLon;

// event handling on get button
getBtn.addEventListener("click", function (e) {
  let values = [];

  const value = searchBar.value;
  const push = value.split(",");
  values.push(push);
  let [val1, val2] = values[0];
  city = val1;
  area = val2;
  // fetching API
  const whereAmI = async function (city, area) {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${area}&APPID=da85c744c80df21954f51c4d06443aba`
    );
    let data = await res.json();

    // setting textcontent

    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { description } = data.weather[0];
    const { name } = data;
    const { country } = data.sys;
    const celcius = temp - 273.15;

    container.innerHTML = "";
    const html = `
<h5 id='temp'><i class="fas fa-temperature-low"></i> Temp:${celcius.toFixed(
      0
    )}°C</h5>
              <h5>💧 Humidity:${humidity}°</h5>
            </div>`;
    container.insertAdjacentHTML("afterbegin", html);
    container2.innerHTML = "";
    const html2 = `
     <h5  id='wind-speed' >🌫 Wind speed:${speed} km/hr</h5>
              <h5 id="desc">☁ Description:${description}</h5>`;
    container2.insertAdjacentHTML("afterbegin", html2);
    loc.innerHTML = "";
    const html3 = `
    <h4>📌 ${name},${country}</h4>`;
    loc.insertAdjacentHTML("afterbegin", html3);
    displayInfo.style.display = "block";

    setInterval(function () {
      time.innerHTML = "";
      const date = new Date();
      const tarik = date.getDate();
      const month = date.getMonth();
      const x = month.toString();
      x.padStart(2, "0");
      const year = date.getFullYear();
      const hour = date.getHours();
      const min = date.getMinutes();
      let sec = date.getSeconds();
      time.textContent = `${tarik}/${month + 1}/${year}|${hour}:${min}:${sec}`;
    }, 1000);

    // loading map
    const { lon, lat } = data.coord;
    userLat = lat;
    userrLon = lon;
    function loadmap() {
      const coords = [userLat, userrLon];

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords).addTo(map).bindPopup("Your Location").openPopup();
      // setTimeout(function () {
      //   map.remove();
      // }, 5000);

      clearBtn.addEventListener("click", function () {
        searchBar.value = "";
        displayInfo.style.display = "none";
        map.remove();
      });

      if (document.body.style.color === "black") {
        var Stadia_AlidadeSmoothDark = L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
          {
            maxZoom: 20,
            attribution:
              '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          }
        );
      }
    }
    loadmap();
  };
  whereAmI(city, area);
});

// event handling for enter button
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    let values = [];

    const value = searchBar.value;
    const push = value.split(",");
    values.push(push);
    let [val1, val2] = values[0];
    city = val1;
    area = val2;
    // fetching API
    const whereAmI = async function (city, area) {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${area}&APPID=da85c744c80df21954f51c4d06443aba`
      );
      let data = await res.json();

      // setting textcontent

      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { description } = data.weather[0];
      const { name } = data;
      const { country } = data.sys;
      const celcius = temp - 273.15;

      container.innerHTML = "";
      const html = `
<h5 id='temp'><i class="fas fa-temperature-low"></i> Temp:${celcius.toFixed(
        0
      )}°C</h5>
              <h5>💧 Humidity:${humidity}°</h5>
            </div>`;
      container.insertAdjacentHTML("afterbegin", html);
      container2.innerHTML = "";
      const html2 = `
     <h5  id='wind-speed' >🌫 Wind speed:${speed} km/hr</h5>
              <h5 id="desc">☁ Description:${description}</h5>`;
      container2.insertAdjacentHTML("afterbegin", html2);
      loc.innerHTML = "";
      const html3 = `
    <h4>📌 ${name},${country}</h4>`;
      loc.insertAdjacentHTML("afterbegin", html3);
      displayInfo.style.display = "block";

      setInterval(function () {
        time.innerHTML = "";
        const date = new Date();
        const tarik = date.getDate();
        const month = date.getMonth();
        const x = month.toString();
        x.padStart(2, "0");
        const year = date.getFullYear();
        const hour = date.getHours();
        const min = date.getMinutes();
        let sec = date.getSeconds();
        if (hour > 12) {
          const realHour = hour - 12;
          console.log(realHour);
          time.textContent = `${tarik}/${
            month + 1
          }/${year}|${realHour}:${min}:${sec}`;
        }
      }, 1000);

      // loading map
      const { lon, lat } = data.coord;
      userLat = lat;
      userrLon = lon;
      function loadmap() {
        const coords = [userLat, userrLon];

        const map = L.map("map").setView(coords, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker(coords).addTo(map).bindPopup("Your Location").openPopup();
        // setTimeout(function () {
        //   map.remove();
        // }, 5000);

        clearBtn.addEventListener("click", function () {
          searchBar.value = "";
          displayInfo.style.display = "none";
          map.remove();
        });

        if (document.body.style.color === "black") {
          var Stadia_AlidadeSmoothDark = L.tileLayer(
            "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
            {
              maxZoom: 20,
              attribution:
                '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            }
          );
        }
      }
      loadmap();
    };
    whereAmI(city, area);
  }
});
