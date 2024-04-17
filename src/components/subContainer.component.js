import popcorn from '../assets/images/popcorn.png';
import '../assets/css/subContainer.css'

export default function SubContainer() {
    return (
        <div className='container'>
            <div className='sub-container'>
                <img src={popcorn} alt='Pipoca' className='image'/>
            </div>
            <div>
                <h2 className='text'>Descubra em qual streaming está seu próximo filme ou série e comece a assistir agora mesmo!</h2>
            </div>
        </div>
    )
}
