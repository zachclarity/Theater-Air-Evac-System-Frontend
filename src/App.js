// React
import React , {useEffect} from 'react'

// router
import { BrowserRouter, HashRouter } from "react-router-dom"

// MUI
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import LocalStorageListener from './components/LocalStorageListener'

// custom
import Nav from './nav/Nav'
import Content from './content/Content'
import { StorageContextProvider } from './context/StorageContext'

function Router(props) {
  const deployment = process.env.REACT_APP_DEPLOYMENT
  /* istanbul ignore if: deployment config */
  if (deployment === "github") {
    return (
      <HashRouter>
        {props.children}
      </HashRouter>
    )
  }
  return (
    <BrowserRouter>
      {props.children}
    </BrowserRouter>
  )
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  useEffect(() => {
    const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = ''; // Chrome requires returnValue to be set
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []);

  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StorageContextProvider>
          <LocalStorageListener/>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Nav />
            <Content />
          </ThemeProvider>
        </StorageContextProvider>
      </LocalizationProvider>
    </Router>
  );
}

export default App