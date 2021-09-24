const fs = require('fs/promises');
const path= require('path');
const crypto=require('crypto')

const readContacts= async ()=>{
  const result = await fs.readFile(path.join(__dirname, 'contacts.json'), "utf-8")
  const contacts =JSON.parse(result)
  return contacts
}

// TODO: задокументировать каждую функцию
function listContacts(){
  return readContacts()
    }


async function getContactById(contactId) {
      const contacts = await readContacts();
      const [result] = contacts.filter((contact) => contact.id === contactId);
      return result;
    }
 
    
async function removeContact(contactId) {
  const contacts = await readContacts()
  const contactsStart=contacts.length
  if (contactsStart<0){
    console.log(`No contacts`)
    return 
  } else
  contacts.forEach(contact => {
    if (contact.id===contactId){
      const indexContact= contacts.indexOf(contact)
      contacts.splice(indexContact,1);
       }
     })
     const contactsEnd=contacts.length;
  if (contactsStart===contactsEnd){
    return
  } else
     await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2))
      return contacts
    }

    
async function addContact(name, email, phone) {
 const contacts = await readContacts()
 const newContacts ={id: crypto.randomUUID(),name,email,phone}
 contacts.push(newContacts)
 await fs.writeFile(
   path.join(__dirname, 'contacts.json'),
   JSON.stringify(contacts, null, 2)
 )
 return newContacts
    }  
      

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }