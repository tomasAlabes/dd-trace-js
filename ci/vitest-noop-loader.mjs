function initialize () {}

function load (url, context, nextLoad) {
  return nextLoad(url, context)
}

function resolve (specifier, context, nextResolve) {
  return nextResolve(specifier, context)
}

export { initialize, load, resolve }
