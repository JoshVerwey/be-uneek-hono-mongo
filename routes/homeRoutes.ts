import { Hono } from "hono";
import { home } from "../controllers";
import { isAdmin, protect } from "../middlewares";

const hono = new Hono();

// Get All Homes
hono.get("/getHome", protect, isAdmin, (c) => home.getHome(c));

// Create Home
hono.post("/createHome", (c) => home.createHome(c));

// Update Home
hono.put("/updateHome", (c) => home.updateHome(c));

export default hono;
