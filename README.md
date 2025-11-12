# 🌤️ Previsão do Tempo

Aplicativo web simples, moderno e responsivo que exibe **condições climáticas em tempo real** e **previsão de 5 dias** com base no nome de uma cidade.  
Feito com **HTML, CSS e JavaScript puro**, usando a API gratuita da [Open-Meteo](https://open-meteo.com/) e o mapa interativo do [Leaflet](https://leafletjs.com/).

---

## 🚀 Demonstração

🔹 O usuário digita o nome da cidade.  
🔹 O app exibe:
- Temperatura, vento e condição atual ☀️  
- Localização e coordenadas 🌍  
- Previsão dos próximos 5 dias 📅  
- Um mapa interativo com marcador da cidade 🗺️  

O fundo muda suavemente de acordo com o **horário do dia**, e os ícones também! 🌞🌙

---

## 🧩 Estrutura do Projeto

📂 projeto-clima
├── index.html
├── 📂 assets
│ ├── 📂 css
│ │ └── style.css
│ └── 📂 js
│ └── script.js


---

## 💡 Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| 🌐 **HTML5** | Estrutura da aplicação |
| 🎨 **CSS3** | Estilo e layout responsivo |
| ⚙️ **JavaScript (ES6)** | Lógica de busca e interação |
| 🧭 **Leaflet.js** | Exibição do mapa interativo |
| ☁️ **Open-Meteo API** | Fonte dos dados climáticos |

---

## 🖥️ Como Executar o Projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/SEU_USUARIO/projeto-clima.git
   ```

2. **Acesse a pasta**
```bash
    cd projeto-clima
```

3. **Abra o arquivo HTML**
```bash
    Clique duas vezes em index.html
    ou
    Execute com um servidor local (VSCode Live Server, por exemplo)
```
🌈 Funcionalidades

✅ Busca de cidade com nome parcial ou completo
✅ Exibição de clima atual (temperatura, condição e vento)
✅ Previsão para 5 dias em formato de cards
✅ Mapa interativo com Leaflet
✅ Design adaptável e transições suaves
✅ Mudança automática de ícone conforme hora do dia
✅ Interface intuitiva com accordions coloridos

🧠 Lógica Principal

O app primeiro obtém as coordenadas da cidade via Geocoding API da Open-Meteo

Em seguida, consulta a previsão usando latitude, longitude e fuso horário

Os dados são formatados e exibidos em accordions interativos

A interface é atualizada dinamicamente, sem recarregar a página

🌎 APIs Utilizadas

Geocoding API: https://geocoding-api.open-meteo.com/v1/search

Forecast API: https://api.open-meteo.com/v1/forecast

🪄 Melhorias Futuras

✨ Adicionar detecção automática da localização do usuário
✨ Implementar ícones climáticos personalizados
✨ Adicionar histórico de cidades pesquisadas
✨ Criar modo claro/escuro automático

🧑‍💻 Autora

Ana Carolina Lemos
💼 Desenvolvedora Web | 🎓 UNICAMP
💻 Experiência em Python, Flask, Django e front-end
🌐 analemos.xyz/portfolio