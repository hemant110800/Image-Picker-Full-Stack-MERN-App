// import { Router } from "express";
import express from "express";
import fs from 'node:fs/promises';

const route = express.Router();

route.get('/places', async (req, res) => {
    const fileContent = await fs.readFile('./data/places.json');
  
    const placesData = JSON.parse(fileContent);
  
    res.status(200).json({ places: placesData });
  });

export default route;