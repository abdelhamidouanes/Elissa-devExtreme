import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  apiUrl = environment.apiUrl;

  private totalBugs: any
  totalBugsSubject: Subject<any>;
  constructor(private httpClient: HttpClient) {
    this.totalBugs = [];
    this.totalBugsSubject = new Subject<any>();
  }
  emitTotalBugs(): void {
    this.totalBugsSubject.next(this.totalBugs);
  }

  async getTotalBugs(Start_date: any, id_prod: any, id_vers: any, End_date: any): Promise<void> {
    let httpBody = new FormData();
    httpBody.append('Start_date', Start_date);
    httpBody.append('id_prod', id_prod);
    httpBody.append('id_vers', id_vers);
    httpBody.append('End_date', End_date);
    this.totalBugs = await this.httpClient.post<any>(this.apiUrl + 'charts/charts_bugs_stats.php', httpBody).toPromise();
    this.emitTotalBugs();
  }
}
