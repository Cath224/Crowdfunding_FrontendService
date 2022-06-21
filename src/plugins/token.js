
export const TokenFactory = {
  get () {
    return localStorage.getItem('token')
  },
  remove () {
    return localStorage.removeItem('token')
  }
}
