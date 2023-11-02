import Home from './pages/home';
import LoginModal from './components/modals/loginModal';
import RegisterModal from './components/modals/registerModal';

function App() {


  return (

    <>
      <RegisterModal/>
      <LoginModal/>
      <Home/>
    </>
  );
}

export default App;
