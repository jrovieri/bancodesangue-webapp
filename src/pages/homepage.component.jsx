import React from 'react';


const Homepage = () => (
  <div className='homepage'>
    <h2>Bem-vindo ao App Banco de Sangue</h2>
    <p>Há dois usuários cadastrados no sistemas: <b>admin</b> e <b>user</b>. As senhas são, respectivamente, iguais ao nome do usuário.</p>
    <p>O usuário <b>admin</b> dá acesso a aba Candidatos que permite carregar dados, já o usuário <b>user</b> permite apenas visualizar os dados estatísticos.</p>
  </div>
);

export default Homepage;