import React from 'react';
import Alert from '@mui/material/Alert';


const Notification = ( props ) => {
    return (
        <div>
            <Alert 
                variant="outlined" 
                severity={props.typeAlert}
                style={{
                    color: props.color
                }}
            >
                {props.children}
            </Alert>
        </div>
    )
}

export default Notification;
