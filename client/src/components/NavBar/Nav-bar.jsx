import {React} from 'react'
import { Link } from 'react-router-dom'
import './Nav-bar.css'

export default function NavBar(){
    return(
        <div>
            <h3>NavBar</h3>
            <Link to='/activities'>Crear Actividad</Link>
            <br />
            <Link to='/about'>About</Link>
            <br />
            <Link to='/countries'>Home</Link>
        </div>
    )
}