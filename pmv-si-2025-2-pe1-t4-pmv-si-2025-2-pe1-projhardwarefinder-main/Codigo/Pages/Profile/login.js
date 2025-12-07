// login.js

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      alert('E-mail inválido.');
      return;
    }

    // Simulação de autenticação básica
    if (email === 'usuario@exemplo.com' && senha === '123456') {
      window.location.href = 'profile.html'; // Redireciona para o perfil
    } else {
      alert('E-mail ou senha incorretos.');
    }
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
