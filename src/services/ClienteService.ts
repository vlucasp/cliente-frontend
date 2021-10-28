import { Api } from "../providers"
import { Cliente } from "../interfaces/Cliente"

const findAll = () => Api.get<Cliente[]>('/cliente');
const findOne = (id: number) => Api.get<Cliente>(`/cliente/${id}`);
const save = (cliente: Cliente) => Api.post<Cliente>('/cliente', cliente);
const apaga = (id: number) => Api.delete(`/cliente/delete/${id}`);

export const ClienteService = {
    findAll,
    findOne,
    save,
    apaga
}