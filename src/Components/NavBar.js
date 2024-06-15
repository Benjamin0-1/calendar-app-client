import React from "react";
import './NavBar.css'
import { Link } from "react-router-dom";

 function NavBar () {

  //LOGIN is not being rendered below.
   return (
     <div className="NavBar">
       <Link to="/book"> Apartar </Link>
       <br/>
       <Link to='/delete'>Eliminar fecha</Link>
       <br/>
       <Link to='showbookings'>Ver Fechas </Link>
       <br/>
       <Link to='/parentsearch'>Búsqueda avanzada </Link>
       <br/>

       <Link to='/deleteddate'>Ver fechas eliminadas </Link>
  
     </div>
   );
 };

export default NavBar;

