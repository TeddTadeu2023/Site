/* Base de posts do blog. Para publicar um novo artigo, adicione um objeto ao array. */
const POSTS = [
  {
    id: "power-bi-oee-lean",
    title: "Power BI na fábrica: dashboard de OEE para projetos Lean",
    category: "Power BI",
    cover: "cover-powerbi",
    icon: "📊",
    date: "2026-09-24",
    readTime: 9,
    excerpt:
      "Como transformar apontamentos de produção em um painel de OEE (Disponibilidade × Performance × Qualidade) usando Power Query e DAX.",
    content: `
<p>O <strong>OEE (Overall Equipment Effectiveness)</strong> é um dos indicadores mais importantes do Lean Manufacturing. Mesmo assim, em muitas fábricas ele ainda é calculado em planilhas soltas, com dias de atraso. Neste artigo mostro como montar um painel de OEE no <strong>Microsoft Power BI</strong> — o mesmo roteiro que uso em sala de aula.</p>

<h2>1. A fórmula</h2>
<blockquote>OEE = Disponibilidade × Performance × Qualidade</blockquote>
<table>
  <tr><th>Fator</th><th>Cálculo</th><th>Perda associada</th></tr>
  <tr><td>Disponibilidade</td><td>Tempo produzindo ÷ Tempo planejado</td><td>Paradas e setups</td></tr>
  <tr><td>Performance</td><td>(Ciclo ideal × Peças) ÷ Tempo produzindo</td><td>Microparadas e velocidade reduzida</td></tr>
  <tr><td>Qualidade</td><td>Peças boas ÷ Peças totais</td><td>Refugo e retrabalho</td></tr>
</table>

<h2>2. Modelando os dados</h2>
<p>Use uma tabela fato <code>Apontamentos</code> (máquina, turno, início, fim, peças, refugo) e dimensões <code>Maquina</code> e <code>Calendario</code>. No Power Query, calcule a duração de cada evento em minutos e classifique as paradas segundo as <em>6 grandes perdas</em>.</p>

<h2>3. Medidas DAX</h2>
<pre><code>Disponibilidade =
DIVIDE ( [Tempo Produzindo], [Tempo Planejado] )

Performance =
DIVIDE ( SUMX ( Apontamentos, Apontamentos[CicloIdeal] * Apontamentos[Pecas] ),
         [Tempo Produzindo] )

Qualidade =
DIVIDE ( SUM ( Apontamentos[Pecas] ) - SUM ( Apontamentos[Refugo] ),
         SUM ( Apontamentos[Pecas] ) )

OEE = [Disponibilidade] * [Performance] * [Qualidade]</code></pre>

<h2>4. Visualizações que funcionam no chão de fábrica</h2>
<ul>
  <li><strong>Cartões</strong> com OEE e os três fatores, com meta de referência (ex.: 85% world class).</li>
  <li><strong>Pareto de paradas</strong> para priorizar o próximo Kaizen.</li>
  <li><strong>Tendência por turno</strong> para enxergar variação entre equipes.</li>
</ul>

<h2>5. Próximo passo</h2>
<p>Publique no Power BI Service, configure atualização agendada e exiba o painel em uma TV na linha. Indicador visível é indicador gerenciado — e esse é o primeiro passo para uma cultura de melhoria contínua orientada a dados.</p>
`
  },
  {
    id: "copilot-power-automate-kaizen",
    title: "Kaizen digital: Power Automate + Copilot para registrar melhorias",
    category: "Power Platform",
    cover: "cover-m365",
    icon: "⚡",
    date: "2026-09-10",
    readTime: 7,
    excerpt:
      "Um fluxo simples, sem código, para capturar ideias de melhoria pelo Teams, aprovar com o líder e gerar o relatório A3 com apoio do Copilot.",
    content: `
<p>Programas de melhoria contínua morrem quando a ideia do operador se perde no caminho. Com o <strong>Microsoft Power Automate</strong> e o <strong>Microsoft 365 Copilot</strong> dá para criar um fluxo de Kaizen digital em uma tarde — sem escrever código.</p>

<h2>Arquitetura da solução</h2>
<ol>
  <li><strong>Microsoft Forms</strong> (ou formulário no Teams) para o colaborador registrar a ideia.</li>
  <li><strong>Lista do SharePoint</strong> como base de dados das melhorias.</li>
  <li><strong>Power Automate</strong> envia aprovação ao líder da área.</li>
  <li><strong>Copilot</strong> ajuda a redigir o A3 a partir das informações coletadas.</li>
  <li><strong>Power BI</strong> mostra ganhos acumulados por área.</li>
</ol>

<h2>Montando o fluxo</h2>
<p>No Power Automate, crie um fluxo automatizado com o gatilho <em>"Quando uma nova resposta é enviada"</em>. Em seguida:</p>
<ul>
  <li>Obtenha os detalhes da resposta;</li>
  <li>Crie o item na lista <code>Kaizens</code> com status <code>Em análise</code>;</li>
  <li>Use a ação <em>"Iniciar e aguardar uma aprovação"</em> direcionada ao gestor;</li>
  <li>Atualize o status e notifique o autor no Teams.</li>
</ul>

<h2>Onde entra o Copilot</h2>
<p>Com a ideia aprovada, peça ao Copilot no Word: <em>"Crie um relatório A3 com base nesta melhoria: problema, causa raiz, contramedidas e resultados esperados"</em>. Ele estrutura o documento; a equipe valida os dados. A IA acelera — o método continua sendo PDCA.</p>

<blockquote>Dica de sala de aula: peça que os alunos comparem o A3 gerado com um feito manualmente. A discussão sobre o que a IA acertou (e errou) é tão valiosa quanto a ferramenta.</blockquote>
`
  },
  {
    id: "azure-iot-industria-40",
    title: "Azure IoT para Indústria 4.0: do sensor ao dashboard",
    category: "Azure",
    cover: "cover-azure",
    icon: "☁️",
    date: "2026-08-27",
    readTime: 10,
    excerpt:
      "Um laboratório didático para conectar um sensor de temperatura ao Azure IoT Hub e visualizar dados em tempo real — ideal para cursos técnicos.",
    content: `
<p>A Indústria 4.0 deixou de ser conceito: máquinas conectadas, dados em tempo real e manutenção preditiva já são realidade. Neste laboratório, que aplico com turmas técnicas, conectamos um sensor ao <strong>Microsoft Azure</strong>.</p>

<h2>Componentes</h2>
<ul>
  <li>Microcontrolador (ESP32 ou Raspberry Pi) com sensor de temperatura;</li>
  <li><strong>Azure IoT Hub</strong> — recebe a telemetria com segurança;</li>
  <li><strong>Azure Stream Analytics</strong> — processa e filtra os dados;</li>
  <li><strong>Power BI</strong> ou <strong>Azure Data Explorer</strong> — visualização.</li>
</ul>

<h2>Criando o IoT Hub com Azure CLI</h2>
<pre><code>az group create --name rg-industria40 --location brazilsouth
az iot hub create --name iothub-lab-senai --resource-group rg-industria40 --sku F1
az iot hub device-identity create --hub-name iothub-lab-senai --device-id prensa01
az iot hub device-identity connection-string show \\
   --hub-name iothub-lab-senai --device-id prensa01</code></pre>
<p>O plano <strong>F1 (gratuito)</strong> é suficiente para laboratórios e permite milhares de mensagens por dia.</p>

<h2>Regra de alerta</h2>
<p>No Stream Analytics, uma consulta simples detecta superaquecimento:</p>
<pre><code>SELECT deviceId, AVG(temperatura) AS mediaTemp, System.Timestamp() AS janela
INTO alertas
FROM telemetria TIMESTAMP BY eventTime
GROUP BY deviceId, TumblingWindow(minute, 1)
HAVING AVG(temperatura) > 70</code></pre>

<h2>Por que ensinar isso?</h2>
<p>O técnico que entende do processo <em>e</em> da nuvem é exatamente o profissional que a indústria procura. Juntar mecânica, qualidade e dados é a ponte entre o chão de fábrica e a transformação digital.</p>
<blockquote>Para estudantes: use o <strong>Azure for Students</strong>, que oferece créditos sem necessidade de cartão de crédito.</blockquote>
`
  },
  {
    id: "ia-generativa-sala-de-aula",
    title: "IA generativa na sala de aula técnica com Microsoft Copilot",
    category: "IA",
    cover: "cover-ai",
    icon: "🤖",
    date: "2026-08-12",
    readTime: 6,
    excerpt:
      "Boas práticas para usar o Copilot em aulas de processos industriais: prompts, avaliação crítica e ética no uso da IA.",
    content: `
<p>A inteligência artificial generativa chegou às escolas técnicas. A questão não é <em>se</em> os alunos vão usar, mas <em>como</em> vamos ensinar a usar bem. Compartilho aqui práticas que funcionam nas minhas turmas.</p>

<h2>1. Ensine a estrutura do prompt</h2>
<p>Um bom prompt tem <strong>papel, contexto, tarefa e formato</strong>:</p>
<blockquote>"Você é um engenheiro de qualidade. Em uma linha de usinagem, o diâmetro de um eixo está fora de especificação em 4% das peças. Monte um diagrama de Ishikawa (6M) em formato de tabela."</blockquote>

<h2>2. A IA propõe, o aluno valida</h2>
<p>Peça que os alunos marquem cada causa sugerida como <em>plausível</em>, <em>improvável</em> ou <em>precisa de dados</em>. Assim, o pensamento crítico e o método científico continuam no centro.</p>

<h2>3. Casos de uso que recomendo</h2>
<ul>
  <li>Gerar roteiros de FMEA para revisão em grupo;</li>
  <li>Traduzir manuais técnicos e normas;</li>
  <li>Criar exercícios de cálculo com gabarito para estudo;</li>
  <li>Resumir procedimentos operacionais (POPs).</li>
</ul>

<h2>4. Ética e responsabilidade</h2>
<p>Discuta os princípios de <strong>IA Responsável da Microsoft</strong>: justiça, confiabilidade, privacidade, inclusão, transparência e responsabilidade. Nunca insira dados confidenciais da empresa em ferramentas sem proteção corporativa.</p>
`
  },
  {
    id: "six-sigma-excel-python",
    title: "Six Sigma com Excel e Python no Excel: análise de capabilidade",
    category: "Lean & Qualidade",
    cover: "cover-lean",
    icon: "📈",
    date: "2026-07-29",
    readTime: 8,
    excerpt:
      "Calcule Cp, Cpk e visualize a distribuição do processo usando o recurso Python no Excel, sem instalar nada.",
    content: `
<p>Como Black Belt, sei que muitos projetos Six Sigma travam na etapa de <strong>Medir</strong>, por falta de software estatístico. A boa notícia: o <strong>Python no Excel</strong> (Microsoft 365) resolve boa parte disso.</p>

<h2>Índices de capabilidade</h2>
<table>
  <tr><th>Índice</th><th>Fórmula</th><th>Interpretação</th></tr>
  <tr><td>Cp</td><td>(LSE − LIE) ÷ 6σ</td><td>Potencial do processo</td></tr>
  <tr><td>Cpk</td><td>mín(LSE − μ, μ − LIE) ÷ 3σ</td><td>Capabilidade real (considera centralização)</td></tr>
</table>
<p>Referência usual: <strong>Cpk ≥ 1,33</strong> para processos capazes.</p>

<h2>Python direto na célula</h2>
<p>Digite <code>=PY(</code> em uma célula e use:</p>
<pre><code>dados = xl("A2:A101")[0]
LIE, LSE = 24.95, 25.05
mu, sigma = dados.mean(), dados.std()
cp  = (LSE - LIE) / (6 * sigma)
cpk = min(LSE - mu, mu - LIE) / (3 * sigma)
f"Cp={cp:.2f} | Cpk={cpk:.2f}"</code></pre>

<h2>Histograma com limites</h2>
<pre><code>import matplotlib.pyplot as plt
plt.hist(dados, bins=15, color="#0078d4")
plt.axvline(LIE, color="red"); plt.axvline(LSE, color="red")
plt.title("Distribuição do diâmetro")</code></pre>
<p>Pronto: estatística de qualidade acessível a qualquer aluno ou analista com Microsoft 365.</p>
`
  },
  {
    id: "programa-microsoft-mvp",
    title: "O que é o Microsoft MVP e como a comunidade técnica é reconhecida",
    category: "Comunidade MVP",
    cover: "cover-mvp",
    icon: "🏆",
    date: "2026-07-15",
    readTime: 6,
    excerpt:
      "Entenda o programa Most Valuable Professional da Microsoft, as áreas de reconhecimento e como contribuições para a comunidade são avaliadas.",
    content: `
<p>O <strong>Microsoft Most Valuable Professional (MVP)</strong> é o reconhecimento que a Microsoft concede a especialistas que compartilham, de forma voluntária, conhecimento técnico com a comunidade. Não é uma certificação: é um prêmio por <em>contribuição</em>.</p>

<h2>Quem pode ser MVP?</h2>
<p>Profissionais de qualquer área — professores, consultores, desenvolvedores, administradores — que produzem conteúdo de qualidade e impacto sobre tecnologias Microsoft, como Azure, Microsoft 365, Power Platform, Data Platform, Security e AI.</p>

<h2>Quais contribuições contam?</h2>
<ul>
  <li><strong>Conteúdo escrito</strong>: artigos, blogs, documentação, livros;</li>
  <li><strong>Palestras</strong>: eventos, meetups, webinars, aulas abertas;</li>
  <li><strong>Vídeos e podcasts</strong> técnicos;</li>
  <li><strong>Código aberto</strong> e exemplos no GitHub;</li>
  <li><strong>Mentoria e organização</strong> de comunidades e grupos de usuários;</li>
  <li>Respostas em fóruns como Microsoft Q&amp;A e Tech Community.</li>
</ul>

<h2>Como funciona a indicação</h2>
<p>A candidatura normalmente começa com a <strong>indicação por um MVP ou por um profissional da Microsoft</strong>. Depois, o candidato registra suas contribuições dos últimos meses, que são avaliadas quanto a relevância, alcance e qualidade técnica.</p>

<h2>Por que este blog existe</h2>
<p>Este espaço é parte do meu compromisso de <strong>compartilhar conhecimento sobre tecnologias Microsoft aplicadas à indústria e à educação</strong>. Cada artigo, laboratório e palestra registrado aqui é uma contribuição para a comunidade — e um convite para que alunos e colegas façam o mesmo.</p>

<blockquote>Saiba mais na página oficial: <a href="https://mvp.microsoft.com/" target="_blank" rel="noopener">mvp.microsoft.com</a>.</blockquote>
`
  }
];
