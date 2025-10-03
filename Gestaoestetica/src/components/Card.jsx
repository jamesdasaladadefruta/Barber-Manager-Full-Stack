// src/components/Card.jsx
import { useState } from 'react';
import './Card.css';

function Card({ img,title, value, onSelect = () => {} }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    const next = !selected;
    setSelected(next);
    // envia título, valor numérico e se está selecionado agora
    onSelect(title, Number(value), next);
  };

  return (
    <div
      className={`card ${selected ? 'selected' : ''}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
        <img src={img} alt="" />
      <h4 className='title'>{title}</h4>
      <p className='value' >R$ {value},00</p>
    </div>
  );
}

export default Card;
