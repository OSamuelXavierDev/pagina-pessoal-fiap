function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav a');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });


    document.addEventListener('click', (e) => {
        if (!e.target.closest('header')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove('active');
                    otherButton.nextElementSibling.style.maxHeight = null;
                }
            });

            button.classList.toggle('active');
            const content = button.nextElementSibling;

            if (button.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });
}

function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');

    if (!scrollButton) return;

    // Mostrar/esconder botão conforme o scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });

    // Ação de scroll ao topo
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// VALIDAÇÃO DE FORMULÁRIO
// ============================================

// Funções de validação
function validarNome(nome) {
    return nome.trim().length >= 3;
}

function validarEmail(email) {
    // Regex para validar email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email.trim());
}

function validarMensagem(mensagem) {
    return mensagem.trim().length >= 10;
}

// Função para exibir erro
function exibirErro(inputId, mensagem) {
    const input = document.getElementById(inputId);
    const erroElement = document.getElementById(`erro-${inputId}`);
    
    input.classList.remove('success');
    input.classList.add('error');
    erroElement.textContent = mensagem;
}

// Função para limpar erro
function limparErro(inputId) {
    const input = document.getElementById(inputId);
    const erroElement = document.getElementById(`erro-${inputId}`);
    
    input.classList.remove('error');
    input.classList.add('success');
    erroElement.textContent = '';
}

// Função para validar o formulário completo
function validarFormulario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    
    let valido = true;
    
    // Validar nome
    if (!validarNome(nome)) {
        exibirErro('nome', 'Nome deve ter pelo menos 3 caracteres e conter apenas letras');
        valido = false;
    } else {
        limparErro('nome');
    }
    
    // Validar email
    if (!validarEmail(email)) {
        exibirErro('email', 'Digite um e-mail válido (exemplo@dominio.com)');
        valido = false;
    } else {
        limparErro('email');
    }
    
    // Validar mensagem
    if (!validarMensagem(mensagem)) {
        exibirErro('mensagem', 'Mensagem deve ter pelo menos 10 caracteres');
        valido = false;
    } else {
        limparErro('mensagem');
    }
    
    return valido;
}

// Função para exibir modal de sucesso
function exibirModalSucesso(nome) {
    const modal = document.getElementById('modalSucesso');
    const mensagemModal = document.getElementById('modalMensagem');
    
    mensagemModal.textContent = `Obrigado por entrar em contato, ${nome}! Retornarei em breve.`;
    modal.classList.add('show');
}

// Função para fechar modal
function fecharModalSucesso() {
    const modal = document.getElementById('modalSucesso');
    modal.classList.remove('show');
}

// Função para resetar formulário
function resetarFormulario() {
    const form = document.getElementById('formContato');
    const campos = form.querySelectorAll('input, textarea');
    
    form.reset();
    
    campos.forEach(campo => {
        campo.classList.remove('error', 'success');
        const erroElement = document.getElementById(`erro-${campo.id}`);
        if (erroElement) {
            erroElement.textContent = '';
        }
    });
}

// Função para inicializar o formulário
function initFormulario() {
    const form = document.getElementById('formContato');
    const modal = document.getElementById('modalSucesso');
    
    if (!form) return;
    
    // Event listener para envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validar formulário
        if (validarFormulario()) {
            // Dados do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Log dos dados a serem enviados
            const dados = {
                nome: nome,
                email: email,
                mensagem: mensagem,
                data: new Date().toLocaleString('pt-BR')
            };
            
            console.log('✓ Mensagem enviada com sucesso!');
            console.log('Dados do usuário:', dados);
            console.log('═'.repeat(50));
            
            // Simular envio do formulário
            console.log('📤 Enviando dados para o servidor...');
            
            // Exibir modal de sucesso
            exibirModalSucesso(nome);
            
            // Fechar modal e resetar após 3 segundos
            setTimeout(() => {
                fecharModalSucesso();
                resetarFormulario();
            }, 3000);
        } else {
            console.log('✗ Formulário inválido. Por favor, corrija os erros.');
        }
    });
    
    // Fechar modal ao clicar fora dele
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharModalSucesso();
            }
        });
    }
    
    // Validação em tempo real
    const campos = form.querySelectorAll('input, textarea');
    campos.forEach(campo => {
        campo.addEventListener('blur', () => {
            const id = campo.id;
            const valor = campo.value;
            
            if (id === 'nome' && valor.trim().length > 0) {
                if (validarNome(valor)) {
                    limparErro('nome');
                } else {
                    exibirErro('nome', 'Nome deve ter pelo menos 3 caracteres');
                }
            } else if (id === 'email' && valor.trim().length > 0) {
                if (validarEmail(valor)) {
                    limparErro('email');
                } else {
                    exibirErro('email', 'Digite um e-mail válido');
                }
            } else if (id === 'mensagem' && valor.trim().length > 0) {
                if (validarMensagem(valor)) {
                    limparErro('mensagem');
                } else {
                    exibirErro('mensagem', 'Mensagem deve ter pelo menos 10 caracteres');
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAccordion();
    initScrollToTop();
    initFormulario();
    console.log('✓ Interações JavaScript carregadas com sucesso!');
});
