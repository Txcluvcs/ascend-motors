/*
  СПИСОК АВТОМОБИЛЕЙ
  ===================
  Чтобы добавить, убрать или изменить машину — редактируй массив ниже.
  Каждая машина — это { } блок. Не забывай ставить запятую между блоками.

  Поля:
  id        — короткий код машины латиницей, без пробелов (например "g63-2026").
              Он используется в ссылке на страницу машины: car.html?id=g63-2026
              Меняешь id у существующей машины — старая ссылка на неё перестанет
              работать, так что лучше просто не трогай id уже опубликованных машин.
  photos    — СПИСОК фото (от 1 до 5), имена файлов из папки images/.
              Первое фото в списке — обложка карточки. Остальные — галерея
              на странице машины.
  make      — марка
  model     — модель
  year      — год
  mileage   — пробег (в км, только число)
  trim      — комплектация / опции (короткая строка текстом)
  description — более длинное описание для страницы машины (необязательно).
              Можно оставить пустой строкой "" — тогда блок описания на
              странице просто не покажется.

  ЦЕНА — есть два поля, заполняй то, что актуально для конкретной машины:
  priceNoVat — цена БЕЗ НДС (число, без пробелов и "₽")
  priceVat   — цена С НДС (число, без пробелов и "₽")

  Можно указать:
  - только priceNoVat — покажется одна строка "без НДС"
  - только priceVat   — покажется одна строка "с НДС"
  - обе сразу         — покажутся обе строки

  Порядок в списке = порядок на сайте (и на главной, и в каталоге).
  На главной странице (тизер) показываются первые 3 машины из списка.
*/

const CARS = [
  {
    id: "gt63-2023",
    photos: ["images/AMGGT1.jpg", "images/AMGGT2.jpg", "images/AMGGT3.jpg", "images/AMGGT4.jpg", "images/AMGGT5.jpg"],
    make: "Mercedes-Benz",
    model: "AMG GT 63",
    year: 2023,
    mileage: 1650,
    priceVat: 23300000, // ЗАПОЛНИ ЦЕНУ — пока не указана
    trim: "Внутренний и внешний карбон / активная выхлопная система / диски R21",
    description: "Mercedes-AMG GT 63 в отличном состоянии, пробег всего 1650 км. Полный карбоновый обвес — внутренний и внешний, активная выхлопная система, диски R21. Автомобиль проверен, готов к сделке."
  },
  {
    id: "g63-2025",
    photos: ["images/g63-2025.jpg"],
    make: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2025,
    mileage: 20,
    priceNoVat: 29000000,
    trim: "Подвеска A22 / зимний пакет / внутренний карбон",
    description: "Mercedes-Benz G 63 AMG 2025 года, практически новый — пробег 20 км. Подвеска A22, зимний пакет, внутренний карбон."
  },
  {
    id: "x6-2025",
    photos: ["images/x6-2025.jpg"],
    make: "BMW",
    model: "X6 xDrive40i",
    year: 2025,
    mileage: 44000,
    priceNoVat: 11000000,
    trim: "Панорамная крыша / музыкальная система Harman/Kardon",
    description: "BMW X6 xDrive40i — панорамная крыша, аудиосистема Harman/Kardon. Автомобиль проверен и готов к передаче."
  }
];

// --- ниже ничего трогать не нужно ---
function formatPrice(n) {
  return n.toLocaleString("ru-RU") + " ₽";
}
function formatKm(n) {
  return n.toLocaleString("ru-RU") + " км";
}

function renderPriceBlock(car, priceClass) {
  const cls = priceClass || "car-price";
  if (car.priceNoVat && car.priceVat) {
    return `
      <span class="${cls}">
        ${formatPrice(car.priceNoVat)}<span class="vat-note">без НДС</span>
      </span>
      <span class="${cls}">
        ${formatPrice(car.priceVat)}<span class="vat-note">с НДС</span>
      </span>
    `;
  }
  if (car.priceVat) {
    return `<span class="${cls}">${formatPrice(car.priceVat)}<span class="vat-note">с НДС</span></span>`;
  }
  return `<span class="${cls}">${formatPrice(car.priceNoVat)}<span class="vat-note">без НДС</span></span>`;
}

