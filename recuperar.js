const formRecover = document.getElementById('form-recover');
const formReset = document.getElementById('form-reset');
const recoverEmailArea = document.getElementById('recoverEmailArea');
const resetPasswordArea = document.getElementById('resetPasswordArea');

let usuarioAtual = null;

formRecover.addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('recover-email').value.trim();

  if (!email) {
    alert('Informe o e-mail.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/usuarios?email=${email}`);
    const users = await response.json();

    if (users.length > 0) {
      usuarioAtual = users[0];
      recoverEmailArea.style.display = 'none';
      resetPasswordArea.style.display = 'block';
    } else {
      alert('E-mail não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    alert('Erro ao conectar com o servidor.');
  }
});

formReset.addEventListener('submit', async function(e) {
  e.preventDefault();
  const novaSenha = document.getElementById('new-password').value.trim();

  if (!novaSenha) {
    alert('Digite a nova senha.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/usuarios/${usuarioAtual.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha: novaSenha })
    });

    if (response.ok) {
      alert('Senha redefinida com sucesso!');
      window.location = 'index.html';
    } else {
      alert('Erro ao atualizar senha.');
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    alert('Erro ao redefinir senha.');
  }
});
