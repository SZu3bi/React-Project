import './App.css';
import './Style.scss';

// import { MainPageView } from './Views';
import { Home } from './Views/MainPage/Home';
import { LoginForm } from './Views/MainPage/LoginForm/LoginForm';


function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
