const mongoose = require('mongoose');
require('dotenv').config();
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://nadinahakkarainen:${password}@fullstack3cluster.xhwqr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=fullstack3cluster`;

mongoose.set('strictQuery',false)

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  // Listaa kaikki
  Person.find({}).then(persons => {
    console.log('phonebook:');
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Lisää uusi kontakti
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Usage: node mongo.js <password> [name number]');
  console.log('   or: node mongo.js <password>');
  process.exit(1);
}
