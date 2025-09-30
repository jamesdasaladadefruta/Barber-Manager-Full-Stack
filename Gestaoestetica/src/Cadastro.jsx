import { Link } from 'react-router-dom'
import './Cadastro.css'

function Cadastro() {
  return (
    <div className="container">
      <div className="loginPart">
        <div className="cadastroGroup">
          <h2>Cadastro</h2>
          <input type="text" placeholder="Nome completo" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirmar senha" />
          <button>Cadastrar</button>
          <p>
            Já tem uma conta? <Link to="/">Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cadastro