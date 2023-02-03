-- CreateTable
CREATE TABLE "Rivers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "properties" TEXT NOT NULL,

    CONSTRAINT "Rivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roadCoordinates" TEXT NOT NULL,
    "selectedRivers" TEXT NOT NULL,
    "properties" TEXT NOT NULL,

    CONSTRAINT "Roads_pkey" PRIMARY KEY ("id")
);
