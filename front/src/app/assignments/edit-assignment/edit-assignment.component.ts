import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../../models/assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment?:Assignment;
  // champs du formulaire
  nomAssignment?:string;
  dateDeRendu?:Date;
  noteAssignment?:number;
  remarqueAssignment?:string;
  satusAssignment?:any;
  
  constructor(private route:ActivatedRoute,
              private router:Router,
              private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    // récupère l'id dans l'URL
    const id = +this.route.snapshot.params['id'];

    this.assignmentService.getAssignment(id)
    .subscribe(assignment => {
      // Pour que la "vue" affiche les informations
      // de l'assignment qu'on édite....
      this.assignment = assignment;
      // pré-remplit le formulaire dès l'affichage
      this.nomAssignment = assignment?.nom;
      this.dateDeRendu = assignment?.dateDeRendu;
      this.noteAssignment = assignment?.note;
      this.remarqueAssignment = assignment?.remarque;
      this.satusAssignment = assignment?.rendu;
    })
  }

  onChangeStatus(ob: MatCheckboxChange) {
    this.satusAssignment = ob.checked;
 } 

  onAssignmentRendu() {
    this.assignment!.rendu = true;
  }

  onCancel(){
    this.router.navigate(['/home']);
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    if(this.remarqueAssignment){
      this.assignment.remarque = this.remarqueAssignment;
    }

    if(this.noteAssignment){
      this.assignment.note = this.noteAssignment;
    }

    this.assignment.rendu = this.satusAssignment;

    this.assignmentService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.onAssignmentRendu()

        // navigation vers la home page
        this.router.navigate(['/home']);
      });


  }
 }
