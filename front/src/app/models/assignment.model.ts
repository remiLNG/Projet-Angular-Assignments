import { Matiere } from "./matiere.model";

export class Assignment {
  id?: number;
  _id?: string;
  nom!: string;
  auteur!: string;
  matiere!: Matiere;
  dateDeRendu!: Date;
  rendu!: boolean;
}
