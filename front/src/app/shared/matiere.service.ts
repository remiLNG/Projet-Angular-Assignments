import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Matiere } from '../models/matiere.model';
import { LoggingService } from './logging.service';
import { bdInitialAssignments, bdInitialMatieres } from './data';

import { catchError} from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})

export class MatiereService {
    matieres:Matiere[] = [];

    constructor(private loggingService:LoggingService, private http:HttpClient){}

  url = 'http://localhost:8010/api/matiere';

  getMatieres():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }

  getMatiere(id:number):Observable<Matiere> {
    return this.http.get<Matiere>(this.url + "/" + id);
  }

  addMatiere(matiere:Matiere):Observable<any>{
    this.loggingService.log(matiere.nom, "ajouté");
    return this.http.post<Matiere>(this.url, matiere);
  }

  peuplerBD(){
    bdInitialMatieres.forEach(matiere => {
        const m = new Matiere();
        m.id = matiere.id;
        m.nom = matiere.nom;
        m.professor_name = matiere.professor_name;
        m.professor_img = matiere.professor_img;
  
        this.addMatiere(m)
        .subscribe(reponse => {
          console.log(matiere.nom + " inséré dans la BD");
        })
      })
  }
}