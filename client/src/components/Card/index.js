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

const Card = (props) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    <h6 className="card-title mb-3 fw-normal fst-italic text-light">{props.valor?.movieReview}</h6>

                    <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        color='primary'
                    >
                        Editar Review
                    </Button>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <div id="mySpacing">
                            <DialogTitle>Editar Review</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
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
                                <Button onClick={handleClose}>Cancelar</Button>
                                <Button
                                    onClick={() => {
                                        props.update(props.valor?.movieName);
                                        setOpen(false);
                                        document.location.reload(true);
                                    }}
                                >
                                    Confirmar
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>

                    <button
                        onClick={() => {
                            props.delete(props.valor?.movieName);
                            document.location.reload(true);
                        }}
                        type="button"
                        className="btn btn-outline-danger m-3 fw-bolder"
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Card;
