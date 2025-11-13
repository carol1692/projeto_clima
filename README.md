# 🌤️ Aplicativo de Previsão do Tempo

Um aplicativo web interativo desenvolvido em **HTML, CSS e JavaScript** que exibe a **previsão do tempo atual e dos próximos 5 dias** para qualquer cidade do mundo, utilizando dados da **API Open-Meteo**.  
O projeto também inclui um **mapa interativo** com marcador da localização pesquisada, além de **mudanças visuais dinâmicas** conforme o horário do dia (dia/noite).

---

## 🧭 Índice

- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
- [Exemplo de Uso](#exemplo-de-uso)
- [Tratamento de Erros](#tratamento-de-erros)
- [Possíveis Melhorias](#possíveis-melhorias)
- [Licença](#licença)
- [Autora](#autora)

---

## 🧩 Descrição

O **App de Previsão do Tempo** permite buscar dados meteorológicos de forma rápida, simples e visualmente agradável.  
Ele consome APIs públicas para obter **coordenadas geográficas** e **informações climáticas** de qualquer cidade, exibindo:

- Clima atual (temperatura, vento, umidade, condição);
- Localização detalhada (nome, país, coordenadas);
- Previsão para os próximos 5 dias;
- Fundo e ícones que mudam automaticamente conforme o horário local.

---

## ⚙️ Funcionalidades

✅ Busca de cidade e exibição do clima em tempo real  
✅ Previsão de 5 dias  
✅ Mapa interativo com marcador (Leaflet.js)  
✅ Mudança automática de tema (dia/noite)  
✅ Interface responsiva e intuitiva  
✅ Tratamento de erros e validação de entrada  
✅ Atualização sem recarregar a página  

---

## 🧰 Tecnologias Utilizadas

- **HTML5** — estrutura da aplicação  
- **CSS3** — estilização moderna e responsiva  
- **JavaScript (ES6)** — lógica principal e integração com APIs  
- **Leaflet.js** — mapa interativo  
- **Open-Meteo API** — dados meteorológicos  
- **Geocoding API (Open-Meteo)** — busca de coordenadas

---

## 🗂️ Estrutura do Projeto
```
projeto_clima
├─ assets
│  ├─ css
│  │  └─ style.css
│  ├─ img
│  └─ js
│     └─ script.js
├─ index.html
├─ package.json
├─ README.md
└─ tests
   └─ script.test.js

```

---

## 🚀 Instalação

1. **Clone este repositório:**
```bash
    git clone https://github.com/analemos/projeto-clima.git
```
2. **Acesse a pasta do projeto::**
```bash
    cd projeto-clima 
```   
3. **Abra o arquivo HTML**
```bash
    Clique duas vezes em index.html
    ou
    Execute com um servidor local (VSCode Live Server, por exemplo)
```
## ▶️ Como Executar

1.Abra o arquivo index.html no navegador.

2.Digite o nome de uma cidade no campo de busca.

3.Clique em Buscar ou pressione Enter.

4.Veja o resultado do clima atual, previsão de 5 dias e o mapa interativo.

5.Clique em Nova Busca para pesquisar outra cidade.

## 🧪 Exemplo de Uso

Exemplo:
Buscando por Campinas, o app exibirá:

-Temperatura atual e condição (☀️, 🌧️ etc.)

-Coordenadas e país

-Previsão detalhada para 5 dias

-Mapa com marcador da cidade

O fundo mudará para tons claros durante o dia e escuros à noite 🌙

## 🛠️ Tratamento de Erros

-O aplicativo lida com diversos cenários, como:

-Entrada vazia → mensagem de alerta ao usuário;

-Cidade não encontrada → aviso amigável e sem travar o app;

-Falhas de rede → exibição de erro genérico;

-Logs no console para depuração em modo desenvolvedor.

## 💡 Possíveis Melhorias
-Adicionar suporte a múltiplos idiomas
-Exibir ícones de condição meteorológica personalizados
-Permitir salvar cidades favoritas
-Implementar histórico de pesquisas
-Versão PWA (instalável no celular)

## 🪪 Licença

Este projeto está licenciado sob a licença MIT.
Consulte o arquivo LICENSE

## 👩‍💻 Autora

Ana Carolina Lemos
Desenvolvedora Web • UNICAMP 🎓
🌐 analemos.xyz/portfolio

