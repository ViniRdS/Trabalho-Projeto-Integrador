// Importando o React
import React from 'react';


import Search from "../components/search.component";

// Definindo o componente SearchResultsPage como uma função de componente de React
export default function SearchResultsPage() {
    return (
        // Utilizando um Fragment do React para envolver os componentes sem adicionar elementos extras ao DOM
        <React.Fragment>
            {/* Renderiza o componente Search */}
            <Search/>
        </React.Fragment>
    );
}
