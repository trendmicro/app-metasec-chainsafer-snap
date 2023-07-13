const storage = () => {
  return {
    set: (key: string, value: string) => window.localStorage.setItem(key, value),
    get: (key: string) => window.localStorage.getItem(key),
    remove: (key: string) => window.localStorage.removeItem(key),
    clear: () => window.localStorage.clear()
  }
}

export default storage()