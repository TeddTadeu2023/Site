# Blog Prof. Tedd Tadeu

Blog sobre tecnologias Microsoft (Azure, Power BI, Power Platform, Copilot) aplicadas à
indústria, Lean/Six Sigma e educação técnica. Pronto para hospedagem na **Hostinger** com
deploy automático pelo GitHub — veja **[DEPLOY-HOSTINGER.md](DEPLOY-HOSTINGER.md)**.

## Estrutura

```
index.html            Página inicial (blog, sobre, comunidade MVP, newsletter)
post.html             Página de artigo (post.html?id=<id>)
404.html              Página não encontrada
assets/js/posts.js    ← ARTIGOS: para publicar, adicione um objeto ao array POSTS
assets/js/main.js     Tema claro/escuro, menu, listagem, artigo, newsletter
assets/css/style.css  Estilos (responsivo, modo escuro)
assets/img/           Imagem de compartilhamento (og-image.png)
.htaccess             Configuração do servidor (HTTPS, segurança, cache)
post.php              Prévia correta de artigos no LinkedIn/WhatsApp
sitemap.php           /sitemap.xml automático
api/inscrever.php     Inscrição na newsletter
```

## Rodar localmente

```bash
php -S localhost:8000      # com PHP (newsletter funciona)
# ou
python3 -m http.server     # só o conteúdo estático
```

Também é possível abrir `index.html` direto no navegador.
