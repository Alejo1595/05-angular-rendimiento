import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = `${environment.api_url}/api/files`;

  constructor(private http: HttpClient) { }

  public getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap(content => {
        const blob = new Blob([content], { type });
        saveAs(blob, name)
      }),
      map(() => true)
    )
  }

  public upload(file: Blob): Observable<File> {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto, {
      // headers:{
      //   'Content-type': 'multipart/form-data'
      // }
    });
  }
}

export interface File {
  originalName: string;
  fileName: string;
  location: string;
}
