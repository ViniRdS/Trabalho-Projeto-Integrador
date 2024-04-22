import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header.component.js';
import Home from './pages/HomePage.js';
import SearchResultsPage from './pages/SearchResultsPage.js';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/search-results/:query" element={<SearchResultsPage />} /> {/* Nova rota para os resultados da pesquisa */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;