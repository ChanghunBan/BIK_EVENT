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
const select = document.querySelector("#productSelect");
const consultationEmail = "double@bsco.co.kr";
const consultationPhone = "01055413307";
const isMobile = () => window.matchMedia("(max-width: 780px), (pointer: coarse)").matches;

function updateMessageLabels() {
  const mobile = isMobile();
  document.querySelector("#messageOptionTitle").textContent = mobile ? "문자 문의" : "이메일 문의";
  document.querySelector("#messageOptionText").textContent = mobile
    ? "작성 내용을 문자 메시지에 입력합니다"
    : "작성 내용을 이메일 초안에 입력합니다";
  document.querySelector("#messageTypeLabel").textContent = mobile ? "문자 문의" : "이메일 문의";
  document.querySelector("#messageTypeDescription").textContent = mobile
    ? "작성한 내용이 문자 앱에 자동으로 입력됩니다."
    : "작성한 내용이 이메일 앱에 자동으로 입력됩니다.";
  document.querySelector("#messageTypeNotice").textContent = mobile
    ? "작성 완료 후 문자 앱이 열립니다."
    : "작성 완료 후 이메일 앱이 열립니다.";
}

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
  const option = document.createElement("option");
  option.value = product.model;
  option.textContent = `${product.model} · ${product.name}`;
  select.append(option);
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
const form = document.querySelector("#consultForm");
const contactChoices = document.querySelector("#contactChoices");
const phonePanel = document.querySelector("#phonePanel");
const messageIntro = document.querySelector("#messageIntro");
let lastFocused = null;

function openModal(productModel = "") {
  updateMessageLabels();
  lastFocused = document.activeElement;
  if (productModel) select.value = productModel;
  showContactChoices();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => modal.querySelector("[data-call-modal]").focus(), 50);
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocused?.focus();
}

function showContactChoices() {
  contactChoices.hidden = false;
  phonePanel.hidden = true;
  messageIntro.hidden = true;
  form.hidden = true;
}

function showMessageForm() {
  contactChoices.hidden = true;
  phonePanel.hidden = true;
  messageIntro.hidden = false;
  form.hidden = false;
  setTimeout(() => form.querySelector('input[name="name"]').focus(), 30);
}

function callContact() {
  if (isMobile()) {
    window.location.href = `tel:${consultationPhone}`;
    return;
  }
  if (!modal.classList.contains("is-open")) openModal();
  contactChoices.hidden = true;
  phonePanel.hidden = false;
  messageIntro.hidden = true;
  form.hidden = true;
  setTimeout(() => modal.querySelector(".modal__close").focus(), 60);
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal());
});

document.querySelectorAll("[data-call-contact]").forEach((button) => button.addEventListener("click", callContact));
modal.querySelector("[data-call-modal]").addEventListener("click", callContact);
modal.querySelector("[data-message-modal]").addEventListener("click", showMessageForm);
modal.querySelectorAll("[data-back-choice]").forEach((button) => button.addEventListener("click", showContactChoices));

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (button) openModal(button.dataset.product);
});

document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const product = data.get("product") || "제품 추천 필요";
  const message = [
    "[보쉬코리아 임직원 행사 문의]",
    "",
    `이름: ${data.get("name")}`,
    `연락처: ${data.get("phone")}`,
    `관심 상품: ${product}`,
    "",
    `문의 내용: ${data.get("message") || "추가 문의 없음"}`,
    "",
    "개인정보 수집 및 상담 이용에 동의함"
  ].join("\n");

  if (isMobile()) {
    const separator = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "&" : "?";
    window.location.href = `sms:${consultationPhone}${separator}body=${encodeURIComponent(message)}`;
    return;
  }

  const subject = encodeURIComponent(`보쉬코리아 임직원 행사 문의 - ${data.get("name")}`);
  window.location.href = `mailto:${consultationEmail}?subject=${subject}&body=${encodeURIComponent(message)}`;
});

window.addEventListener("resize", updateMessageLabels);
updateMessageLabels();

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
