import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'accessibleMath',
  pure: false
})
export class AccessibleMathPipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

  transform(value: string): string {
    if (!value) return '';
    let res = value;

    const getSpan = (symbol: string, translationKey: string) => {
      return `<span aria-hidden="true">${symbol}</span><span class="sr-only"> ${this.translate.instant(translationKey)} </span>`;
    };

    res = res.replace(/>=/g, getSpan('>=', 'ACCESSIBLE_MATH.GREATER_EQUAL'));
    res = res.replace(/<=/g, getSpan('<=', 'ACCESSIBLE_MATH.LESS_EQUAL'));
    res = res.replace(/==/g, getSpan('==', 'ACCESSIBLE_MATH.EQUAL'));
    res = res.replace(/!=/g, getSpan('!=', 'ACCESSIBLE_MATH.NOT_EQUAL'));
    res = res.replace(/<-/g, getSpan('<-', 'ACCESSIBLE_MATH.RECEIVE'));

    res = res.replace(/>/g, getSpan('>', 'ACCESSIBLE_MATH.GREATER'));
    res = res.replace(/</g, getSpan('<', 'ACCESSIBLE_MATH.LESS'));
    
    res = res.replace(/\*/g, getSpan('*', 'ACCESSIBLE_MATH.MULTIPLY'));
    res = res.replace(/\//g, getSpan('/', 'ACCESSIBLE_MATH.DIVIDE'));
    res = res.replace(/\+/g, getSpan('+', 'ACCESSIBLE_MATH.ADD'));
    res = res.replace(/\-/g, getSpan('-', 'ACCESSIBLE_MATH.SUBTRACT'));

    res = res.replace(/;/g, getSpan(';', 'ACCESSIBLE_MATH.SEMICOLON'));

    return res;
  }
}
