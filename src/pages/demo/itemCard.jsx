import React from 'react'

// 定义不重复渲染的条件
const areEqual = (prevProps, nextProps) => {
    return prevProps.checked === nextProps.checked
}

// 定义子组件
const ItemCard = (props) => {
    const { item, checked, onCheckedChange, onCheckedChangeRef } = props
    const { name, price } = item

    const onChange = e => {
        const { checked } = e.target
        onCheckedChange(item, checked)
        // onCheckedChangeRef.current(item, checked) // ref的调用
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
}

export default React.memo(ItemCard, areEqual)