// src\components\ListaDeUsuarios\index.js

import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'

function Cardapio() {
    const [usuarios, setUsuarios] = useState([]) // Renomeado para 'itensCardapio' para maior clareza
    const API_URL = 'https://atividade-pontuada-3.onrender.com/pedidos';

    const carregarItensCardapio = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens do cardápio:', error); // Melhor usar console.error
            alert('Erro ao buscar itens do cardápio. Verifique o console para mais detalhes.');
            setUsuarios([]);
        }
    };

    useEffect(() => {
        carregarItensCardapio();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja apagar este item?");
        if (!confirmDelete) {
            return; // Aborta se o usuário cancelar
        }

        try {
            // Requisição DELETE para a API
            await axios.delete(`${API_URL}/${id}`);
            alert('Item apagado com sucesso!');
            // Recarrega a lista de itens após a exclusão
            carregarItensCardapio();
        } catch (error) {
            console.error('Erro ao apagar item:', error);
            alert('Erro ao apagar item. Verifique o console para mais detalhes.');
        }
    };

    return (
        <ul id="listaUsurios" className="lista-usuarios">
            {usuarios.length === 0 ? (
                <li>Nenhum item encontrado.</li>
            ) : (
                usuarios.map(pedido => (
                    <div className="cardapio" key={pedido.id}> {/* Adicionado key ao div externo */}
                        <img src={pedido.url} alt={pedido.nome} className="imagem-cardapio" />
                        <li > {/* O <li> não precisa de key se o pai já tem, mas se fosse apenas <li>, precisaria */}
                            <strong>Nome: </strong> {pedido.nome}<br />
                            <strong>Descrição: </strong> {pedido.descricao}<br />
                            <strong>Preço: </strong> {pedido.preco}<br />
                            <strong>Categoria: </strong> {pedido.categoria}<br />
                            <strong>Disponibilidade: </strong> {pedido.disponibilidade}<br />
                            <button onClick={() => handleDelete(pedido.id)} style={{ marginTop: '30px', padding: '8px 12px', cursor: 'pointer' }}>
                                Apagar
                            </button>
                        </li>
                    </div>
                ))
            )}
        </ul>
    );
}

export default Cardapio;