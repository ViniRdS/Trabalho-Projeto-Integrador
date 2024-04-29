import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header.component.js';
import Home from './pages/HomePage.js';
import SearchResultsPage from './pages/SearchResultsPage.js';
import DetailPage from './pages/DetailPage.js';
import LoginPage from './pages/LoginPage.js'; // Importe o componente Login
import CadastroPage from './pages/CadastroPage.js'; // Importe o componente Cadastro
import FavoritePage from './pages/FavoritePage.js'; // Importe o componente Favorito

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/search-results/:query" element={<SearchResultsPage/>} /> {/* Nova rota para os resultados da pesquisa */}
                    <Route path="/detail/:id" element={<DetailPage/>} /> {/* Rota de detalhe dos titulos*/}
                    <Route path="/login" element={<LoginPage/>} /> {/* Adicione a rota para o Login */}
                    <Route path="/cadastro" element={<CadastroPage />} /> {/* Adicione a rota para o Cadastro */}
                    <Route path="/favorite" element={<FavoritePage />} /> {/* Adicione a rota para o Favorito */}
                 
                </Routes>
            </Router>
        </div>
    );
}

export default App;
