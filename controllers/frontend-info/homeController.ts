import { Context } from "hono";
import { Home } from "../../models";
import { IHome } from "../../interfaces";

/**
 * Retrieves the home data from the database and returns it as a JSON response.
 *
 * @param {Context} c - The context object containing the request and response information.
 * @return {Promise<any>} - A promise that resolves when the JSON response is sent.
 */
export const getHome = async (c: Context) => {
  const response = await Home.find();

  return c.json({ response });
};

/**
 * Creates a new home in the database if it doesn't already exist.
 *
 * @param {Context} c - The context object containing the request and response information.
 * @return {Promise<any>} - A promise that resolves when the JSON response is sent.
 * @throws {Error} - If the home data is invalid.
 */
export const createHome = async (c: Context): Promise<any> => {
  const data: IHome = await c.req.json();

  // Check for existing user
  const homeExists = await Home.findOne({ id: data.id });
  if (homeExists) {
    return updateHome(c);
  }

  const response = await Home.create(data);

  if (!response) {
    c.status(400);
    throw new Error("Invalid home data");
  }

  return c.json({
    success: true,
    data: {
      response,
    },
    message: "Home created successfully",
  });
};

/**
 * Updates a home in the database if it exists.
 *
 * @param {Context} c - The context object containing the request and response information.
 * @return {Promise<any>} - A promise that resolves when the JSON response is sent.
 * @throws {Error} - If the home data is invalid.
 */
export const updateHome = async (c: Context): Promise<any> => {
  const data: IHome = await c.req.json();

  // Optimize the query by using findOneAndUpdate with the new option set to true
  const response = await Home.findOneAndUpdate({ id: data.id }, data, {
    new: true,
  });

  if (!response) {
    c.status(400);
    throw new Error("Invalid home data");
  }

  return c.json({
    success: true,
    data: {
      response,
    },
    message: "Home updated successfully",
  });
};
