import { Component } from '@angular/core';
import { MainContent } from "../../components/main-content/main-content";
import { Heading } from "../../components/heading/heading";
import { InfoSidebar } from "../../components/info-sidebar/info-sidebar";

@Component({
  selector: 'app-notifications',
  imports: [MainContent, Heading, InfoSidebar],
  templateUrl: './notifications.html',
  styles: ``
})
export class Notifications {

}
