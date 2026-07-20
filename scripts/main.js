/* =========================================================================
   AMRI® homepage behaviour
   - renders repeated content from SITE (scripts/data.js)
   - theme toggle, scroll reveals, journal rail rotation, footer clock
   ========================================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* --------------------------------------------------------- hero video */
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo && prefersReducedMotion.matches) {
    heroVideo.autoplay = false;
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  }

  /* ------------------------------------------------------------ helpers */
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function esc(str) {
    return String(str).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  /* -------------------------------------------------------------- theme */
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = (() => {
    try {
      return localStorage.getItem("amri-theme");
    } catch (_) {
      return null;
    }
  })();

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  applyTheme(
    storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  themeToggle.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("amri-theme", next);
    } catch (_) {
      /* private mode — theme just won't persist */
    }
  });

  /* -------------------------------------------------------- journal rail */
  const railList = document.getElementById("rail-list");
  if (railList) SITE.posts.forEach((post) => {
    const li = el("li");
    li.innerHTML =
      '<a class="rail-card" href="' + esc(post.href) + '">' +
      '<span class="rail-meta"><span>' + esc(post.category) + " &middot; " + esc(post.date) +
      '</span><span class="plus" aria-hidden="true">+</span></span>' +
      '<span class="rail-title">' + esc(post.title) + "</span>" +
      '<span class="rail-excerpt">' + esc(post.excerpt) + "</span>" +
      '<span class="rail-thumb"><img src="' + esc(post.image) + '" alt="" loading="lazy" width="800" height="500"></span>' +
      "</a>";
    railList.appendChild(li);
  });

  // Gentle auto-rotation through the rail; pauses on hover/focus,
  // disabled entirely for reduced-motion users and stacked layouts.
  const railViewport = document.getElementById("rail-viewport");
  let railTimer = null;
  let railIndex = 0;
  let railPaused = false;

  function railCanAnimate() {
    if (!railViewport) return false;
    return (
      !prefersReducedMotion.matches &&
      window.matchMedia("(min-width: 861px)").matches &&
      railViewport.scrollHeight > railViewport.clientHeight + 40
    );
  }

  function railStep() {
    if (railPaused || !railCanAnimate()) return;
    const cards = railList.querySelectorAll(".rail-card");
    if (!cards.length) return;
    railIndex = (railIndex + 1) % cards.length;
    railViewport.scrollTo({ top: cards[railIndex].parentElement.offsetTop, behavior: "smooth" });
  }

  function railStart() {
    if (railTimer) clearInterval(railTimer);
    railTimer = setInterval(railStep, 5000);
  }

  if (railViewport) {
    ["mouseenter", "focusin", "touchstart"].forEach((evt) =>
      railViewport.addEventListener(evt, () => (railPaused = true), { passive: true })
    );
    ["mouseleave", "focusout"].forEach((evt) =>
      railViewport.addEventListener(evt, () => (railPaused = false))
    );
    railStart();
  }

  /* ------------------------------------------------------- project rows */
  const rowsRoot = document.getElementById("project-rows");
  if (rowsRoot) SITE.projects.forEach((project) => {
    const row = el("a", "project-row reveal");
    row.href = project.href;
    row.setAttribute("aria-label", project.name + " — " + project.industry + " case study");
    row.innerHTML =
      '<div class="project-info">' +
      '<span class="project-id">' +
      '<img class="project-icon" src="' + esc(project.icon) + '" alt="" width="36" height="36" loading="lazy">' +
      '<span><span class="project-name">' + esc(project.name) + "</span>" +
      '<span class="project-industry">' + esc(project.industry) + "</span></span></span>" +
      '<p class="project-desc">' + esc(project.description) + "</p>" +
      '<span class="project-open">Open project &rarr;</span>' +
      "</div>" +
      '<div class="project-gallery">' +
      project.media
        .map(
          (m) =>
            '<figure class="media-card"><img src="' + esc(m.src) + '" alt="' + esc(m.alt) +
            '" width="1200" height="900" loading="lazy"></figure>'
        )
        .join("") +
      "</div>";
    rowsRoot.appendChild(row);
  });

  /* ------------------------------------------------------------- voices */
  const voicesRoot = document.getElementById("voices-grid");
  if (voicesRoot) SITE.voices.forEach((voice) => {
    const card = el("figure", "voice-card reveal");
    card.innerHTML =
      '<div class="media-card voice-media"><img src="' + esc(voice.image) +
      '" alt="" width="1600" height="900" loading="lazy"></div>' +
      '<blockquote class="voice-quote">&ldquo;' + esc(voice.quote) + "&rdquo;</blockquote>" +
      '<figcaption class="voice-person"><strong>' + esc(voice.name) + "</strong>" +
      '<span class="role">' + esc(voice.role) + "</span></figcaption>";
    voicesRoot.appendChild(card);
  });

  /* ---------------------------------------------------------------- lab */
  const labRoot = document.getElementById("lab-grid");
  if (labRoot) SITE.lab.forEach((item) => {
    const card = el("a", "lab-item reveal");
    card.href = "#lab";
    card.setAttribute("aria-label", item.name + " — " + item.cat);
    card.innerHTML =
      '<figure class="media-card"><img src="' + esc(item.src) + '" alt="' +
      esc(item.name + " — " + item.cat) + '" width="' + item.w + '" height="' + item.h +
      '" loading="lazy" style="aspect-ratio:' + item.w + "/" + item.h + '"></figure>' +
      '<span class="lab-label"><span><strong>' + esc(item.name) + "</strong> / " + esc(item.cat) +
      '</span><span aria-hidden="true">&nearr;</span></span>';
    labRoot.appendChild(card);
  });

  /* --------------------------------------------------------------- team */
  const teamRoot = document.getElementById("team-grid");
  if (teamRoot) SITE.team.forEach((member) => {
    const card = el("div", "team-card reveal");
    card.innerHTML =
      '<figure class="media-card"><img src="' + esc(member.image) + '" alt="Portrait of ' +
      esc(member.name) + '" width="900" height="1100" loading="lazy"></figure>' +
      '<p class="team-name">' + esc(member.name) + "</p>" +
      '<p class="team-role">' + esc(member.role) + "</p>";
    teamRoot.appendChild(card);
  });
  if (teamRoot && SITE.team.length === 1) teamRoot.style.gridTemplateColumns = "1fr";

  /* ----------------------------------------------------- footer directory */
  const dirRoot = document.getElementById("footer-directory");
  if (dirRoot) Object.entries(SITE.footer).forEach(([title, links]) => {
    const col = el("div", "footer-col");
    col.innerHTML =
      "<h3>" + esc(title) + "</h3>" +
      links
        .map(
          (link) =>
            '<a class="footer-row" href="' + esc(link.href) + '">' +
            (link.icon ? '<img src="' + esc(link.icon) + '" alt="" loading="lazy" width="22" height="22">' : "") +
            '<span class="label">' + esc(link.label) + "</span>" +
            '<span class="arrow" aria-hidden="true">&rarr;</span></a>'
        )
        .join("");
    dirRoot.appendChild(col);
  });

  /* ----------------------------------------------------- footer details */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  const footerCity = document.getElementById("footer-city");
  if (footerCity) footerCity.textContent = SITE.brand.city;
  const brandCity = document.getElementById("brand-city");
  if (brandCity) brandCity.textContent = SITE.brand.city;

  const clock = document.getElementById("footer-clock");
  function tick() {
    if (!clock) return;
    try {
      clock.textContent = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: SITE.brand.timezone,
      }).format(new Date());
    } catch (_) {
      clock.textContent = new Date().toTimeString().slice(0, 5);
    }
  }
  tick();
  setInterval(tick, 30000);

  /* ------------------------------------------------------ scroll reveals */
  const revealNodes = document.querySelectorAll(".reveal");
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealNodes.forEach((node) => io.observe(node));
  }

  /* -------------------------------------------- active nav link on scroll */
  const sections = ["work", "lab", "journal", "studio"].map((id) => document.getElementById(id));
  const navLinks = Array.from(document.querySelectorAll(".nav-links .nav-btn"));
  if ("IntersectionObserver" in window) {
    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = navLinks.find(
            (a) => a.getAttribute("href") === "#" + entry.target.id
          );
          if (link) link.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && navIO.observe(s));
  }
})();
