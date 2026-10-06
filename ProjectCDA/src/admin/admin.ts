import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { HttpClient } from '@angular/common/http';
import { BackEnd, Recipe } from '../service/back-end';

@Component({
  selector: 'app-admin',
  imports: [Header, NavigationBar],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  recettes: Recipe[] = [];
  adminData : any;
  message : string = '';

  constructor(private backEndService: BackEnd) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.backEndService.getAdminData().subscribe(
      data => {
        this.adminData = data;
      },
      err => {
        console.error('Erreur lors de la recuperation des données', err)
      }
    )
  }

  envoyerDonnees() {
    const playload = { message: this.message };
    this.backEndService.postAdminData(playload).subscribe(
      res => {
        console.log('Response du back', res);
        this.getData();
      },
      err => {
        console.error('Erreur Post', err)
      }
    );
  }
}
