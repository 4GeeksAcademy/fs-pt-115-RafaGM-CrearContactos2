import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { eliminarContact, getContact } from "../services/servicesApi.js";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [contactoAEliminar, setContactoAEliminar] = useState(null);

	useEffect(() => {
		getContact(dispatch)
	}, [])

	return (
		<>
			{store.contact.map((contact, index) => (
				<div className="container m-auto row p-5 border" key={index}>
					<div className="col-md-3">
						<img className="rounded-circle object-fit-cover" style={{ width: "150px", height: "150px" }} src="https://png.pngtree.com/background/20230611/original/pngtree-an-old-wizard-holding-a-ball-that-he-rolled-in-his-picture-image_3169742.jpg" alt="" />
					</div>

					<div className="d-flex flex-column col-md-7" >
						<h2 className="mb-2">{contact.name}</h2>
						<span className="mb-3"><i className="fa-solid fa-location-arrow"></i>:{contact.address}</span>
						<span className="mb-3"><i className="fa-solid fa-at"></i>:{contact.email}</span>
						<span><i className="fa-solid fa-phone"></i>:{contact.phone}</span>
					</div>

					<div className="col-md-2">
						<Link to={`/edit/${contact.id}`}>
							<button className="m-1"><i className="fa-solid fa-pen"></i></button>
						</Link>
						<button
							className="m-1" data-bs-toggle="modal"
							data-bs-target="#confirmarEliminacionModal"
							onClick={() => setContactoAEliminar(contact.id,)}>
							<i className="fa-solid fa-trash"></i>
						</button>
					</div>





					<div className="modal fade" id="confirmarEliminacionModal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="modalLabel">Confirmar eliminación</h5>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
								</div>
								<div className="modal-body">
									¿Estás seguro de que deseas eliminar este contacto?
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
									<button
										type="button"
										className="btn btn-danger"
										data-bs-dismiss="modal"
										onClick={async () => {
											await eliminarContact(contactoAEliminar, dispatch);
											setContactoAEliminar(null);
										}}
									>
										Eliminar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div >
			))}
		</>
	);
};
