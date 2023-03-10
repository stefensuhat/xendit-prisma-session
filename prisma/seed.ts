import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { range, snakeCase } from 'lodash';
import faker from '@faker-js/faker';

const db = new PrismaClient();

async function seed () {
  await db.user.create({
    data: {
      email: "stefensuhat@gmail.com",
      name: "Stefen Suhat",
      password: await bcrypt.hash("password", 10),
    }
  });

  range(0, 100).map(async () => {
    const product = faker.commerce.productAdjective();
    await db.category.create({
      data: {
        name: product,
        slug: snakeCase(product),
      }
    })
  })


  await db.product.create({
    data: {
      name: "iPhone 14",
      description : "iPhone 14 is a smartphone developed by Apple Inc. It was released on September 20, 2019, and was the first iPhone to feature a notch.",
      categoryId: 1,
    }
  })
}

seed();
