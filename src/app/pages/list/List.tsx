import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

interface IListaProps {
    title: string;
    isSelected: boolean;
}

export const List = () => {
    const [lista, setLista] = useState<string[]>([]);
    const [listaObjeto, setListaObjeto] = useState<IListaProps[]>([]);

    const handleInputKeyUp: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            setLista((oldLista) => {
                if (oldLista.includes(value)) return oldLista;

                return [...oldLista, value];
            });
            e.currentTarget.value = "";
        }
    }, []);

    const handleInputObjeto: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            setListaObjeto((oldLista) => {
                if (oldLista.some((listItem) => listItem.title === value)) return oldLista;

                return [...oldLista, {
                    title: value,
                    isSelected: false
                }];
            });
            e.currentTarget.value = "";
        }
    }, []);

    const handleCheckbox = useCallback( (e: string) => {
            setListaObjeto((oldLista) => {
                //Itera toda a lista para alterar o valor de uma linha
                return oldLista.map((oldListItem) => {
                    //Se o title do valor atual for igual ao title da linha da checkbox ele altera o isSelected, senão mantém o que tiver
                    const newIsSelected = oldListItem.title === e ? !oldListItem.isSelected : oldListItem.isSelected;
                    return {
                        ...oldListItem,
                        isSelected: newIsSelected
                    }
                });
            });
        }
    , [])

    return (
        <div>
            <Link to="/entrar">Login</Link>
            <br/>
            <br/>
            <Link to="/dashboard">Dashboard</Link>
            <br/>

            <p>Lista de strings</p>
            <input type="text" onKeyUp={handleInputKeyUp} />

            <ul>
                {lista.map((value) => {
                    return <li key={value}>{value}</li>;
                })}
            </ul>


            <p>Lista de objetos com checkbox</p>
            <p>{listaObjeto.filter((listItem) => listItem.isSelected).length}</p>
            <input type="text" onKeyUp={handleInputObjeto} />

            <ul>
                {listaObjeto.map((listItem, index) => {
                    return <li key={listItem.title}>
                                <input type="checkbox" onChange={() => {handleCheckbox(listItem.title)}}/>
                                {listItem.title}
                            </li>;
                })}
            </ul>
        </div>
    );
};