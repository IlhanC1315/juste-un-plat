import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Auth } from '../service/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  showUserMenu = false;
  @Input() h3Header: string = '';
  @ViewChild('userMenu') userMenuRef?: ElementRef;

  constructor(private auth: Auth, private eRef: ElementRef, private router: Router) {}

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.auth.logout();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Ferme le menu seulement si clic en dehors
    if (
      this.userMenuRef?.nativeElement &&
      !this.userMenuRef.nativeElement.contains(target) &&
      !this.eRef.nativeElement.contains(target)
    ) {
      this.showUserMenu = false;
    }
  }
}
