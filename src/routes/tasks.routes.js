// estas rutas seran para nuestras tareas de tipo CRUD
import { Router } from 'express';
import app from '../server';
const router = Router();

//consultamos nuestra bd 
//Database connection

import { connect } from '../database';
import { ObjectID } from 'mongodb';

//routes
router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('tasks').find({}).toArray();
    //console.log(result);
    res.json(result);
});

router.post('/', async (req, res) => {
    const db = await connect();
    const task = {
        title: req.body.title,
        description: req.body.description
    };

    const result = await db.collection('task').insert(task);

    res.json(result.ops[0]);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('tasks').findOne({ _id: ObjectID(id) });
    res.json(result);

});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;//Acá recibo el id de la bd
    const db = await connect();//acá me conecto
    const result = await db.collection('tasks').deleteOne({ _id: ObjectID(id) }); //acá elimino
    res.json({ //devuelvo algo
        message: 'Task ${id} deleted',
        result
    })
});
//este actualizar es basicamente lo mismo que los anteriores
router.put('/:id',async(req,res)=>{
    const {id}= req.params; //obtenemos el id
    const updateTask={ //creamos un objeto para obtener los parametros especificos
        title: req.body.title,
        description: req.body.description
    };
    const db = await connect(); //nos conectamos a la base de datos
  const result= await db.collection('task').updateOne({_id: ObjectID(id)},{$set: updateTask}); //y actualizamos

    res.json({
        message: `Task ${id} UPDATE`
    });

});





export default router;
//TODO: Este ejemplo no usa mongoose usa el nativo de mongodb