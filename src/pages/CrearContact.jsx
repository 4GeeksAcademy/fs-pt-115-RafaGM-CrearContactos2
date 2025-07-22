import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CrearContact = () => { 

const { store, dispatch } = useGlobalReducer()

const { id } = useParams()

const navigate = useNavigate()


const [newContact, setNewContact] = useState({
    nombre: "",
    direccion: "",
    email: "",
    telefono: ""
})

const [mensajeAlerta, setMensajeAlerta] = useState(false);

const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value })
}

const handleSumit = async (e) => {
    e.preventDefaul();

    if (!newContact.name || !newContact.email || !newContact.telefono || !newContact.direccion) {
        setMensajeAlerta("Te faltan datos, por favor rellene todos los campos");
        setTimeout(() => setMensajeAlerta(false), 2000);
        return;
    }
    if (isEditing) {
        editContact(id, newContact, dispatch, navigate)
    } else {

        createcontact(newContact, navigate, dispatch);
    }
}

useEffect(() => {
    if (id) {
        setNewContact(store.contact.filter(contact => contact.id == id)[0])
        setIsEditing(true)
    } else {
        setIsEditing(false)
        setNewContact({
            nombre: "",
            direccion: "",
            email: "",
            telefono: ""
        })
    }
}, [id])

return (
    <form onSubmit={handleSumit} className="container w-50 bg-light my-5 p-3">
        <h2 className="text-center mb-5">Introduce los datos para crear el contacto</h2>
        <div className="mb-3">
            <label htmlhtmlFor="contactName" className="form-label">
                Nombre contacto
            </label>
            <input type="text" className="form-control" name="contactName" onChange={(e) => handleChange(e)} />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">
                Email
            </label>
            <input type="text" className="form-control" name="email" onChange={(e) => handleChange(e)} />
        </div>
        <div className="mb-3">
            <label htmlFor="phone" className="form-label">
                Telefono
            </label>
            <input type="text" className="form-control" name="phone" onChange={(e) => handleChange(e)} />
        </div>
        <div className="mb-3">
            <label htmlFor="address" className="form-label">
                Dirección
            </label>
            <input type="text" className="form-control" name="address" onChange={(e) => handleChange(e)} />
        </div>
        <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
                {isEditing ? "Editando Contacto" : "Crear Contacto"}
            </button>
        </div>
        {mensajeAlerta && (
            <div className="alert alert-danger" role="alert">
                {mensajeAlerta}
            </div>
        )}
    </form>
);
}