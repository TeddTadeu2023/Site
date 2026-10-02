<?php
/**
 * Inscrição na newsletter do blog.
 *
 * - Salva os e-mails em um CSV FORA da pasta pública (um nível acima de public_html),
 *   para que a lista nunca fique acessível pela web nem seja apagada por um novo deploy.
 * - Opcional: envia um aviso por e-mail a cada nova inscrição (configure NOTIFY_EMAIL).
 *
 * Para baixar a lista: hPanel → Gerenciador de Arquivos → pasta acima de public_html
 * → newsletter-inscritos.csv
 */

// E-mail que recebe o aviso de nova inscrição. Deixe vazio para não enviar.
const NOTIFY_EMAIL = '';

date_default_timezone_set('America/Sao_Paulo');
header('Content-Type: application/json; charset=UTF-8');

function responder(int $status, bool $ok, string $msg): void {
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, false, 'Método não permitido.');
}

// Campo "armadilha" invisível: robôs preenchem, pessoas não.
if (!empty($_POST['website'])) {
    responder(200, true, 'Obrigado! Você receberá as próximas publicações.');
}

$email = trim((string)($_POST['email'] ?? ''));
if ($email === '' || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(422, false, 'Informe um e-mail válido.');
}
$email = strtolower($email);
// Evita que o CSV execute fórmulas ao ser aberto no Excel
$valor = preg_match('/^[=+\-@]/', $email) ? "'" . $email : $email;

$file = dirname($_SERVER['DOCUMENT_ROOT']) . '/newsletter-inscritos.csv';

$fh = @fopen($file, 'c+');
if ($fh === false) {
    responder(500, false, 'Não foi possível registrar agora. Tente novamente mais tarde.');
}
flock($fh, LOCK_EX);

// Evita inscrições duplicadas
while (($row = fgetcsv($fh, null, ',', '"', '')) !== false) {
    if (isset($row[0]) && $row[0] === $valor) {
        flock($fh, LOCK_UN);
        fclose($fh);
        responder(200, true, 'Você já está inscrito. Obrigado!');
    }
}

if (ftell($fh) === 0) {
    fputcsv($fh, ['email', 'data_inscricao'], ',', '"', '');
}
fputcsv($fh, [$valor, date('Y-m-d H:i:s')], ',', '"', '');
fflush($fh);
flock($fh, LOCK_UN);
fclose($fh);

if (NOTIFY_EMAIL !== '') {
    $host = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
    @mail(
        NOTIFY_EMAIL,
        'Nova inscrição no blog',
        "Novo inscrito na newsletter: {$email}",
        "From: no-reply@{$host}\r\nContent-Type: text/plain; charset=UTF-8"
    );
}

responder(200, true, 'Obrigado! Você receberá as próximas publicações.');
