export class ArrayUtils {
  static linearSearch(haystack: number[], needle: number): boolean {
    for (let i = 0; i < haystack.length; i++) {
      if (haystack[i] === needle) {
        return true
      }
    }
    return false
  }

  static checkEqualsFromArrays = (arrayA: any[], arrayB: any[]) => arrayA?.some(r => arrayB?.indexOf(r) >= 0)

}

export class ValueUtils {
  static formatValuePtBr(value: number): string {
    const formattedValue = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    return formattedValue
  }
}

export class SearchUtils {
  static findItem<T>(
    data: T[],
    fields: (keyof T)[],
    searchValue: string | number
  ): NonNullable<T> | undefined {
    const lowerCaseSearchValue = String(searchValue).toLowerCase();

    const foundItem = data.find(item =>
      fields.some(field =>
        String(item[field]).toLowerCase().includes(lowerCaseSearchValue)
      )
    );

    return foundItem ? foundItem : undefined;

  }
}

export class StringUtils {
  static capitalizeWords(sentence: string): string {
    const words = sentence.split(' ');

    const capitalizedWords = words.map(word => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });

    return capitalizedWords.join(' ');
  }
}

export class ValidateUtils {
  static isValidCPF(cpf: string) {

    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      return false
    }

    const validateCPF = cpf.split('').map(el => +el)

    const rest = (count: number) => (validateCPF.slice(0, count - 12))
      .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10 % 11 % 10

    return rest(10) === validateCPF[9] && rest(11) === validateCPF[10]
  }
}