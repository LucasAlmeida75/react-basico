import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IListaProps, TarefasService } from "../../shared/services";
import { ApiException } from "../../shared/services/api/ApiException";

export const List = () => {
    const [lista, setLista] = useState<string[]>([]);
    const [listaObjeto, setListaObjeto] = useState<IListaProps[]>([]);

    useEffect(() => {
        TarefasService.getAll()
        .then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setListaObjeto(result);
            }
        });
    }, []);

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

            const dataToCreate = {
                title: value,
                isCompleted: false
            }

            if (listaObjeto.some((listItem) => listItem.title === value)) return;

            TarefasService.create(dataToCreate)
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setListaObjeto((oldLista) => [...oldLista, result]);
                }
            });

            e.currentTarget.value = "";
        }
    }, [listaObjeto]);

    const handleCheckbox = useCallback( (id: number) => {
        const dataToUpdate = listaObjeto.find((tarefa) => tarefa.id === id);

        if (!dataToUpdate) return;

        TarefasService.updateById(id, {
            ...dataToUpdate,
            isCompleted: !dataToUpdate.isCompleted
        })
        .then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setListaObjeto(oldLista => {
                    return oldLista.map(oldListaItem => {
                        if (oldListaItem.id === id) return result;

                        return oldListaItem;
                    })
                })
            }
        });
    }, [listaObjeto]);

    const handleDelete = useCallback( (id: number) => {
        const confirm = window.confirm('Tem certeza que deseja apagar a tarefa?');

        if (!confirm) return;

        TarefasService.deleteById(id)
        .then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setListaObjeto(oldLista => {
                    return oldLista.filter(oldListaItem => oldListaItem.id !== id)
                })
            }
        });
    }, []);

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
            <p>{listaObjeto.filter((listItem) => listItem.isCompleted).length}</p>
            <input type="text" onKeyUp={handleInputObjeto} />

            <ul>
                {listaObjeto.map((listItem) => {
                    return <li key={listItem.id}>
                                <input type="checkbox" checked={listItem.isCompleted} onChange={() => {handleCheckbox(listItem.id)}}/>
                                {listItem.title}
                                <button onClick={() => {handleDelete(listItem.id)}}>Apagar</button>
                            </li>;
                })}
            </ul>
        </div>
    );
};