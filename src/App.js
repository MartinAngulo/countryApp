import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Home from './components/Home'
import CreateActivity from './components/CreateActivity';
import Nav from './components/Nav';
import CountryDetail from './components/CountryDetail';
import ChargePage from './components/ChargePage';


const NavBar = ()=>{
  return (
    <>
    <Nav />
    <Outlet />
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontPage />} />
          <Route element={<NavBar />}>
            <Route path='/home' element={<Home />} />
            <Route path='/create' element={<CreateActivity />} />
            <Route path='/detail/:countryId' element={<CountryDetail />} />
            <Route path='/charge' element={<ChargePage />}/>
          </Route>
          <Route path='*' element={<Navigate to={'/'}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
