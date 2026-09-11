/*
  СПИСОК АВТОМОБИЛЕЙ
  ===================
  Чтобы добавить, убрать или изменить машину — редактируй массив ниже.
  Каждая машина — это { } блок. Не забывай ставить запятую между блоками.

  Поля:
  photo  — имя файла фото из папки images/ (просто положи новое фото
           в папку images/ и укажи его имя здесь)
  make   — марка
  model  — модель
  year   — год
  mileage— пробег (в км, только число)
  price  — цена (в рублях, только число, без пробелов и "₽")
  trim   — комплектация / опции (короткая строка текстом)

  Порядок в списке = порядок на сайте.
*/

const CARS = [
  {
    photo: "images/g63-2026.jpg",
    make: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2026,
    mileage: 20,
    price: 30500000,
    trim: "Подвеска A22 / зимний пакет / внутренний карбон"
  },
  {
    photo: "images/g63-2025.jpg",
    make: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2025,
    mileage: 20,
    price: 29000000,
    trim: "Подвеска A22 / зимний пакет / внутренний карбон"
  },
  {
    photo: "images/x6-2025.jpg",
    make: "BMW",
    model: "X6 xDrive40i",
    year: 2025,
    mileage: 44000,
    price: 11000000,
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

function renderCars() {
  const grid = document.getElementById("listing-grid");
  if (!grid) return;
  grid.innerHTML = CARS.map((car, i) => `
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
          <span class="car-price">${formatPrice(car.price)}<span class="vat-note">без НДС</span></span>
          <a href="#contact" class="car-link" onclick="prefillCar('${car.make} ${car.model}, ${car.year}')">Подробнее →</a>
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
