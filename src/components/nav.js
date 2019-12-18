import React from 'react';
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
          <ul>
            <li>
              <Link to="/saloon">Salão</Link>
            </li>
            <li>
              <Link to="/kitchen">Cozinha</Link>
            </li>          
          </ul>
        </nav>

  )
}