window.addEventListener("load", () => {
  let long;
  let lat;
  let weatherDescription = document.querySelector(".weather-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/b61aa27f4915cf906a616682fbc0d069/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;

          //Set dom elements from the api
          temperatureDegree.textContent = temperature;
          locationTimezone.textContent = data.timezone;
          weatherDescription.textContent = summary;

          setIcon(icon, document.querySelector(".icon"));
        });
    });
  }

  function setIcon(icon, iconId) {
    const skycons = new Skycons({ color: "#fff" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
