-- -----------------------------------------------------
-- Schema concurrency_converter
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS "concurrency_converter";
SET CATALOG "concurrency_converter";

-- -----------------------------------------------------
-- Table `concurrency_converter`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "concurrency_converter"."users"(
  "id" SERIAL NOT NULL,
  "username" varchar(45) NOT NULL,
  PRIMARY KEY ("id")
);

-- -----------------------------------------------------
-- Table `concurrency_converter`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "concurrency_converter"."orders"(
  "id" SERIAL NOT NULL,
  "user_id" int NOT NULL REFERENCES concurrency_converter.users(id),
  "orign_currency" varchar(45) NOT NULL,
  "destination_currency" varchar(45) NOT NULL,
  "origin_amount" int NOT NULL,
  "destination_amount" int NOT NULL,
  "date" INT NOT NULL,
  PRIMARY KEY ("id")
);

