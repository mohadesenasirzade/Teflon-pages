document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. منوی همبرگر (با کلاس .menu)
  // ==========================================
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".menu");
  const closeBtn = document.querySelector(".blu-arrow");

  // ایجاد اوورلی
  const overlay = document.createElement("div");
  overlay.className = "mobile-nav-overlay";
  document.body.appendChild(overlay);

  function toggleMenu(forceState) {
    const isOpen = typeof forceState === "boolean" ? forceState : mobileMenu.classList.contains("menu--active");

    if (typeof forceState === "boolean") {
      mobileMenu.classList.toggle("menu--active", forceState);
      hamburger.classList.toggle("hamburger--active", forceState);
      overlay.classList.toggle("active", forceState);
    } else {
      mobileMenu.classList.toggle("menu--active");
      hamburger.classList.toggle("hamburger--active");
      overlay.classList.toggle("active");
    }

    document.body.style.overflow = mobileMenu.classList.contains("menu--active") ? "hidden" : "";
  }

  if (hamburger && mobileMenu) {
    // باز کردن با همبرگر
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // بستن با دکمه فلش آبی
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        toggleMenu(false);
      });
    }

    // بستن با کلیک روی اوورلی
    overlay.addEventListener("click", function () {
      toggleMenu(false);
    });

    // بستن با کلیک روی هر آیتم منو
    const menuItems = mobileMenu.querySelectorAll("li, .btn-order-left2, .btn-order-right, .bale-conection, .insta-connection");
    menuItems.forEach((item) => {
      item.addEventListener("click", function () {
        toggleMenu(false);
      });
    });

    // بستن با کلید Escape
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        toggleMenu(false);
      }
    });

    // بستن با تغییر اندازه صفحه به دسکتاپ
    window.addEventListener("resize", function () {
      if (window.innerWidth > 992 && mobileMenu.classList.contains("menu--active")) {
        toggleMenu(false);
      }
    });
  }

  // ==========================================
  // 2. هدر اسکرول
  // ==========================================
  const header = document.querySelector(".header");
  let ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (header) {
          header.classList.toggle("header__scrolled", scrollTop > 50);
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // ==========================================
  // 3. اسکرول نرم برای لینک‌ها
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header ? header.offsetHeight : 0;
          window.scrollTo({
            top: target.offsetTop - headerHeight - 20,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // ==========================================
  // 4. FAQ آکاردئون
  // ==========================================
  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");
    if (question) {
      question.addEventListener("click", function () {
        const isActive = item.classList.contains("faq__item--active");
        faqItems.forEach((other) => other.classList.remove("faq__item--active"));
        if (!isActive) {
          item.classList.add("faq__item--active");
        }
      });
    }
  });

  // ==========================================
  // 5. Swiperها
  // ==========================================
  if (typeof Swiper === "undefined") {
    console.error("❌ کتابخانه Swiper بارگذاری نشده!");
    return;
  }

  // 5.1 - Swiper پرداخت
  const paySwiperEl = document.querySelector(".mySwiper");
  if (paySwiperEl) {
    new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 10,
    });
  }

  // 5.2 - Swiper بازسازی
  const restorationSwiperEl = document.querySelector(".restoration-swiper");
  if (restorationSwiperEl) {
    new Swiper(".restoration-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      // loop: true,
      navigation: {
        nextEl: ".restoration-swiper .swiper-button-next",
        prevEl: ".restoration-swiper .swiper-button-prev",
      },
      pagination: {
        el: ".restoration-swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 24 },
      },
    });
  }

  console.log("✅ همه چیز با موفقیت راه‌اندازی شد!");
});
