import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pessoa } from './pessoa'
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://localhost:8000/api/pessoas/';

  constructor(private http: HttpClient) { }

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  getPessoaById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}${id}/`);
  }

  createPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa);
  }

  updatePessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}${id}/`, pessoa);
  }

  deletePessoa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
