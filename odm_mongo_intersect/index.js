import mongoose from 'mongoose';
import { getdata } from './api.js';
const { Schema, model } = mongoose;
let uri = 'mongodb://127.0.0.1:27017/intersect';
//trayendo la data del api
const query = await getdata().then(data => {
  console.log(data);
  return data;
}).catch(error => {
  console.log('no va');
  process.exit(0);
});

/*Valorar el caso en que query sea un array de strins como*/
/*let query = {
  intersect: ["DARWIN"], // Ahora es un array de strings
};*/
console.log(query);
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect(uri, options).then(
  () => {
    console.log('se ha conectado exitosamente')
  },
  err => { console.log('no se ha podido conectar') }
);
    
const intersectSchema = new mongoose.Schema({
  ID: { type: Number },
  name: { type: String },
  tot_cred: { type: Number },
  matricula: {
    type: [String], // Corrected to array of strings
    enum: ['Primera', 'Segunda', 'Tercera'] // Now this contains "Primera", "Segunda", and "Tercera"
  },
  status: {
    type: String,
    enum: ['No matriculado', 'En proceso', 'Matriculado', 'Otro'],
    default: 'No matriculado' // Default status is 'No matriculado'
  },
  semester: { type: String },
  year: { type: Number, default: new Date().getFullYear() }, // Default to current year
  grade: { type: String }
});

// Define the schema for Alumno (Student Information)
const alumnoSchema = new mongoose.Schema({
  ID: { type: Number }, // Numeric ID specified by the student
  name: { type: String },
  last_name: { type: String },
  dni: { type: String } // Alphanumeric DNI
});

// Create the models based on the schemas
let intersect =new mongoose.model('intersect', intersectSchema);
let alumno= new mongoose.model('alumno', alumnoSchema);

// Function to create the records in the database
  try {
    let intersect_a = await intersect.insertMany(query.intersect);
    let alumno_a = await alumno.insert(query.alumno);
    console.log(query);
    
    process.exit(0);
  } catch (e) {
    console.log('An error occurred:', e.message);
    process.exit(1); // Exit with an error code
  }