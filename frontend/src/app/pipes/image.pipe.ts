import { Pipe, PipeTransform } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return env.apiUrl + '/uploads/' + value;
    }

    return '/assets/images/comment.png';
  }

}