function carCardHtml(car) {
  const cover = car.photos && car.photos[0] ? car.photos[0] : "";
  return `
    <a class="car-card" href="car.html?id=${encodeURIComponent(car.id)}">
      <div class="car-photo" style="background-image:url('${cover}')"><span class="tag">В наличии</span></div>
      <div class="car-body">
        <div class="make">${car.make}</div>
        <h3>${car.model}</h3>
        <div class="car-specs">
          <span><b>${car.year}</b> год</span>
          <span><b>${formatKm(car.mileage)}</b></span>
        </div>
        ${car.trim ? `<div class="car-trim">${car.trim}</div>` : ""}
        <div class="car-meta">
          <div class="car-price-group">${renderPriceBlock(car)}</div>
          <span class="car-link">Подробнее →</span>
        </div>
      </div>
    </a>
  `;
}

// Тизер на главной странице — первые 3 машины
function renderCars() {
  const grid = document.getElementById("listing-grid");
  if (!grid) return;
  grid.innerHTML = CARS.slice(0, 3).map(carCardHtml).join("");
}

// Полный каталог — все машины
function renderCatalog() {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;
  if (CARS.length === 0) {
    grid.innerHTML = `<p class="catalog-empty">Сейчас нет опубликованных автомобилей — напишите нам, подберём под запрос.</p>`;
    return;
  }
  grid.innerHTML = CARS.map(carCardHtml).join("");
}

// Страница одной машины — читает ?id=... из адреса
function renderCarDetail() {
  const root = document.getElementById("car-detail-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const car = CARS.find((c) => c.id === id);

  if (!car) {
    root.innerHTML = `
      <div class="car-not-found">
        <h1>Автомобиль не найден</h1>
        <p>Возможно, он уже продан, либо ссылка устарела.</p>
        <a href="catalog.html" class="btn btn-primary">Смотреть каталог</a>
      </div>
    `;
    document.title = "Автомобиль не найден — Ascend Motors";
    return;
  }

  document.title = `${car.make} ${car.model}, ${car.year} — Ascend Motors`;

  const photos = car.photos && car.photos.length ? car.photos : [""];
  const thumbs = photos.map((p, i) => `
    <button type="button" class="${i === 0 ? "active" : ""}" style="background-image:url('${p}')" onclick="setCarPhoto(${i})"></button>
  `).join("");

  root.innerHTML = `
    <div class="car-breadcrumb"><a href="javascript:void(0)" onclick="goBack()">← Назад</a></div>
    <div class="car-gallery">
      <div class="car-gallery-main" id="car-gallery-main" style="background-image:url('${photos[0]}')"></div>
      ${photos.length > 1 ? `<div class="car-gallery-thumbs">${thumbs}</div>` : ""}
    </div>
    <div class="car-detail-head">
      <div>
        <div class="make">${car.make}</div>
        <h1>${car.model}</h1>
      </div>
      <div class="car-detail-price-group">${renderPriceBlock(car, "car-detail-price")}</div>
    </div>
    <div class="car-detail-specs">
      <div><div class="spec-label">Год</div><div class="spec-value">${car.year}</div></div>
      <div><div class="spec-label">Пробег</div><div class="spec-value">${formatKm(car.mileage)}</div></div>
    </div>
    ${car.description ? `<div class="car-detail-description">${car.description}</div>` : ""}
    <div class="car-detail-cta">
      <p>Заинтересовал этот автомобиль? Оставьте контакт — свяжемся и обсудим детали.</p>
      <a href="index.html#contact" class="btn btn-primary" onclick="sessionStorage.setItem('prefillCar','${car.make} ${car.model}, ${car.year}')">Получить предложение</a>
    </div>
  `;

  window._carPhotos = photos;
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "catalog.html";
  }
}

function setCarPhoto(i) {
  const main = document.getElementById("car-gallery-main");
  if (!main || !window._carPhotos) return;
  main.style.backgroundImage = `url('${window._carPhotos[i]}')`;
  document.querySelectorAll(".car-gallery-thumbs button").forEach((b, idx) => {
    b.classList.toggle("active", idx === i);
  });
}

function prefillCar(label) {
  const field = document.getElementById("lead-car-query");
  if (field) field.value = label;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCars();
  renderCatalog();
  renderCarDetail();

  // Если пришли со страницы машины (car.html) — подставляем её в форму
  const stored = sessionStorage.getItem("prefillCar");
  if (stored) {
    prefillCar(stored);
    sessionStorage.removeItem("prefillCar");
  }
});
