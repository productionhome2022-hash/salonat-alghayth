const STORAGE_KEY = "ghayth-platform-data";

const defaultData = {
  siteName: "صالونات الغيث",
  heroTitle: "تجربة فاخرة لتصميم المفروشات والديكور",
  heroText:
    "نُصنع لهجات أنيقة، لمساحات مميزة، وأعمال فنية تضفي على كل مساحة طابعًا خاصًا يجمع بين الراحة والهوية البصرية.",
  logoUrl: "assets/logo.svg",
  heroImage:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  backgroundUrl:
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
  featuredProducts: [
    {
      id: crypto.randomUUID(),
      name: "أريكة لولو",
      category: "أرائك فاخره",
      price: "٣٬٨٠٠ ر.س",
      description: "أريكة أنيقة بتفاصيل خشبية مميزة وتصميم كلاسيكي مع لمسة عصرية.",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: crypto.randomUUID(),
      name: "مجموعة شرفة فاخرة",
      category: "ديكور داخلي",
      price: "٤٬٩٠٠ ر.س",
      description: "جلسة خارجية مريحة مناسبة للمتاحف والفلل بتفاصيل مميزة.",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: crypto.randomUUID(),
      name: "طاولة مركزية بارتيل",
      category: "أثاث متوسط",
      price: "٢٬٤٠٠ ر.س",
      description: "طاولة مركزية بإطارات معدنية أنيقة مع تشطيب فاخر يعكس ذوق المكان.",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80"
    }
  ],
  gallery: [
    {
      id: crypto.randomUUID(),
      title: "استوديو الريفان",
      type: "ديكور داخلي",
      description: "تصميم فاخر يجمع بين الألوان الدافئة والأقمشة ذات الجودة العالية.",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: crypto.randomUUID(),
      title: "جدار البارز",
      type: "أعمال فنية",
      description: "تجربة فنية للديكور الجدراني بأسلوب باهت مع لمسات ذهبية.",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: crypto.randomUUID(),
      title: "قاعة الضيافة",
      type: "تصميم تجميلي",
      description: "تجهيزات ضيافة أنيقة تحمل إحساس الهدوء والراحة للمستخدم.",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    }
  ],
  videos: [
    {
      id: crypto.randomUUID(),
      title: "عرض فاخر للأجواء الداخلية",
      description: "مقاطع سينمائية تعكس جودة التصاميم واللمسات الفاخرة.",
      url: "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080.mp4"
    },
    {
      id: crypto.randomUUID(),
      title: "مفروشات عصرية",
      description: "عرض يبرز تفاصيل الأثاث والكراسي المصممة بتوازن فني متكامل.",
      url: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080.mp4"
    },
    {
      id: crypto.randomUUID(),
      title: "أماكن الاستقبال",
      description: "أجواء ضيافة مميزة تعطي إحساساً فاخرًا ومريحًا للزائر.",
      url: "https://videos.pexels.com/video-files/2674395/2674395-hd_1920_1080.mp4"
    }
  ],
  messages: [
    {
      id: crypto.randomUUID(),
      sender: "admin",
      text: "مرحباً! كيف يمكننا مساعدتك اليوم؟"
    }
  ]
};

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultData),
      ...parsed,
      featuredProducts: parsed.featuredProducts || defaultData.featuredProducts,
      gallery: parsed.gallery || defaultData.gallery,
      videos: parsed.videos || defaultData.videos,
      messages: parsed.messages || defaultData.messages
    };
  } catch (_error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function setFilePreview(input, target, placeholder = "") {
  const file = input.files && input.files[0];
  if (!file) {
    if (placeholder) {
      target.src = placeholder;
    }
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    target.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function renderFeaturedProducts() {
  const root = document.getElementById("featured-products");
  if (!root) return;

  const { featuredProducts } = loadData();

  root.innerHTML = featuredProducts
    .map(
      (product) => `
        <article class="product-card reveal">
          <img src="${product.image}" alt="${product.name}" />
          <div class="content">
            <div class="product-meta">
              <strong>${product.name}</strong>
              <span>${product.price}</span>
            </div>
            <h3>${product.category}</h3>
            <p>${product.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderGallery() {
  const root = document.getElementById("gallery-items");
  if (!root) return;

  const { gallery } = loadData();

  root.innerHTML = gallery
    .map(
      (item) => `
        <article class="gallery-item reveal">
          <img src="${item.image}" alt="${item.title}" />
          <div class="content">
            <h3>${item.title}</h3>
            <p>${item.type}</p>
            <p>${item.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderVideos() {
  const root = document.getElementById("video-items");
  if (!root) return;

  const { videos } = loadData();

  root.innerHTML = videos
    .map(
      (video) => `
        <article class="video-card reveal">
          <video controls muted playsinline preload="metadata">
            <source src="${video.url}" type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديوهات.
          </video>
          <div class="content">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function applySiteSettings() {
  const data = loadData();
  const siteName = document.querySelector(".brand strong");
  const footerText = document.querySelector(".site-footer p");
  const heroTitle = document.querySelector(".hero-copy h1");
  const heroLead = document.querySelector(".hero-copy .lead");
  const heroBackground = document.querySelector(".cinematic-bg");
  const logo = document.querySelector(".brand img");
  const footerLogo = document.querySelector(".footer-logo");

  if (siteName) siteName.textContent = data.siteName || "صالونات الغيث";
  if (footerText) footerText.textContent = `${data.siteName || "صالونات الغيث"} للمفروشات والأعمال الفنية.`;
  if (heroTitle) heroTitle.textContent = data.heroTitle || "تجربة فاخرة لتصميم المفروشات والديكور";
  if (heroLead) heroLead.textContent = data.heroText || defaultData.heroText;
  if (heroBackground) heroBackground.style.background = `url("${data.backgroundUrl || defaultData.backgroundUrl}") center/cover no-repeat`;
  if (logo) logo.src = data.logoUrl || "assets/logo.svg";
  if (footerLogo) footerLogo.src = data.logoUrl || "assets/logo.svg";
  document.title = data.siteName || "صالونات الغيث";
}

function renderChatMessages() {
  const panel = document.getElementById("chatMessages");
  if (!panel) return;

  const { messages } = loadData();
  panel.innerHTML = messages
    .map(
      (msg) => `
        <div class="chat-bubble ${msg.sender === "admin" ? "admin" : "user"}">
          ${msg.text}
        </div>
      `
    )
    .join("");

  panel.scrollTop = panel.scrollHeight;
}

function initChat() {
  const toggle = document.getElementById("chatToggle");
  const panel = document.getElementById("chatPanel");
  const closeChat = document.getElementById("closeChat");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");

  if (!toggle || !panel || !form || !input) return;

  toggle.addEventListener("click", () => panel.classList.toggle("open"));
  closeChat.addEventListener("click", () => panel.classList.remove("open"));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const data = loadData();
    data.messages.push({ id: crypto.randomUUID(), sender: "user", text });
    data.messages.push({
      id: crypto.randomUUID(),
      sender: "admin",
      text: "تم استلام رسالتك، وسيتم التواصل مع الإدارة في أقرب وقت ممكن."
    });
    saveData(data);
    renderChatMessages();
    input.value = "";
    panel.classList.add("open");
  });

  renderChatMessages();
}

function updateAdminList() {
  const productRoot = document.getElementById("productList");
  const galleryRoot = document.getElementById("galleryList");
  const videoRoot = document.getElementById("videoList");
  const backgroundGrid = document.getElementById("backgroundGrid");

  if (!productRoot || !galleryRoot || !videoRoot || !backgroundGrid) return;

  const data = loadData();

  productRoot.innerHTML = data.featuredProducts
    .map(
      (item) => `
        <div class="list-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h4>${item.name}</h4>
            <p>${item.category} • ${item.price}</p>
            <p>${item.description}</p>
          </div>
          <button class="remove-btn" data-type="product" data-id="${item.id}">حذف</button>
        </div>
      `
    )
    .join("");

  galleryRoot.innerHTML = data.gallery
    .map(
      (item) => `
        <div class="list-item">
          <img src="${item.image}" alt="${item.title}" />
          <div>
            <h4>${item.title}</h4>
            <p>${item.type}</p>
            <p>${item.description}</p>
          </div>
          <button class="remove-btn" data-type="gallery" data-id="${item.id}">حذف</button>
        </div>
      `
    )
    .join("");

  videoRoot.innerHTML = data.videos
    .map(
      (item) => `
        <div class="list-item">
          <video controls muted playsinline width="110" height="110">
            <source src="${item.url}" type="video/mp4" />
          </video>
          <div>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
          <button class="remove-btn" data-type="video" data-id="${item.id}">حذف</button>
        </div>
      `
    )
    .join("");

  backgroundGrid.innerHTML = [
    data.backgroundUrl || defaultData.backgroundUrl,
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  ]
    .map(
      (url, index) => `
        <div class="background-item">
          <img src="${url}" alt="خلفية ${index + 1}" />
          <button type="button" data-bg="${url}">تثبيت كخلفية</button>
        </div>
      `
    )
    .join("");

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const { type, id } = button.dataset;
      const data = loadData();
      if (type === "product") data.featuredProducts = data.featuredProducts.filter((item) => item.id !== id);
      if (type === "gallery") data.gallery = data.gallery.filter((item) => item.id !== id);
      if (type === "video") data.videos = data.videos.filter((item) => item.id !== id);
      saveData(data);
      updateAdminList();
      renderFeaturedProducts();
      renderGallery();
      renderVideos();
      applySiteSettings();
    });
  });

  document.querySelectorAll("[data-bg]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.bg;
      const data = loadData();
      data.backgroundUrl = selected;
      saveData(data);
      applySiteSettings();
      updateAdminList();
    });
  });
}

function initAdminPage() {
  const siteNameInput = document.getElementById("siteNameInput");
  const heroTitleInput = document.getElementById("heroTitleInput");
  const heroTextInput = document.getElementById("heroTextInput");
  const logoInput = document.getElementById("logoInput");
  const heroImageInput = document.getElementById("heroImageInput");
  const backgroundInput = document.getElementById("backgroundInput");
  const saveSiteSettingsBtn = document.getElementById("saveSiteSettingsBtn");
  if (!siteNameInput || !saveSiteSettingsBtn) return;

  const data = loadData();
  siteNameInput.value = data.siteName || "صالونات الغيث";
  heroTitleInput.value = data.heroTitle || defaultData.heroTitle;
  heroTextInput.value = data.heroText || defaultData.heroText;

  const logoPreview = document.getElementById("logoPreview");
  const heroPreview = document.getElementById("heroPreview");
  logoPreview.src = data.logoUrl || "assets/logo.svg";
  heroPreview.src = data.heroImage || defaultData.heroImage;

  logoInput.addEventListener("change", () => setFilePreview(logoInput, logoPreview));
  heroImageInput.addEventListener("change", () => setFilePreview(heroImageInput, heroPreview));
  backgroundInput.addEventListener("change", () => {
    const input = backgroundInput;
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = loadData();
      data.backgroundUrl = event.target.result;
      saveData(data);
      updateAdminList();
      applySiteSettings();
    };
    reader.readAsDataURL(file);
  });

  saveSiteSettingsBtn.addEventListener("click", () => {
    const current = loadData();
    current.siteName = siteNameInput.value || "صالونات الغيث";
    current.heroTitle = heroTitleInput.value || defaultData.heroTitle;
    current.heroText = heroTextInput.value || defaultData.heroText;

    const logoPreviewSrc = logoPreview.src || "assets/logo.svg";
    const heroPreviewSrc = heroPreview.src || defaultData.heroImage;
    current.logoUrl = logoPreviewSrc;
    current.heroImage = heroPreviewSrc;

    saveData(current);
    applySiteSettings();
    updateAdminList();
    alert("تم حفظ إعدادات الموقع بنجاح.");
  });

  const productForm = document.getElementById("productForm");
  productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const current = loadData();
    const productName = document.getElementById("productName").value.trim();
    const productCategory = document.getElementById("productCategory").value.trim();
    const productPrice = document.getElementById("productPrice").value.trim();
    const productDescription = document.getElementById("productDescription").value.trim();
    const productImageInput = document.getElementById("productImage");

    let imageUrl = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80";
    if (productImageInput.files && productImageInput.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (result) => {
        imageUrl = result.target.result;
        pushProduct(current, productName, productCategory, productPrice, productDescription, imageUrl);
      };
      fileReader.readAsDataURL(productImageInput.files[0]);
    } else {
      pushProduct(current, productName, productCategory, productPrice, productDescription, imageUrl);
    }
  });

  const galleryForm = document.getElementById("galleryForm");
  galleryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const current = loadData();
    const title = document.getElementById("galleryTitle").value.trim();
    const type = document.getElementById("galleryType").value.trim();
    const description = document.getElementById("galleryDescription").value.trim();
    const imageUrl = document.getElementById("galleryImageUrl").value.trim();
    const imageInput = document.getElementById("galleryImage");

    let finalImage = imageUrl || "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80";
    if (imageInput.files && imageInput.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (result) => {
        finalImage = result.target.result;
        current.gallery.push({
          id: crypto.randomUUID(),
          title,
          type,
          description,
          image: finalImage
        });
        saveData(current);
        galleryForm.reset();
        updateAdminList();
        renderGallery();
      };
      fileReader.readAsDataURL(imageInput.files[0]);
    } else {
      current.gallery.push({
        id: crypto.randomUUID(),
        title,
        type,
        description,
        image: finalImage
      });
      saveData(current);
      galleryForm.reset();
      updateAdminList();
      renderGallery();
    }
  });

  const videoForm = document.getElementById("videoForm");
  videoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const current = loadData();
    const title = document.getElementById("videoTitle").value.trim();
    const url = document.getElementById("videoUrl").value.trim();
    const description = document.getElementById("videoDescription").value.trim();

    if (!url) return;
    current.videos.push({
      id: crypto.randomUUID(),
      title,
      description,
      url
    });
    saveData(current);
    videoForm.reset();
    updateAdminList();
    renderVideos();
  });

  updateAdminList();
}

function pushProduct(current, productName, productCategory, productPrice, productDescription, imageUrl) {
  current.featuredProducts.push({
    id: crypto.randomUUID(),
    name: productName,
    category: productCategory,
    price: productPrice,
    description: productDescription,
    image: imageUrl
  });

  saveData(current);
  document.getElementById("productForm").reset();
  updateAdminList();
  renderFeaturedProducts();
}

function initPage() {
  const body = document.body;
  if (body.classList.contains("admin-body")) {
    initAdminPage();
  } else {
    applySiteSettings();
    renderFeaturedProducts();
    renderGallery();
    renderVideos();
    initChat();
  }
}

window.addEventListener("DOMContentLoaded", initPage);





























































