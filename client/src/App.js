import Home from './pages/home';
import LoginModal from './components/modals/loginModal';
import RegisterModal from './components/modals/registerModal';
import Sidebar from './components/sidebar/sidebar';
import { Routes, Route, } from 'react-router-dom'
import Messages from './pages/messages';
import PostModal from './components/modals/postModal';
import Event from './pages/event';
import { Navigate } from 'react-router-dom';
import Chat from './pages/chat';
import RequireAuth from "./components/requireAuth";
import { LocationProvider } from './Context/locationProvider';

function App() {


  return (

    <>
      <LocationProvider>
        <Sidebar />
      
        <Routes>
          <Route path="/" exact Component={Home}></Route>
          <Route path='/event/:id' element={<Event />} />
          <Route element={<RequireAuth/>}>
            <Route path='/messages' element={<Messages />} />
            <Route path='/messages/:id' element={<Chat />} />
          </Route>
          
          <Route path="*" element={<Navigate to='/' />}></Route>
        </Routes>
        <RegisterModal/>
        <LoginModal />
          <PostModal />
      </LocationProvider>
    </>
  );
}

export default App;
