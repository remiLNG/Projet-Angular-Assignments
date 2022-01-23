import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Assignment } from '../models/assignment.model';
import { LoggingService } from './logging.service';
import { bdInitialAssignments, bdInitialMatieres } from './data';
import { Matiere } from '../models/matiere.model';
import { MatiereService } from './matiere.service';

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private loggingService:LoggingService, private matiereService: MatiereService,
              private http:HttpClient) { }

  url = "http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&limit=${limit}`);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(this.url + "/" + id);
  }

  addAssignment(assignment:Assignment):Observable<any>{
    this.loggingService.log(assignment.nom, "ajouté");
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // pour le moment rien de spécial à faire
    // mais plus tard -> requête PUT sur un web service
    // pour mettre à jour une BD distante...

    //return of(`Assignment ${assignment.nom} modifié`);
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    return this.http.delete(this.url + "/" + assignment._id);
  }

  peuplerBD() {
    console.log("Peuplement de la bd");
    
    bdInitialAssignments.forEach(assignment => {
      this.matiereService.getMatiere(assignment.matiere).subscribe((matiere: Matiere) => {
        const m = matiere;

        const a = new Assignment();
        a.id = assignment.id;
        a.nom = assignment.nom;
        a.auteur = assignment.auteur;
        a.matiere = m;
        a.dateDeRendu = new Date(assignment.dateDeRendu);
        a.rendu = assignment.rendu;

        this.addAssignment(a)
        .subscribe(reponse => {
          console.log(assignment.nom + " inséré dans la BD");
        });
      });
    })
  }

  // version non naïve
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }
}
