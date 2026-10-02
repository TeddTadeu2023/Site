/* Comportamentos compartilhados: tema, menu, listagem de posts e página de artigo. */
(function () {
  const root = document.documentElement;

  // ----- Tema claro/escuro -----
  function safeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function safeSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* ignore */ } }

  const saved = safeGet("theme");
  if (saved) root.setAttribute("data-theme", saved);

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    const isDark = () =>
      root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const paint = () => { themeBtn.textContent = isDark() ? "☀️" : "🌙"; };
    paint();
    themeBtn.addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      safeSet("theme", next);
      paint();
    });
  }

  // ----- Menu mobile -----
  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("open"))
    );
  }

  // ----- Newsletter (api/inscrever.php na Hostinger) -----
  const form = document.getElementById("newsletter");
  if (form) {
    const msg = document.getElementById("form-msg");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector("button");
      btn.disabled = true;
      msg.textContent = "Enviando…";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form) });
        const data = await res.json();
        msg.textContent = data.message;
        if (data.ok) form.reset();
      } catch (err) {
        msg.textContent = "Não foi possível enviar agora. Tente novamente mais tarde.";
      } finally {
        btn.disabled = false;
      }
    });
  }

  // ----- Ano no rodapé -----
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const fmtDate = (iso) =>
    new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  const escapeHtml = (s) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ----- Listagem de posts (home) -----
  const grid = document.getElementById("posts-grid");
  if (grid && typeof POSTS !== "undefined") {
    const filtersEl = document.getElementById("filters");
    const searchEl = document.getElementById("search");
    let activeCat = "Todos";

    const categories = ["Todos", ...new Set(POSTS.map((p) => p.category))];
    filtersEl.innerHTML = categories
      .map((c) => `<button class="filter-btn${c === activeCat ? " active" : ""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
      .join("");

    function render() {
      const q = (searchEl.value || "").trim().toLowerCase();
      const list = POSTS
        .filter((p) => activeCat === "Todos" || p.category === activeCat)
        .filter((p) => !q || (p.title + " " + p.excerpt + " " + p.category).toLowerCase().includes(q))
        .sort((a, b) => b.date.localeCompare(a.date));

      grid.innerHTML = list.length
        ? list.map((p) => `
          <a class="post-card" href="post.html?id=${encodeURIComponent(p.id)}">
            <div class="post-cover ${p.cover}" aria-hidden="true">${p.icon}</div>
            <div class="post-body">
              <div class="post-meta"><span class="cat">${escapeHtml(p.category)}</span><span>${fmtDate(p.date)}</span><span>${p.readTime} min</span></div>
              <h3>${escapeHtml(p.title)}</h3>
              <p>${escapeHtml(p.excerpt)}</p>
              <span class="read-more">Ler artigo →</span>
            </div>
          </a>`).join("")
        : `<p class="empty">Nenhum artigo encontrado.</p>`;
    }

    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      activeCat = btn.dataset.cat;
      filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
      render();
    });
    searchEl.addEventListener("input", render);

    const countEl = document.getElementById("post-count");
    if (countEl) countEl.textContent = POSTS.length;

    render();
  }

  // ----- Página de artigo -----
  const articleEl = document.getElementById("article");
  if (articleEl && typeof POSTS !== "undefined") {
    const id = new URLSearchParams(location.search).get("id");
    const post = POSTS.find((p) => p.id === id);
    const head = document.getElementById("article-head");

    if (!post) {
      head.innerHTML = `<h1>Artigo não encontrado</h1><p><a href="index.html#blog">← Voltar ao blog</a></p>`;
      return;
    }

    document.title = post.title + " | Prof. Tedd Tadeu";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", post.excerpt);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      inLanguage: "pt-BR",
      mainEntityOfPage: location.href,
      author: { "@type": "Person", name: "Tedd Tadeu", url: "https://teddtadeu.com.br/" }
    });
    document.head.appendChild(ld);

    head.innerHTML = `
      <a href="index.html#blog">← Voltar ao blog</a>
      <div class="post-meta" style="margin-top:16px"><span class="cat">${escapeHtml(post.category)}</span><span>${fmtDate(post.date)}</span><span>${post.readTime} min de leitura</span></div>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="lead" style="color:var(--text-muted)">${escapeHtml(post.excerpt)}</p>
      <div class="post-cover ${post.cover}" aria-hidden="true">${post.icon}</div>`;

    const url = encodeURIComponent(location.href);
    const text = encodeURIComponent(post.title);
    articleEl.innerHTML = post.content + `
      <div class="share">
        <a class="btn btn-ghost" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${url}">Compartilhar no LinkedIn</a>
        <a class="btn btn-ghost" target="_blank" rel="noopener" href="https://wa.me/?text=${text}%20${url}">WhatsApp</a>
      </div>
      <div class="author-box">
        <div class="avatar">TT</div>
        <div>
          <strong>Prof. Tedd Tadeu</strong>
          <p>Engenheiro Mecânico e de Segurança, Black Belt Six Sigma e professor no SENAI-SP e na UniAnchieta. Escreve sobre tecnologias Microsoft aplicadas à indústria e à educação.</p>
        </div>
      </div>`;
  }
})();
