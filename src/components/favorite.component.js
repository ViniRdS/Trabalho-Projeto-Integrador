import '../assets/css/favorite.css'; // Importa o estilo CSS do componente
import { ClockFill } from 'react-bootstrap-icons'; // Importa o ícone de relógio da biblioteca react-bootstrap-icons

export default function FavoriteComp() { 
  return (
    <div className='favorite'> {/* Div principal com classe 'favorite' */}
      <div className='content'> {/* Div com classe 'content' */}
        <h1>LISTA DE FAVORITOS</h1> {/* Título principal */}
        <div> {/* Div aninhada */}
          <div className='analysis'> {/* Div com classe 'analysis' para análise */}
            <h2>Análise</h2> {/* Título de análise */}
            <div className='results'> {/* Div com classe 'results' para resultados */}
              <h6>6 Títulos na lista</h6> {/* Número de títulos na lista */}
              <h6>6 Títulos na lista</h6> {/* Número de títulos na lista (repetido, possivelmente erro) */}
              <h6>
                <ClockFill color="#2B2D42" size={20} className='mx-2'/> {/* Ícone de relógio */}
                Tempo total: <span>15H 23M</span> {/* Tempo total */}
              </h6>
            </div>
            <div className='platform'> {/* Div com classe 'platform' para informações de plataforma */}
              <h6>Plataforma Predominante: </h6> {/* Título para a plataforma predominante */}
              <div className='streamer'> {/* Div com classe 'streamer' para o logotipo da plataforma */}
                <img src={'https://logodownload.org/wp-content/uploads/2024/03/max-logo-0.png'} alt={``} /> {/* Logotipo da plataforma */}
              </div>
            </div>
          </div>
          <div className='favorite-title'> {/* Div com classe 'favorite-title' (possivelmente para exibir os títulos favoritos) */}
            {/* Aqui você pode adicionar o código para exibir os títulos favoritos */}
          </div>
        </div>
      </div>
    </div>
  );
}
