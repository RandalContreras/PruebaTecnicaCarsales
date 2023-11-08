import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogDetailsComponent } from './Dialogs/dialog-details/dialog-details.component';
import { ApiCallerService } from './service/api-caller.service';
import { Episode } from './Interfaces/episode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit{
  title = 'PruebaTecnicaCarsales';
  displayedColumns: string[] = ['id', 'name', 'air_date', 'episode', 'detail'];
  dataSource = new MatTableDataSource<Episode>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private apiService: ApiCallerService) {}

  ngOnInit(): void {
    this.getDataEpisodes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  openDialog(dataEpisode: Episode) {

    this.dialog.open(DialogDetailsComponent,{
      disableClose: true,
      width: "1000px",
      data: dataEpisode
    });
   }

  getDataEpisodes(){
    this.apiService.getEpisodes().subscribe({
      next:(dataResponse)=>{
        console.log(dataResponse);
        this.dataSource.data=dataResponse.results;
      },
      error:(e)=>{}
    })
  } 
  
}
