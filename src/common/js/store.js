export function saveLocal (key, data) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[key]) {
      seller[key] = {}
    }
  }
  seller[key] = data
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function getLocal (key, ref) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return ref
  }
  seller = JSON.parse(seller)
  let ret = seller[key]
  return ret || ref
}
