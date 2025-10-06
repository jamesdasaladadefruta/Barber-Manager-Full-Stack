import { useEffect, useState } from "react";
import "./Admin.css";

function AdminPanel() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch("https://barber-manager-back-end.onrender.com/api/pedidos");
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Painel do Administrador</h1>

      {loading ? (
        <p>Carregando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Serviços</th>
              <th>Total</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {Object.entries(p.servicos).map(([nome, valor]) => (
                    <div key={nome}>
                      {nome} - R${valor},00
                    </div>
                  ))}
                </td>
                <td>R${p.total},00</td>
                <td>{new Date(p.data).toLocaleDateString()}</td>
                <td>{p.horario}</td>
                <td>{new Date(p.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
