import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateName(control: AbstractControl): ValidationErrors {
  if (!control || !control.value || control.value.trim() === '')
    return { invalidEmail: true };

  const name = control.value.replace(/[^a-zA-ZáéíóúàèìòùâêîôûãõçÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ\s]/g, '');
  const words = name.split(' ');

  if (words.length < 2 || words[0].length < 2)
    return { invalidName: true };
  else if (words.length >= 2 && words[1].length < 2)
    return { invalidName: true };

  if (name.match(/[A-z][ ][A-z]/))
    return null;

  return { invalidName: true };
}

export function ValidateEmail(control: AbstractControl): ValidationErrors {
  if (!control || !control.value || control.value.trim() === '')
    return { invalidEmail: true };

  // tslint:disable-next-line:max-line-length
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(control.value.toLowerCase()))
    return null;

  return { invalidEmail: true };
}
