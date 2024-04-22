import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { searchTitles } from '../services/titles.http.service';

export default function SearchResultsPage() {
    const { searchQuery } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const results = await searchTitles(decodeURIComponent(searchQuery));
                setSearchResults(results);
            } catch (error) {
                console.error('Erro ao buscar resultados:', error);
            }
        };

        fetchSearchResults();
    }, [searchQuery]); 

    return (
        <div>
            <h1>Resultados da Pesquisa para: {searchQuery}</h1>
            <div>
                {searchResults.map((result) => (
                    <div key={result.id}>
                        <h2>{result.name}</h2>
                        <img src={result.image_url} />
                    </div>
                ))}
            </div>
        </div>
    );
}
