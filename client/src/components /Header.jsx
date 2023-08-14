// import { NavLink } from 'react-router-dom';

function Header(props) {
  

  return (
    <header className="row justify-between align-center">
      <h3>Logo</h3>


      <nav>
        {/* //NavLink is a component that is used to link to other pages in the app */}
        <NavLink to="/">Home</NavLink> 
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>

      </nav>
    </header>
  )
}

export default Header;