import React from 'react';
import './Login.css';
import './App.css';
import Router from "./router/Router";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#79b5dc',
      main: '#50b7f5',
      dark: '#2c8ec4',
      contrastText: '#e8e8e8',
    },
    secondary: {
      light: '#a491c6',
      main: '#8e6ec9',
      dark: '#5e4984',
      contrastText: '#d4d4d4',
    },
    background: {
      default:  '#282c34',
      paper:  '#434452'
    },
    text: {
      primary: '#adacac',
      secondary: '#7f7f7f',
    },
    action: {
      disabled: '#7f7f7f',
    }
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
