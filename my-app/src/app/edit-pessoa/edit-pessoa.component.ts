import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-edit-pessoa',
  templateUrl: './edit-pessoa.component.html',
  styleUrls: ['./edit-pessoa.component.css']
})
export class EditPessoaComponent implements OnInit {
  editForm: FormGroup;
  pessoaId: number;

  constructor(
    private pessoaService: PessoaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.pessoaId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);  // Assuming 'id' is the route parameter
  }

  ngOnInit(): void {
    this.getPessoa();
  }

  getPessoa(): void {
    this.pessoaService.getPessoaById(this.pessoaId).subscribe(pessoa => {
      this.editForm.patchValue(pessoa);
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.pessoaService.updatePessoa(this.pessoaId, this.editForm.value).subscribe(() => {
        console.log('Pessoa updated successfully!');
        // Navigate back to the pessoa list or display a success message
      });
    }
  }
}
