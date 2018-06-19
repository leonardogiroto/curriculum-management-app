import { ProfessionalExperience } from './professional-experience';
import { Formation } from './formation';

export class Curriculum {
  id?: number;
  active: true;
  picture: string;
  birthdate: Date;
  name: string;
  gender: Genero;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  tags: string | string[];
  created_at: Date;
  updated_at: Date;
  formations: Formation[];
  professional_experiences: ProfessionalExperience[];
}

export enum Genero {
  Homem = 'male',
  Mulher = 'female'
}
