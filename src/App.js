import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header.component.js';
import Home from './pages/HomePage.js';
import SearchResultsPage from './pages/SearchResultsPage.js';
import DetailPage from './pages/DetailPage.js';
import LoginPage from './pages/LoginPage.js';
import CadastroPage from './pages/CadastroPage.js';
import FavoritePage from './pages/FavoritePage.js';
import ProtectedRoute from './components/ProtectedRoute.component.js'; // Importe o componente ProtectedRoute

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/search-results/:query" element={<SearchResultsPage/>} />
                    <Route path="/detail/:id" element={<DetailPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/cadastro" element={<CadastroPage />} />
                    <Route 
                        path="/favorite" 
                        element={
                            <ProtectedRoute>
                                <FavoritePage />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
