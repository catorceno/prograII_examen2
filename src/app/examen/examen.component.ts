import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdeaNegocio } from './IdeaNegocio';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-examen',
  imports: [ReactiveFormsModule],
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  ideaForm: FormGroup;
  ideas: IdeaNegocio[] = [];
  private nextId = 1;

  constructor(private fb: FormBuilder) {
    this.ideaForm = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  crearIdea(): void {
    if (this.ideaForm.invalid) {
      this.ideaForm.markAllAsTouched();
      return;
    }

    const idea: IdeaNegocio = this.ideaForm.value;
    if (idea.id) {
      const index = this.ideas.findIndex(i => i.id === idea.id);
      if (index !== -1) {
        this.ideas[index] = idea;
        alert('Idea actualizada con éxito');
      }
    } else {
      idea.id = this.nextId++;
      this.ideas.push(idea);
      alert('Registro exitoso');
    }

    this.resetForm();
  }

  editarIdea(idea: IdeaNegocio): void {
    this.ideaForm.setValue({ ...idea });
  }

  eliminarIdea(id: number): void {
    this.ideas = this.ideas.filter(i => i.id !== id);
    alert('Idea eliminada exitosamente');
    if (this.ideaForm.value.id === id) {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.ideaForm.reset({
      id: null,
      titulo: '',
      descripcion: '',
      categoria: '',
      estado: ''
    });
  }
}