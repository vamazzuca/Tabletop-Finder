import Home from './pages/home';
import LoginModal from './components/modals/loginModal';
import RegisterModal from './components/modals/registerModal';
import Sidebar from './components/sidebar/sidebar';
import { Routes, Route } from 'react-router-dom'
import PostModal from './components/modals/postModal';
import Event from './pages/event';

function App() {


  return (

    <>
      <Sidebar />
      <Routes>
        <Route path="/" exact Component={Home}></Route>
        <Route path='/event/:eventId' element={<Event />} />
      </Routes>
      <RegisterModal/>
      <LoginModal />
      <PostModal/>
    </>
  );
}

export default App;
