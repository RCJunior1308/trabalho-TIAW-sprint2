const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener('submit', async function(e){
  e.preventDefault();

  const nome = document.getElementById('cadastro-nome').value.trim();
  const email = document.getElementById('cadastro-email').value.trim();
  const senha = document.getElementById('cadastro-senha').value.trim();

  if(!nome || !email || !senha){
    alert('Preencha todos os campos.');
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/usuarios?email=${email}`);
    const data = await res.json();

    if(data.length > 0){
      alert('E-mail já cadastrado.');
      return;
    }

    await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    alert('Conta criada com sucesso!');
    window.location = 'index.html';
  } catch (error) {
    console.error(error);
    alert('Erro ao criar conta.');
  }
});
