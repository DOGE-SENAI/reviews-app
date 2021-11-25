import React, { useState, forwardRef } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
    palette: {
        primary: {
            main: '#0d6efd',
        },
    }
});

const Card = ( props ) => {

    const [openEdit, setOpenEdit] = useState(false);
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    
    const [openDelete, setOpenDelete] = useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="card text-center m-4 border-primary my-card">
                <div className="card-header border-bottom border-primary" style={{ backgroundColor: "#121213" }}>
                    <h1 className="text-light text-break text-capitalize">
                        {props.valor?.movieName}
                    </h1>
                </div>

                <div className="card-body bg-dark">
                    <h6 className="mb-3 fw-normal fst-italic fs-5 text-light">{props.valor?.movieReview}</h6>
                    <Button
                        variant="contained"
                        onClick={handleClickOpenEdit}
                    >
                        Editar Avaliação
                    </Button>
                    <Dialog
                        open={openEdit}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseEdit}
                    >
                        <div id="mySpacing">
                            <DialogTitle>Editar Avaliação</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {props.valor?.movieReview}
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Review"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => {
                                        props.set(e.target.value);
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseEdit}>Cancelar</Button>
                                <Button
                                    onClick={() => {
                                        props.update(props.valor?.movieName);
                                        setOpenEdit(false);
                                    }}
                                >
                                    Confirmar
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>

                    <button
                        variant="contained"
                        onClick={handleClickOpenDelete}
                        type="button"
                        className="btn btn-outline-danger m-3 fw-bolder"
                    >
                        Deletar
                    </button>
                    <Dialog
                        open={openDelete}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseDelete}
                    >
                        <div id="mySpacing">
                            <DialogTitle>Deletar Avaliação</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Filme: {props.valor?.movieName} <br />
                                    Avaliação: {props.valor?.movieReview}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDelete}>Cancelar</Button>
                                <Button
                                    onClick={() => {
                                        props.delete(props.valor?.movieName);
                                        setOpenDelete(false);
                                    }}
                                    style={{
                                        color: '#dc3545',
                                    }}
                                >
                                    Confirmar
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Card;
