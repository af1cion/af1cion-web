import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-users',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './users.html',
  styles: ``,
})
export class Users {
  public users = [
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      country: 'Chile',
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
    {
      name: 'Ana Torres',
      email: 'ana.torres@example.com',
      country: 'Colombia',
      role: 'Viewer',
      status: 'Suspended',
      authMethod: 'Google',
    },
    {
      name: 'Sakura Tanaka',
      email: 'sakura.tanaka@example.com',
      country: 'Japan',
      role: 'Viewer',
      status: 'Suspended',
      authMethod: 'Google',
    },
    {
      name: 'Amir Khan',  
      email: 'amir.khan@example.com',
      country: 'India',
      role: 'Viewer',
      status: 'Active',
      authMethod: 'Google',
    },
  ];
}
