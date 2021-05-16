import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

//Componente de formulário de Usuarios
const AddUserForm = (props) => {

    const classes = useStyles();
    const initialFormState = { id: null, name: '', username: '' }
    const [user, setUser] = useState(initialFormState)
    const [users, setUsers] = useState([])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    const addUser = (user) => {
        user.id = users.length + 1
        setUsers([...users, user])
      }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                if (!user.name || !user.username) return
                addUser(user)
                setUser(initialFormState)
            }}>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            id="standard-basic"
                            label="Nome"
                            type="text"
                            name="name"
                            helperText="Insira seu nome"
                            fullWidth
                            style={{ margin: 8 }}
                            value={user.name}
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="standard-basic" label="Usuário"
                            type="text"
                            name="username"
                            helperText="Insira seu usuário"
                            fullWidth
                            style={{ margin: 8 }}
                            value={user.username}
                            onChange={handleInputChange} />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container spacing={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}>
                        Cadastrar
                    </Button>
                </Grid>
            </div>


        </form>
    )
}

export default AddUserForm