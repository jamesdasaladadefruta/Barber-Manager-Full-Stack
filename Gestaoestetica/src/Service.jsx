import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './components/Card';
import Modal from './components/Modal';
import './Service.css';

function Service() {
  const [selectedServices, setSelectedServices] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setApiResponse(null);
    setDate('');
    setTime('');
  };

  const handleSelect = (title, value, isSelectedNow) => {
    setSelectedServices(prev => {
      const copy = { ...prev };
      if (isSelectedNow) copy[title] = value;
      else delete copy[title];
      return copy;
    });
  };

  const total = Object.values(selectedServices).reduce((s, v) => s + v, 0);

  // 🔹 Envia os dados do pedido para o backend
  const handleConfirm = async () => {
    if (Object.keys(selectedServices).length === 0) {
      alert("Selecione pelo menos um serviço!");
      return;
    }
    if (!date || !time) {
      alert("Escolha uma data e um horário!");
      return;
    }

    setLoading(true);
    setApiResponse(null);

    try {
      const response = await fetch("https://seu-backend.onrender.com/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          servicos: selectedServices,
          total,
          data: date,
          horario: time,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiResponse({ success: true, message: "✅ Pedido enviado com sucesso!" });
      } else {
        setApiResponse({ success: false, message: data.error || "Erro ao enviar pedido." });
      }
    } catch (error) {
      setApiResponse({ success: false, message: "❌ Erro de conexão com o servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='containerS'>
      <header>
        <h2 className='textH'>Bem-vindo</h2>
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
            <h5>Valor final: <span>R${total},00</span></h5>
            <button className='buttonF' onClick={handleOpenModal}>Finalizar Compra</button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Confirmação do Pedido</h2>

        <ul>
          {Object.entries(selectedServices).map(([nome, preco]) => (
            <li key={nome}>{nome}: R${preco},00</li>
          ))}
        </ul>

        <h3>Total: R${total},00</h3>

        <div className="dateTimeInputs">
          <label>
            Data:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </label>

          <label>
            Horário:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>

        {loading ? (
          <p>Enviando pedido...</p>
        ) : apiResponse ? (
          <p style={{ color: apiResponse.success ? 'green' : 'red' }}>
            {apiResponse.message}
          </p>
        ) : (
          <button onClick={handleConfirm}>Confirmar Pedido</button>
        )}

        <button onClick={handleCloseModal}>Fechar</button>
      </Modal>
    </div>
  );
}

export default Service;
