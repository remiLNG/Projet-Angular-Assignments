import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Matiere } from 'src/app/models/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatiereService } from 'src/app/shared/matiere.service';
import { Assignment } from '../../models/assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  // associées au champs input du formulaire
  nomDevoir = "";
  auteur = "";
  matieres: Matiere[] = [];
  dateDeRendu!:Date;
  matiereSelection: any;

  constructor(private assignmentService:AssignmentsService, private matiereService: MatiereService,
    private router:Router) { }

  ngOnInit(): void {
    this.matiereService.getMatieres().subscribe((matieres: Matiere[]) => {
      this.matieres = matieres;
    });
  }

  reset(): void{
    this.nomDevoir = '';
    // this.dateDeRendu = new Date();
  }

  onSubmit() {
    console.log("NOM = " + this.nomDevoir);
    console.log("DATE = " + this.dateDeRendu);

    const newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random()*100000);

    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    this.assignmentService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log(reponse.message);
      // maintenant il faut qu'on affiche la liste !!!
      this.router.navigate(["/home"]);
    });
  }

  changeMatiere(event:any){
    this.matiereSelection = event.value;
  }
}
