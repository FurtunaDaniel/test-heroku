import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
const headers = new HttpHeaders();
headers.append("Access-Control-Allow-Origin", "*");
headers.append("Content-Type", "application/x-www-form-urlencoded");


@Injectable()
export class JwtFormService {
	constructor(handler: HttpBackend, private http: HttpClient) {
		this.http = new HttpClient(handler);
	}
	generate(data: any): Observable<any> {
		return this.http.post<any>(`${environment.api_url}/generatejwt`, data);
  }

}
