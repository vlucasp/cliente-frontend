import React, { useState } from 'react'
import AddUserForm from './AddUserForm'
import UserTable from './UserTable'

//Componente Principal
const App = () => {

  //Dados ficticios de um array de usuarios
  const usersData = [
    {id: 1, name: 'Tania', username: '@tania'},
    {id: 2, name: 'Maria', username: '@Maria'},
    {id: 3, name: 'Keite', username: '@Keite'}
  ]

  //Permite gerenciar os estados e setar novos usuarios
  const [users, setUsers] = useState(usersData)

  const [editing, setEditing] = useState(false)

  //Recebo um usuário e envio para o componente filho a lista de usuários 
  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users,user])
  }

  const deleteUser = (id) => {
    console.log("id ->", id)
    setUsers(users.filter((user) => user.id !== id))
  }

  //Retorno da UI
  return (
    <div className="container">
      <h1>CRUD APP - Utilizando Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2> Adicionar Usuário </h2>
          <AddUserForm 
            addUser={addUser}
           />
        </div>

        <div className="flex-large">
          <h2> Visualizar Usuário </h2>
          <UserTable 
            users={users}
            deleteUser={deleteUser}/>
        </div>
      </div>
    </div>
  );
}

//Permite exportar esses componentes para outros.
export default App;
