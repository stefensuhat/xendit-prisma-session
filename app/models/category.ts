import { db } from '~/utils/db.server';
import { Category } from '@prisma/client';
import { kebabCase } from 'lodash';

type LoaderData = {
  count: number;
  categories: Array<Category>;
};

export async function fetchCategory() {
  const data: LoaderData = {
    // categories: await db.category.findMany(), // get all
    categories: await db.category.findMany({
      include: {
        _count: {}
      }
    }), // get all categories with count product
    count: await db.category.count(), // get count

  };
  return data;
}

export async function createCategory(payload: Pick<Category, "name">) {
  const slug = kebabCase(payload.name);

  return db.category.create({ data: {...payload, slug } });
}

export async function updateCategory(id: any, payload: Pick<Category, "name">) {
  const slug = kebabCase(payload.name);

  return db.category.update({ data: {...payload, slug}, where: {id: parseInt(id) } });
}
