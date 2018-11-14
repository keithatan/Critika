import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
 
  transform(items: any[], value: string, label:string): any[] {
    if (!items) return [];
    if (!value) return  [];
    if (value == '' || value == null) return [];
    // console.log(items)
    items.filter(e => console.log(e.communityName.indexOf(value) > -1))
    return items.filter(e => e.communityName.toLowerCase().indexOf(value) > -1 );
    
  }
 
}