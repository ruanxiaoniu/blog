// 存储token
export function setToken(data) {
  return localStorage.setItem('token', data)
}
// 获取token 
export function getToken() {
  return localStorage.getItem('token')
}