import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // import useNavigate
import './App.css'
import fotoCabelo from './assets/image 1.png'

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // criar o hook

  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const res = await fetch("https://barber-manager-back-end.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (res.ok) {
        alert("Login realizado com sucesso!");
        navigate("/service"); // ⬅️ aqui você redirecion
      }
      else if (res.ok && email === "admin" && senha === "admin") {
        alert("Login realizado com sucesso!");
        navigate("/admin"); // ⬅️ aqui você redireciona para a página de admin
      }
       
        else {
        alert("Usuário ou senha incorretos!");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="container">
      <div className="loginPart">
        <div className="inputGroup">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="UserName or E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
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

export default App;
