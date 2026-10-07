// Localiza o botão usado para abrir e fechar o menu em telas pequenas.
const menuToggle = document.querySelector('.menu-toggle');
// Localiza a área que contém os links de navegação do site.
const siteNav = document.querySelector('.site-nav');

// Registra o que deve acontecer quando o botão do menu for acionado.
menuToggle.addEventListener('click', () => {
  // Lê o atributo acessível que informa se o menu está aberto.
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  // Inverte e atualiza o estado acessível do botão.
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  // Atualiza o nome do botão para leitores de tela.
  menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
  // Adiciona ou remove a classe que mostra o menu móvel.
  siteNav.classList.toggle('is-open', !isExpanded);
});

// Encontra cada link do menu para configurar seu comportamento ao ser escolhido.
siteNav.querySelectorAll('a').forEach((link) => {
  // Registra uma ação para cada link encontrado.
  link.addEventListener('click', () => {
    // Fecha o menu depois que a pessoa escolhe uma seção da página.
    menuToggle.setAttribute('aria-expanded', 'false');
    // Restaura o nome acessível do botão para o estado fechado.
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    // Remove a classe que mantém o menu móvel visível.
    siteNav.classList.remove('is-open');
  });
});

// Guarda os textos e os dados das pessoas exibidas no slider de depoimentos.
const testimonials = [
  {
    // Define o texto do primeiro depoimento.
    quote: '“A API da CheckSpeech AI nos ajuda a entender melhor nossos clientes e melhorar nossos serviços.”',
    // Define quem deu o primeiro depoimento.
    author: 'Juliana Martins',
    // Define o cargo e a empresa da primeira pessoa.
    role: 'CEO da NovaTech'
  },
  {
    // Define o texto do segundo depoimento.
    quote: '“As legendas em tempo real tornaram nossos treinamentos mais acessíveis para toda a equipe.”',
    // Define quem deu o segundo depoimento.
    author: 'Rafael Costa',
    // Define o cargo e a empresa da segunda pessoa.
    role: 'Diretor de Pessoas, Atlas'
  },
  {
    // Define o texto do terceiro depoimento.
    quote: '“Conseguimos ouvir milhares de interações e transformar conversas em decisões melhores.”',
    // Define quem deu o terceiro depoimento.
    author: 'Camila Nunes',
    // Define o cargo e a empresa da terceira pessoa.
    role: 'Head de Experiência, GlobalBank'
  }
];
// Guarda a posição do depoimento que está sendo mostrado, começando pelo primeiro.
let activeTestimonial = 0;
// Localiza o elemento HTML que recebe o texto do depoimento.
const quoteElement = document.querySelector('#story-quote');
// Localiza o elemento HTML que recebe o nome da pessoa.
const authorElement = document.querySelector('#story-author');
// Localiza o elemento HTML que recebe o cargo e a empresa.
const roleElement = document.querySelector('#story-role');
// Cria uma lista com os botões que selecionam diretamente cada depoimento.
const testimonialDots = [...document.querySelectorAll('[data-dot]')];

// Mostra no site o depoimento correspondente ao índice recebido.
function showTestimonial(index) {
  // Mantém o índice dentro dos limites e permite voltar do primeiro ao último.
  activeTestimonial = (index + testimonials.length) % testimonials.length;
  // Obtém os dados do depoimento selecionado.
  const testimonial = testimonials[activeTestimonial];
  // Atualiza o texto do depoimento na página.
  quoteElement.textContent = testimonial.quote;
  // Atualiza o nome da pessoa na página.
  authorElement.textContent = testimonial.author;
  // Atualiza o cargo e a empresa na página.
  roleElement.textContent = testimonial.role;
  // Percorre os indicadores para destacar aquele que corresponde ao depoimento atual.
  testimonialDots.forEach((dot, dotIndex) => {
    // Aplica a classe visual ativa somente ao indicador selecionado.
    dot.classList.toggle('active', dotIndex === activeTestimonial);
    // Informa aos recursos de acessibilidade qual indicador está selecionado.
    dot.setAttribute('aria-current', dotIndex === activeTestimonial ? 'true' : 'false');
  });
}

