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