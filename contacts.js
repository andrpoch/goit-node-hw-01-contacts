const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const updateContacts = async(contacts) => {
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); 
}


async function listContacts () {
   const data = await fs.readFile(contactsPath);
   return JSON.parse(data);
}

async function getContactById(contactId) {
   const contacts = await listContacts();
   const result = contacts.find(contact => contact.id === contactId);
   if (!result) {
      return null;
   }
   return result
}

async function removeContact(contactId) {
   const contacts = await listContacts();
   const idx = contacts.findIndex(contact => contact.id === contactId);
   if (idx === -1) {
      return null;
   }
   const [result] = contacts.splice(idx, 1);
   await updateContacts(contacts);
   return result;
}

async function addContact(name, email, phone) {
   const contacts = await listContacts();
   const newContact = {
      name,
      email,
      phone,
      id: nanoid()
   };
   contacts.push(newContact);
   await updateContacts(contacts);
   return newContact;
}

module.exports = {
   listContacts,
   getContactById,
   removeContact,
   addContact
}