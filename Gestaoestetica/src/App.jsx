import { Link } from 'react-router-dom';
import './App.css'
import fotoCabelo from './assets/image 1.png'

function App() {
  return (
    <div className="container">
      <div className="loginPart">
        <div className="inputGroup">
          <h2>Login</h2>
          <input type="text" placeholder="UserName or E-mail" />
          <input type="password" placeholder="Password" />
        <Link to='/service'><button>Entrar</button></Link>
          <p>
            Não tem uma conta? <Link to="/cadastro">Cadastrar-se</Link>
          </p>
        </div>

        <div className="imageWrapper">
          <div className="mascarabg"></div>
          <img src={fotoCabelo} alt="Imagem de corte de cabelo" />
        </div>
      </div>
    </div>
  )
}

export default App

