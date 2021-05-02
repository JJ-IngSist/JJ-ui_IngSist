import React from 'react';
import './App.css';
import Router from "./router/Router";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#79b5dc',
      main: '#50b7f5',
      dark: '#2c8ec4',
      contrastText: '#3b3b3b',
    },
    secondary: {
      light: '#e6ecf0',
      main: '#c65ca1',
      dark: '#712c5b',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <Router/>
      </MuiThemeProvider>
  );
}

export default App;
