import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";

export const Login = () => {
    //Serve como se fosse o getElementById, mas ligeiramente diferente porque a ordem de criação da variável e do elemento são ao contrário, primeiro cria a const e depois coloca no elemento
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    //Utilizado para alterar os valores e renderizar novamente o componente
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Utilizado para executar ao renderizar o componente pela primeira vez
    useEffect(() => {
        /* if (window.confirm('Está tudo bem?')) {
            console.log('Sim');
        } else {
            console.log('Não');
        } */
    }, []);

    //Toda vez que os valores de email e password são alterados, o componente é renderizado novamente e executa essa função
    useEffect(() => {
        console.log(email);
    }, [email]);

    useEffect(() => {
        console.log(password);
    }, [password]);

    //Permite salvar na memória o resultado, na teoria é mais performático para cálculos
    const emailLength = useMemo(() => {
        return email.length;
    }, [email.length]);


    //useCallback salva funções na memória para não renderizar novamente a função cada vez que o componente for atualizado nos states
    const handleEntrar = useCallback(() => {
        console.log(email);
        console.log(password);
    }, [email, password]);

    return (
        <div>
            <form action="">
                <p>Quantidade de caracteres no e-mail: {emailLength}</p>

                <InputLogin
                    type="text"
                    value={email}
                    label="E-mail"
                    onChange={newValue => setEmail(newValue)}
                    onPressEnter={() => inputPasswordRef.current?.focus()}
                />

                <InputLogin
                    label="Senha"
                    type="password"
                    value={password}
                    ref={inputPasswordRef}
                    onChange={newValue => setPassword(newValue)}
                />

                <ButtonLogin type="button" onClick={handleEntrar}>
                    Entrar
                </ButtonLogin>
            </form>
        </div>
    )
}