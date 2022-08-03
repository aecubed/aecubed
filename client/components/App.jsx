import React from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Main from './Main.jsx';
import About from './about_page.jsx';
import '../stylesheets/style.scss';
import * as bootstrap from 'bootstrap';
// import Image from '..assets/AE^3_Logo'

const App = () => {
  return (
    <div className = 'main_page'>
      <BrowserRouter>
        <nav id='nav' className='navbar navbar-light'>
          <div className="navbar-logo">
            <img id='about-logo' src='/assets/AE3_Logo.png'></img>
          </div>
          <Link to='/about' className='navbar-about'>About</Link>
          <Link to='/' className='navbar-main'>Home</Link>
        </nav>
        <Routes>
          <Route path = '/' element={<Main/>}/>
          <Route path = '/about' element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;