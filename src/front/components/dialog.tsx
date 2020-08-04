import React from 'react';
import {
    Button, Dialog, DialogContent, LinearProgress,
    DialogTitle, TextField, makeStyles
} from '@material-ui/core';

import Validator from '@common/helpers/validator';

const useStyles = makeStyles(() => ({
    save: {
        width: '100%'
    },
    content: {
        marginTop: 40
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
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Создание пользователя</DialogTitle>
            {pending && <LinearProgress/>}
            <DialogContent className={classes.content}>
                <TextField
                    autoFocus
                    error={!Validator.checkName(userInfo.name)}
                    margin="dense"
                    label="Имя"
                    variant="outlined"
                    value={userInfo.name}
                    onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                    fullWidth/>
                <TextField
                    error={!Validator.checkName(userInfo.surname)}
                    margin="dense"
                    label="Фамилия"
                    variant="outlined"
                    value={userInfo.surname}
                    onChange={e => setUserInfo({...userInfo, surname: e.target.value})}
                    fullWidth/>
                <TextField
                    error={!Validator.checkEmail(userInfo.email)}
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
                    disabled={(userInfo.email.trim() === '') || !Validator.checkEmail(userInfo.email)
                    || !Validator.checkName(userInfo.surname) || !Validator.checkName(userInfo.name)}>
                    Создать
                </Button>
            </DialogContent>
        </Dialog>
    )
}) as React.FC<PropsType>;