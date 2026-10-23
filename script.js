document.addEventListener("DOMContentLoaded", function () {
  // شاشة البداية
  const intro = document.getElementById("intro");

  window.setTimeout(function () {
    if (intro) {
      intro.classList.add("hide");
    }
  }, 1400);

  // تحديث السنة تلقائيًا
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // قائمة الموبايل
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  function closeMenu() {
    if (nav) nav.classList.remove("open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // ظهور العناصر عند التمرير
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  // طلب المنتجات عبر واتساب
  const orderButtons = document.querySelectorAll(".order-button");

  orderButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const card = button.closest(".product-card");

      if (!card) return;

      const product = card.dataset.product || "منتج من Gi Vista";
      const price = card.dataset.price || "";

      const message =
        "أهلاً Gi Vista، عايز أستفسر عن طلب:\n" +
        "المنتج: " + product + "\n" +
        "السعر: " + price + " جنيه\n" +
        "ممكن أعرف تفاصيل الطلب؟";

      const whatsappURL =
        "https://wa.me/201143561211?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank");
    });
  });

  // تحريك المج باللمس أو الماوس
  const cupScene = document.getElementById("cupScene");

  if (cupScene) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    cupScene.addEventListener("pointerdown", function (event) {
      startX = event.clientX;
      startY = event.clientY;
      isDragging = true;
      cupScene.style.animation = "none";
    });

    cupScene.addEventListener("pointermove", function (event) {
      if (!isDragging) return;

      const moveX = (event.clientX - startX) * 0.35;
      const moveY = (event.clientY - startY) * 0.2;

      cupScene.style.transform =
        "translate(" + moveX + "px," + moveY + "px)";
    });

    function resetCup() {
      isDragging = false;
      cupScene.style.transform = "";
      cupScene.style.animation = "";
    }

    cupScene.addEventListener("pointerup", resetCup);
    cupScene.addEventListener("pointercancel", resetCup);
    cupScene.addEventListener("pointerleave", function () {
      if (isDragging) resetCup();
    });
  }

  // تنبيه الصور التي لم يتم تحميلها
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      console.warn("تعذر تحميل الصورة:", img.getAttribute("src"));
    });
  });
});