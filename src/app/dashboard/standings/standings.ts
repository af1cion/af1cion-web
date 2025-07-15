import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-standings',
  imports: [LucideAngularModule, DragDropModule],
  templateUrl: './standings.html',
  styles: ``,
})
export class Standings {
  public drivers = [
    {
      positions: '01',
      name: 'Oscar Piastri',
      points: '186',
    },
    {
      positions: '02',
      name: 'Lando Norris',
      points: '176',
    },
    {
      positions: '03',
      name: 'Max Verstappen',
      points: '137',
    },
    {
      positions: '04',
      name: 'George Russell',
      points: '111',
    },
    {
      positions: '05',
      name: 'Charles Leclerc',
      points: '94',
    },
    {
      positions: '06',
      name: 'Lewis Hamilton',
      points: '71',
    },
    {
      positions: '07',
      name: 'Andrea Kimi Antonelli',
      points: '48',
    },
    {
      positions: '08',
      name: 'Alexander Albon',
      points: '42',
    },
    {
      positions: '09',
      name: 'Isack Hadjar',
      points: '21',
    },
    {
      positions: '10',
      name: 'Esteban Ocon',
      points: '20',
    },
    {
      positions: '11',
      name: 'Nico Hulkenberg',
      points: '16',
    },
    {
      positions: '12',
      name: 'Lance Stroll',
      points: '14',
    },
    {
      positions: '13',
      name: 'Carlos Sainz Jr',
      points: '12',
    },
    {
      positions: '14',
      name: 'Pierre Gasly',
      points: '11',
    },
    {
      positions: '15',
      name: 'Yuki Tsunoda',
      points: '10',
    },
    {
      positions: '16',
      name: 'Oliver Bearman',
      points: '6',
    },
    {
      positions: '17',
      name: 'Liam Lawson',
      points: '4',
    },
    {
      positions: '18',
      name: 'Fernando Alonso',
      points: '2',
    },
    {
      positions: '19',
      name: 'Gabriel Bortoleto',
      points: '0',
    },
    {
      positions: '20',
      name: 'Jack Doohan',
      points: '0',
    },
    {
      positions: '21',
      name: 'Franco Colapinto',
      points: '0',
    },
  ];
  public teams = [
    {
      positions: '01',
      name: 'McLaren',
      points: '362',
    },
    {
      positions: '02',
      name: 'Ferrari',
      points: '165',
    },
    {
      positions: '03',
      name: 'Mercedes',
      points: '159',
    },
    {
      positions: '04',
      name: 'Red Bull',
      points: '144',
    },
    {
      positions: '05',
      name: 'Williams',
      points: '54',
    },
    {
      positions: '06',
      name: 'Racing Bulls',
      points: '28',
    },
    {
      positions: '07',
      name: 'Haas',
      points: '26',
    },
    {
      positions: '08',
      name: 'Kick Sauber',
      points: '16',
    },
    {
      positions: '09',
      name: 'Aston Martin',
      points: '16',
    },
    {
      positions: '10',
      name: 'Alpine',
      points: '11',
    },
  ];

  onDropDriver(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.drivers, event.previousIndex, event.currentIndex);
    this.drivers.forEach((driver, index) => {
      driver.positions = (index + 1).toString().padStart(2, '0');
    });
  }
}
