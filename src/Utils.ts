module Utils {

  export function uuid(): string {
    let i
    let random
    let uuid = ''

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-'
      }

      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16)
    }

    return uuid
  }

  export function pluralize(count: number, word: string): string {
    return count === 1 ? word : word + 's'
  }

  export function store<T>(namespace: string, data: Array<T>): any {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data))
    }

    var store = localStorage.getItem(namespace)
    return ((store && JSON.parse(store)) || []) as T[]
  }

  export function extend(...args): any {
    let i
    let key
    let newObj = {}

    for (i = 0; i < args.length; i++) {
      var obj = arguments[i]
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key]
        }
      }
    }

    return newObj
  }
}

export default Utils
