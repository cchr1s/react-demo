import { useReducer, useState } from "react"

/**
 * @description 封装hooks
 * @param {Array} dataSource 
 * 
 * 实现方式2种
 * 1、通过useState
 * 2、通过useReducer
 */
export const useChecked = (dataSource) => {

    /**
     * useState, 有闭包问题
     */
    // const [checkedMap, setCheckedMap] = useState({})
    // const onCheckedChange = ({ id }, checked) => {
    //     const newCheckedMap = Object.assign({}, checkedMap, {
    //         [id]: checked
    //     })
    //     setCheckedMap(newCheckedMap)
    // }
    // const filterChecked = () => {
    //     return dataSource.filter(item => checkedMap[item.id] === true)
    // }
    // const checkedAll = dataSource.length !== 0 && filterChecked().length === dataSource.length

    // const onCheckedAllChange = (newCheckedAll) => {
    //     let newCheckedMap = {}
    //     if (newCheckedAll) {
    //         dataSource.forEach(item => {
    //             newCheckedMap[item.id] = true
    //         })
    //     }
    //     setCheckedMap(newCheckedMap)
    // }

    
    /**
     * useReducer
     */
    // action type
    const CHECKED_CHANGE = 'CHECKED_CHANGE'
    const CHECKED_ALL_CHANGE = 'CHECKED_ALL_CHANGE'

    const [checkedMap, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case CHECKED_CHANGE:
                const { payload: { id, checked } } = action
                return {
                    ...state,
                    [id]: checked
                }
            case CHECKED_ALL_CHANGE:
                const { payload: { newCheckedAll } } = action
                const newCheckedMap = {}
                if (newCheckedAll) {
                    dataSource.forEach(item => {
                        newCheckedMap[item.id] = true
                    })
                }
                return newCheckedMap
            default:
                return state
        }

    }, {})

    const onCheckedChange = ({ id }, checked) => {
        dispatch({
            type: CHECKED_CHANGE,
            payload: {
                id,
                checked
            }
        })
    }

    const onCheckedAllChange = newCheckedAll => {
        dispatch({
            type: CHECKED_ALL_CHANGE,
            payload: {
                newCheckedAll
            }
        })
    }

    const filterChecked = () => {
        return dataSource.filter(item => checkedMap[item.id] === true)
    }
    const checkedAll = dataSource.length !== 0 && filterChecked().length === dataSource.length

    return {
        checkedMap,
        onCheckedChange,
        filterChecked,
        checkedAll,
        onCheckedAllChange
    }
}