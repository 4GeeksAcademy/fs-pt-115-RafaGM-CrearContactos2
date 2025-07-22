import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Agenda De Contactos</span>
				</Link>
				<div className="ml-auto">
					<Link to="/Crear">
						<button className="btn btn-primary">Crear Nuevo Contacto</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};