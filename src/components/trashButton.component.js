import React from 'react';
import { TrashFill } from 'react-bootstrap-icons'; // Importa o ícone de lixeira da biblioteca react-bootstrap-icons
import '../assets/css/buttonTrash.css';

export default function TrashButton({ onClick }) {
    return (
        <button className='trash-button' onClick={onClick}>
            <TrashFill size={28} color="#EDF2F4" />
        </button>
    );
}
