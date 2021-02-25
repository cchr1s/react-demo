import React, { useEffect, useRef } from 'react'
import './index.css'
import ItemCard from './itemCard'
import { useChecked } from './use-checked'

/**
 * @description 函数式组件FC
 */

export const cartData = new Array(5)
    .fill(undefined)
    .map((v, i) => ({
        id: i,
        name: `商品${i + 1}`,
        price: Math.round(Math.random() * 100)
    }))


function Demo() {
    const {
        checkedMap,
        onCheckedChange,
        checkedAll,
        filterChecked,
        onCheckedAllChange
    } = useChecked(cartData)

    /**
     * hooks 闭包旧值问题，通过ref hack
     * 由于ref在 React 组件的整个生命周期中只存在一个引用，因此通过 current 永远是可以访问到引用中最新的函数值
     */
    // const onCheckedChangeRef = useRef(onCheckedChange)
    // useEffect(() => {
    //     onCheckedChangeRef.current = onCheckedChange
    // })


    const totalPrice = (cartData) => cartData.reduce((sum, cur) => sum + cur.price, 0)
    const onWrapCheckedAllChange = e => {
        const { checked } = e.target
        onCheckedAllChange(checked)
    }
    const Footer = () => (<div className="footer item">
        <input
            type='checkbox'
            checked={checkedAll}
            onChange={onWrapCheckedAllChange}
        />
        <p className="item-name">{'sum'}</p>
        <p className="item-price">{`￥${totalPrice(filterChecked())}`}</p>
    </div>)

    return <div className="container">
        <h3>购物车demo</h3>
        <div>
            {
                cartData.map(item => {
                    const checked = checkedMap[item.id] || false
                    return <ItemCard
                        item={item}
                        checked={checked}
                        onCheckedChange={onCheckedChange}
                        key={item.id}
                        // onCheckedChangeRef={onCheckedChangeRef}
                    />
                })
            }
            <Footer />
        </div>
    </div>
}

export default Demo