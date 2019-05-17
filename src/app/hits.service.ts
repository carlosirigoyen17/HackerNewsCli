import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HitsService {

  constructor(private http: HttpClient) { }

  getHits(configUrl) {
    return this.http.get(configUrl);
  }

  putHit(configUrl: string, objectID: any) {
    return this.http.put(configUrl, {
      objectID: objectID,
    });
  }
}


