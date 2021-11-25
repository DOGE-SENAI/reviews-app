import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Form from '../Form';
import './style.css';

const SearchBar = ( props ) => {

    return (
        <div className="w-100 d-flex align-items-center justify-content-center flex-wrap">
            <div className="input-group input-group-lg my-input">
                <span className="input-group-text bg-primary border-primary" id="inputGroup-sizing-lg">
                    <FontAwesomeIcon icon={faSearch} />
                </span>

                <input
                    type="text"
                    className="form-control border-primary"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    onChange={(e) => {
                        props.set(e.target.value);
                    }}
                    placeholder="Search..."
                />
            </div>

            <div className="m-5">
                <Form openNotification={props.openNotification} />
            </div>
        </div>
    );
}

export default SearchBar;