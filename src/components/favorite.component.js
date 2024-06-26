import '../assets/css/favorite.css';
import { useEffect, useState } from 'react';
import { getFavoriteId, deleteFavorite } from '../services/users.http.service';
import { useNavigate } from 'react-router-dom';
import TrashButton from './trashButton.component';

// Importe as imagens das plataformas
import netflixImage from '../assets/images/plataforma/netflix.png';
import maxImage from '../assets/images/plataforma/hbomax.png';
import amazonImage from '../assets/images/plataforma/primevideo.png';
import paramountImage from '../assets/images/plataforma/paramount.png';
import disneyImage from '../assets/images/plataforma/disney.png';
import appleTVImage from '../assets/images/plataforma/appletv.png';
import plutoTVImage from '../assets/images/plataforma/pluto-tv.png';
import CrunchyrollImage from '../assets/images/plataforma/Crunchyroll.png';
import ClaroImage from '../assets/images/plataforma/ClaroVideo.png';
import CuriosityImage from '../assets/images/plataforma/CuriosityStream.png';
import GloboImage from '../assets/images/plataforma/Globoplay.png';
import MubiImage from '../assets/images/plataforma/MUBI-logo.png';
import SunImage from '../assets/images/plataforma/sunnxt.png';
import Nada from '../assets/images/plataforma/naosei.png';
import poster from '../assets/images/poster_placeholder.jpg';


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
        return platformCounts;
    };

    const getPredominantPlatform = (platformCounts) => {
        let predominantPlatform = "";
        let maxCount = 0;
        for (const platform in platformCounts) {
            if (platformCounts[platform] > maxCount) {
                maxCount = platformCounts[platform];
                predominantPlatform = platform;
            }
        }
        return predominantPlatform;
    };

    const platformImages = {
        "Netflix": netflixImage,
        "MAX": maxImage,
        "Amazon": amazonImage,
        "Paramount Plus": paramountImage,
        "Disney+": disneyImage,
        "AppleTV": appleTVImage,
        "Pluto TV": plutoTVImage,
        "Crunchyroll Premium": CrunchyrollImage,
        "Clarovideo": ClaroImage,
        "Curiosity Stream": CuriosityImage,
        "Globoplay": GloboImage,
        "MUBI": MubiImage,
        "Sun Nxt": SunImage
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
                            <div className='streamer'>
                                {favorite.length === 0 ? (
                                    <img src={Nada} alt="Nenhum favorito" />
                                ) : (
                                    predominantPlatform ? (
                                        <img src={platformImages[predominantPlatform]} alt={predominantPlatform} />
                                    ) : (
                                        <img src={Nada} alt="Nenhum Streaming" />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='favorite-title'>
                        {favorite.map((movie) => (
                            <div key={movie._id} className="favorite-movie">
                                <div className="favorite-img" onClick={() => handleMovieClick(movie.idFilme)}>
                                    <img src={movie.urlFoto ? movie.urlFoto : poster} alt={movie.title} />
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
