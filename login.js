const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', async function(e){
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value.trim();

  if(!email || !senha){
    alert('Preencha todos os campos.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/usuarios?email=${email}&senha=${senha}`);
    const users = await response.json();

    if(users.length > 0){
      const user = users[0];

      sessionStorage.setItem('usuarioLogado', JSON.stringify(user));

      alert('Login realizado com sucesso!');
      window.location = 'dashboard.html'; 
    } else {
      alert('E-mail ou senha incorretos.');
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    alert('Erro de conexão. Tente novamente mais tarde.');
  }
});
