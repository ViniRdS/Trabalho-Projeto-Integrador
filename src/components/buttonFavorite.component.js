import React, { useState, useEffect } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import { getFavoriteId, saveFavorite, deleteFavorite } from '../services/users.http.service';

export default function ButtonFavorite({ data }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('id');
        setIsLoggedIn(id !== null);
    }, []);

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const userId = localStorage.getItem('id');
                const favorites = await getFavoriteId();

                // Verifica se o título está presente nos favoritos do usuário
                const foundFavorite = favorites.find(favorite => favorite.title === data.title);
                if (foundFavorite) {
                    setIsFavorite(true);
                    setFavoriteId(foundFavorite._id); // Armazena o ID do favorito encontrado
                } else {
                    setIsFavorite(false);
                    setFavoriteId(null);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (isLoggedIn) {
            checkFavorite(); // Executa a verificação inicial
            const intervalId = setInterval(checkFavorite, 250); // Verifica a cada 1 minuto
            return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
        }
    }, [isLoggedIn, data.title]);

    const handleFavoriteClick = async () => {
        try {
            if (!isFavorite) {
                // Se não estiver salvo como favorito, salvar
                const response = await saveFavorite(data);
               
                    // Se a operação for bem-sucedida, atualizar o estado 'isFavorite' e guardar o ID do favorito
                    setIsFavorite(true);
                    setFavoriteId(response._id); // Supondo que o ID do favorito retornado pela API seja _id
               
            } else {
                // Se já estiver salvo como favorito, deletar
                await deleteFavorite(favoriteId);
                // Se a operação for bem-sucedida, atualizar o estado 'isFavorite' e resetar o ID do favorito
                setIsFavorite(false);
                setFavoriteId(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isLoggedIn && (
                    <button className='favorite-button' onClick={handleFavoriteClick} style={{ backgroundColor: isFavorite ? '#D90429' : '#8D99AE' }}>
                        <HeartFill size={28}  color="#2B2D42"/>
                    </button>
                
            )}
        </>
    );
}
