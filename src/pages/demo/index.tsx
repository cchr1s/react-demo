import React from 'react'
// import { useHistory } from 'react-router-dom'
import ItemCard from './itemCard'
import { useChecked } from './use-checked'
import "./index.css"

const cartData = new Array(5)
    .fill(undefined)
    .map((v, i) => ({
        id: i,
        name: `商品${i + 1}`,
        price: Math.round(Math.random() * 100)
    }))

export interface CartItem {
    id: number
    name: string,
    price: number
}

function Demo() {
    const {
        checkedMap,
        onCheckedChange,
        checkedAll,
        onCheckedAllChange,
        filterChecked
    } = useChecked(cartData)


    const totalPrice = (cartData: CartItem[]) => cartData.reduce((sum, cur) => sum + cur.price, 0)
    const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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


    // ******* hooks 闭包问题， ref解决 *********
    // const onCheckedChangeRef = React.useRef(onCheckedChange)

    // React.useEffect(() => {
    //     onCheckedChangeRef.current = onCheckedChange
    // },[])

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