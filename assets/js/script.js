let mapa; // variável global do mapa
let marcador; // marcador da cidade

document.getElementById("buscar").addEventListener("click", async () => {
  const cidade = document.getElementById("cidade").value.trim();
  const resultado = document.getElementById("resultado");
  const corpo = document.body; // referência ao corpo da página

  // ✨ Garante que a transição suave esteja ativa
  corpo.style.transition = "background 1.2s ease, color 1.2s ease";

  if (!cidade) {
    resultado.innerHTML = "<p>Por favor, digite o nome de uma cidade.</p>";
    return;
  }

  resultado.innerHTML = "<p class='loading'>Carregando...</p>";

  try {
    // 1️⃣ Buscar coordenadas da cidade
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultado.innerHTML = "<p>Cidade não encontrada.</p>";
      return;
    }

    const { name, country, latitude, longitude, timezone, elevation } = geoData.results[0];

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

    // 🕓 3.1️⃣ Adicionar data e hora completa da consulta
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    // 🎨 3.2️⃣ Alterar cor de fundo de acordo com o horário
    const hora = agora.getHours();
    if (hora >= 6 && hora < 18) {
      // 🌞 Dia
      corpo.style.background = "linear-gradient(to bottom, #74b9ff, #a29bfe)";
      corpo.style.color = "#000"; // texto escuro
    } else {
      // 🌙 Noite
      corpo.style.background = "linear-gradient(to bottom, #2d3436, #000000)";
      corpo.style.color = "#fff"; // texto claro
    }

    // 4️⃣ Mostrar resultado
    resultado.innerHTML = `
      <p><strong>${name}, ${country}</strong></p>
      <p>${dataFormatada}, ${horaFormatada}</p>
      <p>🌡️ Temperatura: ${temperature}°C</p>
      <p>💨 Vento: ${windspeed} km/h</p>
      <p>${condicao}</p>
      <hr>
      <p>📍 Latitude: ${latitude.toFixed(2)}°</p>
      <p>📍 Longitude: ${longitude.toFixed(2)}°</p>
      <p>🕓 Fuso horário: ${timezone}</p>
      <p>⛰️ Elevação: ${elevation} m</p>
    `;

    // 5️⃣ Exibir mapa com Leaflet
    if (!mapa) {
      mapa = L.map("map").setView([latitude, longitude], 10);

      // Camada base (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(mapa);

      // Adicionar marcador
      marcador = L.marker([latitude, longitude])
        .addTo(mapa)
        .bindPopup(`<strong>${name}</strong><br>${condicao}<br>${temperature}°C`)
        .openPopup();
    } else {
      mapa.setView([latitude, longitude], 10);
      marcador.setLatLng([latitude, longitude])
        .setPopupContent(`<strong>${name}</strong><br>${condicao}<br>${temperature}°C`)
        .openPopup();
    }

  } catch (erro) {
    resultado.innerHTML = "<p>Erro ao buscar dados do clima.</p>";
    console.error(erro);
  }
});
