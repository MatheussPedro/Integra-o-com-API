// Troque pela URL base correta da sua API
const API_BASE_URL = 'https://SEU_BACKEND_URL'; // Exemplo: https://api.umfg.com

// Alterna o layout entre login e cadastro
var body = document.querySelector("body");
var signInButton = document.querySelector("#signIn");
var signUpButton = document.querySelector("#signUp");

body.onload = function () {
    body.className = "on-load";
};

signInButton.addEventListener("click", function () {
    body.className = "sign-in";
});

signUpButton.addEventListener("click", function () {
    body.className = "sign-up";
});

// =========================
// Cadastro de usuário
// =========================
document.querySelector('#register').addEventListener('click', async function (e) {
    e.preventDefault();

    const email = document.querySelector('#register-email').value.trim();
    const senha = document.querySelector('#register-senha').value;
    const senhaConfirmada = document.querySelector('#register-confirmar-senha').value;

    if (!email || !senha || !senhaConfirmada) {
        alert('Preencha todos os campos!');
        return;
    }

    if (senha !== senhaConfirmada) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/Autenticacao/registar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha, senhaConfirmada })
        });

        const resultText = await response.text();

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            // Redireciona para a tela de boas-vindas sem token (cadastro não retorna token)
            window.location.href = `welcome.html?email=${encodeURIComponent(email)}&token=--&expira=--`;
        } else {
            alert(resultText);
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
});

// =========================
// Login de usuário
// =========================
document.querySelector('#access').addEventListener('click', async function (e) {
    e.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const senha = document.querySelector('#login-senha').value;

    if (!email || !senha) {
        alert('Preencha todos os campos!');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/Autenticacao/autenticar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Login realizado com sucesso!');
            const token = result.token;
            const expira = result.dataExpiracao;
            window.location.href = `welcome.html?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}&expira=${encodeURIComponent(expira)}`;
        } else {
            const errorText = await response.text();
            alert(errorText);
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
});