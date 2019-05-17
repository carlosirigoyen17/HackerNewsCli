

import { Component, OnInit } from '@angular/core';
import { HitsService } from './hits.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  title = 'HN Feed';
  message = 'We <3 hacker news!';
  hits: any = [];
  configUrl = 'http://localhost:3000/hits';
  todayStart = moment().startOf('day');
  hoverItem = 0;
  spinner = false;

  constructor(private hitsService: HitsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    moment.locale('en');
    this.getHits(this.configUrl);
  }

  getHits(configUrl) {
    this.spinner = true;
    this.hitsService.getHits(configUrl).subscribe(
      (res: any) => {
        if (Object.keys(res).length <= 0) {
          this.openSnackBar('No existen registros en guardados, intente nuevamente', 'Cerrar');
        } else {
          this.hits = res;
        }
        this.spinner = false;
      }, err => {
        this.spinner = false;
        this.openSnackBar('Error inesperado, intente nuevamente', 'Cerrar');
    });
  }

  putHit(objectID) {
    console.log('objectID ' + objectID);
    this.spinner = true;
    this.hitsService.putHit(this.configUrl, objectID).subscribe(
      (res: any) => {
        this.hits = this.hits.filter( item => item.objectID !== objectID);
        this.spinner = false;
      }, err => {
        this.spinner = false;
        this.openSnackBar('Error, intente de nuevo', 'Cerrar');
      });
  }

  formatTime(timeStamp) {
    const dateStart = moment.unix(timeStamp).startOf('day');
    const diff = dateStart.diff(this.todayStart, 'days');
    if (diff === 0) {
      return moment.unix(timeStamp).format('LT');
    } else if (diff === -1) {
      return 'Yesterday';
    } else {
      return moment.unix(timeStamp).format('MMM DD');
    }
  }

  openPage(story_url , url) {
    const openURL = story_url || url;
    if (openURL) {
      window.open(openURL, '_blank');
    } else {
      this.openSnackBar('No posee enlace de detalle', 'Cerrar');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
