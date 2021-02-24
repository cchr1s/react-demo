import React from 'react'
import ItemCard from './itemCard'
import '../demo/index.css'

import { observer } from 'mobx-react'
import { useStore } from '../../store/mobx'

export const cartData = new Array(5)
    .fill(undefined)
    .map((v, i) => ({
        id: i,
        name: `商品${i + 1}`,
        price: Math.round(Math.random() * 100)
    }))

export interface IItemCard {
    id: number
    name: string
    price: number
}


function MobXDemo() {
    const { demo: demoStore } = useStore()

    const totalPrice = (arr: IItemCard[]) => {
        return arr.reduce((sum, cur) => sum + cur.price, 0)
    }

    const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target
        demoStore.onCheckedAllChange(checked)
    }

    const Footer = () => (<div className="footer item">
        <input
            type='checkbox'
            checked={demoStore.checkedAll}
            onChange={onWrapCheckedAllChange}
        />
        <p className="item-name">{'sum'}</p>
        <p className="item-price">{`￥${totalPrice(demoStore.filterChecked)}`}</p>
    </div>)

    return <div className="container">
        <h3>购物车demo</h3>
        <div>
            {
                cartData.map(item => {
                    const checked = demoStore.checkedMap[item.id] || false
                    return <ItemCard
                        item={item}
                        checked={checked}
                        onCheckedChange={demoStore.onCheckedChange}
                        key={item.id}
                    />
                })
            }
            <Footer />
        </div>
    </div>

}

export default observer(MobXDemo)