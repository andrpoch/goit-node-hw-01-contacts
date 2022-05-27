const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async(newContacts) => {
   await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2),"utf-8"); 
}
const getContacts = async () => {
   const data = await fs.readFile(contactsPath);
   return JSON.parse(data);
}

async function listContacts () {
const contacts = await getContacts();
console.table(contacts)
}

async function getContactById(contactId) {
   const contacts = await getContacts();
   const result = contacts.find(contact => contact.id === contactId);
   if (!result) {
      return null;
   }
   console.log(result);
   return result;
}

async function removeContact(contactId) {
   const contacts = await getContacts();
   const idx = contacts.findIndex(contact => contact.id === contactId);
   if (idx === -1) {
      return null;
   }
   const [result] = contacts.splice(idx, 1);
   await updateContacts(contacts);
   return result;
}

async function addContact(name, email, phone) {
   const contacts = await getContacts();
   const newContact = {
      name,
      email,
      phone,
      id: nanoid()
   };
   const newContacts = [...contacts,newContact];
   await updateContacts(newContacts);
   console.log(`Contact ${name} added`)
   return newContact;
}

module.exports = {
   listContacts,
   getContactById,
   removeContact,
   addContact
}
