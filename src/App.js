import './App.css';
import './Style.scss';

// import { MainPageView } from './Views';
import { Home } from './Views/MainPage/Home';
import { Login } from './Views/MainPage/Login/Login';


function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <Login />
      </div>
    </div>
  );
}

export default App;
