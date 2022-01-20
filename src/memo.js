function parse(paramArr) {
  return paramArr.reduce((key, item) => {
    if (isAnObj(item)) {
      return `${key}${orderObject(item)}`
    }
    return `${key}${JSON.stringify(item)}`
  }, '')
}

function isAnObj(val) {
  return typeof val === 'object'
}

function orderObject(obj) {
  const keys = Object.keys(obj).sort()
  return keys.reduce((acum, item) => {
    return `${acum}{${item}:${obj[item]}}`
  }, '')
}

export function memoize(fn) {
  const cache = {}
  return (...arg) => {
    const argString = parse(arg)
    if (argString in cache) {
      console.log(`datos previamente calculados ${argString}`)
      return cache[argString]
    } else {
      console.log(`calculando nuevos datos ${argString}`)
      cache[argString] = fn(...arg)
      return cache[argString]
    }
  }
}

export function cache(fn) {
  let cache = {}
  let hitCount = 0
  return {
    fn: (...arg) => {
      const argString = parse(arg)
      if (argString in cache) {
        hitCount = hitCount + 1
        console.log(`datos previamente calculados ${argString}`)
        return cache[argString]
      } else {
        console.log(`calculando nuevos datos ${argString}`)
        cache[argString] = fn(...arg)
        return cache[argString]
      }
    },
    hitCount: () => hitCount,
    clear: () => {
      cache = {}
      hitCount = 0
    }
  }
}
