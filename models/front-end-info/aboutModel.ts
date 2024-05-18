import { Schema, model } from "mongoose";

interface IAbout {
  title: string;
  content: string;
  image: string;
}

const aboutSchema = new Schema<IAbout>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const About = model("About", aboutSchema);
export default About;
