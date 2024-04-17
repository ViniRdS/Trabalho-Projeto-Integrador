import '../assets/css/header.css'
import { Search } from 'react-bootstrap-icons';

export default function Header(){
    return(
        <header className="header">
            <div className="container">
                <h1>
                    <span style={{color: '#D90429',fontSize:'25px', fontWeight:'bold'}}>BUSCA</span>
                    <span style={{color: '#EDF2F4',fontSize:'25px', fontWeight:'bold'}}>FLIX</span>
                </h1>
                <div className="search-container">
                    <input type="text" className="search" placeholder="Qual título está buscando?" />
                    <button className="search-button">
                        <Search color="#000000" className="search-icon"/>
                    </button>

                </div>
                <button className="enter-button">Entrar</button>
            </div>
        </header>
    )
}
