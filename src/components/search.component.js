import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../assets/css/search.css';
import poster from '../assets/images/poster_placeholder.jpg';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const { searchQuery } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [renderedResults, setRenderedResults] = useState([]);
    const location = useLocation();
     // Hook useNavigate para navegação programática
     const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const results = JSON.parse(decodeURIComponent(searchParams.get('results')));
        setSearchResults(results);
    }, [location.search]); // Agora depende da string de busca, que inclui o parâmetro 'key'

    // Função para dividir os resultados em grupos de cinco
    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

     // Função para lidar com o clique na imagem do filme
     const handleMovieClick = (id) => {
        navigate(`/detail/${id}`);
    };
    // Função assíncrona para obter o URL da imagem ou do placeholder
    const getImageUrl = async (imageUrl) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imageUrl;
            img.onload = function() {
                if (this.width < 10) {
                    // Se a largura for menor que 10px, retorna o URL do placeholder
                    resolve(poster);
                } else {
                    // Caso contrário, retorna o URL da imagem original
                    resolve(imageUrl);
                }
            };
            img.onerror = function() {
                // Em caso de erro, retorna o URL do placeholder
                reject(poster);
            };
        });
    };

    // Função para carregar os resultados com os URLs das imagens resolvidos
    const loadResults = async () => {
        const loadedResults = await Promise.all(searchResults.map(async (result) => {
            const imageUrl = await getImageUrl(result.image_url);
            return {
                ...result,
                image_url: imageUrl
            };
        }));
        setRenderedResults(loadedResults);
    };

    useEffect(() => {
        loadResults();
    }, [searchResults]);

    return (
        <div className='container-search'>
            <h1 class="txt">Resultados da Pesquisa: {searchQuery}</h1>
            <div className='sub-container-search'>
                {chunkArray(renderedResults, 8).map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((result) => (
                            <div key={result.id} className="col search" onClick={() => handleMovieClick(result.id)}>
                                <div id={result.id} class="titulos">
                                    <img src={result.image_url} alt={result.name} />
                                    <h2 class="txt" id="nomeTitulo">{result.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            
        </div>
    );
}