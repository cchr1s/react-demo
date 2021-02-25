import { observable, computed, action, makeAutoObservable } from 'mobx'
import { cartData } from '../../../pages/demo'

console.log(cartData)

class Demo {
    @observable
    checkedMap = {}

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
    setCheckedMap = (payload) => {
        this.checkedMap = payload
    }

    @action
    onCheckedChange = ({ id }, checked) => {
        this.checkedMap[id] = checked
    }

    @action
    onCheckedAllChange = (newCheckedAll) => {
        const newCheckedMap = {}
        if (newCheckedAll) {
            cartData.forEach(item => {
                newCheckedMap[item.id] = true
            })
        }
        this.setCheckedMap(newCheckedMap)
    }
}

export default makeAutoObservable(new Demo)