const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

function listContacts() {
  try {
    const contactsPath = path.join("db", "contacts.json");

    const contactsData = fs.readFileSync(contactsPath);
    const contacts = JSON.parse(contactsData);
    console.log(contacts);

  } catch (error) {
    console.log(error);
  }
}

function getContactById(contactId) {
  try {
    const contactsPath = path.join("db", "contacts.json");

    const contactsData = fs.readFileSync(contactsPath);
    const contacts = JSON.parse(contactsData);

    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact);

    return contact || null;

  } catch (error) {
    console.log(error);
    return null;
  }
}

function removeContact(contactId) {
  try {
    const contactsPath = path.join("db", "contacts.json");
    const contactsData = fs.readFileSync(contactsPath);
    let contacts = JSON.parse(contactsData);

    const removedContact = contacts.find((c) => c.id === contactId);
    if (!removedContact) {
      return null;
    }

    contacts = contacts.filter((c) => c.id !== contactId);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts));

    return removedContact;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function addContact(name, email, phone) {
  try {
    const contactsPath = path.join("db", "contacts.json");
    const contactsData = fs.readFileSync(contactsPath);
    let contacts = JSON.parse(contactsData);

    const newContactId = uuidv4();

    const newContact = {
      id: newContactId,
      name,
      email,
      phone
    };

    contacts.push(newContact);

    fs.writeFileSync(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};