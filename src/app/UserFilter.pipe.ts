import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'UserSearchPipe'
})
export class UserSearchPipe implements PipeTransform {

    transform(items: any[], value: string, label: string): any[] {
        if (!items) return [];
        if (!value) return [];
        if (value == '' || value == null) return [];
        // items.filter(e => console.log(e))
        return items.filter(e => e.username.toLowerCase().indexOf(value) > -1);
    }

}