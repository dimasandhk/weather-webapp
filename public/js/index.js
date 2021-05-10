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
  <h5>${detail.weather_descriptions[0]} (${locate.localtime})</h5> 
  <h6>${locationSvg} ${obj.location}</h6> 
    <div class="row mt-3">
      <div class="col-12 col-md-12 col-lg-6">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Wind Direction: ${
            detail.wind_dir
          } ${windSvg}</li>
          <li class="list-group-item">Wind Speed: ${
            detail.wind_speed
          } KM/h ${windSvg}</li>
          <li class="list-group-item">Pressure: ${detail.pressure} mbar</li>
          <li class="list-group-item">Longtitude: ${locate.lon}</li>
        </ul>
      </div>
      <div class="col-12 col-md-12 col-lg-6">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Humidity: ${detail.humidity}%</li>
          <li class="list-group-item">Cloud Cover: ${
            detail.cloudcover
          }% ${cloudSvg}</li>
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

const locationSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg>`;

const windSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
</svg>`;

const cloudSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-fill" viewBox="0 0 16 16">
  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
</svg>`;
