export default function autenticar(requisicao,resposta){
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario == 'admin' && senha == 'admin'){
      resposta.redirect('/menu.html');
    }
    else {
      resposta.write('<html>');
      resposta.write('<head>');
      resposta.write('<title> Falha </title>');
      resposta.write('<meta charset = "utf-8">')
      resposta.write('</head>');
      resposta.write('<body>');
      resposta.write('<p>Usuário ou senha inválidos</p>');
      resposta.write('<a href = "/login.html">Voltar</a>');
      resposta.write('</body>');
      resposta.write('</html>');
      resposta.end();
    }
  }