// Localiza os botões de avançar e voltar do slider.
document.querySelectorAll('[data-slide]').forEach((button) => {
  // Configura o clique de cada botão de navegação.
  button.addEventListener('click', () => {
    // Avança uma posição ou volta uma posição, de acordo com o botão clicado.
    showTestimonial(activeTestimonial + (button.dataset.slide === 'next' ? 1 : -1));
  });
});
// Configura os pontos para que cada um abra diretamente seu depoimento.
testimonialDots.forEach((dot) => {
  // Ao clicar, converte o índice do atributo HTML para número e exibe o depoimento.
  dot.addEventListener('click', () => showTestimonial(Number(dot.dataset.dot)));
});

// Localiza o formulário de contato.
const form = document.querySelector('#contact-form');
// Localiza a área onde aparecem as mensagens de sucesso ou erro do formulário.
const formStatus = document.querySelector('#form-status');
// Obtém o campo de mensagem pelo seu atributo name dentro do formulário.
const messageInput = form.elements.message;
// Localiza o elemento que mostra quantos caracteres foram digitados.
const messageCount = document.querySelector('#message-count');
// Localiza o texto da pergunta matemática do captcha.
const captchaQuestion = document.querySelector('#captcha-question');
// Obtém o campo em que a pessoa digita a resposta do captcha.
const captchaAnswer = form.elements.captcha;
// Armazena a resposta correta da pergunta matemática atual.
let captchaTotal;

// Gera uma conta simples e guarda a resposta esperada durante esta visita.
function refreshCaptcha() {
  // Sorteia o primeiro número da conta, entre 2 e 9.
  const firstNumber = Math.floor(Math.random() * 8) + 2;
  // Sorteia o segundo número da conta, entre 1 e 8.
  const secondNumber = Math.floor(Math.random() * 8) + 1;
  // Calcula e guarda o resultado correto.
  captchaTotal = firstNumber + secondNumber;
  // Mostra a pergunta atual no formulário.
  captchaQuestion.textContent = `${firstNumber} + ${secondNumber}`;
  // Apaga qualquer resposta anterior ao trocar a pergunta.
  captchaAnswer.value = '';
  // Limpa uma mensagem de erro antiga do captcha.
  document.querySelector('.captcha-error').textContent = '';
}

// Permite gerar uma nova pergunta ao clicar no botão de atualizar captcha.
document.querySelector('.captcha-refresh').addEventListener('click', refreshCaptcha);
// Atualiza o contador enquanto a mensagem é digitada.
messageInput.addEventListener('input', () => {
  // Exibe o total de caracteres que há atualmente no campo de mensagem.
  messageCount.textContent = messageInput.value.length;
});

// Mostra ou remove a mensagem de erro associada a um campo do formulário.
function setFieldError(field, message) {
  // Encontra o contêiner visual do campo recebido.
  const wrapper = field.closest('.field');
  // Encerra a função caso o elemento não esteja dentro de um contêiner de campo.
  if (!wrapper) return;
  // Mostra o estilo de erro quando há mensagem e remove quando ela está vazia.
  wrapper.classList.toggle('invalid', Boolean(message));
  // Escreve a mensagem de validação na área de erro do campo.
  wrapper.querySelector('.field-error').textContent = message;
}

// Seleciona os campos que podem ser corrigidos e ouve mudanças feitas neles.
form.querySelectorAll('input:not([type="checkbox"]), select, textarea').forEach((field) => {
  // Limpa o erro quando a pessoa começa a digitar no campo.
  field.addEventListener('input', () => setFieldError(field, ''));
  // Limpa o erro quando a pessoa altera uma seleção ou valor do campo.
  field.addEventListener('change', () => setFieldError(field, ''));
});

