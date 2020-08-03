import React from 'react';
import {
    Avatar, Button, Card,
    CardHeader, Grid, makeStyles
} from '@material-ui/core';

import {UserModel} from '@api/UserAPI';

const useStyles = makeStyles(() => {
    const headerSize = 90;
    const cardWidth = 350;
    return {
        grid: {
            paddingTop: 50
        },
        button: {
            borderStyle: 'dotted',
            fontSize: 48,
            width: cardWidth,
            height: headerSize,
            color: '#999'
        },
        card: {
            display: 'flex',
            height: headerSize,
            width: cardWidth,
            border: '1px solid lightgray',
            boxShadow: '1px 1px 3px lightgray'
        },
        card__num: {
            height: headerSize,
            width: headerSize - 20,
            margin: 0,
            backgroundColor: '#eee',
            color: '#bbb',
            fontSize: 24
        },
        card__avatar: {
            backgroundColor: '#1EC9E8'
        }
    };
});

type PropsType = {
    users: Array<UserModel>,
    setOpen: (value: boolean) => void
}

export default (({users, setOpen}) => {
    const classes = useStyles();

    return (
        <Grid container spacing={4} justify='space-around' className={classes.grid}>
            {users.map((user, index) => (
                <Grid item key={user.email}>
                    <Card className={classes.card}>
                        <Avatar variant="square" className={classes.card__num}>
                            #{index + 1}
                        </Avatar>
                        <CardHeader
                            avatar={
                                <Avatar className={classes.card__avatar}>
                                    {user.name[0]}{user.surname[0]}
                                </Avatar>
                            }
                            title={`${user.name} ${user.surname}`}
                            subheader={user.email}/>
                    </Card>
                </Grid>
            ))}
            <Grid item>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={() => setOpen(true)}>+</Button>
            </Grid>
        </Grid>
    )
}) as React.FC<PropsType>;