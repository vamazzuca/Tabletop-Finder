import Home from './pages/home';
import LoginModal from './components/modals/loginModal';
import RegisterModal from './components/modals/registerModal';
import Sidebar from './components/sidebar/sidebar';
import { Routes, Route } from 'react-router-dom'
import PostModal from './components/modals/postModal';

function App() {


  return (

    <>
      <Sidebar />
      <Routes>
          <Route path="/" exact Component={Home}></Route>
      </Routes>
      <RegisterModal/>
      <LoginModal />
      <PostModal/>
    </>
  );
}

export default App;
