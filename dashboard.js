const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
  alert('Você precisa estar logado para acessar esta página.');
  window.location = 'login.html';
} else {

  document.getElementById('nome-usuario').textContent = usuarioLogado.nome;
}

document.getElementById('btnSair').addEventListener('click', () => {
  sessionStorage.removeItem('usuarioLogado');
  window.location = 'homepage.html';
});
