// Importando React Hooks necessários para o componente
import { useEffect, useState } from "react";

// Importando a função newTitle do serviço titles.http.service
import { newTitle } from "../services/titles.http.service";

// Importando estilos CSS para o componente NewTitle
import '../assets/css/newTitle.css';

// Importando ícones da biblioteca react-bootstrap-icons
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';

// Definindo o componente NewTitle como uma função de componente de React
export default function NewTitle() {
    // Estado para armazenar os títulos
    const [titles, setTitle] = useState([]);
    // Estado para controlar o início da exibição dos títulos
    const [start, setStart] = useState(0);
    // Quantidade de títulos a serem exibidos
    const displayCount = 7;

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
                        {titles.slice(start, start + displayCount).map((title, index) => (
                            <div key={index} className="title-thumbnail">
                                <img src={title.poster_url} alt={title.title} />
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
