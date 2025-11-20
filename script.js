// Данные фильмов
const movies = [
  {
    id: 1,
    title: "Ночное небо",
    year: 2024,
    rating: 7.9,
    genre: "Драма",
    desc: "Фильм о невероятных событиях.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ15Z1oXzJ_cs70IlOeNd5FHB1mvpgya4wIEg&s"  // ← ВОТ ССЫЛКА НА ФОТО
  },
  {
    id: 2,
    title: "Феникс",
    year: 2025,
    rating: 8.1,
    genre: "Экшн",
    desc: "Секретная операция.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU4CwpFGIvFUOPCY4vmNG6i7gGoLsCiPMRRQ&s"  // ← ТУТ ТОЖЕ ССЫЛКА
  }
];


// Генерация карточек
function renderMovies(list) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  list.forEach(m => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <div class="movie-image" style="
        background: url('${m.poster}') center/cover no-repeat;
      "></div>

      <div class="movie-info">
        <h4>${m.title}</h4>
        <p><strong>Год:</strong> ${m.year}</p>
        <p><strong>Жанр:</strong> ${m.genre}</p>
        <p><strong>Рейтинг:</strong> ${m.rating}</p>
        <button class="btn" onclick="openMovie(${m.id})">Подробнее</button>
      </div>
    `;

    container.appendChild(card);
  });
}

renderMovies(movies);

// Открытие модального окна
function openMovie(id) {
  const m = movies.find(x => x.id === id);
  document.getElementById("modalBody").innerHTML = `
    <h2>${m.title}</h2>
    <img src="${m.poster}" style="width:100%;border-radius:10px" />
    <p><strong>Год:</strong> ${m.year}</p>
    <p><strong>Жанр:</strong> ${m.genre}</p>
    <p><strong>Рейтинг:</strong> ${m.rating}</p>
    <p>${m.desc}</p>
  `;
  
  document.getElementById("modal").style.display = "flex";
}

document.getElementById("modalClose").onclick = () => {
  document.getElementById("modal").style.display = "none";
};
