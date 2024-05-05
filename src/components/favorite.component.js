import '../assets/css/favorite.css';
import { ClockFill } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { getFavoriteId, deleteFavorite } from '../services/users.http.service';
import { useNavigate } from 'react-router-dom';
import TrashButton from './trashButton.component';

export default function FavoriteComp() {
    const [favorite, setFavorite] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFavoriteId().then(async (data) => {
            await setFavorite(data);
        });
    }, []);

    const handleMovieClick = (id) => {
        navigate(`/detail/${id}`);
    };

    const handleFavoriteClick = async (favoriteId) => {
        try {
            await deleteFavorite(favoriteId);
            // Após excluir o favorito, atualize a lista de favoritos
            const updatedFavorites = favorite.filter(movie => movie._id !== favoriteId);
            setFavorite(updatedFavorites);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='favorite'>
            <div className='content'>
                <h1>LISTA DE FAVORITOS</h1>
                <div className='favorite-container'>
                    <div className='analysis'>
                        <h2>Análise</h2>
                        <div className='results'>
                            <h6>{favorite.length} Títulos na lista</h6>
                            <h6>
                                <ClockFill color="#2B2D42" size={20} className='mx-2'/>
                                Tempo total: <span>15H 23M</span>
                            </h6>
                        </div>
                        <div className='platform'>
                            <h6>Plataforma Predominante: </h6>
                            <div className='streamer'>
                                <img src={'https://logodownload.org/wp-content/uploads/2024/03/max-logo-0.png'} alt={``} />
                            </div>
                        </div>
                    </div>
                    <div className='favorite-title'>
                        {favorite.map((movie) => (
                            <div key={movie._id} className="favorite-movie">
                                <div className="favorite-img" onClick={() => handleMovieClick(movie.idFilme)}>
                                    <img src={movie.urlFoto} alt={movie.title} />
                                </div>
                                {/* Botão para excluir o favorito */}
                                <TrashButton
                                    onClick={() => handleFavoriteClick(movie._id)}
                                     // Passa uma propriedade 'selected' para o botão
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
