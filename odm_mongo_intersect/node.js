import mongoose from 'mongoose';
import { getdata } from './api.js';

const { Schema, model } = mongoose;
const uri = 'mongodb://127.0.0.1:27017/prueba2';

// Configuración de mongoose
const options = {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

// Definiendo esquemas
const studentSchema = new Schema({
    ID: { type: String, required: true },
    name: { type: String, required: true },
    dept_name: { type: String, required: true },
    tot_cred: { type: Number, required: true }
});

const takeSchema = new Schema({
    ID: { type: String, required: true },
    course_id: { type: String, required: true },
    sec_id: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: Number, required: true },
    grade: { type: String }
});

const Student = model('Student', studentSchema);
const Take = model('Take', takeSchema);

async function saveData() {
    try {
        const response = await getdata();
        const jsonData = JSON.parse(response.json[0].student);
        const takesData = JSON.parse(response.json[0].takes);

        const students = jsonData.student.fields.reduce((acc, field) => {
            field.values.forEach((value, index) => {
                if (!acc[index]) acc[index] = {};
                acc[index][field.field] = value;
            });
            return acc;
        }, []);

        const takes = takesData.takes.fields.reduce((acc, field) => {
            field.values.forEach((value, index) => {
                if (!acc[index]) acc[index] = {};
                acc[index][field.field] = value;
            });
            return acc;
        }, []);

        await mongoose.connect(uri, options);
        console.log('Conexión exitosa');
        
        await Student.insertMany(students);
        await Take.insertMany(takes);
        
        console.log('Datos insertados correctamente');
    } catch (error) {
        console.error('Error al procesar los datos:', error);
    } finally {
        mongoose.disconnect();
    }
}

saveData();