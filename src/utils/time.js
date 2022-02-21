// 年月日
export function formatDate (d) {
  if (d) {
    let t = new Date(d)
    // var t = d ? new Date(d) : new Date()
    let year = t.getFullYear()
    let month = t.getMonth() + 1
    if (month < 10) { month = '0' + month }
    let date = t.getDate()
    if (date < 10) { date = '0' + date }
    return year + '-' + month + '-' + date
  } else {
    return ''
  }
}
// 年月日 时分秒
export function formatDateTime (d) {
  if (d) {
    let t = new Date(d)
    // var t = d ? new Date(d) : new Date()
    let year = t.getFullYear()
    let month = t.getMonth() + 1
    if (month < 10) { month = '0' + month }
    let date = t.getDate()
    if (date < 10) { date = '0' + date }
    let hour = t.getHours()
    if (hour < 10) { hour = '0' + hour }
    let minute = t.getMinutes()
    if (minute < 10) { minute = '0' + minute }
    let second = t.getSeconds()
    if (second < 10) { second = '0' + second }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  } else {
    return ''
  }
}
