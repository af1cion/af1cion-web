import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {
  public users = [
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      country: 'USA',
      role: 'Viewer',
      status: 'Active',
      authMethod: 'Google',
    },
    {
      name: 'Mary Doe',
      email: 'marydoe@example.com',
      country: 'Brasil',
      role: 'Viewer',
      status: 'Active',
      authMethod: 'Apple',
    },
    {
      name: 'Sergio Doe',
      email: 'sergiodoe@example.com',
      country: 'México',
      role: 'Viewer',
      status: 'Active',
      authMethod: 'Email',
    },
    {
      name: 'Eduardo Doe',
      email: 'eduardodoe@example.com',
      country: 'Argentina',
      role: 'Viewer',
      status: 'Active',
      authMethod: 'Email',
    },
  ];
}
