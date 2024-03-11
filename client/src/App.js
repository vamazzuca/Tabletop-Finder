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
import Profile from './pages/profile';
import UpdateModal from './components/modals/updateModal';
import Search from './pages/search';
import Groups from './pages/groups';
import Navbar from './components/sidebar/navbar';

function App() {


  return (

    <>
      
        <LocationProvider>
          <Sidebar />
          <Navbar />
          <Routes>
            <Route path="/" exact Component={Home}></Route>
            <Route path='/event/:id' element={<Event />} />
            <Route path='/search' element={<Search />} />
            <Route element={<RequireAuth/>}>
              <Route path='/messages' element={<Messages />} />
              <Route path='/groups' element={<Groups />} />
              <Route path='/messages/:id' element={<Chat />} />
              <Route path='/profile/:username' element={<Profile/>} />
            </Route>
            
            <Route path="*" element={<Navigate to='/' />}></Route>
          </Routes>
          <RegisterModal/>
          <LoginModal />
          <PostModal />
          <UpdateModal/>
        </LocationProvider>
     
    </>
  );
}

export default App;
