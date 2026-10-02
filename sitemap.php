<?php
/**
 * Sitemap dinâmico: lê os artigos de assets/js/posts.js e gera o XML.
 * Acessível em /sitemap.xml (regra no .htaccess). Não precisa ser editado ao publicar artigos.
 */
header('Content-Type: application/xml; charset=UTF-8');

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$base   = $scheme . '://' . $_SERVER['HTTP_HOST'] . rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\') . '/';

$posts = [];
$js = @file_get_contents(__DIR__ . '/assets/js/posts.js');
if ($js !== false) {
    preg_match_all('/id:\s*"([^"]+)"[\s\S]*?date:\s*"(\d{4}-\d{2}-\d{2})"/', $js, $m, PREG_SET_ORDER);
    foreach ($m as $p) {
        $posts[] = ['id' => $p[1], 'date' => $p[2]];
    }
}
$latest = $posts ? max(array_column($posts, 'date')) : date('Y-m-d');

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc><?= htmlspecialchars($base) ?></loc>
    <lastmod><?= $latest ?></lastmod>
    <priority>1.0</priority>
  </url>
<?php foreach ($posts as $p): ?>
  <url>
    <loc><?= htmlspecialchars($base . 'post.html?id=' . rawurlencode($p['id'])) ?></loc>
    <lastmod><?= $p['date'] ?></lastmod>
    <priority>0.8</priority>
  </url>
<?php endforeach; ?>
</urlset>
