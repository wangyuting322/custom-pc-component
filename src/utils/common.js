/**
 * 取消冒泡
 */
export function cancelBubble (event) {
  event.stopPropagation && event.stopPropagation()
  event.cancelBubble = true
}
/**
 * 取消默认事件
 */
export function preventDefault (event) {
  event.preventDefault && event.preventDefault()
  event.returnValue = false
}
