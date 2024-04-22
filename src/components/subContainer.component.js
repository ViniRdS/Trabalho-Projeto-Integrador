// Importando a imagem de pipoca do diretório de assets
import popcorn from '../assets/images/popcorn.png';

// Importando os estilos CSS para o componente SubContainer
import '../assets/css/subContainer.css';

// Definindo o componente SubContainer como uma função de componente de React
export default function SubContainer() {
    return (
        // Container principal que envolve o conteúdo
        <div className='container'>
            {/* Sub-container para exibir a imagem de pipoca */}
            <div className='sub-container'>
                <img src={popcorn} alt='Pipoca' className='image'/>
            </div>
            {/* Div para exibir o texto */}
            <div>
                <h2 className='text'>Descubra em qual streaming está seu próximo filme ou série e comece a assistir agora mesmo!</h2>
            </div>
        </div>
    );
}
