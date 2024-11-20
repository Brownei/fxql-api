-- CreateTable
CREATE TABLE "Statement" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceCurrency" CHAR(3) NOT NULL,
    "destinationCurrency" TEXT NOT NULL,
    "sellPrice" INTEGER NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "capAmount" INTEGER NOT NULL,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

