import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Header } from "../components/header/header";

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, LucideAngularModule, Header],
  templateUrl: './dashboard.html',
  styles: ``
})
export class Dashboard {

}
