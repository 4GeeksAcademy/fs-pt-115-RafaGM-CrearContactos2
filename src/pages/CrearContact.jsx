import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createcontact, editcontact, getContact } from "../services/servicesApi";

export const CrearContact = () => {

    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()


    const [newContact, setNewContact] = useState(
        {
            "name": "",
            "phone": "",
            "email": "",
            "address": ""
        }
    )

    const handleChange = (e) => {
        setNewContact({ ...newContact, [e.target.id]: e.target.value })
    }

    const handleSumit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            editcontact(id, newContact, dispatch, navigate)
        } else {

            createcontact(newContact, navigate, dispatch);
        }
    }

    useEffect(() => {
        if (id) {
                setIsEditing(true)
                setNewContact(store.contact.filter(contact => contact.id == id)[0])
                console.log(newContact);
            


        } else {
            setIsEditing(false)
            setNewContact(
                {
                    "name": "",
                    "phone": "",
                    "email": "",
                    "address": ""
                }
            )
        }
    }, [id])

    return (
        <form onSubmit={handleSumit} className="container w-50 bg-light my-5 p-3">
            <h2 className="text-center mb-5">Introduce los datos para crear el contacto</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Nombre contacto
                </label>
                <input type="text" className="form-control" id="name" onChange={(e) => handleChange(e)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input type="text" className="form-control" id="email" onChange={(e) => handleChange(e)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                    Telefono
                </label>
                <input type="text" className="form-control" id="phone" onChange={(e) => handleChange(e)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">
                    Dirección
                </label>
                <input type="text" className="form-control" id="address" onChange={(e) => handleChange(e)} required />
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                    {isEditing ? "Editando Contacto" : "Crear Contacto"}
                </button>
            </div>
        </form>
    );
}