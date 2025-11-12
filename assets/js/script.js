let mapa;
let marcador;

const inputCidade = document.getElementById("cidade");
const btnBuscar = document.getElementById("buscar");
const resultado = document.getElementById("resultado");
const titulo = document.getElementById("titulo");
const corpo = document.body;
const toggleBusca = document.getElementById("toggleBusca");
const mapDiv = document.getElementById("map");

btnBuscar.addEventListener("click", async () => {
  const cidade = inputCidade.value.trim();

  corpo.style.transition = "background 1.2s ease, color 1.2s ease";

  if (!cidade) {
    resultado.innerHTML = "<p>Por favor, digite o nome de uma cidade.</p>";
    return;
  }

  resultado.innerHTML = "<p class='loading'>Carregando...</p>";

  document.querySelector(".search-box").style.display = "none";
  toggleBusca.style.display = "inline-block";
  mapDiv.style.display = "none";

  try {
    // === 1️⃣ Buscar coordenadas ===
	
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cidade
      )}&count=1&language=pt&format=json`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultado.innerHTML = "<p>Cidade não encontrada.</p>";
      return;
    }

    const { name, country, latitude, longitude, timezone, elevation } =
      geoData.results[0];

    // === 2️⃣ Buscar dados climáticos (inclui previsão) ===
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${timezone}`
    );
    const weatherData = await weatherResponse.json();

    const { temperature, windspeed, weathercode } = weatherData.current_weather;

    // === 3️⃣ Tradução ===
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

    // === 4️⃣ Data e hora ===
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

    // === 5️⃣ Fundo dinâmico ===
    
	const hora = agora.getHours();
	const titulo = document.getElementById("titulo");
	
	let icone, texto = "Previsão do Tempo";

	if (hora >= 6 && hora < 12) {
		icone = "https://img.icons8.com/?size=50&id=648&format=png&color=FFFFFF"; // Sol da manhã
	} else if (hora >= 12 && hora < 18) {
		icone = "https://img.icons8.com/?size=100&id=SgirE9aEatqD&format=png&color=FFFFFF"; // Sol da tarde
	} else {
		icone = "https://img.icons8.com/?size=50&id=xlD3xOrQjTJO&format=png&color=FFFFFF"; // Lua / noite
	}

	// Atualiza o título com imagem + texto
	titulo.innerHTML = `<img src="${icone}" alt="icone" style="vertical-align: middle; width: 40px; height: 40px; margin-right: 10px;"> ${texto}`;
	

    // === 6️⃣ Montar previsão de 5 dias ===
    let previsaoHTML = "";
    if (weatherData.daily && weatherData.daily.time) {
      const dias = weatherData.daily.time;
      const tempMax = weatherData.daily.temperature_2m_max;
      const tempMin = weatherData.daily.temperature_2m_min;
      const codigos = weatherData.daily.weathercode;

      previsaoHTML = dias
        .slice(0, 5)
        .map((dia, i) => {
          const dataDia = new Date(dia);
          const dataFormatada = dataDia.toLocaleDateString("pt-BR", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit"
          });
          const icone =
            condicoes[codigos[i]]?.match(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu)?.[0] ||
            "🌤️";
          return `
            <div class="forecast-card">
              <p><strong>${dataFormatada}</strong></p>
              <p>${icone}</p>
              <p><strong>${tempMax[i]}° / ${tempMin[i]}°C</strong></p>
              <p>${condicoes[codigos[i]] || "—"}</p>
            </div>
          `;
        })
        .join("");
    }

    // === 7️⃣ Mostrar resultado com ACCORDION ===
    // === 7️⃣ Mostrar resultado com ACCORDION (formato de cards) ===
resultado.innerHTML = `
<div class="accordion">
    <button class="accordion-header">
        <div><img src="https://img.icons8.com/?size=100&id=2XXk4o30bTjl&format=png&color=FFFFFF" alt="icone" style="vertical-align: middle; width: 30px; height: 30px; margin-right: 10px;"> Clima Atual</div>
        <span class="accordion-arrow">▼</span>
    </button>
    <div class="accordion-content forecast-grid">
        <div class="forecast-card"><strong>Temperatura:</strong><br>${temperature}°C</div>
        <div class="forecast-card"><strong>Condição:</strong><br>${condicao}</div>
        <div class="forecast-card"><strong>Vento:</strong><br>${windspeed} km/h</div>
        <div class="forecast-card"><strong>Hora local:</strong><br>${horaFormatada}</div>
        <div class="forecast-card"><strong>Data:</strong><br>${dataFormatada}</div>
    </div>
</div>

<div class="accordion">
    <button class="accordion-header">
        <div><img src="https://img.icons8.com/?size=100&id=2436&format=png&color=FFFFFF" alt="icone" style="vertical-align: middle; width: 30px; height: 30px; margin-right: 10px;"> Localização</div>
        <span class="accordion-arrow">▼</span>
    </button>
    <div class="accordion-content forecast-grid">
        <div class="forecast-card"><strong>Local:</strong><br>${name}, ${country}</div>
        <div class="forecast-card"><strong>Latitude:</strong><br>${latitude.toFixed(2)}°</div>
        <div class="forecast-card"><strong>Longitude:</strong><br>${longitude.toFixed(2)}°</div>
        <div class="forecast-card"><strong>Elevação:</strong><br>${elevation} m</div>
        <div class="forecast-card"><strong>Fuso horário:</strong><br>${timezone}</div>
    </div>
</div>

<div class="accordion">
    <button class="accordion-header">
        <div><img src="https://img.icons8.com/?size=100&id=23&format=png&color=FFFFFF" alt="icone" style="vertical-align: middle; width: 30px; height: 30px; margin-right: 10px;"> Previsão de 5 dias</div>
        <span class="accordion-arrow">▼</span>
    </button>
    <div class="accordion-content" id="previsao-container">
        <div class="forecast-grid">${previsaoHTML}</div>
    </div>
</div>
`;



    // === 🎚️ Accordion funcional ===
    document.querySelectorAll(".accordion-header").forEach(header => {
      header.addEventListener("click", () => {
        const accordion = header.parentElement;
        const isActive = accordion.classList.contains("active");
        document
          .querySelectorAll(".accordion")
          .forEach(acc => acc.classList.remove("active"));
        if (!isActive) accordion.classList.add("active");
      });
    });

	// Abre automaticamente o primeiro accordion ao mostrar o resultado
	document.querySelector(".accordion")?.classList.add("active");

    // === 8️⃣ Mostrar mapa ===
    mapDiv.style.display = "block";
    if (!mapa) {
      mapa = L.map("map").setView([latitude, longitude], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(mapa);
      marcador = L.marker([latitude, longitude])
        .addTo(mapa)
        .bindPopup(`<strong>${name}</strong><br>${condicao}<br>${temperature}°C`)
        .openPopup();
    } else {
      mapa.setView([latitude, longitude], 10);
      marcador
        .setLatLng([latitude, longitude])
        .setPopupContent(
          `<strong>${name}</strong><br>${condicao}<br>${temperature}°C`
        )
        .openPopup();
    }
  } catch (erro) {
    resultado.innerHTML = "<p>Erro ao buscar dados do clima.</p>";
    console.error(erro);
  }
});

// 🔁 Botão "Nova busca"
toggleBusca.addEventListener("click", () => {
  resultado.innerHTML = "";
  document.querySelector(".search-box").style.display = "flex";
  toggleBusca.style.display = "none";
  mapDiv.style.display = "none";
});
