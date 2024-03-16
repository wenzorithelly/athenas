import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaManagerComponent } from './pessoa-manager.component';

describe('PessoaManagerComponent', () => {
  let component: PessoaManagerComponent;
  let fixture: ComponentFixture<PessoaManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PessoaManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
