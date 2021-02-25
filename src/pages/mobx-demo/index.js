import React from 'react'
import { observer } from 'mobx-react'
import demoStore from '../../store/mobx/demo'
import ItemCard from './itemCard'
import { cartData } from '../demo'

/**
 * @description class 组件
 */

@observer
class MobXDemo extends React.Component {
    
    totalPrice = (arr) => {
        return arr.reduce((sum, cur) => sum + cur.price, 0)
    }

    onWrapCheckedAllChange = (e) => {
        const { checked } = e.target
        demoStore.onCheckedAllChange(checked)
    }

    render() {
        const Footer = () => (<div className="footer item">
            <input
                type='checkbox'
                checked={demoStore.checkedAll}
                onChange={this.onWrapCheckedAllChange}
            />
            <p className="item-name">{'sum'}</p>
            <p className="item-price">{`￥${this.totalPrice(demoStore.filterChecked)}`}</p>
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
}

export default MobXDemo