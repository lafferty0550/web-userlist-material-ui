import React from 'react';
import {
    Button, Dialog, DialogContent, CircularProgress,
    DialogTitle, TextField, makeStyles, Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({save: {width: '100%'}}));

type UserInfoType = {
    email: string,
    name: string,
    surname: string
};

type PropsType = {
    open: boolean,
    userInfo: UserInfoType,
    pending: boolean,
    success: boolean,
    msg: string,
    onSave: () => void,
    handleClose: () => void,
    setUserInfo: (value: UserInfoType) => void
};

export default (({
                     handleClose, onSave, open, userInfo, setUserInfo,
                     success, pending, msg
                 }) => {
    const classes = useStyles();

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Создание пользователя</DialogTitle>
            {pending && <CircularProgress/>}
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Имя"
                    variant="outlined"
                    value={userInfo.name}
                    onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                    fullWidth/>
                <TextField
                    margin="dense"
                    label="Фамилия"
                    variant="outlined"
                    value={userInfo.surname}
                    onChange={e => setUserInfo({...userInfo, surname: e.target.value})}
                    fullWidth/>
                <TextField
                    error
                    margin="dense"
                    label="Почта"
                    type="email"
                    helperText="Обязательное поле"
                    variant="outlined"
                    value={userInfo.email}
                    onChange={e => setUserInfo({...userInfo, email: e.target.value})}
                    fullWidth/>
            </DialogContent>
            <DialogContent>
                <Button
                    onClick={onSave}
                    variant="contained"
                    color="primary"
                    className={classes.save}
                    disabled={userInfo.email.trim() === ''}>
                    Создать
                </Button>
            </DialogContent>
            <Snackbar open={!success} autoHideDuration={6000}>
                <MuiAlert elevation={6} variant="filled" severity='error'>{msg}</MuiAlert>
            </Snackbar>
            <Snackbar open={!success && msg !== ''} autoHideDuration={6000}>
                <MuiAlert elevation={6} variant="filled" severity='success'>{msg}</MuiAlert>
            </Snackbar>
        </Dialog>
    )
}) as React.FC<PropsType>;