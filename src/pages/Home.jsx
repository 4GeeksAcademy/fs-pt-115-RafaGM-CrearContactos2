import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { getContact } from "../services/servicesApi.js";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()


	useEffect(() => {
		getContact(dispatch)
	}, [])

	return (
		<div className="container m-auto row p-5 border">
			<div className="col-md-3">
				<img className="rounded-circle object-fit-cover" style={{ width: "150px", height: "150px" }} src="https://png.pngtree.com/background/20230611/original/pngtree-an-old-wizard-holding-a-ball-that-he-rolled-in-his-picture-image_3169742.jpg" alt="" />
			</div>
			{store.contact.map((contact, index) => {
                return (
				<>
					<div className="d-flex flex-column col-md-7" key={index}>
						<h2 className="mb-2">{contact.name}</h2>
						<span className="mb-3"><i className="fa-solid fa-location-arrow"></i>:{contact.direccion}</span>
						<span className="mb-3"><i className="fa-solid fa-at"></i>:{contact.email}</span>
						<span><i className="fa-solid fa-phone"></i>:{contact.telefono}</span>
					</div>

					<div className="col-md-2">
						<Link to={`/edit/${contact.id}`}>
							<button className="m-1"><i className="fa-solid fa-pen"></i></button>
						</Link>
						<button className="m-1"><i className="fa-solid fa-trash"></i></button>
					</div>
				</>
				)
			})}
		</div>
	);
};
