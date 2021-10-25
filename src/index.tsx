import ReactDOM from 'react-dom';
import './style/global.scss'
import { DialogProvider } from './context/DialogContext';
import { BrowserRouter } from 'react-router-dom'
import Routes from './router/routes';


ReactDOM.render(
  <BrowserRouter>
    <DialogProvider>
        <Routes />      
    </DialogProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


