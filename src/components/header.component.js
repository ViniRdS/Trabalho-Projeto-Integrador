// Importando React e hooks necessários
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import { searchTitles } from '../services/titles.http.service';
import '../assets/css/header.css';

// Definindo o componente Header como uma função de componente de React
export default function Header() {
    const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o termo de pesquisa
    const navigate = useNavigate(); // Hook useNavigate para navegação programática

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const results = await searchTitles(searchQuery);
            console.log(results);
            // Redirecionar para a página de resultados de pesquisa com o termo de pesquisa como parâmetro de rota
            navigate(`/search-results/${searchQuery}`);
        } catch (error) {
            console.error('Erro ao buscar resultados:', error);
        }
    };

    return (
        <header className="header">
            <div className="container">
                <h1>
                    <span style={{ color: '#D90429', fontSize: '25px', fontWeight: 'bold' }}>BUSCA</span>
                    <span style={{ color: '#EDF2F4', fontSize: '25px', fontWeight: 'bold' }}>FLIX</span>
                </h1>
                <div className="search-container">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Qual título está buscando?"
                            className="search"
                        />
                        <button type="submit" className="search-button">
                            <Search color="#000000" className="search-icon" />
                        </button>
                    </form>
                </div>
                <button className="enter-button">Entrar</button>
            </div>
        </header>
    );
}
