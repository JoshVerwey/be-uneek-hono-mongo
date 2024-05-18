import { Schema, model } from "mongoose";
import { IHome } from "../../interfaces";

const homeSchema = new Schema<IHome>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    tiles: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        route: { type: String, required: true },
      },
    ],
    carousel: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        route: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Home = model("Home", homeSchema);
export default Home;
