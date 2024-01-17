-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "total_elevation_gain" INTEGER NOT NULL,
    "club" JSONB NOT NULL,
    "type" TEXT NOT NULL,
    "start_date_local" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date_local" TIMESTAMP(3) NOT NULL,
    "stages" JSONB NOT NULL,
    "ahtletes" JSONB NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_name_key" ON "Challenge"("name");
