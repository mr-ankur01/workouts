import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => { 
    const { logout } = useLogout()
    const  { user } = useAuthContext()
    const handleLogout = () =>{
       logout()

    }

    return (
        <header>
            <div className="nav-container">
                <div className="logo">
                    <Link to='/'><h2>Workouts</h2>  </Link>
                </div>
                <div className="links">
                    { user && (<>
                    <span>{user.email}</span>
                    <button className='logout' onClick={handleLogout}>Log out</button>
                    </>
                    )}
                    {!user && (<>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                    <a href='https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT' target="_black">Playlist</a>
                    </> )}
                </div>
            </div>
        </header>
    )
}

export default Navbar;