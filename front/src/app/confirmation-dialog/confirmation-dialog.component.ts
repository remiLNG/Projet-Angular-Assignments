import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {question: string}) { }

  ngOnInit(): void {
  }


    onSubmit(event: { preventDefault: () => void; }): void{
      event.preventDefault();
  
      this.dialogRef.close(true);
    }
  

    closeDialog(): void{
      this.dialogRef.close(false);
    }

}
