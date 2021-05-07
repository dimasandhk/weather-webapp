document.querySelector(".btn-dark").addEventListener("click", async () => {
  const value = document.querySelector(".form-control").value;
  const forecastData = await getForecastData(value);

  console.log(forecastData);
});

const getForecastData = (address) => {
  return fetch(`/weather?address=${address}`)
    .then((res) => res.json())
    .then((res) => res);
};
