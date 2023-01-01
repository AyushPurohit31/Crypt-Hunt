import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import { styled } from '@mui/system';


function App() {
  const MyComponent = styled('div')({
    color: 'white',
    backgroundColor: '#14161a',
    minHeight: '100vh',
  });
  return (
    <BrowserRouter>
    <MyComponent>
      <div>
        <Header />
        <Routes>
          <Route path='/' element = {<Homepage/>} exact/>
          <Route path='/coin/:id' element = {<Coinpage/>}/>
        </Routes>
      </div>
    </MyComponent>
    </BrowserRouter>
  );
}

export default App;
