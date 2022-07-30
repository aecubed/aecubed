import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from 'main_page.jsx';
import About from 'about_page.jsx';


const App = () => {
  return (
    <div className = 'main_page'>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<Main/>}/>
          <Route path = '/about' element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  ) 
}


export default App;