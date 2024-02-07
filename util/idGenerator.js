import {v4 as uuid} from 'uuid'

export const idGenerator = () => {
    const id = uuid()
    const tagId = 'MAUNOTION'
    const firstEightIdx = id.slice(0,8)
    return `${tagId}-${firstEightIdx}`
}