import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import createUser from '@actions/users/create';
import getUsers from '@actions/users/list';
import Dialog from '@components/dialog';
import {AppStoreType} from '@reducers';
import {Color} from '@material-ui/lab/Alert/Alert';

type PropsType = {
    open: boolean,
    handleClose: () => void
};

export default (({open, handleClose}) => {
    const {pending, success, msg} = useSelector((store: AppStoreType) => store.users.create);
    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState({email: '', name: '', surname: ''});
    const [notify, setNotify] = useState(false);

    useEffect(() => {
        setUserInfo({email: '', name: '', surname: ''});
    }, [open]);

    useEffect(() => {
        if (msg !== '')
            setNotify(true)
    }, [msg]);

    const onSave = async () => {
        const {email, name, surname} = userInfo;
        await dispatch(createUser({email, name, surname}));
        dispatch(getUsers());
        handleClose();
    };

    return (
        <>
            <Dialog open={open} onSave={onSave} pending={pending} handleClose={handleClose}
                    userInfo={userInfo} setUserInfo={setUserInfo}/>
            {[
                {severity: 'success' as Color, open: notify && success},
                {severity: 'error' as Color, open: notify && !success}
            ].map(({severity, open}) => (
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setNotify(false)} key={severity}>
                    <MuiAlert elevation={6} variant="filled" severity={severity} onClose={() => setNotify(false)}>
                        {msg}
                    </MuiAlert>
                </Snackbar>
            ))}
        </>
    );
}) as React.FC<PropsType>;