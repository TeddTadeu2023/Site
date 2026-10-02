<?php
/**
 * Serve post.html com título, descrição e tags Open Graph do artigo já no HTML,
 * para que LinkedIn, WhatsApp e Google mostrem a prévia correta ao compartilhar.
 * O .htaccess direciona /post.html para este arquivo; localmente post.html funciona sozinho.
 */
header('Content-Type: text/html; charset=UTF-8');

$html = file_get_contents(__DIR__ . '/post.html');
$id   = (string)($_GET['id'] ?? '');
$js   = @file_get_contents(__DIR__ . '/assets/js/posts.js');

$post = null;
if ($id !== '' && $js !== false) {
    $str = '"((?:[^"\\\\]|\\\\.)*)"';
    $re  = '/id:\s*"' . preg_quote($id, '/') . '"\s*,\s*title:\s*' . $str . '[\s\S]*?excerpt:\s*' . $str . '/';
    if (preg_match($re, $js, $m)) {
        $post = [
            'title'   => json_decode('"' . $m[1] . '"') ?? $m[1],
            'excerpt' => json_decode('"' . $m[2] . '"') ?? $m[2],
        ];
    }
}

if ($post === null) {
    if ($id !== '') http_response_code(404);
    echo $html;
    exit;
}

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$base   = $scheme . '://' . $_SERVER['HTTP_HOST'] . rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\') . '/';
$url    = $base . 'post.html?id=' . rawurlencode($id);

$e = fn($s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
$title = $post['title'] . ' | Prof. Tedd Tadeu';

$html = preg_replace('#<title>.*?</title>#s', '<title>' . $e($title) . '</title>', $html, 1);
$html = preg_replace(
    '#<meta name="description" content="[^"]*">#',
    '<meta name="description" content="' . $e($post['excerpt']) . '">',
    $html, 1
);
$extra = "\n  <link rel=\"canonical\" href=\"" . $e($url) . "\">"
       . "\n  <meta property=\"og:url\" content=\"" . $e($url) . "\">"
       . "\n  <meta property=\"og:title\" content=\"" . $e($post['title']) . "\">"
       . "\n  <meta property=\"og:description\" content=\"" . $e($post['excerpt']) . "\">";
$html = str_replace('<meta property="og:type"', ltrim($extra) . "\n  <meta property=\"og:type\"", $html);

echo $html;
