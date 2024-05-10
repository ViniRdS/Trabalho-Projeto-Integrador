import '../assets/css/favorite.css';
import { ClockFill } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { getFavoriteId, deleteFavorite } from '../services/users.http.service';
import { useNavigate } from 'react-router-dom';
import TrashButton from './trashButton.component';

// Importe as imagens das plataformas
import netflixImage from '../assets/images/netflix.png';
import maxImage from '../assets/images/hbomax.png';
import amazonImage from '../assets/images/primevideo.png';
import paramountImage from '../assets/images/paramount.png';
import disneyImage from '../assets/images/disney.png';
import appleTVImage from '../assets/images/appletv.png';

export default function FavoriteComp() {
    const [favorite, setFavorite] = useState([]);
    const [predominantPlatform, setPredominantPlatform] = useState(""); // Inicialize com uma string vazia
    const navigate = useNavigate();

    useEffect(() => {
        getFavoriteId().then(async (data) => {
            await setFavorite(data);
        });
    }, []);

    useEffect(() => {
        const platformCounts = countPlatforms();
        const predominantPlatform = getPredominantPlatform(platformCounts);
        setPredominantPlatform(predominantPlatform);
    }, [favorite]);

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

    const platformsMap = {
        "Netflix": "Netflix",
        "MAX Free": "MAX",
        "MAX":"MAX",
        "Prime Video": "Amazon",
        "Amazon": "Amazon",
        "Disney+": "Disney+",
        "AppleTV+": "AppleTV",
        "AppleTV": "AppleTV",
        "Paramount Plus": "Paramount Plus",
        "Crunchyroll Premium": "Crunchyroll Premium",
        "Clarovideo": "Clarovideo",
        "Curiosity Stream": "Curiosity Stream",
        "Globoplay": "Globoplay",
        "MUBI": "MUBI",
        "Pluto TV": "Pluto TV",
        "Star+": "Star+",
        "Sun Nxt": "Sun Nxt"
    };

    const countPlatforms = () => {
        const platformCounts = {};
        favorite.forEach((movie) => {
            const countedPlatforms = {}; // Para rastrear quais plataformas já foram contadas neste filme
            movie.sources.forEach((source) => {
                let platform = platformsMap[source] || source;
                if (platform === "MAX Free" || platform === "MAX") {
                    platform = "MAX";
                }
                if (platform === "Prime Video" || platform === "Amazon") {
                    if (!countedPlatforms["Amazon"]) {
                        platformCounts["Amazon"] = (platformCounts["Amazon"] || 0) + 1;
                        countedPlatforms["Amazon"] = true;
                    }
                } else {
                    if (platform === "AppleTV+") {
                        platform = "AppleTV";
                    }
                    if (platformsMap.hasOwnProperty(platform) && !countedPlatforms[platform]) {
                        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
                        countedPlatforms[platform] = true; // Marca a plataforma como contada neste filme
                    }
                }
            });
        });
        console.log("Platform Counts:", platformCounts);
        return platformCounts;
    };
    
    
    const getPredominantPlatform = () => {
        const platformCounts = countPlatforms();
        console.log("Platform Counts:", platformCounts);
        let predominantPlatform = "";
        let maxCount = 0;
        for (const platform in platformCounts) {
            if (platformCounts[platform] > maxCount) {
                maxCount = platformCounts[platform];
                predominantPlatform = platform;
            }
        }
        
        console.log("Predominant Platform:", predominantPlatform);
        return predominantPlatform;
    };

    //const predominantPlatform = getPredominantPlatform();

    const platformImages = {
        "Netflix": netflixImage,
        "MAX": maxImage,
        "Amazon": amazonImage,
        "Paramount Plus": paramountImage,
        "Disney+": disneyImage,
        "AppleTV": appleTVImage
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
                            <h6>{Object.keys(countPlatforms()).length} Plataformas</h6>
                        </div>
                        <div className='platform'>
                                <h6>Plataforma Predominante:</h6>
                                {/* Renderize a imagem da plataforma predominante */}
                                <img src={platformImages[predominantPlatform]} alt={predominantPlatform} className='image' style={{ width: '250px', height: 'auto',objectFit: 'cover'}} />
                                
                        </div>
                    </div>
                    <div className='favorite-title'>
                        {favorite.map((movie) => (
                            <div key={movie._id} className="favorite-movie">
                                <div className="favorite-img" onClick={() => handleMovieClick(movie.idFilme)}>
                                    <img src={movie.urlFoto} alt={movie.title} />
                                </div>
                                <TrashButton
                                    onClick={() => handleFavoriteClick(movie._id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
