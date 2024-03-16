import {Component, OnInit} from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-list-pessoa',
  templateUrl: './list-pessoa.component.html',
  styleUrl: './list-pessoa.component.css'
})
export class ListPessoaComponent  implements OnInit {
    pessoas: Pessoa[] = [];

    constructor(private pessoaService: PessoaService) { }

    ngOnInit() {
      this.getPessoas();
    }

    getPessoas(): void {
      this.pessoaService.getPessoas()
        .subscribe(pessoas => this.pessoas = pessoas);
    }
}
