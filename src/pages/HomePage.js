// Importando o React
import React from 'react';

// Importando os componentes NewTitle e SubContainer
import NewTitle from "../components/newTitle.component";
import SubContainer from "../components/subContainer.component";

// Definindo o componente Home como uma função de componente de React
export default function Home() {
    return (
        // Utilizando um Fragment do React para envolver os componentes sem adicionar elementos extras ao DOM
        <React.Fragment>
            {/* Renderiza o componente NewTitle */}
            <NewTitle/>
            {/* Renderiza o componente SubContainer */}
            <SubContainer/>
        </React.Fragment>
    );
}
