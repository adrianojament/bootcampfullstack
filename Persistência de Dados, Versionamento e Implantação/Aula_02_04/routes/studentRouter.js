import express from 'express';
import { studentModel } from '../models/studentModel.js';

const studentRouter = express();

studentRouter.post('/student', async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

studentRouter.get('/student', async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

studentRouter.patch('/student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (!student) {
      res.status(404).send('Documento nao encontrado');
    }
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

studentRouter.delete('/student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.findByIdAndDelete({ _id: id });
    if (!student) {
      res.status(404).send('Documento nao encontrado');
    }
    res.status(200).send(`ID ${id} excluido.`);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { studentRouter };
