// Shared behaviour for every page.
(function () {
  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Email: assembled here so the address is not sitting in the HTML for scrapers
  document.querySelectorAll("[data-email]").forEach(function (el) {
    var addr = el.getAttribute("data-user") + "@" + el.getAttribute("data-domain");
    if (!el.hasAttribute("data-keep-label")) el.textContent = addr;
    el.setAttribute("href", "mailto:" + addr);
    el.setAttribute("title", addr);
  });

  // CV button: shown only once a PDF exists at the linked path, so the live site never has a dead link
  var cvLinks = document.querySelectorAll("[data-cv]");
  if (cvLinks.length && window.fetch && location.protocol.indexOf("http") === 0) {
    fetch(cvLinks[0].getAttribute("href"), { method: "HEAD" })
      .then(function (r) { if (r.ok) cvLinks.forEach(function (a) { a.hidden = false; }); })
      .catch(function () {});
  }

  // Portrait: show the monogram if images/profile.jpg is missing
  var portrait = document.querySelector(".portrait");
  if (portrait) {
    var img = portrait.querySelector("img");
    var fail = function () { portrait.classList.add("no-photo"); };
    if (!img) fail();
    else if (img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener("error", fail);
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

// Hero: a 2D diatomic lattice with a phonon wave travelling through it.
// Pointer position steers the wave vector. Still frame when reduced motion is on.
(function () {
  var canvas = document.getElementById("lattice");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = 1, W = 0, H = 0, sites = [];
  var spacing = 30;
  var angle = -0.35, targetAngle = -0.35;
  var t = 0, raf = null, visible = true;

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    spacing = W < 640 ? 24 : 30;
    sites = [];
    var cols = Math.ceil(W / spacing) + 2, rows = Math.ceil(H / spacing) + 2;
    for (var j = -1; j < rows; j++) {
      for (var i = -1; i < cols; i++) {
        sites.push({ x: i * spacing, y: j * spacing, heavy: (i + j) % 2 === 0 });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var k = (2 * Math.PI) / (spacing * 9);
    var kx = Math.cos(angle) * k, ky = Math.sin(angle) * k;
    var ex = Math.cos(angle), ey = Math.sin(angle);   // longitudinal polarisation
    var px = -ey, py = ex;                             // transverse component
    var amp = spacing * 0.28;
    var omega = 1.6;

    for (var n = 0; n < sites.length; n++) {
      var s = sites[n];
      var phase = kx * s.x + ky * s.y - omega * t;
      // heavy and light atoms move slightly out of step (acoustic + a hint of optical)
      var shift = s.heavy ? 0 : 0.5;
      var uL = Math.sin(phase + shift) * amp;
      var uT = Math.cos(phase * 0.5 + shift) * amp * 0.35;
      var x = s.x + ex * uL + px * uT;
      var y = s.y + ey * uL + py * uT;
      var strain = Math.cos(phase + shift); // compression → brighter
      var a = 0.18 + 0.55 * Math.max(0, strain);

      if (s.heavy) {
        ctx.fillStyle = "rgba(214, 222, 240," + (0.22 + 0.3 * Math.max(0, strain)).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(x, y, 3.4, 0, 6.2832); ctx.fill();
      } else {
        ctx.fillStyle = "rgba(227, 169, 43," + a.toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(x, y, 2.1, 0, 6.2832); ctx.fill();
      }
    }
  }

  function loop() {
    angle += (targetAngle - angle) * 0.04;
    t += 1 / 60;
    draw();
    raf = visible ? requestAnimationFrame(loop) : null;
  }

  build();
  if (reduce) { t = 0.8; draw(); }
  else loop();

  var hero = canvas.parentElement;
  hero.addEventListener("pointermove", function (e) {
    var r = hero.getBoundingClientRect();
    targetAngle = Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2);
    if (reduce) { angle = targetAngle; draw(); }
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { build(); draw(); }, 120);
  });

  // Pause when the hero is off screen
  if ("IntersectionObserver" in window && !reduce) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !raf) loop();
    }).observe(hero);
  }
})();
