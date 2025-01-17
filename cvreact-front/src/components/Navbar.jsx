import { useLocation, Link } from "react-router-dom"

export default function Navbar() {

    const location = useLocation();

  return (
    <div className="navbar bg-base-100 flex justify-between">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-300 rounded-box z-10 mt-3 w-52 p-2 shadow">
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/languages">Languages</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <Link className="btn btn-ghost text-xl" to="/">CVReact</Link>
    </div>
    <div className="navbar-end">
      <button className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  </div>
  )
}
