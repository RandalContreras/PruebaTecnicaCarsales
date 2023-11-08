import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Episode } from 'src/app/Interfaces/episode';
import { ApiCallerService } from 'src/app/service/api-caller.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.css']
})
export class DialogDetailsComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  formEpisode: FormGroup;
  episodeList: Episode[]=[];

  //Test Data
  dataSourceTable: string[]=["p1","p2"];
  dataSource: Episode={
     "id": 28,
     "name": "The Ricklantis Mixup",
     "air_date": "September 10, 2017",
     "episode": "S03E07",
     "characters": [
       "https://rickandmortyapi.com/api/character/1",
       "https://rickandmortyapi.com/api/character/2",
       // ...
     ],
     "url": "https://rickandmortyapi.com/api/episode/28",
     "created": "2017-11-10T12:56:36.618Z"
  };
   //Test Data
   
  constructor(
    private dialogEpisodeRef: MatDialogRef<DialogDetailsComponent>, 
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private apiService: ApiCallerService,
    @Inject(MAT_DIALOG_DATA) public dataEpisode: Episode){
      this.formEpisode=this.fb.group({
        nameEpisode: [''],
        idEpisode: [''],
        airDateEpisode: [''],
        codeEpisode:[''],
        urlEpisode:[''],
        createdEpisode:[''],
      })
    }

  ngOnInit(): void{
    if(this.dataEpisode){
      this.getEpisodeDetail(this.dataEpisode.id);
      this.formEpisode.patchValue({
        nameEpisode: this.dataEpisode.name,
        idEpisode: this.dataEpisode.id,
        airDateEpisode: this.dataEpisode.air_date,
        codeEpisode: this.dataEpisode.episode,
        urlEpisode: this.dataEpisode.url,
        createdEpisode: this.dataEpisode.created
      })
    }
  }
  
  getEpisodeDetail(idEpisode: number){
    this.apiService.getEpisodeDetail(idEpisode).subscribe({
      next:(dataResponse)=>{
        console.log(dataResponse);
        this.dataSource=dataResponse;
        this.dataSourceTable=dataResponse.characters;
      },
      error:(e)=>{}
    })
  }
}

