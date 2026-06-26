document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. منوی همبرگر (.menu)
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

// gallery
// تنظیمات اسلایدر بندانگشتی (ریزعکس‌ها)
var galleryThumbs = new Swiper(".gallery-thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  loop: true,
  freeMode: true,
  loopedSlides: 5,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  // تغییر جهت هوشمند بر اساس اندازه صفحه نمایش
  breakpoints: {
    320: {
      direction: "horizontal",
      slidesPerView: 4,
    },
    641: {
      direction: "vertical",
      slidesPerView: 4,
    },
  },
});

// تنظیمات اسلایدر اصلی
var galleryTop = new Swiper(".gallery-top", {
  spaceBetween: 10,
  loop: true,
  loopedSlides: 5,
  navigation: {
    nextEl: ".swiper-button-next2",
    prevEl: ".swiper-button-prev2",
  },
  pagination: {
    el: ".swiper-pagination2",
    clickable: true,
  },
  thumbs: {
    swiper: galleryThumbs,
  },
});

// work swiper
const workSwiper = new Swiper(".work-left", {
  slidesPerView: 1,
  spaceBetween: 0,
  // loop: true,

  navigation: {
    nextEl: ".work-left .swiper-button-next",
    prevEl: ".work-left .swiper-button-prev",
  },

  pagination: {
    el: ".work-left .swiper-pagination",
    clickable: true,
  },
});
// portfolio-slider__swiper
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".portfolio-slider__swiper", {
    // تعداد اسلایدهای قابل مشاهده
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    // ناوبری
    navigation: {
      nextEl: ".portfolio-slider__swiper .swiper-button-next",
      prevEl: ".portfolio-slider__swiper .swiper-button-prev",
    },

    // Pagination
    pagination: {
      el: ".portfolio-slider__swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // تنظیمات ریسپانسیو
    breakpoints: {
      // وقتی عرض صفحه >= 576px
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // وقتی عرض صفحه >= 768px
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      // وقتی عرض صفحه >= 1024px
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },

    // انیمیشن
    speed: 400,

    // حرکت خودکار (اختیاری - فعال کنید اگر می‌خواهید)
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: true,
    // },

    // افکت (اختیاری)
    // effect: 'slide',

    // کشیدن با موس
    grabCursor: true,

    // صفحه‌گردی با کیبورد (اختیاری)
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
});