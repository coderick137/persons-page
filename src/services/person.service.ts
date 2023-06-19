import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Person } from "src/models/person";
import { catchError } from "rxjs/operators";

export class PersonService {
  private apiUrl = 'http://localhost:8080/persons';
  private jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl)
      .pipe(
      catchError(this.handleError)
    )
  }

    private handleError(err: HttpErrorResponse): never {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Backend returned code ${err.status}: ${err.statusText || ''}`;
    }

    throw new Error(errorMessage);
  }
}