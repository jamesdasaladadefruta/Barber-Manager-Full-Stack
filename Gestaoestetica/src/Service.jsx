// src/Service.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './components/Card';
import './Service.css';
import Modal from './components/Modal'

function Service() {
    // objeto com serviços selecionados: { "Corte": 30, "Barba": 45 }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };








    const [selectedServices, setSelectedServices] = useState({});

    // chamado pelo Card: (title, value, isSelectedNow)
    const handleSelect = (title, value, isSelectedNow) => {
        setSelectedServices(prev => {
            const copy = { ...prev };
            if (isSelectedNow) copy[title] = value;
            else delete copy[title];
            return copy;
        });
    };

    const total = Object.values(selectedServices).reduce((s, v) => s + v, 0);

    return (
        <div className='containerS'>
            <header>
                <h2 className='textH'>Bem Vindo</h2>
            </header>
            <div>
                <h3 className='text'>Escolha seu serviço</h3>
                <div className='cardList'>
                    <Card title='Corte' value={30} onSelect={handleSelect} />
                    <Card title='Barba' value={45} onSelect={handleSelect} />
                    <Card title='Corte + Barba' value={50} onSelect={handleSelect} />
                    <Card title='Corte + Sobrancelha' value={35} onSelect={handleSelect} />
                    <Card title='Pezinho' value={20} onSelect={handleSelect} />
                </div>

                <div className='finishPT'>
                    <Link to='/'><button className='buttonS'>Sair</button></Link>

                    <div className='finishPedido'>
                        <h5>Valor final:<span>R${total},00</span></h5>
                        <button className='buttonF' onClick={handleOpenModal}>Finalizar Compra</button>

                        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                            <h2>    </h2>
                            <p>This is the content of my modal.</p>
                            <button onClick={handleCloseModal}>Close</button>
                        </Modal>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;
