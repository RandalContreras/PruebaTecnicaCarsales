import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Episode } from 'src/app/Interfaces/episode';
import { ApiCallerService } from 'src/app/service/api-caller.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Character } from 'src/app/Interfaces/character';

@Component({
  selector: 'app-dialog-details-character',
  templateUrl: './dialog-details-character.component.html',
  styleUrls: ['./dialog-details-character.component.css']
})
export class DialogDetailsCharacterComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  formEpisode: FormGroup;
  episodeList: Episode[]=[];
  imageCharacter:string;

  //Test Data
  dataSourceTable: string[]=["p1","p2"];
  dataSource: Character= {
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": "",
    "location": "",
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    "episode": [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      // ...
    ],
    "url": "https://rickandmortyapi.com/api/character/1",
    "created": "2017-11-04T18:48:46.250Z"
  };
   //Test Data
   
  constructor(
    private dialogEpisodeRef: MatDialogRef<DialogDetailsCharacterComponent>, 
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private apiService: ApiCallerService,
    @Inject(MAT_DIALOG_DATA) public dataCharacter: Character){
      this.formEpisode=this.fb.group({
        nameCharacter: [''],
        idCharacter: [''],
        statusCharacter: [''],
        specieCharacter:[''],
        typeCharacter:[''],
        genderCharacter:[''],
        urlCharacter:[''],
        createdCharacter:[''],
      })
      this.imageCharacter="";
    }

  ngOnInit(): void{
    if(this.dataCharacter){
      this.getCharacterDetail(this.dataCharacter.id);
      this.formEpisode.patchValue({
        nameCharacter: this.dataCharacter.name,
        idCharacter: this.dataCharacter.id,
        statusCharacter: this.dataCharacter.status,
        specieCharacter: this.dataCharacter.species,
        typeCharacter: this.dataCharacter.type,
        genderCharacter: this.dataCharacter.gender,
        urlCharacter: this.dataCharacter.url,
        createdCharacter: this.dataCharacter.created,
      })
    }
  }
  
  getCharacterDetail(idCharacter: number){
    this.apiService.getCharacterDetail(idCharacter).subscribe({
      next:(dataResponse)=>{
        console.log(dataResponse);
        this.dataSource=dataResponse;
        this.dataSourceTable=dataResponse.episode;
        this.imageCharacter=dataResponse.image;
      },
      error:(e)=>{}
    })
  }
}