// Executa esta validação quando a pessoa tenta enviar o formulário.
form.addEventListener('submit', (event) => {
  // Impede o envio padrão do navegador, pois a página ainda não tem backend conectado.
  event.preventDefault();
  // Remove a mensagem de status de uma tentativa anterior.
  formStatus.textContent = '';
  // Remove o estilo que indica uma mensagem de erro anterior.
  formStatus.classList.remove('error');
  // Assume que os dados estão corretos até que alguma regra encontre um problema.
  let isValid = true;

  // Verifica os campos obrigatórios e aproveita as regras de validação nativas do HTML.
  ['name', 'email', 'country'].forEach((name) => {
    // Obtém o campo atual usando o nome definido no HTML.
    const field = form.elements[name];
    // Começa sem mensagem de erro para este campo.
    let error = '';
    // Informa erro se o campo estiver vazio ou contiver apenas espaços.
    if (!field.value.trim()) error = 'Este campo é obrigatório.';
    // Verifica regras nativas, como o formato esperado de um endereço de e-mail.
    else if (!field.checkValidity()) error = name === 'email' ? 'Informe um e-mail válido.' : 'Confira o valor informado.';
    // Marca o formulário como inválido se foi encontrada uma mensagem de erro.
    if (error) isValid = false;
    // Atualiza a aparência e o texto de erro do campo verificado.
    setFieldError(field, error);
  });

  // Obtém o campo opcional de telefone.
  const phone = form.elements.phone;
  // Valida o telefone apenas se algum valor tiver sido digitado.
  const phoneError = phone.value && !phone.checkValidity() ? 'Informe um telefone válido com código do país, se necessário.' : '';
  // Marca o formulário como inválido quando o telefone preenchido não passa na validação.
  if (phoneError) isValid = false;
  // Mostra ou remove a mensagem de erro do telefone.
  setFieldError(phone, phoneError);

  // Obtém a caixa de seleção de consentimento da política de privacidade.
  const consent = form.elements.consent;
  // Localiza a área onde será exibido o erro de consentimento.
  const consentError = document.querySelector('.consent-error');
  // O consentimento é obrigatório para permitir o envio do formulário.
  consentError.textContent = consent.checked ? '' : 'O consentimento é obrigatório para enviar o formulário.';
  // Marca o formulário como inválido quando a caixa não está selecionada.
  if (!consent.checked) isValid = false;

  // Localiza a área onde será exibido o erro do captcha.
  const captchaError = document.querySelector('.captcha-error');
  // Converte o valor digitado de texto para número antes de comparar.
  const answer = Number(captchaAnswer.value);
  // Aceita somente uma resposta preenchida que seja igual ao resultado guardado.
  captchaError.textContent = captchaAnswer.value && answer === captchaTotal ? '' : 'Resolva a verificação corretamente.';
  // Marca o formulário como inválido se a resposta estiver vazia ou incorreta.
  if (!captchaAnswer.value || answer !== captchaTotal) isValid = false;

  // Executa este bloco quando um ou mais campos não passaram na validação.
  if (!isValid) {
    // Orienta a pessoa a revisar os campos com erro.
    formStatus.textContent = 'Revise os campos destacados antes de enviar.';
    // Aplica o estilo visual de erro à mensagem geral.
    formStatus.classList.add('error');
    // Move o foco para o primeiro campo inválido ou para o consentimento pendente.
    form.querySelector('.invalid input, .invalid select, input[name="consent"]')?.focus();
    // Interrompe o processamento para não exibir a confirmação.
    return;
  }

  // Confirma a validação local; o envio real requer integração com um serviço.
  formStatus.textContent = 'Mensagem validada! A integração de envio precisa ser conectada a um serviço de atendimento.';
  // Limpa os valores do formulário depois da validação bem-sucedida.
  form.reset();
  // Zera o contador da mensagem após limpar o formulário.
  messageCount.textContent = '0';
  // Remove o estilo de erro que possa ter ficado nos campos.
  form.querySelectorAll('.field').forEach((field) => field.classList.remove('invalid'));
  // Apaga os textos de erro de todos os campos.
  form.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
  // Gera uma nova conta para a próxima tentativa de envio.
  refreshCaptcha();
});

// Localiza o aviso de cookies que pode ser mostrado na parte inferior da página.
const cookieBanner = document.querySelector('#cookie-banner');
// Define a chave usada para guardar a escolha no armazenamento do navegador.
const cookieChoiceKey = 'checkspeech-cookie-choice';
// Exibe o aviso somente enquanto não houver uma preferência salva neste navegador.
if (!localStorage.getItem(cookieChoiceKey)) cookieBanner.hidden = false;
// Localiza os botões de escolha disponíveis no aviso de cookies.
document.querySelectorAll('[data-cookie-choice]').forEach((button) => {
  // Configura o comportamento de cada botão de escolha.
  button.addEventListener('click', () => {
    // Persiste a escolha para não mostrar o aviso novamente na próxima visita.
    localStorage.setItem(cookieChoiceKey, button.dataset.cookieChoice);
    // Esconde o aviso depois que a pessoa escolhe uma opção.
    cookieBanner.hidden = true;
  });
});

// Exibe o primeiro depoimento assim que a página é carregada.
showTestimonial(0);
// Cria uma pergunta inicial para o captcha.
refreshCaptcha();