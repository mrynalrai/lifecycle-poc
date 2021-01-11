import logo from './logo.svg';
import './App.css';
import ClickAnalytics from './hoc/ClickAnalytics';
import QRCode from './hoc/QRCode';
import { Route, Redirect, HashRouter, Switch} from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Route path="/" exact>
        <Redirect to='/lifecycle' />
        </Route>
        <Route path="/lifecycle" component={ClickAnalytics} />
        <Route path="/qr" component={QRCode} />
      </div>
    </HashRouter>
  );
}

export default App;
