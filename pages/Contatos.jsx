import { useEffect, useState } from "react"; 

import api from "../api/api"; 
import "../styles/site.css"
 

export default function Contatos() { 

  const [contatos, setContatos] = useState([]); 

  const [nome, setNome] = useState(""); 

  const [email, setEmail] = useState(""); 

 

  async function carregarContatos() { 

    try { 

      const res = await api.get("/contatos"); 

      setContatos(res.data); 

    } catch { 

      alert("Erro ao carregar contatos. Faça login novamente."); 

    } 

  } 

 

  async function criarContato(e) { 

    e.preventDefault(); 

    try { 

      await api.post("/contatos", { nome, email }); 

      setNome(""); 

      setEmail(""); 

      carregarContatos(); // atualiza a lista 

    } catch { 

      alert("Erro ao criar contato"); 

    } 

  } 

 

  useEffect(() => { 

    carregarContatos(); 

  }, []); 

 

  return ( 

    <div style={{ padding: 20 }}> 

      <h2>Contatos</h2> 

      <form onSubmit={criarContato}> 

        <input 

          placeholder="Nome" 

          value={nome} 

          onChange={(e) => setNome(e.target.value)} 

        /> 

        <input 

          placeholder="E-mail" 

          value={email} 

          onChange={(e) => setEmail(e.target.value)} 

        /> 

        <button type="submit">Adicionar</button> 

      </form> 

 

      <div> 

        {contatos.map((c) => ( 

          <div key={c._id} className="card"> 

            <span className="label">{c.nome}</span> 
            <span className="label">{c.email}</span>

          </div> 

        ))} 

      </div> 

    </div> 

  ); 

}