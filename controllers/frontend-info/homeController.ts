import { Context } from "hono";
import { Home } from "../../models";
import { IHome } from "../../interfaces";

import { initCollection } from "mongo-http";

const home = initCollection({
  appId: "data-dxsvedp" || "",
  apiKey:
    "B132ipF7MAduqI51KmNNjTOFOoxf2xX9veRppyvoJusetDa5VrUbCBALXCdDfPDc" || "",
  dataSource: "JVDevTestBU" || "",
  databaseName: "test" || "",
  collectionName: "homes",
  appRegion: "eu-west-2",
});

/**
 * Retrieves the home data from the database and returns it as a JSON response.
 *
 * @param {Context} c - The context object containing the request and response information.
 * @return {Promise<any>} - A promise that resolves when the JSON response is sent.
 */
export const getHome = async (c: Context) => {
  const response = await home.find({});

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
  const homeExists = await home.findOne({ id: data.id });
  if (homeExists) {
    const res = await updateHome(c);
    return res;
  }

  const response = await home.insertOne(data);

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

  const response = await home.findOne({ id: data.id });
  const update = await home.updateOne({
    filter: { id: response.id },
    update: data,
  });

  if (!update) {
    c.status(400);
    throw new Error("Invalid home data");
  }

  return c.json({
    success: true,
    data: {
      update,
    },
    message: "Home updated successfully",
  });
};
