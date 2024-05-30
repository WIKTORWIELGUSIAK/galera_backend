/** @format */

import express, { Response, Request } from "express";
import { PrismaClient, RiversV2, Road } from "@prisma/client";
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
  const { name, coordinates, properties, slug } = req.body;
  const rivers = await prisma.riversV2.create({
    data: {
      name: name,
      coordinates: coordinates,
      properties: properties,
      slug: slug,
    },
  });
  res.json(rivers);
});

app.get("/getRivers", async (req: Request, res: Response) => {
  const rivers = await prisma.riversV2.findMany();
  res.json(rivers);
});

app.put("/putRiver", async (req: Request, res: Response) => {
  const { id, name, coordinates, properties, slug } = req.body;
  const updateRiver = await prisma.riversV2.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      coordinates: coordinates,
      properties: properties,
      slug: slug,
    },
  });
  res.json(updateRiver);
});

app.delete("/api/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedRiver = await prisma.riversV2.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedRiver);
});

app.get("/search_river", async (req: Request, res: Response) => {
  const query = req.query.name?.toString();
  const rivers = await prisma.riversV2.findMany({
    where: { name: { contains: query } },
  });

  const coordinatesArrays: number[] = [];
  rivers.map((river: RiversV2) => {
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
  const newContent = await prisma.road.create({
    data: {
      name: name,
      roadCoordinates: roadCoordinates,
      selectedRivers: selectedRivers,
      properties: properties,
    },
  });
  res.json(newContent);
});

app.put("/roads", async (req: Request, res: Response) => {
  const { id, name, roadCoordinates, properties, selectedRivers } = req.body;
  const updateRoad = await prisma.road.update({
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
});

app.get("/getRoads", async (req: Request, res: Response) => {
  const roads = await prisma.road.findMany();
  res.json(roads);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
});

module.exports = app;
