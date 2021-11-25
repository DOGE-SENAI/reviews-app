import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar';
import Card from '../Card';
import './style.css';


const Search = ( props ) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filmes, setFilmes] = useState([]);

    const [newReview, setNewReview] = useState("");

    const deleteReview = (movie) => {
        axios.delete(`http://localhost:3001/api/delete/${movie}`);

        props.openNotification(true, 'delete');
        setInterval(() => {
            props.openNotification(false, 'delete');
        }, 2000);
        setInterval(() => {
            window.location.reload(true);
        }, 2010);
    };

    const updateReview = (movie) => {
        axios.put("http://localhost:3001/api/update", {
            movieName: movie,
            movieReview: newReview,
        });

        setNewReview("")

        props.openNotification(true, 'update');
        setInterval(() => {
            props.openNotification(false, 'update');
        }, 2000);
        setInterval(() => {
            window.location.reload(true);
        }, 2010);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/api/get')
            .then((response) => {
                setFilmes(response.data);
            })

    }, []);

    return (
        <article className="container-search">
            <SearchBar set={setSearchTerm} openNotification={props.openNotification} />
            
            <div className="container-movies">
                {
                    filmes?.filter((val) => {
                        if (val.movieName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                            return (
                                <Card
                                    name={val.movieName}
                                    valor={val}
                                    set={setNewReview}
                                    update={updateReview}
                                    delete={deleteReview}
                                />
                            )
                        }
                    }).map((val, key) => {
                        return (
                            <div key={key}>
                                <Card
                                    name={val.movieName}
                                    valor={val}
                                    set={setNewReview}
                                    update={updateReview}
                                    delete={deleteReview}
                                />
                            </div>
                        );
                    })

                }
            </div>
        </article>
    );
}

export default Search;