import  React, {useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { RadioGroup, Radio, FormLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import {apiCreate} from '../api'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/%E5%8B%A2%E9%88%9E-%E9%BB%83-612862216/">
        Jim Huang
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();
  const [id, setId] = useState("");
  const [password, setPwd] = useState("");
  const [kind, setKind] = useState("");
  

  const submit = async (e) => {
    e.preventDefault()
    if (id && password &&kind) {
    const create = await apiCreate({id,password,kind});
      console.log(id,password,kind);
      console.log('-------------------')
      console.log(create);
      // history.push("/HomePage");  
    }
    
  }

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          帳號註冊
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="姓"
                name="lastName"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fastName"
                label="名"
                name="fastName"
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setId(e.target.value)}
                defaultValue={id}
                variant="outlined"
                required
                fullWidth
                id="user_id"
                label="帳號"
                name="UserId"
                autoComplete="UserId"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPwd(e.target.value)}
                defaultValue={password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="user_password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel style={{ fontsize: 20 }}> 角色種類： </FormLabel>
              <RadioGroup aria-label="CATEGORY " name="Category" row>
                <FormControlLabel value="Funder" label="投資者" control={<Radio color="primary" />}  defaultValue={kind} onChange={(e) => setKind(e.target.value)}/>
                <FormControlLabel value="Enterprise" label="企業方" control={<Radio color="primary" />} defaultValue={kind} onChange={(e) => setKind(e.target.value)} />
              </RadioGroup>

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            endIcon={<ArrowRightOutlinedIcon />}
          >
            註冊
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                已經有帳號了？登入
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}