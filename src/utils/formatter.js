import { cloneDeep } from 'lodash'
/**
 * 构造树型结构数据（straightData转treeData）
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id (一级目录)默认 '0'
 */
export function handleTree (
  data,
  id = 'id',
  parentId = 'parentId',
  children = 'children',
  rootId
) {
  rootId =
    rootId ||
    Math.min.apply(
      Math,
      data.map(item => {
        return item[parentId]
      })
    ) ||
    0
  // 对源数据深度克隆并去重（防止全部数组的长度与树形数组长度存在误差）
  const cloneData = cloneDeep(data)
  // 记录全部数组的长度
  const allLength = cloneData.length
  // 记录树形数组的总长度（包括children的长度）
  let treeLength = 0
  // 循环所有项
  const treeData = cloneData.map(father => {
    // 为每一项寻找children
    const branchArr = cloneData.filter(child => {
      // 返回每一项的子级数组
      return father[id] === child[parentId]
    })
    // 记录树形数组每一个children的长度
    treeLength += branchArr.length
    // 为循环项添加它的children
    if (branchArr.length > 0) {
      father[children] = branchArr
    } else {
      // 若源数据本身有空的children属性，去除空children
      if (father[children]) {
        delete father[children]
      }
    }
    return father
  })
  // 找到根数据(第一层)
  const rootTreeData = treeData.filter(item => item[parentId].toString(10) === rootId.toString(10))
  // 记录树形数组第一层的长度
  treeLength += rootTreeData.length
  // 如果没有根或生成的树形数组长度与源数组长度不一致，则返回所有项（有children）
  if (!rootTreeData.length || treeLength !== allLength) {
    return treeData
  }
  return rootTreeData
}

/**
 * treeData转straightData
 * @param {Array} data 待格式化的树形数据源
 */
export function straightData (
  treeData,
  id = 'id',
  parent = 'parentId',
  children = 'children',
  parentValue = []
) {
  let wrapper = []
  const cacheParent = cloneDeep(parentValue)
  treeData.forEach(treeNode => {
    const cacheNode = cloneDeep(treeNode)
    cacheNode[parent] = cacheParent
    if (cacheNode[children]) {
      const childrenNode = cacheNode[children]
      delete cacheNode[children]
      wrapper.push(cacheNode)
      wrapper = wrapper.concat(
        straightData(childrenNode, id, parent, children, [
          ...cacheParent,
          cacheNode[id]
        ])
      )
    } else {
      wrapper.push(cacheNode)
    }
  })
  return wrapper
}

/**
 * 获取所有祖先 - 顺序为父-》祖先，需要最后reserve()一下
 * @param {*} child 待寻找祖先的元素
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootData 不用传，只是为了让父对象去一开始的所有数据中找其父对象时使用
 */
export function getAncestors (child, data, id = 'id', parentId = 'parentId', children = 'children', rootData) {
  let arr = []
  rootData = rootData || data
  const maxL = (data && data.length) || 0
  for (let i = 0; i < maxL; i++) {
    if (data[i][id] === child[parentId]) {
      // 找到父对象
      arr.push(data[i])
      // 找父对象的父对象
      arr = arr.concat(getAncestors(data[i], rootData, id, parentId, children, rootData))
      break
    } else {
      if (data[i][children] && data[i][children].length) {
        arr = arr.concat(getAncestors(child, data[i][children], id, parentId, children, rootData))
      }
    }
  }
  return arr
}
