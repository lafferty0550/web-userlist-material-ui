import React, {useMemo, useState} from 'react';
import {Snackbar, Container, CircularProgress, makeStyles, Theme} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import Dialog from '@containers/dialog';
import UserList from './user-list';
import {UserModel} from '@api/UserAPI';

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            backgroundColor: theme.palette.secondary.light,
            height: '100%'
        }
    };
});

type PropsType = {
    pending: boolean,
    success: boolean,
    msg: string,
    data: Array<UserModel>
};

export default (({pending, success, msg, data}) => {
    const [open, setOpen] = useState(false);

    const UserListMemo = useMemo(() => <UserList users={data} setOpen={setOpen}/>, [data]);

    const classes = useStyles();

    return (
        <Container maxWidth={false} className={classes.container}>
            <Snackbar open={!success} autoHideDuration={6000}>
                <MuiAlert elevation={6} variant="filled" severity='error'>{msg}</MuiAlert>
            </Snackbar>
            {pending && <CircularProgress/>}
            {!pending && success && UserListMemo}
            <Dialog open={open} handleClose={() => setOpen(false)}/>
        </Container>
    );
}) as React.FC<PropsType>;