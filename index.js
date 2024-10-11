import express from 'express';
import autenticar from './seguranca/autenticar.js';

const host = '0.0.0.0';

const porta = 3000;
const app = express();


app.use(express.urlencoded ({extended:true}));

app.use(express.static('./publico'));
app.use(express.static('./privado'));

app.get('/login',(requisicao,resposta) => {resposta.redirect('/login.html');
  
    
});

app.post('/login',autenticar);


app.listen(porta,host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});