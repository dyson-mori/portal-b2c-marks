-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "cloudinary_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    CONSTRAINT "files_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "aside" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "purchases_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductToPurchase" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "purchases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AsideToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AsideToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "aside" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AsideToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "files_product_id_idx" ON "files"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "aside_title_key" ON "aside"("title");

-- CreateIndex
CREATE UNIQUE INDEX "categories_title_key" ON "categories"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToPurchase_AB_unique" ON "_ProductToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToPurchase_B_index" ON "_ProductToPurchase"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AsideToCategory_AB_unique" ON "_AsideToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AsideToCategory_B_index" ON "_AsideToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");
