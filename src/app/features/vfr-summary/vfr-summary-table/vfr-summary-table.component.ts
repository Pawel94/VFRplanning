import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';

import {Route} from "@shared";
import {DegreePipe} from "@shared";
import {CommonModule} from "@angular/common";
import {TranslocoModule} from "@ngneat/transloco";
import {DistancePipe} from "@shared";
import {TimePipe} from "@shared";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'vfr-vfr-summary-table',
  standalone: true,
  imports: [CommonModule, DegreePipe, TranslocoModule, DistancePipe, TimePipe],
  templateUrl: './vfr-summary-table.component.html',
  styleUrls: ['./vfr-summary-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VfrSummaryTableComponent {
  @Input() route?: Route;
  @Output() waypoints: EventEmitter<Route> = new EventEmitter<Route>();
  isPDFGenerator: boolean = true;

  constructor(private readonly cdr: ChangeDetectorRef) {
  }

  deleteWaypoint(id?: string): void {
    if (this.route) {
      const news = this.route!.listOfWaypoints.filter(el => el.id !== id);
      const newRoute: Route = {
        ...this.route,
        listOfWaypoints: news,
      }
      this.waypoints.emit(newRoute)
    }
  }

  public generatePDF(): void {
    this.hideColumnForPDFGenerator()
    let table_vfr: any = document.getElementById('pdfTable');
    html2canvas(table_vfr).then((canvas) => {

      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('your-route.pdf');
    });
    this.hideColumnForPDFGenerator()
  }

  private hideColumnForPDFGenerator(): void {
    this.isPDFGenerator = !this.isPDFGenerator;
    this.cdr.detectChanges();
  }
}
