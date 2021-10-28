import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CropFree } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import React, { useCallback, useEffect, useState } from 'react';
import { ClienteHook } from '../hooks/cliente-hook';

type ListProps = {
  editarCliente: any;
}

const useStyles = makeStyles((theme) => ({
  button: {
      marginRight: '10px'
  }
}));

const UserTable = (props: ListProps) => {
  const classes = useStyles();
  const { findAll, clientes, apaga } = ClienteHook();
  const { editarCliente } = props;
  
  useEffect(() => {
    findAll();
  }, [clientes]);

  function handleEditCliente(id: number) {
    editarCliente(id);
  }

  function handleDeleteCliente (id: number) {
    let confirmado = window.confirm('Deseja deletar o registro?')
    console.log('Confirmado -> ', confirmado);
    if (confirmado) {
      apaga(id);
    }
  }

  for(let i = 0; i < clientes.length; i++) {
    clientes[i].cpf = formatarCPF(clientes[i].cpf);
    clientes[i].cep = formatarCEP(clientes[i].cep);
  }

  function formatarCPF(cpf: string) {
    if (cpf.length == 11) {
      return cpf.substring(0, 3).concat(".")
        .concat(cpf.substring(3, 6))
        .concat(".")
        .concat(cpf.substring(6, 9))
        .concat("-")
        .concat(cpf.substring(9, 11))
    }
    return cpf;
  }

  function formatarCEP(cep: string) {
    if (cep.length == 8) {
      return cep.substring(0, 5).concat("-").concat(cep.substring(5, 8));
    }
    return cep;
  }


  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" >Nome</TableCell>
            <TableCell align="center">CPF</TableCell>
            <TableCell align="center">CEP</TableCell>
            <TableCell align="center">Logradouro</TableCell>
            <TableCell align="center">UF</TableCell>
            <TableCell align="center">Cidade</TableCell>
            <TableCell align="center">Complemento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell component="th" scope="row">{cliente.nome}</TableCell>
              <TableCell align="center">{cliente.cpf}</TableCell>
              <TableCell align="center">{cliente.cep}</TableCell>
              <TableCell align="center">{cliente.logradouro}</TableCell>
              <TableCell align="center">{cliente.uf}</TableCell>
              <TableCell align="center">{cliente.cidade}</TableCell>
              <TableCell align="center">{cliente.complemento}</TableCell>
              <TableCell align="center">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={e => {handleEditCliente(cliente.id)}}
                  startIcon={<EditIcon />}>
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={e => {handleDeleteCliente(cliente.id)}}
                  startIcon={<DeleteIcon />}>
                  Apagar
                </Button>
             </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable