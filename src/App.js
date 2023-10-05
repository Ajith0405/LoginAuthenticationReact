
import './App.css';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserLoginPage from './components/UserLoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';




function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>} />
          <Route path='/login'  element={<Login/>}/>
          <Route path='/register'  element={<RegisterForm />}/>
          <Route path='/userlogin'  element={<UserLoginPage/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
      
    </div>
  );
}

export default App;
