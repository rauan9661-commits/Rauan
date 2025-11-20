// Простейшая логика: рендер списка фильмов, поиск, модалка
document.addEventListener('DOMContentLoaded', () => {
  const moviesRoot = document.getElementById('movies');
  const searchInput = document.getElementById('search');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const toggleTheme = document.getElementById('toggleTheme');

  // Пример данных — добавьте свои фильмы/постеры
  const movies = [
    {
      id:1,
      title:'Ночное небо',
      year:2024,
      rating:7.9,
      genre:'Драма / Фантастика',
      desc:'Эмоциональная история о семье и космосе, с яркой визуальной эстетикой.',
      poster: 'https://static.hdrezka.ac/i/2022/5/2/zaa9fb3347084ki82w60c.png' // пример: локальный файл из контейнера
    },
    {
      id:2,
      title:'Операция: Феникс',
      year:2025,
      rating:8.3,
      genre:'Экшн / Триллер',
      desc:'Динамичный боевик о группе агентов, которые планируют невыполнимую операцию.',
      poster: 'https://www.kino-teatr.ru/movie/posters/big/5/8/159285.jpg' // пример: картинка по ссылке
    },
    {
      id:3,
      title:'Комедия на вырост',
      year:2023,
      rating:6.8,
      genre:'Комедия',
      desc:'Лёгкая семейная комедия с неожиданным финалом и добрыми героями.'
      // без poster — будет градиент
    },
    {
      id:4,
      title:'Тени города',
      year:2022,
      rating:7.5,
      genre:'Криминал / Драма',
      desc:'Глубокий криминальный триллер о решениях, которые меняют судьбы.'
    },
    {
      id:5,
      title:'Мелодия утра',
      year:2021,
      rating:7.1,
      genre:'Мюзикл / Романтика',
      desc:'История о музыке, вдохновении и первой любви.'
    }
  ];

  // Генератор "постера" — использует градиенты, чтобы не тянуть картинки
  function posterStyle(index){
    const palettes = [
      'linear-gradient(135deg,#ff7a7a,#ffb199)',
      'linear-gradient(135deg,#6a7cff,#a7b8ff)',
      'linear-gradient(135deg,#6ae0c3,#3ea78b)',
      'linear-gradient(135deg,#f5d56a,#ffb36b)',
      'linear-gradient(135deg,#b38cff,#6c5cff)'
    ];
    return palettes[index % palettes.length];
  }

  function renderList(filter = ''){
    moviesRoot.innerHTML = '';
    const q = filter.trim().toLowerCase();
    const filtered = movies.filter(m => {
      if(!q) return true;
      return m.title.toLowerCase().includes(q) ||
             (m.genre && m.genre.toLowerCase().includes(q)) ||
             String(m.year).includes(q);
    });
    if(filtered.length === 0){
      moviesRoot.innerHTML = '<p style="grid-column:1/-1;color:#6b7280">Фильмы не найдены.</p>';
      return;
    }
    filtered.forEach((m, i) => {
      const card = document.createElement('button');
      card.className = 'movie-card';
      card.setAttribute('aria-label', `${m.title}, ${m.genre || ''}, ${m.year}`);

      // если есть poster — используем его, иначе градиент
      const bg = m.poster
        ? `url('${encodeURI(m.poster)}') center/cover no-repeat`
        : posterStyle(i);

      card.innerHTML = `
        <div style="position:absolute;inset:0;filter:brightness(.9);background:${bg}"></div>
        <div class="movie-meta" style="position:relative">
          <h4 class="movie-title">${m.title}</h4>
          <div class="movie-sub">${m.genre || '—'} · ${m.year} · Рейтинг ${m.rating}</div>
        </div>
      `;
      // открытие модалки
      card.addEventListener('click', () => openModal(m, i));
      moviesRoot.appendChild(card);
    });
  }

  function openModal(movie, index){
    // если есть poster — использовать как фон, иначе градиент с текстом
    const posterHtml = movie.poster
      ? `<div class="poster" style="background:url('${encodeURI(movie.poster)}') center/cover no-repeat"></div>`
      : `<div class="poster" style="background:${posterStyle(index)}">${movie.title}</div>`;

    modalBody.innerHTML = `
      ${posterHtml}
      <div class="modal-info">
        <h3>${movie.title}</h3>
        <div class="meta-row">${movie.genre || '—'} • ${movie.year} • Рейтинг ${movie.rating}</div>
        <p>${movie.desc}</p>
        <div style="margin-top:12px">
          <button class="btn" onclick="alert('Билеты: демонстрация')">Купить билет</button>
          <button class="btn small" style="margin-left:8px" onclick="alert('Добавлено в избранное')">❤ В избранное</button>
        </div>
      </div>
    `;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  }

  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    modalBody.innerHTML = '';
  }

  // события
  searchInput.addEventListener('input', (e) => renderList(e.target.value));
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

  // keyboard accessibility: Esc закрывает модалку
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
  });

  // простая тема свет/тёмная
  toggleTheme.addEventListener('click', () => {
    const isDark = document.documentElement.style.getPropertyValue('--bg') === '#111';
    if(!isDark){
      document.documentElement.style.setProperty('--bg','#0b1020');
      document.documentElement.style.setProperty('--card','#071227');
      document.documentElement.style.setProperty('--muted','#9aa6bb');
      document.documentElement.style.setProperty('--glass','rgba(255,255,255,0.03)');
      document.documentElement.style.setProperty('--accent','#ff7a7a');
      toggleTheme.textContent = 'Светлая';
      document.body.style.color = '#e6eef8';
    } else {
      // сброс — можно перезагрузить страницу для полного возврата
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--muted');
      document.documentElement.style.removeProperty('--glass');
      document.documentElement.style.removeProperty('--accent');
      toggleTheme.textContent = 'Тёмная';
      document.body.style.color = '';
    }
  });

  // initial render
  renderList();
});
