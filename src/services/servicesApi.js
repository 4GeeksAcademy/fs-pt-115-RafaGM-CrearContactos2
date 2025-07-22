export const getContact = async (dispatch) => {
		const response = await fetch("https://playground.4geeks.com/contact/agendas/kuquyz/contacts")
		if (!response.ok) {
			createAgenda();
		}
		const data = await response.json()
        console.log(data);
		dispatch({type: "set_contact" , payload: data})
        
                 
	}

export const createAgenda = async () => {
		await fetch("https://playground.4geeks.com/contact/agendas/kuquyz", {
			method: "POST"
		})
        const data = await response.json()
        console.log(data);
        
	}

export const createcontact = async (newContact , navigate, dispatch) => {
	const response = await fetch("https://playground.4geeks.com/contact/agendas/kuquyz/contacts", {
		method: "POST",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(newContact)
	})
	if (response.ok) {
		getContact(dispatch)
        navigate("/")
	}
	
}

export const editcontact = async (id, newContact, dispatch, navigate) => {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/kuquyz/contacts/${id}`,{
        method: "PUT",
        body: JSON.stringify(newContact),
        headers: {
            "Content-Type" : "application/json"
        }
    })
    if(response.ok) {
        getContact(dispatch)
        navigate("/")
    }
}