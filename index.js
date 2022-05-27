const { program } = require("commander");
const contacts = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  try {
      switch (action) {
         case "list":
            const list = contacts.updateContacts();
            console.log(list);
      break;
         case "get":
            const get = contacts.getContactById(id);
            console.log(get);
      break;
         case "add":
            const add = contacts.addContact(name, email, phone);
            console.log(add);
      break;
    case "remove":
            const remove = contacts.removeContact(id);
            console.log(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
  } catch (error) {
     console.log(error.message);
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);