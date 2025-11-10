document.getElementById("buscar").addEventListener("click", async () => {
  const cidade = document.getElementById("cidade").value.trim();
  const resultado = document.getElementById("resultado");

  if (!cidade) {
    resultado.innerHTML = "<p>Por favor, digite o nome de uma cidade.</p>";
    return;
  }

  resultado.innerHTML = "<p class='loading'>Carregando...</p>";

  try {
    // 1️⃣ Buscar coordenadas da cidade
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultado.innerHTML = "<p>Cidade não encontrada.</p>";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Buscar dados climáticos
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();

    const { temperature, windspeed, weathercode } = weatherData.current_weather;

    // 3️⃣ Traduzir código de clima
    const condicoes = {
      0: "Céu limpo ☀️",
      1: "Parcialmente nublado 🌤️",
      2: "Nublado ⛅",
      3: "Encoberto ☁️",
      45: "Nevoeiro 🌫️",
      48: "Nevoeiro gelado ❄️",
      51: "Garoa fraca 🌦️",
      61: "Chuva leve 🌧️",
      80: "Chuva passageira 🌦️",
      95: "Tempestade ⛈️"
    };

    const condicao = condicoes[weathercode] || "Condição desconhecida";

    // 4️⃣ Mostrar resultado
    resultado.innerHTML = `
      <p><strong>${name}, ${country}</strong></p>
      <p>🌡️ Temperatura: ${temperature}°C</p>
      <p>💨 Vento: ${windspeed} km/h</p>
      <p>${condicao}</p>
    `;
  } catch (erro) {
    resultado.innerHTML = "<p>Erro ao buscar dados do clima.</p>";
    console.error(erro);
  }
});
