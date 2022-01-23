import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { MatiereService } from '../shared/matiere.service';
import { Assignment } from '../models/assignment.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
export interface AssignmentRow{
  _id: string;
  subjectTitle: string;
  assignmentTitle: string;
  dateLimite: Date;
}

import { Matiere } from '../models/matiere.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  ajoutActive = false;
  displayedColumns = ['id', 'name', 'matiere', 'auteur', 'date', 'rendu','edit','delete'];
  assignments: Assignment[] = [];
  searchKey!: string
  listData!: MatTableDataSource<AssignmentRow>
  ELEMENT_DATA_ASSIGNMENT: AssignmentRow[] = [];
  matieres: Matiere[] = [];

  // pour la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  @ViewChild(MatSort) sort!: MatSort; 
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(private assignmentService: AssignmentsService, private matiereService: MatiereService, private router: Router) {}

  ngOnInit(): void {
    this.getMatieres();
    this.getAssignments();
  }

  rowClicked(element: any){
    this.router.navigate(['/assignment/', element]);
  }

  getMatieres(){
    this.matiereService.getMatieres().subscribe((data) => {
      this.matieres = data;
    });
  }

  getAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      this.listData = new MatTableDataSource(data.docs);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      this.assignments.forEach(assignment => {
        let matierePrivateId = assignment.matiere;

        this.matieres.forEach(matiere => {      
          if (matiere._id == matierePrivateId.toString()) {
            assignment.matiere = matiere;            
          }
        });

        //console.log("Matiere: " + assignment.matiere);
      });
    });
  }

  DeleteAssignment(row: { _id: string | undefined; }) {
    // TODO Open a dialog to confirm delete
    const assignmentToDelete = this.assignments.filter(assignment => assignment._id === row._id)[0];
      this.assignmentService.deleteAssignment(assignmentToDelete)
      .subscribe(reponse => {
        window.location.reload();

      })
  }
  
  remplirBD(){
    //this.matiereService.peuplerBD();
    this.assignmentService.peuplerBD();
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  // pagination
  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  pagePrecedente() {
      this.page = this.prevPage;
      this.getAssignments();
  }

  pageSuivante() {
      this.page = this.nextPage;
      this.getAssignments();
  }

  onSearchClear(){
    this.searchKey = ''
    this.applyFilter()
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
