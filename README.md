# Blog Prof. Tedd Tadeu

Blog estático (HTML/CSS/JS) com foco em divulgação de material técnico sobre tecnologias Microsoft
(Azure, Power BI, Power Platform, Copilot) aplicadas à indústria, Lean/Six Sigma e educação técnica.

## Estrutura
- `index.html` — página inicial (hero, blog com busca/filtros, sobre, comunidade MVP, contato)
- `post.html?id=<id>` — página de artigo
- `assets/js/posts.js` — **base de artigos**: para publicar, adicione um objeto ao array `POSTS`
- `assets/js/main.js` — tema claro/escuro, menu mobile, listagem e renderização dos artigos
- `assets/css/style.css` — estilos (paleta inspirada na Microsoft, responsivo, modo escuro)

## Rodar localmente
Abra `index.html` no navegador, ou: `python3 -m http.server` e acesse http://localhost:8000.

## Publicar
Funciona em GitHub Pages (Settings → Pages → branch), Azure Static Web Apps ou qualquer hospedagem estática.
