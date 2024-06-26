// Importando React Hooks e useNavigate necessários para o componente
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Importando a função newTitle do serviço titles.http.service
import { newTitle } from "../services/titles.http.service";

// Importando estilos CSS para o componente NewTitle
import '../assets/css/newTitle.css';

// Importando ícones da biblioteca react-bootstrap-icons
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import poster from '../assets/images/poster_placeholder.jpg';

// Definindo o componente NewTitle como uma função de componente de React
export default function NewTitle() {
    // Estado para armazenar os títulos
    const [titles, setTitle] = useState([]);
    // Estado para controlar o início da exibição dos títulos
    const [start, setStart] = useState(0);
    // Quantidade de títulos a serem exibidos
    const displayCount = 7;

    // Hook useNavigate para navegação programática
    const navigate = useNavigate();

    // Função para rolar para a esquerda na lista de títulos
    const scrollLeft = () => {
        setStart(oldStart => oldStart > 0 ? oldStart - 1 : oldStart);
    };

    // Função para rolar para a direita na lista de títulos
    const scrollRight = () => {
        setStart(oldStart => oldStart < titles.length - displayCount ? oldStart + 1 : oldStart);
    };

    // Efeito para buscar novos títulos quando o componente é montado
    useEffect(() => {
        newTitle().then((data) => {
            setTitle(data);
        });
    }, []);

    // Função para lidar com o clique na imagem do filme
    const handleMovieClick = (id) => {
        navigate(`/detail/${id}`);
    };

    // Função para lidar com erro ao carregar a imagem
    const handleImageError = (event) => {
        event.target.src = poster;
    };

    // Retorno do componente
    return (
        <div className="new-titles-container">
            <h2>LANÇAMENTOS</h2>
            <div className="titles-scroll-container">
                <div className="carousel-container">
                    {/* Botão para rolar para a esquerda */}
                    <button className="scroll-btn left-btn" onClick={scrollLeft} disabled={start === 0}>
                        <ArrowLeftCircleFill color="#8D99AE" />
                    </button>
                    {/* Contêiner para os títulos */}
                    <div className="titles-container">
                        {/* Mapeamento e exibição dos títulos */}
                        {titles && titles.slice(start, start + displayCount).map((title, index) => (
                            <div key={index} className="title-thumbnail" onClick={() => handleMovieClick(title.id)}>
                                <img
                                    src={title.poster_url || poster}
                                    alt={title.title}
                                    onError={handleImageError}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Botão para rolar para a direita */}
                    <button className="scroll-btn right-btn" onClick={scrollRight} disabled={start >= titles.length - displayCount}>
                        <ArrowRightCircleFill color="#8D99AE" />
                    </button>
                </div>
            </div>
        </div>
    );
}
