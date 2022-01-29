import { NodeCompatibleEventEmitter } from "rxjs/internal/observable/fromEvent";
import { Matiere } from "./matiere.model";

export class Assignment {
  id?: number;
  _id?: string;
  nom!: string;
  auteur!: string;
  matiere!: Matiere;
  dateDeRendu!: Date;
  remarque?: string;
  note?: number;
  rendu!: boolean;
}
