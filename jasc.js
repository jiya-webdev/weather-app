async function getWeather() {
  let city = document.getElementById("city").value.trim();
  let result = document.getElementById("weatherResult");

result.style.display = "block";

  if(city === ""){
    result.innerHTML = "❗ Enter city name";
    return;
  }

  result.innerHTML = "⏳ Loading...";

  let apiKey = "b31bcc6f5959772bc89626b02aa90e53";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
   let res = await fetch(url);
   let data = await res.json();

  if (!res.ok) {
    result.innerHTML = "❌ " + data.message;
  return;
}

    // Weather icon from API
    let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Dynamic background change
    let condition = data.weather[0].main.toLowerCase();
    if(condition.includes("clear")){
      document.body.style.background = "linear-gradient(135deg,#f9d423,#ff4e50)";
    } else if(condition.includes("cloud")){
      document.body.style.background = "linear-gradient(135deg,#757f9a,#d7dde8)";
    } else if(condition.includes("rain")){
      document.body.style.background = "linear-gradient(135deg,#00c6ff,#0072ff)";
    } else if(condition.includes("snow")){
      document.body.style.background = "linear-gradient(135deg,#83a4d4,#b6fbff)";
    } else {
      document.body.style.background = "linear-gradient(135deg,#141e30,#243b55)";
    }

    // Show result
    result.innerHTML = `
      <h3>${data.name}</h3>
      <img src="${iconUrl}" alt="Weather Icon">
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>🤗 Feels Like: ${data.main.feels_like}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
      <p>👁 Visibility: ${(data.visibility/1000).toFixed(1)} km</p>
    `;

  } catch(error){
    console.log(error);
    result.innerHTML = "⚠️ Error fetching data";
  }
  document.getElementById("city").addEventListener("keypress",function(e){
    if(e.key==="Enter"){
        getWeather();
    }
});
}
