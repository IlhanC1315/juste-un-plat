import { Component } from '@angular/core';
import { Header } from "../header/header";
import { NavigationBar } from '../navigation-bar/navigation-bar';

@Component({
  selector: 'app-favoris',
  imports: [Header, NavigationBar],
  templateUrl: './favoris.html',
  styleUrl: './favoris.css'
})
export class Favoris {

}
