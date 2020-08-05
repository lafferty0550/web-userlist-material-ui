import React from 'react';
import {
    Avatar, Button, Card,
    CardHeader, Grid, makeStyles, Theme
} from '@material-ui/core';

import {UserModel} from '@api/UserAPI';

const useStyles = makeStyles((theme: Theme) => {
    const headerSize = 90;
    const cardWidth = 350;
    return {
        grid: {
            paddingTop: 50
        },
        button: {
            borderStyle: 'dashed',
            fontSize: 48,
            width: cardWidth,
            height: headerSize,
            color: theme.palette.secondary.main
        },
        card: {
            display: 'flex',
            height: headerSize,
            width: cardWidth,
            boxShadow: '1px 1px 10px #ddd'
        },
        card__num: {
            height: headerSize,
            width: headerSize - 20,
            margin: 0,
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.main,
            fontSize: 30,
            fontWeight: 700
        },
        card__avatar: {
            backgroundColor: theme.palette.primary.main,
            fontSize: 16
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
                            subheader={user.email}
                            subheaderTypographyProps={{variant: 'caption'}}/>
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