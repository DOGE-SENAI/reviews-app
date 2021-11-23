import React, { useState } from 'react';
import Axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Search from '../Search';
import './style.css';


const myStyles = () => ({
    buttonEdit: {
        background: "#0d6efd",
    }
})

const Content = ({ classes }) => {

    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([]);

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

    return (
        <div className="form m-4 d-flex justify-content-around flex-column align-items-center">
            <div className="m-4 container col-md-8 d-flex justify-content-around flex-column align-items-center w-75">
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
                <Search />
                
            </div>
        </div >
    );
}

export default withStyles(myStyles)(Content);