import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { MatiereService } from '../shared/matiere.service';
import { Assignment } from '../models/assignment.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Matiere } from '../models/matiere.model';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  ajoutActive = false;
  displayedColumns = ['id', 'name', 'matiere', 'auteur', 'date', 'note', 'remarque', 'rendu','actions'];
  assignments: Assignment[] = [];
  searchKey!: string
  listData!: MatTableDataSource<any>
  matieres: Matiere[] = [];

  // pour la pagination
  page: number = 1;
  limit: number = 100000000;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  deleteAssignmentDialogRef!: MatDialogRef<ConfirmationDialogComponent>;


  @ViewChild(MatSort) sort!: MatSort; 
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(private assignmentService: AssignmentsService, private matiereService: MatiereService, private router: Router,  private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.getMatieres();
    this.getAssignments();
  }

  showDetail(element: any){
    this.router.navigate(['/assignment/', element]);
  }

  editAssignment(element: any){
    this.router.navigate(['/assignment'+ '/' + element + '/edit'])
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

      this.listData.data.forEach(assignment => {
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


    // Ouverture du dialog de confirmation pour supprimer un Assignment
    DeleteAssignment(row: { _id: string | undefined; }): void{
      this.deleteAssignmentDialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data:
          {
            question: 'Voulez-vous supprimer cet assignment ?'
          },
      });
  
      this.deleteAssignmentDialogRef.afterClosed().subscribe(data => {
        if (data === true){
          const assignmentToDelete = this.listData.data.filter(assignment => assignment._id === row._id)[0];
          this.assignmentService.deleteAssignment(assignmentToDelete)
          .subscribe(reponse => {
            window.location.reload();
    
          })
        }
      });
    }
  
  
  remplirBD(){
    //this.matiereService.peuplerBD();
    this.assignmentService.peuplerBD();
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  onSearchClear(){
    this.searchKey = ''
    this.applyFilter()
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
