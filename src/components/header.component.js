// Importando React e hooks necessários
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação
import { Search } from 'react-bootstrap-icons'; // Importa o ícone de pesquisa da biblioteca react-bootstrap-icons
import { searchTitles } from '../services/titles.http.service'; // Importa a função de busca de títulos
import '../assets/css/header.css'; // Importa o estilo CSS do cabeçalho
import ButtonLogin from './buttonLogin.component'; // Importa o componente ButtonLogin

// Definindo o componente Header como uma função de componente de React
export default function Header() {
    const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a consulta de pesquisa
    const [searchKey, setSearchKey] = useState(Date.now()); // Estado para atualizar a chave de pesquisa
    const navigate = useNavigate(); // Inicializa o hook useNavigate para navegação

    // Função para lidar com a pesquisa
    const handleSearch = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página
        setSearchKey(Date.now()); // Atualiza a chave de pesquisa com um novo valor
        try {
            // Chama a função de busca de títulos passando a consulta de pesquisa
            const results = await searchTitles(searchQuery);
            const encodedResults = encodeURIComponent(JSON.stringify(results)); // Codifica os resultados em uma string para passar pela URL
            // Navega para a página de resultados de pesquisa com os resultados e a chave de pesquisa como parâmetros na URL
            navigate(`/search-results/${searchQuery}?results=${encodedResults}&key=${searchKey}`);
        } catch (error) {
            console.error('Erro ao buscar resultados:', error);
        }
    };

    // Renderiza o componente Header
    return (
        <header className="header"> {/* Elemento de cabeçalho com classe 'header' */}
            <div className="container"> {/* Div com classe 'container' */}
                <h1 onClick={()=>navigate(`/`)}>
                    {/* Título do aplicativo */}
                    <span style={{ color: '#D90429', fontSize: '25px', fontWeight: 'bold' }}>BUSCA</span>
                    <span style={{ color: '#EDF2F4', fontSize: '25px', fontWeight: 'bold' }}>FLIX</span>
                </h1>
                <div className="search-container"> {/* Div com classe 'search-container' para o campo de pesquisa */}
                    <form onSubmit={handleSearch}> {/* Formulário para a pesquisa */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Qual título está buscando?" // Placeholder do campo de pesquisa
                            className="search" // Classe do campo de pesquisa
                        />
                        <button type="submit" className="search-button"> {/* Botão de pesquisa */}
                            <Search color="#000000" className="search-icon" /> {/* Ícone de pesquisa */}
                        </button>
                    </form>
                </div>
                {/* Renderiza o componente ButtonLogin */}
                <ButtonLogin/> {/* Botão de login */}
            </div>
        </header>
    );
}
