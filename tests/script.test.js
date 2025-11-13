// Usando CommonJS: simples e compatível
const fetchMock = require("jest-fetch-mock");

beforeAll(() => {
  // Ativa o mock do fetch global
  fetchMock.enableMocks();
});

beforeEach(() => {
  // Limpa os mocks antes de cada teste
  fetch.resetMocks();
});

// --- Teste 1: cidade válida ---
test("Deve buscar dados de clima para uma cidade válida", async () => {
  const geoResponse = {
    results: [
      { name: "São Paulo", country: "Brasil", latitude: -23.55, longitude: -46.63 }
    ]
  };

  const weatherResponse = {
    current_weather: { temperature: 25, windspeed: 12, weathercode: 1 }
  };

  // Mock das requisições à API
  fetch
    .mockResponseOnce(JSON.stringify(geoResponse))    // geocoding
    .mockResponseOnce(JSON.stringify(weatherResponse)); // clima

  const geo = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=São%20Paulo");
  const geoData = await geo.json();
  expect(geoData.results[0].name).toBe("São Paulo");

  const weather = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63");
  const weatherData = await weather.json();
  expect(weatherData.current_weather.temperature).toBe(25);
});

// --- Teste 2: cidade inválida ---
test("Deve lidar com nome de cidade inválido", async () => {
  const geoResponse = { results: [] };
  fetch.mockResponseOnce(JSON.stringify(geoResponse));

  const geo = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=abcxyz");
  const data = await geo.json();

  expect(data.results.length).toBe(0);
});

// --- Teste 3: erro de rede ---
test("Deve lidar com erro de rede", async () => {
  fetch.mockRejectOnce(new Error("Erro de conexão"));

  await expect(fetch("https://geocoding-api.open-meteo.com/v1/search?name=Paris"))
    .rejects.toThrow("Erro de conexão");
});

// --- Teste 4: falha da API (resposta 500) ---
test("Deve lidar com falha da API (erro HTTP 500)", async () => {
  // Mock de resposta com erro HTTP
  fetch.mockResponseOnce("Erro interno do servidor", { status: 500, statusText: "Internal Server Error" });

  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63");

  // Verifica que a resposta foi feita, mas contém erro
  expect(response.ok).toBe(false);
  expect(response.status).toBe(500);
  expect(response.statusText).toBe("Internal Server Error");

  // Se tentar chamar .json(), deve falhar
  await expect(response.json()).rejects.toThrow();
});