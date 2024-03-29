import './App.css';
import { Route, Routes } from'react-router-dom'
import Landing from './components/landing/Landing.jsx';
import Home from './components/home/Home.jsx';
import Detail from './components/detail/Detail.jsx';
import Form from './components/form/Form.jsx';
import ErrorPage from './components/errorPage/ErrorPage.jsx';

function App() {

  return (
    <div>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/detail/:id' element={<Detail/>}></Route>
          <Route path='/create' element={<Form/>}></Route>
          <Route path='*' element={<ErrorPage/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
