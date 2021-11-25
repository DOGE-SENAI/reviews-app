import React, { useState } from 'react';
import Search from '../Search';
import Notification from '../Notification';
import './style.css';

const Content = () => {

    const [openNotificationDelete, setOpenNotificationDelete] = useState(false)
    const [openNotificationUpdate, setOpenNotificationUpdate] = useState(false)
    const [openNotificationCreate, setOpenNotificationCreate] = useState(false)

    const notification = (open, type) => {

        if (type === 'delete'){
            setOpenNotificationDelete(open)
        } else if (type === 'update'){
            setOpenNotificationUpdate(open)
        } else if (type === 'create'){
            setOpenNotificationCreate(open)
        }
    }

    return (
        <div className="d-flex justify-content-around flex-column align-items-center w-100">
            <Search openNotification={notification} />

            {openNotificationDelete &&
                <div className="container-notification">
                    <Notification typeAlert="success" color="#4caf50">
                        Filme deletado
                    </Notification>
                </div>
            }

            {openNotificationUpdate &&
                <div className="container-notification">
                    <Notification typeAlert="success" color="#4caf50">
                        Avaliação Editada
                    </Notification>
                </div>
            }

            {openNotificationCreate &&
                <div className="container-notification">
                    <Notification typeAlert="success" color="#4caf50">
                        Filme Adicionado
                    </Notification>
                </div>
            }


        </div >
    );
}

export default Content;