import React from 'react';
import {
    Button, Dialog, DialogContent, LinearProgress,
    DialogTitle, TextField, makeStyles, DialogActions
} from '@material-ui/core';

import Validator from '@common/helpers/validator';

const useStyles = makeStyles(() => ({
    save: {
        width: '100%',
        color: '#fff',
        fontSize: 12,
        padding: 10,
        textTransform: 'capitalize'
    },
    dialog: {
        maxWidth: 500,
        margin: '0 auto'
    },
    dialog__actions: {
        padding: 20
    },
    dialog__field: {
        marginTop: 20
    }
}));

type UserInfoType = {
    email: string,
    name: string,
    surname: string
};

type PropsType = {
    open: boolean,
    userInfo: UserInfoType,
    pending: boolean,
    onSave: () => void,
    handleClose: () => void,
    setUserInfo: (value: UserInfoType) => void
};

export default (({handleClose, onSave, open, userInfo, setUserInfo, pending}) => {
    const classes = useStyles();

    return (
        <Dialog className={classes.dialog} onClose={handleClose} open={open}>
            <DialogTitle>Создание пользователя</DialogTitle>
            {pending && <LinearProgress/>}
            <DialogContent>
                <TextField
                    autoFocus
                    error={!Validator.checkName(userInfo.name)}
                    margin="dense"
                    label="Имя"
                    variant="outlined"
                    value={userInfo.name}
                    onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                    className={classes.dialog__field}
                    fullWidth/>
                <TextField
                    error={!Validator.checkName(userInfo.surname)}
                    margin="dense"
                    label="Фамилия"
                    variant="outlined"
                    value={userInfo.surname}
                    onChange={e => setUserInfo({...userInfo, surname: e.target.value})}
                    className={classes.dialog__field}
                    fullWidth/>
                <TextField
                    error={!Validator.checkEmail(userInfo.email)}
                    margin="dense"
                    label="Почта"
                    type="email"
                    helperText="Необходимо заполнить"
                    variant="outlined"
                    value={userInfo.email}
                    onChange={e => setUserInfo({...userInfo, email: e.target.value})}
                    className={classes.dialog__field}
                    fullWidth/>
            </DialogContent>
            <DialogActions className={classes.dialog__actions}>
                <Button
                    onClick={onSave}
                    variant="contained"
                    color="primary"
                    className={classes.save}
                    disabled={(userInfo.email.trim() === '') || !Validator.checkEmail(userInfo.email)
                    || !Validator.checkName(userInfo.surname) || !Validator.checkName(userInfo.name)}>
                    Создать
                </Button>
            </DialogActions>
        </Dialog>
    )
}) as React.FC<PropsType>;