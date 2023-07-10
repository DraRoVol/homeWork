const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function listContacts() {
  try {
    const contactsPath = path.join("db", "contacts.json");

    const contactsData = fs.readFileSync(contactsPath);
    const contacts = JSON.parse(contactsData);
    console.table(contacts);
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

    if (contact) {
      console.log(contact);
      return contact;
    } else {
      console.log(null);
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

function removeContact(contactId) {
  try {
    const contactsPath = path.join("db", "contacts.json");
    const contactsData = fs.readFileSync(contactsPath);
    let contacts = JSON.parse(contactsData);

    const removedContact = contacts.find((c) => c.id === contactId);

    contacts = contacts.filter((c) => c.id !== contactId);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts));

    if (removedContact) {
      console.log("removed contact:", removedContact);
      return removedContact;
    } else {
      console.log(null);
      return null;
    }

  } catch (error) {
    console.log(error);
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
      phone,
    };

    contacts.push(newContact);

    fs.writeFileSync(contactsPath, JSON.stringify(contacts));

    console.log("new contact:", newContact);

    return newContact;

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
