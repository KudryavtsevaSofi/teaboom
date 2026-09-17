(function () {
  "use strict";

  const product = {
    id: 1,
    category: "Улун",
    title: "Ананасовый улун",
    description:
      "Состав: китайский бирюзовый чай, цукаты, натуральные ароматические масла. Светлый Фуцзяньский улун с ароматом ананаса. В сухом виде — красивый крупный лист изумрудного цвета, скруткой листа напоминающий Те Гуань Инь. В прогретой посуде аромат свежей, весенней зелени и спелого ананаса. Скрученный лист медленно раскрывается, отдавая весь свой аромат. Тем, кому пришёлся по вкусу этот чай, может также понравиться связанный чай «Ананасовый рай».",
    image:
      "https://media.teaboom.ru/images/e4bb1618-fb80-41e2-8758-86f884ce095d.jpg",
    packaging: [
      {
        id: "100",
        label: "100 г",
        sku: "01306",
        price: 326.4,
        oldPrice: 349.2,
        badge: "Скидка",
      },
      {
        id: "500",
        label: "500 г",
        sku: "01307",
        price: 1432,
        oldPrice: 1646,
        badge: "Скидка",
      },
      {
        id: "1000",
        label: "1000 г",
        sku: "01308",
        price: 2064,
        oldPrice: 2592,
        badge: "Скидка",
      },
      {
        id: "5000",
        label: "5000 г",
        sku: "01309",
        price: 6320,
        oldPrice: 8710,
        badge: "Скидка",
      },
    ],
    defaultPackagingId: "100",
  };

  // форматирование цены
  const formatPrice = (value) => value.toLocaleString("ru-RU") + " ₽";

  // DOM
  const els = {
    image: document.getElementById("product-image"),
    badge: document.getElementById("product-badge"),
    category: document.getElementById("product-category"),
    title: document.getElementById("product-title"),
    sku: document.getElementById("product-sku"),
    price: document.getElementById("product-price"),
    oldPrice: document.getElementById("product-old-price"),
    description: document.getElementById("product-description"),
    packagingList: document.getElementById("packaging-list"),
    addToCart: document.getElementById("add-to-cart"),
  };

  let selectedPackaging = null;

  // отрисовка статичных данных
  function renderStatic() {
    els.image.src = product.image;
    els.image.alt = product.title;
    els.category.textContent = product.category;
    els.title.textContent = product.title;
    els.description.textContent = product.description;
    document.title = product.title;
  }

  // отрисовка списка фасовок
  function renderPackaging() {
    els.packagingList.innerHTML = "";

    product.packaging.forEach((pack) => {
      const wrap = document.createElement("label");
      wrap.className = "packaging-option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "packaging";
      input.value = pack.id;
      input.checked = pack.id === product.defaultPackagingId;
      input.setAttribute("aria-label", `Фасовка ${pack.label}`);

      input.addEventListener("change", () => selectPackaging(pack.id));

      const label = document.createElement("span");
      label.className = "packaging-option__label";
      label.textContent = pack.label;

      wrap.append(input, label);
      els.packagingList.appendChild(wrap);
    });
  }

  // переключение фасовки
  function selectPackaging(id) {
    const pack = product.packaging.find((p) => p.id === id);
    if (!pack) return;

    selectedPackaging = pack;

    els.sku.textContent = pack.sku;

    els.price.textContent = formatPrice(pack.price);

    if (pack.oldPrice && pack.oldPrice > pack.price) {
      els.oldPrice.textContent = formatPrice(pack.oldPrice);
      els.oldPrice.hidden = false;
    } else {
      els.oldPrice.hidden = true;
    }

    if (pack.badge) {
      els.badge.textContent = pack.badge;
      els.badge.hidden = false;
    } else {
      els.badge.hidden = true;
    }
  }

  // добавление в корзину
  function handleAddToCart() {
    if (!selectedPackaging) return;

    // имитация отправки данных на бэк:
    const payload = {
      productId: product.id,
      title: product.title,
      packaging: selectedPackaging.label,
      sku: selectedPackaging.sku,
      price: selectedPackaging.price,
      quantity: 1,
    };

    console.log("Добавлено в корзину:", payload);

    const original = els.addToCart.textContent;
    els.addToCart.textContent = "Добавлено";
    els.addToCart.disabled = true;

    setTimeout(() => {
      els.addToCart.textContent = original;
      els.addToCart.disabled = false;
    }, 1200);
  }

  // инициализация
  function init() {
    renderStatic();
    renderPackaging();
    selectPackaging(product.defaultPackagingId);
    els.addToCart.addEventListener("click", handleAddToCart);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
