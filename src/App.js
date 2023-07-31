import './App.css';
import Header from './components/Header/Header';
import Post from './components/Post/Post';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { useState } from 'react';
import CreatePost from './pages/CreatePost/CreatePost';
import DataProvider from './context/DataProvider';
import Update from './pages/CreatePost/Update';
import Detail from './components/Details/Detail';
function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  const PrivateRoute = ({ isAuthenticated, ...props }) => {
    return isAuthenticated ?
      <>
        <Header />
        <Outlet />
      </>
      : <Navigate replace to='/login' />
  }

  return (

    <DataProvider>
      <Router>
        <Routes>
          <Route path='/login' element={

            <Login isUserAuthenticated={isUserAuthenticated} />
          } />
          <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>

            <Route path='/' element={<Home />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/details/:id' element={<Detail/>}/>
            <Route path='/update/:id' element={<Update/>}/>
          </Route>
          <Route path='/signup' element={<Signup />} />

        </Routes>
      </Router>
    </DataProvider>



  );
}

export default App;
