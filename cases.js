/*
  КЕЙСЫ — «Автомобили, с которыми мы работали»
  ================================================
  Это НЕ витрина «Автомобили» (та живёт в cars.js и имеет цены).
  Кейсы — просто красивые примеры уровня твоих сделок: фото + марка +
  модель + год + короткая подпись. Без цены, без "в наличии".

  Чтобы добавить кейс:
  1. Положи фото в папку images/ (любое имя файла)
  2. Скопируй один блок { } ниже, вставь после последнего, поменяй данные

  Поля:
  photo — имя файла из папки images/
  make  — марка
  model — модель
  year  — год
  note  — короткая подпись (необязательно). Например: "Подбор и сделка
          за 6 дней" или "Клиент из Москвы" — что угодно короткое.
*/

const CASES = [
  {
    photo: "images/g63-2026.jpg",
    make: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2026,
    note: "Подбор и сопровождение сделки"
  },
  {
    photo: "images/g63-2025.jpg",
    make: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2025,
    note: "Проверка и сделка под ключ"
  },
  {
    photo: "images/x6-2025.jpg",
    make: "BMW",
    model: "X6 xDrive40i",
    year: 2025,
    note: "Подбор по параметрам клиента"
  }
];

// --- ниже ничего трогать не нужно ---
function renderCases() {
  const grid = document.getElementById("case-grid");
  if (!grid) return;
  grid.innerHTML = CASES.map((c) => `
    <div class="case-card">
      <div class="case-photo" style="background-image:url('${c.photo}')"></div>
      <div class="case-body">
        <div class="case-make">${c.make}</div>
        <h3>${c.model} · ${c.year}</h3>
        ${c.note ? `<div class="case-note">${c.note}</div>` : ""}
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderCases);
