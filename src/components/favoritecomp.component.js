import '../assets/css/favorite.css';
import { ClockFill } from 'react-bootstrap-icons';

export default function FavoriteComp() { 
  return (
      <div className='favorite'>
          <div className='content'>
              <h1>LISTA DE FAVORITOS</h1>
              <div>
              <div className='analysis'>
                  <h2>Análise</h2>
                  <div className='results'>
                      <h6>6 Títulos na lista</h6>
                      <h6>6 Títulos na lista</h6>
                      <h6><ClockFill color="#2B2D42" size={20} className='mx-2'/>Tempo total: <span>15H 23M</span></h6>

                      
                  </div>
                  <div className='platform'>
                        <h6>Plataforma Predominante: </h6>
                        <div className='stream'>
                                            <img src={'https://logodownload.org/wp-content/uploads/2024/03/max-logo-0.png'} alt={``} />
                                        </div>
                      </div>
              </div>
              <div className='favorite-title'>
              </div>
              </div>
          </div>
      </div>
  )
}




