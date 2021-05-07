document.querySelector(".btn-dark").addEventListener("click", () => {
  showData();
});
document.querySelector(".form-control").addEventListener("keyup", (event) => {
  event.keyCode == 13 && showData();
});

const showData = async () => {
  const value = document.querySelector(".form-control").value;
  document.querySelector(".parent-forecast").innerHTML = /*html */ `
  <div class="container-forecast rounded">
  <div class="row justify-content-center">
    <div class="col-12 col-md-12 col-lg-12">
      <div class="spinner-border text-center text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  </div>
  `;
  const forecastData = await getForecastData(value);

  if (forecastData.error) {
    document.querySelector(".parent-forecast").innerHTML = "";
    return swal("Error", forecastData.error, "error", {
      timer: 2500,
    });
  }

  assignForecastData(forecastData);
};

const assignForecastData = (obj) => {
  const detail = obj.forecast.current;
  const locate = obj.forecast.location;

  const isi = /*html*/ `
  <div class="container-forecast rounded">
  <div class="img-container">
    <img class="rounded" src="${detail.weather_icons[0]}" />
  </div>
  <h3 class="mt-2">${detail.temperature}°C, feels like ${detail.feelslike}°C (${
    detail.is_day == "yes" ? "Day" : "Night"
  })</h3>
  <h5>${obj.location}</h5> 
  <h6>${detail.weather_descriptions[0]} (${locate.localtime})</h6> 
    <div class="row mt-3">
      <div class="col-12 col-md-12 col-lg-6">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Wind Direction: ${detail.wind_dir}</li>
          <li class="list-group-item">Wind Speed: ${detail.wind_speed} KM/h</li>
          <li class="list-group-item">Pressure: ${detail.pressure} mbar</li>
          <li class="list-group-item">Longtitude: ${locate.lon}</li>
        </ul>
      </div>
      <div class="col-12 col-md-12 col-lg-6">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Humidity: ${detail.humidity}%</li>
          <li class="list-group-item">Cloud Cover: ${detail.cloudcover}%</li>
          <li class="list-group-item">Latitude: ${locate.lat}</li>
        </ul>
      </div>
    </div>  
  </div>
  `;

  document.querySelector(".parent-forecast").innerHTML = isi;
};

const getForecastData = (address) => {
  return fetch(`/weather?address=${address}`)
    .then((res) => res.json())
    .then((res) => res);
};
