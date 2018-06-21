import { ProfessionalExperience } from './professional-experience';
import { Formation } from './formation';

export class Curriculum {
  id?: number;
  active: true;
  picture: string;
  birthdate: Date | string;
  name: string;
  gender: Genero;
  email: string;
  phone: string;
  address: string;
  latitude: number | string;
  longitude: number | string;
  tags: string | string[];
  created_at: Date | string;
  updated_at: Date | string;
  formations: Formation[];
  professional_experiences: ProfessionalExperience[];
}

export enum Genero {
  Homem = 'male',
  Mulher = 'female'
}
