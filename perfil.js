const formPerfil = document.getElementById('form-perfil');
const perfilNome = document.getElementById('perfil-nome');
const perfilEmail = document.getElementById('perfil-email');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');
const logoutBtn = document.getElementById('logoutBtn');

let usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

function carregarPerfil() {
  if (!usuarioLogado || !usuarioLogado.id) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location = 'login.html'; 
    return;
  }
  perfilNome.value = usuarioLogado.nome;
  perfilEmail.value = usuarioLogado.email;
}

formPerfil.addEventListener('submit', async function(e) {
  e.preventDefault();

  const novoNome = perfilNome.value.trim();

  if (!novoNome) {
    alert('O nome não pode estar vazio.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/usuarios/${usuarioLogado.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoNome })
    });

    if (response.ok) {
      usuarioLogado.nome = novoNome;
      sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

      alert('Perfil atualizado com sucesso!');
    }
    else {
      alert('Erro ao atualizar o perfil.');
    }
  } 
  catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    alert('Erro de conexão. Tente novamente mais tarde.');
  }
});
deleteAccountBtn.addEventListener('click', async function() {
  if (!confirm('Tem certeza que deseja EXCLUIR sua conta? Esta ação é irreversível.')) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/usuarios/${usuarioLogado.id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      sessionStorage.removeItem('usuarioLogado'); 
      alert('Conta excluída com sucesso.');
      window.location = 'index.html'; 
    } else {
      alert('Erro ao excluir a conta.');
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    alert('Erro de conexão. Tente novamente mais tarde.');
  }
});

logoutBtn.addEventListener('click', function() {
  sessionStorage.removeItem('usuarioLogado');
  alert('Você saiu da sua conta.');
  window.location = 'login.html';
});

carregarPerfil();