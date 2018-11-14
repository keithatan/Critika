import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

    transform(items: any[], value: string, label: string): any[] {
        if (!items) return [];
        if (!value) return [];
        if (value == '' || value == null) return [];
        // items.filter(e => console.log(e))
        return items.filter(e => e.categoryName.toLowerCase().indexOf(value) > -1);
    }

}