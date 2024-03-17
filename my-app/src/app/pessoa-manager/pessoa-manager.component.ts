import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-pessoa-manager',
  templateUrl: './pessoa-manager.component.html',
  styleUrls: ['./pessoa-manager.component.css']
})
export class PessoaManagerComponent implements OnInit {
  pessoas: Pessoa[] = [];
  filteredPessoas: Pessoa[] = [];
  pessoaForm: FormGroup;
  selectedPessoa?: Pessoa;
  searchTerm: string = '';

  constructor(
    private pessoaService: PessoaService,
    private formBuilder: FormBuilder
  ) {
    this.pessoaForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      height: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  this.searchTerm = '';
  this.loadPessoas();
}

  loadPessoas(): void {
  this.pessoaService.getPessoas().subscribe(pessoas => {
    this.pessoas = pessoas;
    this.filteredPessoas = [...this.pessoas]; // Initialize filteredPessoas with all pessoas
    this.searchPessoas(); // Apply search filter (useful if there's an existing search term, but ensure it's cleared on init)
  });
}

  searchPessoas(): void {
    if (!this.searchTerm) {
      this.filteredPessoas = this.pessoas; // Show all pessoas if the search term is empty
    } else {
      this.filteredPessoas = this.pessoas.filter(pessoa =>
        pessoa.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  selectPessoa(pessoa: Pessoa): void {
    this.selectedPessoa = pessoa;
    this.pessoaForm.patchValue(pessoa);
  }

  savePessoa(): void {
  if (this.selectedPessoa?.id !== undefined) { // Ensure ID is not undefined
    this.pessoaService.updatePessoa(this.selectedPessoa.id, this.pessoaForm.value).subscribe(() => {
      this.clearSelection();
      this.loadPessoas();
    });
  } else {
    this.pessoaService.createPessoa(this.pessoaForm.value).subscribe(() => {
      this.clearSelection();
      this.loadPessoas();
    });
  }
}

  deletePessoa(pessoa: Pessoa): void {
  if (pessoa.id !== undefined) { // Ensure ID is not undefined
    this.pessoaService.deletePessoa(pessoa.id).subscribe(() => {
      this.loadPessoas();
    });
  } else {

  }
}

  clearSelection(): void {
    this.selectedPessoa = undefined;
    this.pessoaForm.reset();
  }

  calculateIdealWeight(): void {
    if (!this.selectedPessoa) return;
    const height = this.pessoaForm.get('height')?.value / 100;
    const gender = this.selectedPessoa.gender;
    let idealWeight = 0;
    if (gender === 'Male') {
      idealWeight = (72.7 * height) - 58;
    } else {
      idealWeight = (62.1 * height) - 44.7;
    }

    idealWeight = Math.round(idealWeight * 100) / 100;
    alert(`Ideal weight for ${this.selectedPessoa.name}: ${idealWeight} kg`);
  }
}
