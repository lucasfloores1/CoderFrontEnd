import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validDate(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    const value: string = control.value || '';

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      resolve({ invalidFormat: true });
    }

    const parts = value.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    if (isNaN(inputDate.getTime()) || inputDate.getDate() !== day || inputDate.getMonth() !== month - 1 || inputDate.getFullYear() !== year) {
      resolve({ invalidDate: true });
    }

    if (inputDate > currentDate) {
      resolve({ futureDate: true });
    }

    resolve(null);
  });
}