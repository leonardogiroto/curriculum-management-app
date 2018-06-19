import { Component, Input } from '@angular/core';
import { Curriculum } from '../../../models/curriculum';

@Component({
  selector: 'app-curriculum-details',
  templateUrl: './curriculum-details.html',
  styleUrls: ['./curriculum-details.scss']
})
export class CurriculumDetailsComponent {

  @Input() readonly curriculum: Curriculum;

  public genderDisplay = { 'male': 'Homem', 'female': 'Mulher' };

  public getTagsList(tags: string): string[] {
    return tags.split(', ');
  }

}
