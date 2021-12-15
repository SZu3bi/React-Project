import './App.css';
import './Style.scss';

// import { MainPageView } from './Views';
import { Home } from './Views/MainPage/Home';
import { LoginForm } from './Views/MainPage/LoginForm/LoginForm';
import { LoginSalesForce } from './Views/MainPage/LoginSalesForce';


function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <LoginSalesForce />
      </div>
    </div>
  );
}

export default App;
