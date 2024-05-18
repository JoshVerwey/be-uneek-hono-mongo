import ICard from "./ICard.interface";

export default interface IHome {
  id: string;
  title: string;
  subtitle: string;
  tiles: ICard[];
  carousel: ICard[];
}
