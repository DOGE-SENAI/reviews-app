import { useState, forwardRef } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Form = ( props ) => {
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

    const submitReview = () => {
        axios.post('http://localhost:3001/api/insert', {
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

        setOpen(false);

        props.openNotification(true, 'create');
        setInterval(() => {
            props.openNotification(false, 'create');
        }, 2000);
        setInterval(() => {
            window.location.reload(true)
        }, 2010);
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={handleClickOpen}
            >
                <span style={{marginRight: 7 }}>
                    <FontAwesomeIcon icon={faPlusSquare} />
                </span>
                Adicionar Filme
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Adicionar Filme</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Adicione o nome do filme e a sua avaliação
                    </DialogContentText>
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="movieName"
                        label="Filme"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setMovieName(e.target.value);
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="movieReview"
                        label="Avaliação"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setReview(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={submitReview}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Form;