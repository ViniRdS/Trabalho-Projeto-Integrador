import React from 'react';
import '../assets/css/create.css'; // Importe o arquivo CSS aqui
import Create from '../components/create.component';// Importa o componente Cadastro do arquivo create.component.js

export default function CadastroPage() {
    return (
        <div className="cadastro-container"> {/* Adicione uma classe para o container do seu componente */}
            <Create/>
        </div>
    );
}

