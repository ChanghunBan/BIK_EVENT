const products = [
  { name: "후드 인덕션", model: "PXX895D66E", category: "hood", image: "assets/image1.png", retail: 6831000, price: 3300000, description: "후드 + 인덕션 4구", spec: "750 × 490 × 223 mm", badge: "BEST", detailUrl: "https://www.bosch-home.com.sg/en/product/cooking-baking/induction-and-electro-hobs/induction-hobs/PXX895D66E?srsltid=AYCX9vJlW4DMxExUYyzKEQGhZLryE1YrV_2kuY4wR1UjFmiOHxsyT-uh" },
  { name: "인덕션", model: "PXE675DC5K", category: "induction", image: "assets/image5.png", retail: 2706000, price: 770000, description: "플렉스존 + 십자 2구", spec: "560 × 490 × 51 mm", badge: "HOT DEAL", detailUrl: "https://brand.naver.com/bosch/products/11961053810" },
  { name: "인덕션", model: "PXX675DC5K", category: "induction", image: "assets/image6.png", retail: 2585000, price: 770000, description: "2구 플렉스존", spec: "560 × 490 × 51 mm", badge: "HOT DEAL", detailUrl: "https://brand.naver.com/bosch/products/11960820835" },
  { name: "인덕션", model: "PIJ61KBB6K", category: "induction", image: "assets/image7.png", retail: 2123000, price: 660000, description: "십자 3구 · 블랙", spec: "560 × 490 × 51 mm", badge: "SPECIAL", detailUrl: "https://brand.naver.com/bosch/products/11960741909" },
  { name: "인덕션", model: "PIJ611BB5K", category: "induction", image: "assets/image8.png", retail: 1859000, price: 605000, description: "십자 3구 · 블랙", spec: "560 × 490 × 51 mm", badge: "SPECIAL", detailUrl: "https://brand.naver.com/bosch/products/11956597547" },
  { name: "인덕션", model: "PIJ633FB5K", category: "induction", image: "assets/image9.png", retail: 2508000, price: 715000, description: "십자 3구 · 연그레이", spec: "560 × 490 × 51 mm", badge: "NEW", detailUrl: "https://brand.naver.com/bosch/search?q=PIJ633FB5K" },
  { name: "빌트인 식기세척기", model: "SMV4HCX48E", category: "dishwasher", image: "assets/image2.png", retail: 2442000, price: 495000, description: "빌트인 가구도어 부착 · 손잡이 필요", spec: "600 × 550 × 820~850 mm", badge: "BEST", detailUrl: "https://brand.naver.com/bosch/products/11951508694" },
  { name: "프리스탠딩 식기세척기", model: "SMS46FI01E", category: "dishwasher", image: "assets/image3.png", retail: 1892000, price: 385000, description: "프리스탠딩 · 실버", spec: "600 × 600 × 820~850 mm", badge: "SPECIAL", detailUrl: "https://brand.naver.com/bosch/products/11952339502" },
  { name: "프리스탠딩 식기세척기", model: "SMS6MI04E", category: "dishwasher", image: "assets/image4.png", retail: 3223000, price: 550000, description: "제올라이트 건조 · 실버", spec: "600 × 600 × 820~850 mm", badge: "HOT DEAL", detailUrl: "https://www.ssg.com/item/itemView.ssg?itemId=1000736362294&siteNo=6009&salestrNo=1004&ckwhere=ssg_danawa&appPopYn=n&utm_medium=PCS&utm_source=danawa&utm_campaign=danawa_pcs&service_id=elecdn" }
];

const currency = new Intl.NumberFormat("ko-KR");
const grid = document.querySelector("#productGrid");
const count = document.querySelector("#productCount");

function discountPercent(product) {
  return Math.round(((product.retail - product.price) / product.retail) * 100);
}

function productCard(product) {
  const article = document.createElement("article");
  article.className = "product-card reveal";
  article.dataset.category = product.category;
  article.innerHTML = `
    <div class="product-card__media">
      <span class="product-card__badge">${product.badge}</span>
      <img src="${product.image}" alt="보쉬 ${product.name} ${product.model}" loading="lazy" />
    </div>
    <div class="product-card__body">
      <span class="product-card__category">Bosch · ${product.category === "dishwasher" ? "Dishwasher" : "Induction"}</span>
      <h3>${product.name}</h3>
      <div class="product-card__model">${product.model}</div>
      <p class="product-card__specs">${product.description}<br>${product.spec}</p>
      <div class="product-card__pricing">
        <div>
          <span class="price-original">${currency.format(product.retail)}원</span>
          <strong class="price-current">${currency.format(product.price)}<small>원</small></strong>
        </div>
        <span class="discount">${discountPercent(product)}% OFF</span>
      </div>
      <div class="product-card__actions">
        <a class="product-detail-link" href="${product.detailUrl}" target="_blank" rel="noopener noreferrer" aria-label="${product.model} 상세 정보 새 창에서 보기">
          <span class="detail-label-full">상세 정보 보기</span><span class="detail-label-short">상세 정보</span> <span aria-hidden="true">↗</span>
        </a>
        <button type="button" data-product="${product.model}">구매 문의</button>
      </div>
    </div>`;
  return article;
}

products.forEach((product) => {
  grid.append(productCard(product));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.is-active")?.classList.remove("is-active");
    button.classList.add("is-active");
    const filter = button.dataset.filter;
    let visible = 0;
    document.querySelectorAll(".product-card").forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = visible;
  });
});

const modal = document.querySelector("#consultModal");
let lastFocused = null;

function openModal(productModel = "") {
  lastFocused = document.activeElement;
  const message = document.querySelector("#kakaoProductMessage");
  message.textContent = productModel
    ? `${productModel} 모델을 문의하실 수 있습니다. 카카오톡에서 해당 모델명과 함께 문의해 주세요.`
    : "모바일에서는 채팅으로 바로 연결되고, PC에서는 QR 코드로 간편하게 입장할 수 있습니다.";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => modal.querySelector(".kakao-button").focus(), 50);
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocused?.focus();
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal());
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (button) openModal(button.dataset.product);
});

document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#mainNav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});
