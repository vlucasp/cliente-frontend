import React, { useState } from 'react'

//Componente de formulário de Usuarios
const AddUserForm = (props) => {

    //Estado inicial dos valores, permite resetar valores ao inserir um novo usuario;
    const initialFormState = { id: null, name: '', username: '' }
  
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                if (!user.name || !user.username) return
                props.addUser(user)
                setUser(initialFormState)
            }}>
            <label>Nome</label>
            <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange} />
            <label>Usuário</label>
            <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange} />
            <button>Adicionar</button>
        </form>
    )
}

export default AddUserForm