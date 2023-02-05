/** @format */

import express, { Response, Request } from "express";
import { PrismaClient, Rivers } from "@prisma/client";
const app = express();
app.use(express.json());

const prisma = new PrismaClient();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://galera-kajaki.vercel.app");
  res.header("Access-Control-Allow-Methods", "PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.post("/rivers", async (req: Request, res: Response) => {
  const { name, coordinates, properties } = req.body;
  const rivers = await prisma.rivers.create({
    data: {
      name: name,
      coordinates: coordinates,
      properties: properties,
    },
  });
  res.json(rivers);
});

app.get("/", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  const rivers = await prisma.rivers.findMany();
  res.json(rivers);
});
app.put("/", async (req: Request, res: Response) => {
  const { id, name, coordinates, properties } = req.body;
  const updateRiver = await prisma.rivers.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      coordinates: coordinates,
      properties: properties,
    },
  });
  res.json(updateRiver);
});
app.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedRiver = await prisma.rivers.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedRiver);
});

app.get("/search_river", async (req: Request, res: Response) => {
  const query = req.query.name?.toString();
  const rivers = await prisma.rivers.findMany({
    where: { name: { contains: query } },
  });

  const coordinatesArrays: number[] = [];
  rivers.map((river: Rivers) => {
    coordinatesArrays.push(JSON.parse(river.coordinates));
  });

  const resoult = {
    name: query,
    coordinates: coordinatesArrays,
  };
  res.json(resoult);
});

app.post("/roads", async (req: Request, res: Response) => {
  const { name, roadCoordinates, properties, selectedRivers } = req.body;
  const newContent = await prisma.roads.create({
    data: {
      name: name,
      roadCoordinates: roadCoordinates,
      selectedRivers: selectedRivers,
      properties: properties,
    },
  });
  res.json(newContent);
});
app.put("/", async (req: Request, res: Response) => {
  const { id, name, coordinates, properties } = req.body;
  const updateRiver = await prisma.rivers.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      coordinates: coordinates,
      properties: properties,
    },
  });
  res.json(updateRiver);
});
app.put("/roads", async (req: Request, res: Response) => {
  const { id, name, roadCoordinates, properties, selectedRivers } = req.body;
  console.log("here");
  console.log(req.body);
  const updateRoad = await prisma.roads.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      roadCoordinates: roadCoordinates,
      selectedRivers: selectedRivers,
      properties: properties,
    },
  });
  res.json(updateRoad);
  console.log("here");
});

app.get("/getRoads", async (req: Request, res: Response) => {
  const roads = await prisma.roads.findMany();
  res.json(roads);
});

// app.listen(env("PORT") || 4000, () => {
//   console.log("SERVER RUNNING ON PORT 3001");
// });

module.exports=app;
