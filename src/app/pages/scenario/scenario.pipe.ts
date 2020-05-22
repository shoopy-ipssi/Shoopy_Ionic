import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Profilter'
})
export class ScenarioPipe implements PipeTransform {

  transform(scenarios: any, searchTitle: string, searchTag: string): any {
    if (scenarios && scenarios.length) {
      return scenarios.filter(scenario => {
        if (searchTitle && scenario.title.toString().toLowerCase().indexOf((searchTitle.toLowerCase())) === -1) {

          return false;
        }
        if (searchTag && scenario.tag.toString().toLowerCase().indexOf((searchTag.toLowerCase())) === -1) {

          return false;
        }
        return true;
      });
    }
    if (!scenarios) {
      return scenarios;
    }
  }

}
