import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createcontact, editcontact, getContact } from "../services/servicesApi";

export const CrearContact = () => {

    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()
    const navigate = useNavigate()
    const buscarContact = store.contact.find(contact => contact.id == id)
    const [newContact, setNewContact] = useState({})

    const handleChange = (e) => {
        setNewContact({ ...newContact, [e.target.id]: e.target.value })
    }

    const handleSumit = async (e) => {
        e.preventDefault();

        if (id) {
            editcontact(id, newContact, dispatch, navigate)
            return
        }
        createcontact(newContact, navigate, dispatch);

    }

    useEffect(() => {
        if (id) {
            setNewContact(buscarContact)
        }
    }, [id])



    useEffect(() => {
        getContact(dispatch)
    }, [])


    return (
        <form onSubmit={handleSumit} className="container w-50 bg-light my-5 p-3">
            <h2 className="text-center mb-5">Introduce los datos para crear el contacto</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Nombre contacto
                </label>
                <input type="text" className="form-control" id="name" onChange={(e) => handleChange(e)} required defaultValue={newContact.name ?? ""} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input type="text" className="form-control" id="email" onChange={(e) => handleChange(e)} required defaultValue={newContact.email ?? ""} />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                    Telefono
                </label>
                <input type="text" className="form-control" id="phone" onChange={(e) => handleChange(e)} required defaultValue={newContact.phone ?? ""} />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">
                    Dirección
                </label>
                <input type="text" className="form-control" id="address" onChange={(e) => handleChange(e)} required defaultValue={newContact.address ?? ""} />
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                    {id ? "Editando Contacto" : "Crear Contacto"}
                </button>
            </div>
        </form>
    );
}
