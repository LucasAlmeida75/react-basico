import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface IListaProps {
    id: number;
    title: string;
    isCompleted: boolean;
}

//GetAll
const getAll = async (): Promise<IListaProps[] | ApiException> => {
    try {
        const { data } = await Api().get('/tarefas');
        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar os registros.')
    }
};

//getById
const getById = async (id: number): Promise<IListaProps | ApiException> => {
    try {
        const { data } = await Api().get(`/tarefas/${id}`);
        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar o registro.')
    }
};

//create
const create = async (dataToCreate: Omit<IListaProps, 'id'>): Promise<IListaProps | ApiException> => {
    try {
        const { data } = await Api().post('/tarefas', dataToCreate);
        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar o registro.')
    }
};

//updateById
const updateById = async (id: number, dataToUpdate: IListaProps): Promise<IListaProps | ApiException> => {
    try {
        const { data } = await Api().put(`/tarefas/${id}`, dataToUpdate);
        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar o registro.')
    }
};

//deleteById
const deleteById = async (id: number): Promise<undefined | ApiException> => {
    try {
        await Api().delete(`/tarefas/${id}`);
        return undefined
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao apagar o registro.')
    }
};

export const TarefasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};