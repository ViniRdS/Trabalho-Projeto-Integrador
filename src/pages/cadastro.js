    import React from 'react';
    import '../assets/css/create.css'; // Importe o arquivo CSS aqui
    import Cadastro from '../components/create.component'; // Importa o componente Cadastro do arquivo create.component.js

    function CadastroPage() {
    return (
        <div className="cadastro-container"> {/* Adicione uma classe para o container do seu componente */}
        <Cadastro />
        </div>
    );
    }

    export default CadastroPage;
