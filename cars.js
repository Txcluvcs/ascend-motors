/*
  СПИСОК АВТОМОБИЛЕЙ
  ===================
  Чтобы добавить, убрать или изменить машину — редактируй массив ниже.
  Каждая машина — это { } блок. Не забывай ставить запятую между блоками.

  Поля:
  photo     — имя файла фото из папки images/ (положи новое фото в
              images/ и укажи его имя здесь)
  make      — марка
  model     — модель
  year      — год
  mileage   — пробег (в км, только число)
  trim      — комплектация / опции (короткая строка текстом)

  ЦЕНА — есть два поля, заполняй то, что актуально для конкретной машины:
  priceNoVat — цена БЕЗ НДС (число, без пробелов и "₽")
  priceVat   — цена С НДС (число, без пробелов и "₽")

  Можно указать:
  - только priceNoVat — покажется одна строка "без НДС"
  - только priceVat   — покажется одна строка "с НДС"
  - обе сразу         — покажутся обе строки

  Порядок в списке = порядок на сайте.
*/

const CARS = [
  {
    photo: "images/gt63-2023.jpg",
    make: "Mercedes-Benz",
    model: "AMG GT 63",
    year: 2023,
    mileage: 1650,
    priceVat: 23300000,
    trim: "Внутренний и внешний карбон / активная выхлопная система / диски R21"
  },
  {
    photo: "images/g63-2025.jpg",
    make: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2025,
    mileage: 20,
    priceNoVat: 29000000,
    trim: "Подвеска A22 / зимний пакет / внутренний карбон"
  },
  {
    photo: "images/x6-2025.jpg",
    make: "BMW",
    model: "X6 xDrive40i",
    year: 2025,
    mileage: 44000,
    priceNoVat: 11000000,
    trim: "Панорамная крыша / музыкальная система Harman/Kardon"
  }
];

// --- ниже ничего трогать не нужно ---
function formatPrice(n) {
  return n.toLocaleString("ru-RU") + " ₽";
}
function formatKm(n) {
  return n.toLocaleString("ru-RU") + " км";
}

function renderPriceBlock(car) {
  if (car.priceNoVat && car.priceVat) {
    return `
      <span class="car-price">
        ${formatPrice(car.priceNoVat)}<span class="vat-note">без НДС</span>
      </span>
      <span class="car-price car-price-vat">
        ${formatPrice(car.priceVat)}<span class="vat-note">с НДС</span>
      </span>
    `;
  }
  if (car.priceVat) {
    return `<span class="car-price">${formatPrice(car.priceVat)}<span class="vat-note">с НДС</span></span>`;
  }
  return `<span class="car-price">${formatPrice(car.priceNoVat)}<span class="vat-note">без НДС</span></span>`;
}

function renderCars() {
  const grid = document.getElementById("listing-grid");
  if (!grid) return;
  grid.innerHTML = CARS.map((car) => `
    <div class="car-card">
      <div class="car-photo" style="background-image:url('${car.photo}')"><span class="tag">В наличии</span></div>
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
          <a href="#contact" class="car-link" onclick="prefillCar('${car.make} ${car.model}, ${car.year}')">Получить предложение →</a>
        </div>
      </div>
    </div>
  `).join("");
}

function prefillCar(label) {
  const field = document.getElementById("lead-car-query");
  if (field) field.value = label;
}

document.addEventListener("DOMContentLoaded", renderCars);
