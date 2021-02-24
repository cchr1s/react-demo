import { useReducer, useEffect, useState, useCallback } from 'react'
import { CartItem } from './index'

interface Option {
    // 记录map勾选的key，一般取id
    key?: string
}

type CheckedMap = {
    [key: number]: boolean
}

const CHECKED_CHANGE = 'CHECKED_CHANGE'
const CHECKED_ALL_CHANGE = 'CHECKED_ALL_CHANGE'
const SET_CHECKED_MAP = 'SET_CHECKED_MAP'

type CheckedChange<T> = {
    type: typeof CHECKED_CHANGE
    payload: {
        dataItem: T
        checked: boolean
    }
}

type ChangeAllChange = {
    type: typeof CHECKED_ALL_CHANGE,
    payload: boolean
}

type SetCheckedMap = {
    type: typeof SET_CHECKED_MAP
    payload: CheckedMap
}

type Action<T> = CheckedChange<T> | ChangeAllChange | SetCheckedMap
export type OnCheckedChange<T> = (item: T, checked: boolean) => any
// type FilterCheckedFn = (item: T) => boolean 

export const useChecked = <T extends Record<string, any>>(
    dataSource: T[],
    { key = 'id' }: Option = {}
) => {

    const [checkedMap, dispatch] = useReducer(
        (checkedMapParam: CheckedMap, action: Action<T>) => {
            switch (action.type) {
                case CHECKED_CHANGE: {
                    const { payload } = action
                    const { dataItem, checked } = payload
                    const { [key]: id } = dataItem
                    return {
                        ...checkedMapParam,
                        [id]: checked
                    }
                }
                case CHECKED_ALL_CHANGE:
                    const { payload: newCheckedAll } = action
                    const newCheckedMap: CheckedMap = {}
                    if (newCheckedAll) {
                        dataSource.forEach(item => {
                            newCheckedMap[item.id] = true
                        })
                    }
                    return newCheckedMap
                case SET_CHECKED_MAP:
                    const { payload } = action
                    return payload
                default:
                    return checkedMapParam
            }
        },
        {} // initial state
    )

    const onCheckedChange: OnCheckedChange<T> = useCallback((dataItem, checked) => {
        dispatch({
            type: 'CHECKED_CHANGE',
            payload: {
                dataItem,
                checked
            }
        })
    }, [])

    const filterChecked = useCallback(
        () => {
            return dataSource.filter(item => checkedMap[item.id] === true)
        }, [dataSource, checkedMap])

    const checkedAll = dataSource.length !== 0 && filterChecked().length === dataSource.length

    const onCheckedAllChange = useCallback((newCheckedAll: boolean) => {
        dispatch({
            type: 'CHECKED_ALL_CHANGE',
            payload: newCheckedAll
        })
    }, [])

    // 数据更新的时候 如果勾选中的数据已经不在数据内了 就删除掉
    useEffect(() => {
        filterChecked().forEach((checkedItem) => {
            let changed = false
            if (!dataSource.find(dataItem => checkedItem.id === dataItem.id)) {
                delete checkedMap[checkedItem.id]
                changed = true
            }
            if (changed) {
                dispatch({
                    type: SET_CHECKED_MAP,
                    payload: Object.assign({}, checkedMap),
                })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSource])


    /******************************** useState *******************************/
    /** 但是有重复渲染的性能问题 **/

    // const [checkedMap, setCheckedMap] = useState<CheckedMap>({})

    // const onCheckedChange: OnCheckedChange<T> = ({ id }, checked) => {
    //     const newCheckedMap = Object.assign({}, checkedMap, {
    //         [id]: checked
    //     })
    //     setCheckedMap(newCheckedMap)
    // }

    // // 选中多少项
    // const filterChecked = () => {
    //     return dataSource.filter(item => checkedMap[item.id] === true)
    // }

    // // 全选
    // const checkedAll = dataSource.length !== 0 && filterChecked().length === dataSource.length
    // const onCheckedAllChange = (newCheckedAll: boolean) => {
    //     let newCheckedMap: CheckedMap = {}
    //     if (newCheckedAll) {
    //         dataSource.forEach(item => {
    //             newCheckedMap[item.id] = true
    //         })
    //     }
    //     setCheckedMap(newCheckedMap)
    // }

    return {
        checkedMap,
        filterChecked,
        onCheckedChange,
        checkedAll,
        onCheckedAllChange
    }
}