import express from 'express';
import winston from 'winston';
import { promises as fs } from 'fs';
import gradesRouter from './routes/grades.js';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const { readFile, writeFile } = fs;

global.FileStudentsJSON = './jsons/grades.json';
global.FileLogs = './logs/grades-control-api.log';
global.Logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: global.FileLogs }),
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat
  ),
});

const app = express();
app.use(express.json());
app.use('/grade', gradesRouter);

app.listen(3000, async () => {
  let lbErro = false;

  const initialJson = {
    nextId: 1,
    grades: [],
  };
  try {
    await readFile(global.FileStudentsJSON);
  } catch (error) {
    lbErro = true;
  }

  if (lbErro) {
    await writeFile(arquivo, JSON.stringify(initialJson))
      .then(() => {
        global.Logger.info('grades-control-api ONLINE and File Created');
      })
      .catch((err) => {
        global.Logger.error(err);
      });
  } else {
    global.Logger.info('grades-control-api ONLINE');
  }
});
