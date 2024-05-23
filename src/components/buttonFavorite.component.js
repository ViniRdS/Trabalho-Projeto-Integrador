import React, { useState, useEffect } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import { getFavoriteId, saveFavorite, deleteFavorite } from '../services/users.http.service';

export default function ButtonFavorite({ data }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        const checkLoginStatus = () => {
            const id = localStorage.getItem('id');
            setIsLoggedIn(id !== null);
        };

        checkLoginStatus();

        window.addEventListener('storage', checkLoginStatus);
        return () => window.removeEventListener('storage', checkLoginStatus);
    }, []);

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const userId = localStorage.getItem('id');
                if (!userId) {
                    setIsFavorite(false);
                    setFavoriteId(null);
                    return;
                }

                const favorites = await getFavoriteId();
                const foundFavorite = favorites.find(favorite => favorite.title === data.title);

                if (foundFavorite) {
                    setIsFavorite(true);
                    setFavoriteId(foundFavorite._id);
                } else {
                    setIsFavorite(false);
                    setFavoriteId(null);
                }
            } catch (error) {
                console.error("Erro ao verificar favorito:", error);
            }
        };

        if (isLoggedIn) {
            checkFavorite();
        } else {
            setIsFavorite(false);
            setFavoriteId(null);
        }
    }, [isLoggedIn, data.title]);

    const handleFavoriteClick = async () => {
        try {
            if (!isFavorite) {
                const response = await saveFavorite(data);
                setIsFavorite(true);
                setFavoriteId(response._id);
            } else {
                await deleteFavorite(favoriteId);
                setIsFavorite(false);
                setFavoriteId(null);
            }
        } catch (error) {
            console.error("Erro ao atualizar favorito:", error);
        }
    };

    return (
        <>
            {isLoggedIn && (
                <button
                    className='favorite-button'
                    onClick={handleFavoriteClick}
                    style={{ backgroundColor: isFavorite ? '#D90429' : '#8D99AE' }}
                >
                    <HeartFill size={28} color="#2B2D42" />
                </button>
            )}
        </>
    );
}
