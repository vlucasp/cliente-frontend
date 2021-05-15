import React from 'react'

//Componente de tabela de usuários
const UserTable = (props) => (
    <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Usuário</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {props.users.length > 0 ? (
                props.users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>
                            <button
                                className="button muted-button"
                                onClick={() => props.editRow(user)}>
                                Editar
                            </button>
                            <button className="button muted-button"
                              onClick={() => props.deleteUser(user.id)}>
                              Deletar
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>Nenhum usuário Cadastrado</td>
                </tr>
            )}
        </tbody>
    </table>
)

export default UserTable