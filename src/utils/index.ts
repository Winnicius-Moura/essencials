export class ArrayUtils {
  static linearSearch(haystack: number[], needle: number): boolean {
    for (let i = 0; i < haystack.length; i++) {
      if (haystack[i] === needle) {
        return true;
      }
    }
    return false;
  }

  static checkEqualsFromArrays = (arrayA: any[], arrayB: any[]) => arrayA?.some((r) => arrayB?.indexOf(r) >= 0);

  static generatePaymentMethodOptions(size: number) {
    const options = [];
    for (let i = 1; i <= size; i++) {
      options.push(`${i}x`);
    }
    return options;
  }
}

export class ValueUtils {
  static formatValuePtBr(value: number): string {
    const formattedValue = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedValue;
  }

  static calculateSubtotalWithDiscount = (value: number, quantity: number, discount: number | null | undefined): number => {
    const discountPercentage = discount || 0;

    const subtotal = value * quantity;
    const discountAmount = subtotal * (discountPercentage / 100);
    const subtotalWithDiscount = subtotal - discountAmount;
    return subtotalWithDiscount;
  };
}

export class SearchUtils {
  static findItem<T>(data: T[], fields: (keyof T)[], searchValue: string | number): NonNullable<T> | undefined {
    const lowerCaseSearchValue = String(searchValue).toLowerCase();

    const foundItem = data.find((item) => fields.some((field) => String(item[field]).toLowerCase().includes(lowerCaseSearchValue)));

    return foundItem ? foundItem : undefined;
  }
}

export class StringUtils {
  static capitalizeWords(sentence: string): string {
    const words = sentence.split(' ');

    const capitalizedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });

    return capitalizedWords.join(' ');
  }
}

export class ValidateUtils {
  static isValidCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      return false;
    }

    const validateCPF = cpf.split('').map((el) => +el);

    const rest = (count: number) => ((validateCPF.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10;

    return rest(10) === validateCPF[9] && rest(11) === validateCPF[10];
  }
}

export class CookieUtils {
  static setCookie(cookieData: { [key: string]: string }, days: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieEntries = Object.entries(cookieData).map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    });

    const cookieString = cookieEntries.join('; ');

    document.cookie = `${cookieString}; expires=${expirationDate.toUTCString()}; path=/`;
  }

  static getCookie(name: string): string | null {
    const decodedName = encodeURIComponent(name);
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');

      if (cookieName === decodedName) {
        return decodeURIComponent(cookieValue);
      }
    }

    return null;
  }

  static deleteCookie(name: string) {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

export class CommonUtils {
  static isValidPhone(phone: string) {
    if (phone.length !== 11 || !!phone.match(/([0-9])\1{10}/)) {
      return false
    } else return true
  }

  static isObject(value: any): value is { [key: string]: any } {
    return value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date);
  }

  static exportToCSV = (bodyList: any[]) => {
    if (!bodyList.length) return;

    const quoteIfNeeded = (value: any) => {
      if (typeof value === 'string' && (value.includes(';') || value.includes('\n') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    };

    const headers = Object.keys(bodyList[0]).join(';')
    const rows = bodyList.map((item) =>
      Object.values(item)
        .map(value => {
          if (CommonUtils.isObject(value) || Array.isArray(value)) {
            return JSON.stringify(value)
          }
          return quoteIfNeeded(value)
        })
        .join(';')
    ).join('\n')

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

