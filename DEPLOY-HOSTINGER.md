# Publicando o blog na Hostinger via GitHub

O site é estático (HTML/CSS/JS) com 3 arquivos PHP opcionais que a Hostinger executa
automaticamente. **Não há etapa de build**: a Hostinger copia os arquivos do repositório
direto para `public_html`.

## 1. Antes de começar

- **Backup do site atual:** se `teddtadeu.com.br` já tem um site na Hostinger, faça backup em
  *hPanel → Arquivos → Backups* (ou baixe o conteúdo de `public_html` pelo Gerenciador de Arquivos).
  A Hostinger exige a pasta `public_html` **vazia** para o primeiro deploy via Git.
- **Branch:** a Hostinger publica a partir de **um** branch. Recomendado: criar o branch `main`
  no GitHub a partir deste (ou fazer o merge do Pull Request) e usar `main` no deploy.
- **PHP:** versão 8.0 ou superior (padrão da Hostinger). Confira em *hPanel → Avançado → Configuração do PHP*.

## 2. Conectar o GitHub (deploy automático)

1. hPanel → **Sites** → *Gerenciar* (no domínio) → **Avançado → GIT**.
2. Clique em **Conectar com GitHub** e autorize o app da Hostinger no repositório `TeddTadeu2023/Site`.
3. Selecione:
   - **Repositório:** `TeddTadeu2023/Site`
   - **Branch:** `main`
   - **Diretório:** deixe em branco / `public_html` (raiz do domínio)
4. Clique em **Criar / Deploy**.

A partir daí, **cada `push` no branch `main` atualiza o site sozinho** (o webhook é criado automaticamente).

> **Interface antiga (sem o botão "Conectar com GitHub")**
> Em *Avançado → GIT*, informe o repositório `https://github.com/TeddTadeu2023/Site.git`, o branch
> e o diretório e clique em *Criar*. Se o repositório for **privado**, copie a *chave SSH* mostrada
> pela Hostinger e adicione em GitHub → *Settings → Deploy keys*, usando a URL
> `git@github.com:TeddTadeu2023/Site.git`. Para deploy automático, copie a **Webhook URL** do
> painel e cadastre em GitHub → *Settings → Webhooks → Add webhook* (Content type: `application/json`).

## 3. Ativar HTTPS

hPanel → **Segurança → SSL** → instale o certificado gratuito. O `.htaccess` já redireciona todo o
tráfego para `https://`. (Se o site ficar em loop de redirecionamento, o SSL ainda não foi ativado.)

## 4. Conferir após o deploy

- [ ] `https://teddtadeu.com.br/` abre a página inicial
- [ ] Um artigo abre normalmente (`/post.html?id=power-bi-oee-lean`)
- [ ] `https://teddtadeu.com.br/sitemap.xml` lista os artigos
- [ ] `https://teddtadeu.com.br/.git/config` retorna **404** (pasta do Git protegida)
- [ ] Formulário "Inscrever" mostra "Obrigado!"
- [ ] Prévia no LinkedIn: cole o link de um artigo no [Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Envie o sitemap no [Google Search Console](https://search.google.com/search-console)

## 5. Newsletter

- Os e-mails ficam em `newsletter-inscritos.csv`, **uma pasta acima** de `public_html`
  (fora do alcance da web e não é apagado por novos deploys). Baixe pelo Gerenciador de Arquivos.
- Para receber um aviso por e-mail a cada inscrição, edite `api/inscrever.php` e preencha
  `const NOTIFY_EMAIL = 'seu@email.com';`.

## 6. Publicar um novo artigo

1. No GitHub, abra `assets/js/posts.js` e clique no lápis (editar).
2. Copie um bloco `{ ... }` existente, cole no início da lista e altere `id` (sem espaços/acentos),
   `title`, `category`, `cover`, `icon`, `date` (AAAA-MM-DD), `readTime`, `excerpt` e `content` (HTML).
3. *Commit changes* no branch `main`. Em instantes o artigo está no ar, no sitemap e com prévia no LinkedIn.

Capas disponíveis (`cover`): `cover-azure`, `cover-powerbi`, `cover-ai`, `cover-m365`, `cover-lean`, `cover-mvp`.

## 7. Domínio diferente ou subpasta

O endereço `https://teddtadeu.com.br` aparece em `index.html`, `post.html`, `robots.txt` e
`assets/js/main.js`. Para outro domínio (ex.: `blog.teddtadeu.com.br`), use *buscar e substituir*.
Se publicar em uma subpasta (ex.: `public_html/blog`), ajuste também `ErrorDocument` no `.htaccess`
e o link "Voltar ao blog" em `404.html`.

## Arquivos do servidor

| Arquivo | Função |
|---|---|
| `.htaccess` | HTTPS, bloqueio de `.git` e `.md`, página 404, cache, compressão, cabeçalhos de segurança |
| `post.php` | Entrega `post.html` com título/descrição do artigo (prévia em redes sociais e SEO) |
| `sitemap.php` | Gera `/sitemap.xml` automaticamente a partir de `posts.js` |
| `api/inscrever.php` | Recebe inscrições da newsletter |
| `404.html` | Página de "não encontrado" |
| `robots.txt` | Instruções para buscadores |
