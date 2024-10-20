import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormRecord, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-slider',
  templateUrl: './update-slider.component.html',
  styleUrls: ['./update-slider.component.scss']
})
export class UpdateSliderComponent implements OnInit {

  @Input() title: string = "Cập nhật Slider: ";
  validateForm: FormRecord<FormControl<string>> = this.fb.record({});
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  addField(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      this.fb.control('', Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }



  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.addField();
  }
}
