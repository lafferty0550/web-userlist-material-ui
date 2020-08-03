import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Layout} from '@components';
import getUsers from '@actions/users/list';
import {AppStoreType} from '@reducers';

export default () => {
    const list = useSelector(({users: {list}}: AppStoreType) => list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return <Layout {...list}/>;
}