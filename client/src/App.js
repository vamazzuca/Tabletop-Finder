import Home from './pages/home';
import LoginModal from './components/modals/loginModal';
import RegisterModal from './components/modals/registerModal';
import Sidebar from './components/sidebar/sidebar';
import { Routes, Route } from 'react-router-dom'
import Messages from './pages/messages';
import PostModal from './components/modals/postModal';
import Event from './pages/event';

function App() {


  return (

    <>
      <Sidebar />
      <Routes>
        <Route path="/" exact Component={Home}></Route>
        <Route path='/event/:id' element={<Event />} />
        <Route path='/messages' element={<Messages />} />
      </Routes>
      <RegisterModal/>
      <LoginModal />
      <PostModal/>
    </>
  );
}

export default App;
