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
  note  — короткая подпись результата сделки
*/

const CASES = [
  {
    photo: "images/case-g63-2026-1.jpg",
    make: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2026,
    note: "Экономия 500 000 ₽ от рыночной цены и полное сопровождение сделки"
  },
  {
    photo: "images/case-gls450-2026.jpg",
    make: "Mercedes-Benz",
    model: "GLS 450",
    year: 2026,
    note: "Нашли автомобиль под все параметры клиента и сэкономили 300 000 ₽"
  },
  {
    photo: "images/case-v300d-2026.jpg",
    make: "Mercedes-Benz",
    model: "V 300d",
    year: 2026,
    note: "Подобрали автомобиль по лучшей цене на рынке и оформили сделку в лизинг"
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
