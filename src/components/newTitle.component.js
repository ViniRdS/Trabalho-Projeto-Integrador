import { useEffect, useState } from "react";
import { newTitle } from "../services/titles.http.service";
import '../assets/css/newTitle.css';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';


export default function NewTitle(){
    const [titles, setTitle] = useState([])
    const [start, setStart] = useState(0);
    const displayCount = 7;

    const scrollLeft = () => {
        setStart(oldStart => oldStart > 0 ? oldStart - 1 : oldStart);
    };

    const scrollRight = () => {
        setStart(oldStart => oldStart < titles.length - displayCount ? oldStart + 1 : oldStart);
    };

    useEffect(()=>{
        newTitle().then((data)=>{
                setTitle(data);
        })
    },[])
    
    return(
        <div className="new-titles-container">
            <h2>LANÇAMENTOS</h2>
            <div className="titles-scroll-container">
            <div className="carousel-container">
    <button className="scroll-btn left-btn" onClick={scrollLeft} disabled={start === 0}>
        <ArrowLeftCircleFill color="#8D99AE"/>
    </button>
    <div className="titles-container">
        {titles.slice(start, start + displayCount).map((title, index) => (
            <div key={index} className="title-thumbnail">
                <img src={title.poster_url} alt={title.title} />
            </div>
        ))}
    </div>
    <button className="scroll-btn right-btn" onClick={scrollRight} disabled={start >= titles.length - displayCount}>
        <ArrowRightCircleFill color="#8D99AE"/>
    </button>
</div>
            </div>
        </div>
    )
}
