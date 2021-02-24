import React, { FunctionComponent } from 'react'
import { OnCheckedChange } from './use-checked'
import { CartItem } from './index'

interface Props {
    item: CartItem
    checked: boolean,
    onCheckedChange: OnCheckedChange<CartItem>
    // onCheckedChangeRef: any
}

function areEqual(prevProps: Props, nextProps: Props) {
    return prevProps.checked === nextProps.checked
}

const ItemCard: FunctionComponent<Props> = React.memo((props) => {
    const { item, checked, onCheckedChange } = props
    const { name, price } = item

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target
        onCheckedChange(item, checked)
    }

    console.log('children component rerender...')

    return <div>
        <div className="item">
            <input
                type='checkbox'
                checked={checked}
                onChange={onChange}
            />
            <p className="item-name">{name}</p>
            <p className="item-price">{`￥${price}`}</p>
        </div>
    </div>
}, areEqual)

export default ItemCard