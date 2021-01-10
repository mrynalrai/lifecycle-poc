import logo from './logo.svg';
import './App.css';
import ClickAnalytics from './hoc/ClickAnalytics';
import Content from './Container/Content';

function App() {
  return (
    <div className="App">
      <ClickAnalytics>
        <Content>
        </Content>
      </ClickAnalytics>
    </div>
  );
}

export default App;
