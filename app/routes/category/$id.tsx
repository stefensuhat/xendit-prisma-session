import { Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import type { LoaderFunction } from '@remix-run/node';
import { ActionFunction, json } from '@remix-run/node';
import { Category } from '@prisma/client';
import { db } from "~/utils/db.server";
import { Form, useLoaderData } from '@remix-run/react';
import { kebabCase } from 'lodash';
import { updateCategory } from '~/models/category';

type LoaderData = {
  category: Category;
};


export const action: ActionFunction = async ({
  request, params,
}) => {
  const form = await request.formData();
  const name = form.get("name");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof name !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const slug = kebabCase(name);

  const fields = { name, slug };

  return await updateCategory(params.id, fields);
};

export const loader: LoaderFunction = async ({params}) => {
  const data: LoaderData = {
    category: await db.category.findUnique({
      where: {id: parseInt(params.id || '') }
    }),
  };

  return json(data);
};


function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <Heading sx={{ mb: 2 }}>Category</Heading>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <Text fontSize='lg'>ID: {data.category.id}</Text>
        <Text fontSize='md'>Name: {data.category.name}</Text>
      </Stack>

      <Form method="put">
        <FormControl>
          <FormLabel htmlFor='email'>Name</FormLabel>
          <Input id='email' type='text' name="name" defaultValue={data.category.name} />
        </FormControl>

        <Button mt={10} type="submit" colorScheme='blue'>Update</Button>
      </Form>
    </div>
  );
}

export default Index;
