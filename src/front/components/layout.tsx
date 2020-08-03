import React, {useState} from 'react';
import {Snackbar, Container, CircularProgress} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import Dialog from '@containers/dialog';
import UserList from './user-list';
import {UserModel} from '@api/UserAPI';

type PropsType = {
    pending: boolean,
    success: boolean,
    msg: string,
    data: Array<UserModel>
};

export default (({pending, success, msg, data}) => {
    const [open, setOpen] = useState(false);

    return (
        <Container maxWidth={false}>
            <Snackbar open={!success} autoHideDuration={6000}>
                <MuiAlert elevation={6} variant="filled" severity='error'>{msg}</MuiAlert>
            </Snackbar>
            {pending && <CircularProgress/>}
            {!pending && success && <UserList users={data} setOpen={setOpen}/>}
            <Dialog open={open} handleClose={() => setOpen(false)}/>
        </Container>
    );
}) as React.FC<PropsType>;