import { React, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { apiLogin } from '../api'
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));

export default function Login() {
  let history = useHistory();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [password, setPwd] = useState("");

  const result = async (e) => {
    e.preventDefault()
    if (id && password) {
      const Login = await apiLogin({ id, password });
      console.log(id, password);
      console.log('-------------------')
      console.log(Login.data);
      if (Login.data === 'login success') {
        console.log('要登入囉')
        history.push("/HomePage");
      }
      else {
        alert('登入失敗，請在試一次')
      }
    }
    else {
      alert('有空白欄位 ，請在試一次')
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
          天使基金平台 登入
        </Typography>
        <form className={classes.form} noValidate onSubmit={result}>
          <TextField
            onChange={(e) => setId(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="帳號"
            name="email"
            autoComplete="email"
            autoFocus
          // error={idError}
          />
          <TextField
            onChange={(e) => setPwd(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="密碼"
            type="password"
            id="password"
            autoComplete="current-password"
          // error={pwdError}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="記住我"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

            endIcon={<ArrowRightOutlinedIcon />}
          >
            登入
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {"忘記密碼?"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"沒有帳號？註冊一個"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}