import { useCallback, useState } from "react"
import { Cliente } from "../interfaces/Cliente"
import { ClienteService } from "../services/ClienteService"

export const ClienteHook = () => {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [cliente, setCliente] = useState<Cliente>();

    const findAll = useCallback(async () => {
        const { status, data } = await ClienteService.findAll();
        if (status !== 200) throw new Error();
        setClientes(data);
    }, [])

    const save = useCallback(async (cliente: Cliente) => {
        const { status, data } = await ClienteService.save(cliente);
        if (status !== 201) throw new Error();
        setCliente(data);
    }, [])

    const findOne = useCallback(async (id: number) => {
        const { status, data } = await ClienteService.findOne(id);
        if (status !== 200) throw new Error();
        setCliente(data);
    }, [])

    const apaga = useCallback(async function apagaCliente(id: number) {
        const {} = await ClienteService.apaga(id);
    }, [])

    return {
        findAll,
        clientes,
        save,
        findOne,
        cliente,
        apaga
    }
}