import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cadastro.css";

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const res = await fetch("https://barber-manager-back-end.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Cadastro realizado com sucesso!");
        navigate("/"); // redireciona para a tela de login
      } else {
        alert(`❌ Erro: ${data.error || "Não foi possível cadastrar."}`);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="container">
      <div className="loginPart">
        <form className="cadastroGroup" onSubmit={handleSubmit}>
          <h2>Cadastro</h2>

          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />

          <button type="submit">Cadastrar</button>

          <p>
            Já tem uma conta? <Link to="/">Fazer login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
