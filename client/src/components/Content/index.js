import React, { useState, useEffect, forwardRef } from 'react';
import Axios from 'axios';

import { withStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import './style.css';

const myStyles = () => ({
    buttonEdit: {
        background: "#0d6efd",
    }
})

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Content = ({ classes }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([]);

    const [newReview, setNewReview] = useState("");

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setMovieList(response.data);
        })
    }, []);

    const submitReview = () => {
        Axios.post('http://localhost:3001/api/insert', {
            movieName: movieName,
            movieReview: review,
        });

        setMovieList([
            ...movieReviewList,
            {
                movieName: movieName,
                movieReview: review
            },
        ]);

        document.getElementById("inputMovieName").value = "";
        document.getElementById("inputMovieReview").value = "";
    };

    const deleteReview = (movie) => {
        Axios.delete(`http://localhost:3001/api/delete/${movie}`);
    };

    const updateReview = (movie) => {
        Axios.put("http://localhost:3001/api/update", {
            movieName: movie,
            movieReview: newReview,
        });

        setNewReview("")

    };

    return (
        <div className="form m-4 d-flex justify-content-around flex-column align-items-center">
            <div className="m-4 container col-md-8 d-flex justify-content-around flex-column align-items-center">
                <div className="input-group input-group-lg mb-3">
                    <span className="input-group-text border-primary bg-primary text-light" id="inputGroup-sizing-default">
                        Filme
                    </span>
                    <input
                        name="movieName"
                        onChange={(e) => {
                            setMovieName(e.target.value);
                        }}
                        id="inputMovieName"
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </div>

                <div className="input-group input-group-lg mb-3">
                    <span className="input-group-text border-primary bg-primary text-light" id="inputGroup-sizing-default">
                        Avaliação
                    </span>
                    <input
                        type="text"
                        name="review"
                        onChange={(e) => {
                            setReview(e.target.value);
                        }}
                        id="inputMovieReview"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </div>

                <button
                    onClick={submitReview}
                    type="button"
                    className="btn btn-success btn-lg"
                >
                    Adicionar Filme
                </button>
            </div>

            <div className="d-flex flex-wrap align-items-center justify-content-center">
                {movieReviewList.map((val) => {
                    return (
                        <div className="card text-center m-4 border-primary my-card">
                            <div className="card-header border-bottom border-primary" style={{ backgroundColor: "#121213" }}>
                                <h1 className="text-light text-break text-capitalize">
                                    {val.movieName}
                                </h1>
                            </div>

                            <div className="card-body bg-dark">
                                <h6 className="card-title mb-3 fw-normal fst-italic text-light">{val.movieReview}</h6>

                                <Button
                                    variant="contained"
                                    onClick={handleClickOpen}
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
                                                {val.movieReview}
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                label="Review"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={(e) => {
                                                    setNewReview(e.target.value);
                                                }}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancelar</Button>
                                            <Button
                                                onClick={() => {
                                                    updateReview(val.movieName);
                                                    setOpen(false);
                                                    document.location.reload(true);
                                                }}
                                            >
                                                Confirmar
                                            </Button>
                                        </DialogActions>
                                    </div>
                                </Dialog>


                                {/* <div className="input-group mb-3">
                                    <span
                                        className="input-group-text border-primary fw-normal bg-primary"
                                        id="inputGroup-sizing-default"
                                    >
                                        Avaliação
                                    </span>
                                    <input
                                        onChange={(e) => {
                                            setNewReview(e.target.value);
                                        }}
                                        type="text"
                                        className="form-control border-primary"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </div> */}

                                {/* <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        updateReview(val.movieName);
                                        document.location.reload(true);
                                    }}
                                >
                                    Atualizar
                                </button> */}

                                <button
                                    onClick={() => {
                                        deleteReview(val.movieName);
                                        document.location.reload(true);
                                    }}
                                    type="button"
                                    className="btn btn-outline-danger m-3 fw-bolder"
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
}

export default withStyles(myStyles)(Content);