import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  private urlApi = 'https://restcountries.com/v3.1/all';
  paises: any = [];

  constructor(private http: HttpClient) { }


ngOnInit(): void {
  this.obtenerPaises();
}

  obtenerPaises() 
  {
    this.http.get(this.urlApi).subscribe((listaPaises :any) => {
      
      listaPaises.map((auxPais: any) => {
        let pais = {
          nombre: auxPais.name.common,
          region:auxPais.region,
          bandera: auxPais.flags.svg,
          poblacion: auxPais.population,
          capital:auxPais.capital
        }
        //console.log(pais);
        this.paises.push(pais);
      })
    })
  }
}
