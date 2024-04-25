// Importando os hooks necessários do React
import React, { useEffect, useState } from 'react';
// Importando o hook useParams do react-router-dom para acessar os parâmetros da rota
import { useParams } from 'react-router-dom';
// Importando a função detailTitle do serviço titles.http.service
import { detailTitle, streaming } from '../services/titles.http.service';
// Importando os estilos CSS para o componente DetailTitle
import '../assets/css/detailTitle.css';
import { Film, ClockFill } from 'react-bootstrap-icons';

// Definindo o componente DetailTitle como uma função de componente de React
export default function DetailTitle() {
    // Estado para armazenar os detalhes do título
    const [title, setTitle] = useState({})
    //State para armazenar os streaming
    const [stream, setStream] = useState({})
    // Usando o hook useParams para obter o ID do filme da URL
    const { id } = useParams();

    // Efeito para buscar os detalhes do título quando o componente é montado
    useEffect(() => {
        detailTitle(id).then(async (data) => {
            await setTitle(data);
        })
        streaming().then(async (data) => {
            // Adicionando os preços aos serviços de streaming
            const streamingWithPrices = data.map(service => ({
                ...service,
                price: service.id === 203 ? 'R$18,90' : // Netflix
                    service.id === 387 ? 'R$55,90' : // Max
                        service.id === 26 ? 'R$14,90' : // Prime Video
                            service.id === 372 ? 'R$33,90' : // Disney+
                                service.id === 371 ? 'R$9,90' : // AppleTV+
                                    service.id === 444 ? 'R$19,90' : // Paramount+
                                        service.id === 454 ? 'Free' : // MAX Free
                                            service.id === 80 ? 'R$14,99' : // Crunchyroll Premium
                                                service.id === 349 ? 'US$9,99' : // AppleTV
                                                    service.id === 24 ? 'R$19,90' : // Amazon
                                                        service.id === 449 ? 'R$19,90' : // Clarovideo
                                                            service.id === 421 ? 'US$11,99' : // Curiosity Stream
                                                                service.id === 381 ? 'R$24,90' : // Funimation
                                                                    service.id === 448 ? 'R$22,90' : // Globoplay
                                                                        service.id === 181 ? 'R$34,90' : // MUBI
                                                                            service.id === 391 ? 'Free' : // Pluto TV
                                                                                service.id === 453 ? 'R$40,90' : // Star+
                                                                                    service.id === 433 ? '24,90' : // Sun Nxt
                                                                                        'Preço desconhecido'
            }));

            await setStream(streamingWithPrices);
        })
    }, [])

    // Array para armazenar as fontes únicas
    const uniqueSources = [];
    // Verificando se title.sources existe e, em seguida, iterando sobre ele
    title && title.sources && title.sources.forEach(source => {
        // Verificando se a fonte já está em uniqueSources
        if (!uniqueSources.find(uniqueSource => uniqueSource.name === source.name)) {
            // Se não estiver, adiciona ao array
            uniqueSources.push(source);
        }
    });

    // Renderizando o componente
    return (
        <div className='container-detail'>
            <div className='sub-container-detail'>
                <div className='detail'>
                    <div className='poster'>
                        {title && title.poster && (
                            <img src={title.poster} alt='Poster do titulo' />
                        )}
                        {title && title.genre_names && title.genre_names.length > 0 && (
                            <div>
                                <p className='genero' style={{ color: '#8D99AE' }}>
                                    <Film color="#EDF2F4" size={24} /> <span>Gênero: </span>  {title.genre_names ? title.genre_names.join(', ') : ''}
                                </p>
                            </div>
                        )}
                        {title && title.runtime_minutes && (
                            <div>
                                <p className='duracao' style={{ color: '#8D99AE' }}>
                                    <ClockFill color="#EDF2F4" size={24} /> <span>Duração: </span> {title.runtime_minutes} {title.type === "tv_series" ? " Min por episodio" : " Min"}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className='details'>
                        {title && title.title && (
                            <h2 className='title-detail'>{title.title}</h2>
                        )}
                        <div className='sinopse'>
                            <h3 className='title-sinopse'>Sinopse: </h3>
                            {title && title.plot_overview && (
                                <p>
                                    {title.plot_overview ? title.plot_overview : 'Não há sinopse disponível no momento.'}
                                </p>
                            )}
                        </div>
                        <div className='title-stream'>
                            <h2 className='title-stream-h6'>Onde pode encontrá-lo</h2>
                        </div>
                        <div className='stream-container'>
                            {/* Mapeando sobre uniqueSources e renderizando as informações de cada serviço de streaming */}
                            {uniqueSources.length > 0 && Array.isArray(stream) && uniqueSources.some(source => stream.find(s => s.id === source.source_id)) ? uniqueSources.map(source => {
                                // Encontrando o serviço correspondente no estado stream
                                const service = stream.find(s => s.id === source.source_id);
                                if (service) {
                                    return (
                                        <div key={source.id} className='stream'>
                                            <img src={service.logo_100px} alt={`${service.name} logo`} />
                                            <div>
                                                <h6>{service.price}</h6>
                                            </div>
                                        </div>
                                    )
                                }
                                // Se o serviço de streaming não estiver em stream, retorna null
                                return null;
                            }) : <p>Nenhum serviço de streaming disponível para este título.</p>}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )

}

