import { NavLink } from "react-router-dom";

const Nav: React.FC = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/health">Health</NavLink>
      </li>
      <li>
        <NavLink to="/stats">Stats</NavLink>
      </li>
      <li>
        <NavLink to="/help">Help</NavLink>
      </li>
      <li>
        <NavLink to="/settings">Settings</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
