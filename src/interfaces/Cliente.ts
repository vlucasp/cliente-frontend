export interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    complemento: string;
    contatos: Telefone[];
    emails: Email[];
}

export interface Telefone {
    id: number;
    telefone: string;
    tipoTelefone: string;
}

export interface Email {
    id: number;
    email: string;
}