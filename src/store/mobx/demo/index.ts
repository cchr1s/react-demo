import { action, computed, makeAutoObservable, observable } from 'mobx'
import { IItemCard, cartData } from '../../../pages/mobx-demo/'

export type OnCheckedChange<T> = (item: T, checked: boolean) => any
type OnCheckedAllChange = (checked: boolean) => any

type SetCheckedMap<T> = (obj: T) => any

type CheckedMap = {
    [key: number]: boolean
}

class Demo {
    @observable
    checkedMap: CheckedMap = {}

    @computed
    get filterChecked() {
        return cartData.filter(item => {
            return this.checkedMap[item.id] === true
        })
    }

    @computed
    get checkedAll() {
        return cartData.length !== 0 && cartData.length === this.filterChecked.length
    }

    @action
    setCheckedMap: SetCheckedMap<CheckedMap> = (payload) => {
        this.checkedMap = payload
    }

    @action
    onCheckedChange: OnCheckedChange<IItemCard> = ({ id }, checked) => {
        this.checkedMap[id] = checked
    }

    @action
    onCheckedAllChange: OnCheckedAllChange = (newCheckedAll) => {
        const newCheckedMap: CheckedMap = {}
        if (newCheckedAll) {
            cartData.forEach(item => {
                newCheckedMap[item.id] = true
            })
        }
        this.setCheckedMap(newCheckedMap)
    }
}

export default makeAutoObservable(new Demo())