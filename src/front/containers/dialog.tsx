import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import createUser from '@actions/users/create';
import getUsers from '@actions/users/list';
import Dialog from '@components/dialog';
import {AppStoreType} from '@reducers';

type PropsType = {
    open: boolean,
    handleClose: () => void
};

export default (({open, handleClose}) => {
    const {pending, success, msg} = useSelector((store: AppStoreType) => store.users.create);
    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState({email: '', name: '', surname: ''});

    useEffect(() => setUserInfo({email: '', name: '', surname: ''}), [open]);

    const onSave = async () => {
        const {email, name, surname} = userInfo;
        await dispatch(createUser({email, name, surname}));
        dispatch(getUsers());
        handleClose();
    };

    return <Dialog open={open} onSave={onSave} pending={pending} success={success} msg={msg}
                   handleClose={handleClose} userInfo={userInfo} setUserInfo={setUserInfo}/>;
}) as React.FC<PropsType>;