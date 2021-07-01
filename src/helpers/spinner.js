import React from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: "20px",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme} >
        <CircularProgress size={20} color="primary" />
      </MuiThemeProvider>
    </div>
  );
}