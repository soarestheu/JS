const { v4 } = require('uuid');

let contacts = [{
        id: v4(),
        name: "Matheus",
        email: "soares@matheus.com",
        phone: '12121212',
        category_id: v4()
    },
    {
        id: v4(),
        name: "Soares",
        email: "soares@soares.com",
        phone: '01090109',
        category_id: v4()
    }
]
class ContactsRepository {
    findAll() {
        return new Promise((resolve, reject) => { resolve(contacts) });
    }

    findById(id) {
        return new Promise((resolve, reject) => resolve(
            contacts.find((contact) => contact.id == id),
        ));
    }

    delete(id) {
        return new Promise((resolve) => {
            contacts = contacts.filter((contact) => contact.id != id)
            resolve()
        });
    }
}

module.exports = new ContactsRepository();