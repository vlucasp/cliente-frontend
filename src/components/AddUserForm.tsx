import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Add from '@material-ui/icons/Add'
import InputMask from 'react-input-mask'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useEffect, useState } from 'react';
import { ClienteHook } from '../hooks/cliente-hook';
import { Cliente, Telefone } from '../interfaces/Cliente';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import UserTable from '../components/UserTable'

type props = {
}

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    buttonLista: {
        marginTop: '15px'
    },
    divStyle: {
        marginTop: '12px',
        fontSize: '15px',
        marginLeft: '20px'
    },
    inputTelefone: {
        marginLeft: '10px'
    },
    paddingTop50: {
        paddingTop: '50px'
    },
    widthCpf: {
        width: '130px'
    },
    widthCep: {
        width: '100px'
    }
}));

//Componente de formulário de Usuarios
const AddUserForm = (props: props) => {
    const { save, cliente, findOne } = ClienteHook();
    const classes = useStyles();
    const [user, setUser] = useState<Cliente>();
    const [id, setId] = useState<any>();
    const [nome, setNome] = useState<any>('');
    const [cpf, setCpf] = useState<any>('');
    const [cep, setCep] = useState<any>('');
    const [logradouro, setLogradouro] = useState<any>('');
    const [bairro, setBairro] = useState<any>('');
    const [cidade, setCidade] = useState<any>('');
    const [uf, setUf] = useState<any>('');
    const [complemento, setComplemento] = useState<any>('');
    const [telefones, setTelefones] = useState<any[]>([]);
    const [emails, setEmails] = useState<any[]>([]);
    const [telefonesList, setTelefonesList] = useState<any[]>([]);
    const [emailsList, setEmailsList] = useState<any[]>([]);

    useEffect(() => {
        setTelefones(telefonesList);
      }, [telefonesList]);

      useEffect(() => {
        setEmails(emailsList);
      }, [emailsList]);

    function handleInputTelefone() {
        let contatos: any[] = [];
        telefones.forEach(t => {
            contatos.push(t);
        });
        contatos.push({id: null, telefone: null, tipoTelefone: '', isCelular: false});
        setTelefones(contatos);
    }

    function handleInputEmails() {
        let emailsList: any[] = [];
        emails.forEach(e => {
            emailsList.push(e);
        });
        emailsList.push({id: null, email: null });
        setEmails(emailsList);
    }

    function setTipoTelefone(tipoTelefone: any, telefone: any) {
        if (tipoTelefone == 'CELULAR') {
            telefone.isCelular = true;
        }
        telefone.tipoTelefone = tipoTelefone;
        setTelefones(telefones);
    }
    
    function setTelefone(numero: any, telefone: any) {
        telefone.telefone = numero;
    }

    function deleteTelefone(index: any) {
        let lista = telefones;
        lista.splice(index, 1);
        setTelefonesList(lista);
    }

    function deleteEmail(index: any) {
        emails.splice(index, 1);
        setEmailsList(emails);
    }

    function setEmail(email: any, index: any) {
        emails[index].email = email
    }
    
    function setNomeCliente(nome: any) {
        if (nome.length <= 100) {
            setNome(nome);
        }

    }

    async function consultaCep(cep: string) {
        setCep(cep)
        let cepString = cep.replace(/\D/g, '');
        if (cepString != "") {
          var validacep = /^[0-9]{8}$/;
          if(validacep.test(cepString)) {
            const { status, data } = await axios.create({ baseURL: 'https://viacep.com.br/ws/' }).get(`${cepString}/json`)
            if (status == 200 && data) {
                if (data.erro) {
                    alert('CPF não encontrado.');
                    setCep('');
                } else {
                    setLogradouro(data.logradouro);
                    setBairro(data.bairro);
                    setCidade(data.localidade);
                    setUf(data.uf);
                }
            }
          } else if (cpf.length == 8) {
            alert('CPF inserido é inválido.');
            setCpf('');
          }
        }
    }
    
    function editarCliente(id: number) {
        findOne(id);
    }

    useEffect(() => {
        if (cliente) {handleEditCliente(cliente)}
      }, [cliente]);

    function handleEditCliente(cliente: Cliente) {
        setId(cliente.id);
        setNome(cliente.nome);
        setCpf(cliente.cpf);
        setCep(cliente.cep);
        setLogradouro(cliente.logradouro);
        setBairro(cliente.bairro);
        setCidade(cliente.cidade);
        setUf(cliente.uf);
        setComplemento(cliente.complemento ? cliente.complemento : '');
        let contatos: any[] = [];
        for (let i = 0; i < cliente.contatos.length; i++) {
            let contato = cliente.contatos[i];
            setTipoTelefone(contato.tipoTelefone, contato)
            contatos.push(contato);
        }
        let listaEmails: any[] = [];
        for (let i = 0; i < cliente.emails.length; i++) {
            listaEmails.push(cliente.emails[i]);
        }
        setTelefones(contatos);
        setEmails(listaEmails);
    }

    function saveCliente() {
        let valid = true;
        if (telefones == null || telefones.length == 0) {
            valid = false;
            alert('É necessário incluir ao menos um telefone.');
        } else {
            for (let i = 0; i < telefones.length; i++) {
                if (telefones[i].telefone == null || telefones[i].tipoTelefone == null) {
                    valid = false;
                    alert('Os dados inseridos de telefone estão incorretos.');
                    break;
                }
            }
        }

        if (emails == null || emails.length == 0) {
            valid = false;
            alert('É necessário incluir ao menos um e-mail.');
        } else {
            for (let i = 0; i < emails.length; i++) {
                if (emails[i].email == null) {
                    alert('Os dados inseridos de e-mail estão incorretos.');
                    valid = false;
                    break;
                }
            }
        }

        if (nome.length <= 3) {
            alert('Nome deve possuir no mínimo 3 caracteres.');
            valid = false;
        }
        
        if (cpf.length !== 14 && cpf.length !== 11) {
            alert('CPF Inválido.');
            valid = false;
        }

        if (cep.length !== 9 && cep.length !== 8) {
            alert('CPF Inválido.');
            valid = false;
        }

        let variavel = {
            id: id,
            nome: nome,
            cpf: cpf,
            cep: cep,
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            complemento: complemento,
            contatos: telefones,
            emails: emails
        };
        if (valid) {
            if (id) {
                alert('Cliente atualizado com sucesso.');
            } else {
                alert('Cliente inserido com sucesso.');
            }
            save(variavel);
        } else {
            editarCliente(id);
        }
    }

    return (
        <form
            onSubmit={saveCliente}>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            id="standard-basic"
                            label="Nome"
                            type="text"
                            name="nome"
                            required
                            fullWidth
                            style={{ margin: 8 }}
                            value={nome}
                            onChange={e => setNomeCliente(e.target.value)} />
                    </Grid>
                    <Grid item xs={1}>
                        <InputMask className={classes.widthCpf} mask="999.999.999-99" value={cpf} onChange={e => setCpf(e.target.value)} >
                            {() => <TextField 
                                        id="standard-basic" 
                                        label="CPF" 
                                        type="text" 
                                        required
                                        name="cpf" 
                                        style={{ margin: 8 }}
                                        value={cpf}/>}
                        </InputMask>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <InputMask className={classes.widthCep} mask="99999-999" value={cep} onChange={e => consultaCep(e.target.value)} >
                            {() => <TextField 
                                        id="standard-basic"
                                        label="CEP"
                                        type="text"
                                        name="cep"
                                        required
                                        style={{ margin: 8 }}
                                        value={cep}/>}
                        </InputMask>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="standard-basic" 
                            label="Logradouro"
                            type="text"
                            name="logradouro"
                            required
                            fullWidth
                            style={{ margin: 8 }}
                            value={logradouro}
                            onChange={e => setLogradouro(e.target.value)} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="standard-basic" 
                            label="Bairro"
                            type="text"
                            name="bairro"
                            required
                            fullWidth
                            style={{ margin: 8 }}
                            value={bairro}
                            onChange={e => setBairro(e.target.value)} />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <TextField id="standard-basic" 
                            label="UF"
                            type="text"
                            name="uf"
                            required
                            fullWidth
                            style={{ margin: 8 }}
                            inputProps={{ maxLength: 2 }}
                            value={uf}
                            onChange={e => setUf(e.target.value.toUpperCase())} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="standard-basic"
                            label="Cidade"
                            type="text"
                            name="cidade"
                            required
                            fullWidth
                            style={{ margin: 8 }}
                            value={cidade}
                            onChange={e => setCidade(e.target.value)} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="standard-basic" 
                            label="Complemento"
                            type="text"
                            name="complemento"
                            fullWidth
                            style={{ margin: 8 }}
                            value={complemento}
                            onChange={e => setComplemento(e.target.value)} />
                    </Grid>
                </Grid>
            </div>
            <div className={classes.paddingTop50}>
                <Grid container spacing={3}>
                    <div className={classes.divStyle}>Telefones:</div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleInputTelefone}
                        endIcon={<Add />}>
                        Adicionar
                    </Button>
                </Grid>
            </div>
            {telefones.map((telefone, index) => (
                <>
                <div className={classes.inputTelefone}>
                    <Grid container spacing={3}>
                        <Grid item xs={1}>
                            <InputLabel id="label">Tipo</InputLabel>
                            <Select fullWidth required onChange={e => setTipoTelefone(e.target.value, telefone)}>
                                <MenuItem value="CELULAR">Celular</MenuItem>
                                <MenuItem value="RESIDENCIAL">Residencial</MenuItem>
                                <MenuItem value="COMERCIAL">Comercial</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={1}>
                            <InputMask mask="(99)99999-9999" value={telefone.telefone} required onChange={e => setTelefone(e.target.value, telefone)} >
                                {() => <TextField 
                                            id="standard-basic" 
                                            label="Número" 
                                            type="text" 
                                            name="numero" 
                                            value={telefone.telefone}/>}
                            </InputMask>
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.buttonLista}
                                onClick={e => {deleteTelefone(index)}}
                                startIcon={<DeleteIcon />}>
                                Apagar
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                </>
            ))}
            <div className={classes.paddingTop50}>
                <Grid container spacing={3}>
                    <div className={classes.divStyle}>E-mails:</div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleInputEmails}
                        endIcon={<Add />}>
                        Adicionar
                    </Button>
                </Grid>
            </div>
            {emails.map((item, index) => (
                <>
                <div className={classes.inputTelefone}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <TextField id="standard-basic" 
                                label="Email"
                                type="email"
                                required
                                name="email"
                                fullWidth
                                value={emails[index].email}
                                onChange={e => setEmail(e.target.value, index)} />
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.buttonLista}
                                onClick={e => {deleteEmail(index)}}
                                startIcon={<DeleteIcon />}>
                                Apagar
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                </>
            ))}
            <div className={classes.paddingTop50}>
                <Grid container spacing={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}>
                        Salvar
                    </Button>
                </Grid>
            </div>

            <div className={classes.paddingTop50}>
                <UserTable editarCliente={editarCliente}  />
            </div>

        </form>
    )
}

export default AddUserForm