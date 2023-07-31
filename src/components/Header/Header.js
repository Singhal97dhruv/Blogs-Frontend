import React from 'react'
import "./header.css"
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className='header'>

    <div className="logo">
    <Link to="/">
        <FlutterDashIcon className='icon logoText' />
        <h1 className='logoText'>BlogKabootar</h1>
    </Link>
    </div>

    <div className="perma_links">
    
        <Link className='lnk' to="/">Home</Link>
        <Link className='lnk' to='/create'>Create Blog!</Link>
        <Link className='lnk' to="/login">Login</Link>
        <Link className='lnk' to="/signup">SignUp</Link>

    </div>
      
    </div>
  )
}

export default Header
