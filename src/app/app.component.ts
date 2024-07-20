import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule,  } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HttpClientModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uniformes';
}
