import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.css']
})
export class AddPessoaComponent {
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService
  ) {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.pessoaService.createPessoa(this.addForm.value).subscribe(() => {
        console.log('Pessoa added successfully!');
        // Navigate back to the pessoa list or display a success message
      });
    }
  }
}
