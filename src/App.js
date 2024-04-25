import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header.component.js';
import Home from './pages/HomePage.js';
import Search from './components/search.component.js';
import DetailPage from './pages/DetailPage.js';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/search-results/:query" element={<Search />} /> {/* Nova rota para os resultados da pesquisa */}
                    <Route path="/detail/:id" element={<DetailPage/>} /> {/* Rota de detalhe dos titulos*/}
                </Routes>
            </Router>
        </div>
    );
}

export default App;