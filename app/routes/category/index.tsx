import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { db } from "~/utils/db.server";
import { useLoaderData } from '@remix-run/react';
import { Link } from 'react-router-dom';
import { Category } from '@prisma/client';
import { Form } from "@remix-run/react";
import { kebabCase } from 'lodash';
import { createCategory, fetchCategory } from '~/models/category';

type LoaderData = {
  count: number;
  categories: Array<Category>;
};

export const action: ActionFunction = async ({
  request,
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

  const category = await createCategory(fields);

  return redirect(`/category/${category.id}`);
};

export const loader: LoaderFunction = async ({ params }) => {
  const data = await fetchCategory();

  return json(data);
};


function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <Box width="100%">
      <Heading>Category ({data.count})</Heading>
      <Flex grow={1} minWidth='max-content' mt={4}>
        <Box>
      {data.categories.map((category, index) => (
        <div key={category.id}>
          <Link to={`${category.id}`}>
          {index + 1}. {category.name}
          </Link>
        </div>
      ))}
        </Box>
        <Container>
          <Form method="post">
            <FormControl>
              <FormLabel htmlFor='email'>Name</FormLabel>
              <Input id='email' type='text' name="name" />
            </FormControl>

            <Button mt={10} type="submit" colorScheme='blue'>Create</Button>
          </Form>
        </Container>
      </Flex>
    </Box>
  );
}

export default Index;
