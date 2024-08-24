const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			image2:
        "https://img.freepik.com/vector-gratis/mujer-feliz-cabello-negro_1308-171724.jpg",
      		imagemale:
        "https://img.freepik.com/vector-premium/retrato-lindos-ninos-pequenos-dibujos-animados-vector-ilustracion_723224-928.jpg",
      		image:
		"https://img.freepik.com/foto-gratis/retrato-hombre-estilo-dibujos-animados_23-2151134092.jpg?t=st=1724530823~exp=1724534423~hmac=4b62a9de6ec97361a382ee665d2f2edd95f6a9c2ae39334315058a6f369c1a85&w=900",
			listContacts: { contacts: [] },
		},

		actions: {
				createUser: () => {
				  fetch("https://playground.4geeks.com/contact/agendas/NicoO", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					  accept: "application/json",
					},
					body: JSON.stringify({}),
				  })
					.then((response) => response.json())
					.then((data) => {
					  console.log(data);
					})
					.catch((error) => {
					  console.error("Error:", error);
					});
				},
				createContact: (contact) => {
				  const store = getStore();
				  fetch("https://playground.4geeks.com/contact/agendas/NicoO/contacts", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					  accept: "application/json",
					},
					body: JSON.stringify(contact),
				  })
					.then((response) => response.json())
					.then((newContact) => {
					  setStore({
						listContacts: [...store.listContacts, newContact],
					  });
					})
					.catch((error) => {
					  console.error("Error:", error);
					});
				},
				fetchContacts: () => {
				  fetch("https://playground.4geeks.com/contact/agendas/NicoO/contacts")
					.then((response) => response.json())
					.then((data) => {
					  setStore({ listContacts: data });
					})
					.catch((error) => {
					  console.error("Error:", error);
					});
				},
				editContact: (contactId, updatedContact) => {
				  const store = getStore();
				  fetch(
					`https://playground.4geeks.com/contact/agendas/NicoO/contacts/${contactId}`,
					{
					  method: "PUT",
					  headers: {
						"Content-Type": "application/json",
						accept: "application/json",
					  },
					  body: JSON.stringify(updatedContact),
					}
				  )
					.then((response) => response.json())
					.then((updatedContact) => {
					  const updatedContacts = store.listContacts.contacts.map((contact) =>
						contact.id === contactId ? updatedContact : contact
					  );
					  setStore({ listContacts: { contacts: updatedContacts } });
					})
					.catch((error) => {
					  console.error("Error:", error);
					});
				},
				deleteContact: (contactId) => {
				  const store = getStore();
				  fetch(
					`https://playground.4geeks.com/contact/agendas/NicoO/contacts/${contactId}`,
					{
					  method: "DELETE",
					  headers: {
						accept: "application/json",
					  },
					}
				  )
					.then((response) => {
					  if (response.ok) {
						const updatedContacts = store.listContacts.contacts.filter(
						  (contact) => contact.id !== contactId
						);
						setStore({ listContacts: { contacts: updatedContacts } });
					  } else {
						console.error("Error deleting contact:", response.statusText);
					  }
					})
					.catch((error) => {
					  console.error("Error:", error);
					});
				},
			  },
			};
		};

		export default getState;

