import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function SearchResultsPage() {
    const { searchQuery } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const results = JSON.parse(decodeURIComponent(searchParams.get('results')));
        setSearchResults(results);
    }, [location.search]); // Agora depende da string de busca, que inclui o parâmetro 'key'


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
