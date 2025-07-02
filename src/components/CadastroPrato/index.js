// src\components\FormularioCadastro\index.js

import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import useMensagem from "../../hooks/useMensagem";
import MensagemFeedback from "../MensagemFeedback";
import logo from "../../assets/images/logo.png";
import axios from "axios";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } =
    useMensagem();

  const cadastrarUsuario = async () => {
    try {
      const response = await axios.post("https://atividade-pontuada-3.onrender.com/pedidos", {
        nome,
        descricao,
        preco,
        categoria,
        disponibilidade,
        url
      });
      exibirMensagem(
        response.data.mensagem || " Cadastrado com sucesso!",
        "sucesso"
      );
      setNome("");
      setDescricao("");
      setPreco("");
      setCategoria("");
      setDisponibilidade("");
      setUrl("");
     
    } catch (error) {
      let erroMsg = "Erro ao conectar ao servidor.";
      if (error.response && error.response.data) {
        erroMsg = error.response.data.mensagem;
        if (error.response.data.erros) {
          erroMsg += " " + Object.values(error.response.data.erros).join(", ");
        }
      }
      exibirMensagem(erroMsg, "erro");
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo da empresa" />
      <h2>Cadastrar Prato</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarUsuario();
        }}
      >
        <input
          type="text"
          id="nome"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          id="descricao"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="number"
          id="preco"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <input
          type="text"
          id="categoria"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
        <input
          type="text"
          id="disponibilidade"
          placeholder="Disponibilidade"
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value)}
          required
        />
        <input
          type="text"
          id="url"
          placeholder="Url da Imagem"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      
        <button type="submit">Cadastrar</button>
      </form>

      <button onClick={() => navigate("/lista")} className="link-usuarios">
        Ver Cardapio
      </button>

      <MensagemFeedback
        mensagem={mensagem}
        tipo={tipoMensagem}
        visivel={visivel}
        onclose={fecharMensagem}
      />
    </div>
  );
}

export default Cadastro;
