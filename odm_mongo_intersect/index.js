import mongoose from 'mongoose';
import { getdata } from './api.js';
const { Schema, model } = mongoose;
let uri = 'mongodb://127.0.0.1:27017/evaluacionContinua';

// Trayendo la data del API
const query = await getdata().then(data => {
  console.log(data);
  return data;
}).catch(error => {
  console.log('No se pudo obtener la data');
  process.exit(0);
});

console.log(query);

const options = {
  autoIndex: true, // No construir índices automáticamente
  maxPoolSize: 10, // Mantener hasta 10 conexiones al servidor
  serverSelectionTimeoutMS: 5000, // Intentar enviar operaciones por 5 segundos
  socketTimeoutMS: 45000, // Cerrar los sockets después de 45 segundos de inactividad
  family: 4 // Usar IPv4, evitar IPv6
};

mongoose.connect(uri, options).then(
  () => {
    console.log('Conexión exitosa');
  },
  err => { 
    console.log('No se pudo conectar');
  }
);

// Definir el esquema de courses
const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  dept_name: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  }
});

// Definir el esquema de takes
const takeSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true
  },
  course_id: {
    type: String,
    required: true,
    index: true
  },
  sec_id: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: false, // Esto puede ser nulo, por lo que no es obligatorio
    default: null
  }
});

// Modificar el esquema de Room para tener un objeto anidado en mongodb_object
const roomSchema = new mongoose.Schema({
  mongodb_object: {
    type: new Schema({
      building: { type: String, required: true },
      capacity: { type: Number, required: true },
      room_number: { type: String, required: true }
    }), // Subdocumento para el objeto anidado
    required: true
  }
});

// Crear un índice compuesto sobre course_id y year
takeSchema.index({ course_id: 1, year: 1 }); // 1 para índice ascendente

// Crear los modelos
let course = new mongoose.model('course', courseSchema);
let takes = new mongoose.model('takes', takeSchema);
let Room = new mongoose.model('Room', roomSchema);

// Agregación: Cursos Agrupados por Créditos y por Departamento
const coursesGroupedByCreditsAndDepartment = async () => {
  try {
    const result = await course.aggregate([
      {
        $group: {
          _id: { dept_name: "$dept_name", credits: "$credits" }, // Agrupar por departamento y créditos
          totalCourses: { $sum: 1 } // Contar el número de cursos por departamento y créditos
        }
      },
      {
        $sort: { "_id.dept_name": 1, "_id.credits": 1 } // Ordenar por departamento y créditos
      }
    ]);
  } catch (error) {
    console.error("Error en la agregación de cursos agrupados por créditos y departamento:", error);
  }
};

// Agregación: Número de Cursos Tomados por Año
const coursesTakenByYear = async () => {
  try {
    const result = await takes.aggregate([
      {
        $group: {
          _id: "$year", // Agrupar por año
          totalCoursesTaken: { $sum: 1 } // Contar el número de cursos tomados por año
        }
      },
      {
        $sort: { _id: 1 } // Ordenar por año de menor a mayor
      }
    ]);
  } catch (error) {
    console.error("Error en la agregación de cursos tomados por año:", error);
  }
};

// Aquí se asume que `query.json` contiene los datos que quieres insertar.
const roomData = query.json.map(item => {
  const parsedObject = JSON.parse(item.object_mongodb);
  return {
    mongodb_object: parsedObject // El objeto anidado va dentro de `mongodb_object`
  };
});

// Función para insertar los datos en la base de datos y ejecutar las agregaciones
try {
  let add1 = await course.insertMany(query.course);
  let add2 = await takes.insertMany(query.takes);
  let inserted_c = await Room.insertMany(roomData);

  console.log(query.json);

  // Ejecutar las agregaciones
  await coursesGroupedByCreditsAndDepartment();
  await coursesTakenByYear();

  process.exit(0);
} catch (e) {
  console.log('Ha ocurrido un error:', e.message);
  process.exit(1); // Salir con un código de error
}
