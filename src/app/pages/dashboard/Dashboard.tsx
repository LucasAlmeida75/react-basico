import { useRef } from "react";
import { Link } from "react-router-dom";
import { useUsuarioLogado } from "../../shared/hooks";

export const Dashboard = () => {
    //O valor é alterado sem a página ser renderizada novamente, como acontece com o useState
    //A página não é alterada, mas se exibir o counterRef.current.counter em um console.log() vai ser possível ver que o valor é alterado
    const counterRef = useRef({counter: 0});

    const {nomeDoUsuario, logout} = useUsuarioLogado();

    return (
        <div>
            <p>Dashboard</p>

            <p>{nomeDoUsuario}</p>

            <p>Contador: {counterRef.current.counter}</p>

            <button onClick={() => {counterRef.current.counter++}}>Somar</button>
            &nbsp;
            <button onClick={() => {console.log(counterRef.current.counter);}}>Log</button>

            <br/>

            <Link to="/entrar">Login</Link>
            &nbsp;
            <button onClick={logout}>Sair</button>

            <br/>
            <Link to="/pagina-inicial">Lista</Link>
        </div>
    )
}