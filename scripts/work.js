/* =========================================================================
   AMRI® work page behaviour
   - renders the industry directory (left) from SITE.projects
   - panel (right) switches between "Selected works" and client case views
   - deep-linkable via location.hash (#aurel etc.)
   ========================================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const dirList = document.getElementById("dir-list");
  const dirAll = document.getElementById("dir-all");
  const panel = document.getElementById("panel-content");
  const closeBtn = document.getElementById("panel-close");
  if (!dirList || !panel) return;

  function esc(str) {
    return String(str).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  /* ---------------------------------------------------------- directory */
  SITE.projects.forEach((project) => {
    const group = document.createElement("div");
    group.className = "dir-group";
    group.innerHTML =
      '<div class="dir-head"><span>' + esc(project.industry) + "</span>" +
      '<span class="dir-state" aria-hidden="true">+</span></div>' +
      '<button class="dir-card" type="button" data-slug="' + esc(project.slug) + '" aria-pressed="false">' +
      '<img src="' + esc(project.icon) + '" alt="" width="56" height="56" loading="lazy">' +
      '<span class="dir-copy"><strong>' + esc(project.name) + "</strong>" +
      '<span class="desc">' + esc(project.description) + "</span></span>" +
      "</button>";
    dirList.appendChild(group);
  });

  const dirCards = Array.from(dirList.querySelectorAll(".dir-card"));

  /* ------------------------------------------------------------- views */
  function animatePanel() {
    if (prefersReducedMotion.matches) return;
    panel.classList.remove("panel-anim");
    void panel.offsetWidth; // restart the entrance animation
    panel.classList.add("panel-anim");
  }

  function markActive(slug) {
    dirAll.setAttribute("aria-pressed", String(slug === null));
    dirCards.forEach((card) => {
      const on = card.dataset.slug === slug;
      card.setAttribute("aria-pressed", String(on));
      card.classList.toggle("is-active", on);
      const state = card.parentElement.querySelector(".dir-state");
      if (state) state.textContent = on ? "−" : "+";
    });
    if (closeBtn) closeBtn.hidden = slug === null;
  }

  function mediaFigure(m, extra) {
    return (
      '<figure class="media-card' + (extra ? " " + extra : "") + '">' +
      '<img src="' + esc(m.src) + '" alt="' + esc(m.alt) + '" width="1200" height="900" loading="lazy">' +
      "</figure>"
    );
  }

  function renderAll() {
    const projects = SITE.projects;
    let html = '<h1 class="panel-title">Selected works</h1><div class="works-flow">';

    projects.forEach((project, i) => {
      const item =
        '<a class="works-item" href="#' + esc(project.slug) + '" aria-label="Open ' + esc(project.name) + ' case study">' +
        mediaFigure(project.media[0]) +
        '<span class="works-cap">' + esc(project.name) + "</span></a>";

      // editorial rhythm: full-width feature, then paired rows
      if (i % 3 === 0) {
        html += '<div class="works-row works-row--full">' + item + "</div>";
      } else {
        if (i % 3 === 1) html += '<div class="works-row">';
        html += item;
        if (i % 3 === 2 || i === projects.length - 1) html += "</div>";
      }
    });

    html +=
      "</div>" +
      '<div class="works-cta">' +
      '<p class="works-question">Want a peek at how we <em>could collaborate?</em></p>' +
      '<a class="btn btn--solid" href="mailto:' + esc(SITE.brand.email) +
      '?subject=Project%20enquiry"><span class="dot" aria-hidden="true"></span>Book a call</a>' +
      "</div>";

    panel.innerHTML = html;
    markActive(null);
    animatePanel();
  }

  function renderClient(project) {
    const scope = Object.entries(project.scope || {})
      .map(
        ([title, items]) =>
          "<div><h3>" + esc(title) + "</h3><ul>" +
          items.map((item) => "<li>" + esc(item) + "</li>").join("") +
          "</ul></div>"
      )
      .join("");

    const media = project.media
      .map((m, i) => mediaFigure(m, i === 0 ? "case-full" : ""))
      .join("");

    panel.innerHTML =
      '<header class="case-head">' +
      "<h1>" + esc(project.name) + "</h1>" +
      (project.url && project.url !== "#"
        ? '<a class="case-visit" href="' + esc(project.url) + '" target="_blank" rel="noopener">' +
          '<span aria-hidden="true">&nearr;</span> Visit site</a>'
        : '<span class="case-visit is-muted" title="Site link coming soon">' +
          '<span aria-hidden="true">&nearr;</span> Visit site</span>') +
      "</header>" +
      '<p class="case-statement">' + esc(project.statement) + "</p>" +
      '<div class="case-scope">' + scope + "</div>" +
      '<div class="case-media">' + media + "</div>" +
      '<div class="case-next">' +
      '<a class="btn" href="#" data-close>&larr; All work</a>' +
      "</div>";

    markActive(project.slug);
    animatePanel();
  }

  /* ------------------------------------------------------------ routing */
  function route() {
    const slug = location.hash.replace("#", "");
    const project = SITE.projects.find((p) => p.slug === slug);
    if (project) {
      renderClient(project);
      // on stacked layouts the panel sits below the directory — bring it into view
      if (window.matchMedia("(max-width: 1024px)").matches) {
        panel.closest(".work-panel").scrollIntoView({ behavior: "auto" });
        return;
      }
    } else {
      renderAll();
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function goAll() {
    if (location.hash) {
      // strip the hash without adding a history entry per close
      history.pushState("", document.title, location.pathname + location.search);
    }
    renderAll();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  dirCards.forEach((card) =>
    card.addEventListener("click", () => {
      const isOpen = card.classList.contains("is-active");
      if (isOpen) goAll();
      else location.hash = card.dataset.slug;
    })
  );

  dirAll.addEventListener("click", goAll);
  if (closeBtn) closeBtn.addEventListener("click", goAll);

  panel.addEventListener("click", (event) => {
    const close = event.target.closest("[data-close]");
    if (close) {
      event.preventDefault();
      goAll();
    }
  });

  window.addEventListener("hashchange", route);
  route();
})();
