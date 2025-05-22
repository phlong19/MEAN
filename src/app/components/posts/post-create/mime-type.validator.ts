import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

type Object = Record<string, any> | null;

const allowMimeType = ['89504e47', 'ffd8ffe8'];
for (let i = 0; i < 4; i++) {
  allowMimeType.push(`ffd8ffe${i}`);
}

export const mimeType = (
  control: AbstractControl
): Promise<Object> | Observable<Object> => {
  const file = control.value as File;
  const fileReader = new FileReader();

  const fileReaderObs = new Observable((observer: Observer<Object>) => {
    fileReader.addEventListener('loadend', () => {
      // validation
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
        0,
        4
      );
      let header = '';

      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }

      let isValid = false;
      if (allowMimeType.includes(header)) {
        isValid = true;
      }

      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });

  return fileReaderObs;
};
