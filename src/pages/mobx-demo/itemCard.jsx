import React from 'react'

class ItemCard extends React.Component {

    // 是否重新渲染的生命周期
    shouldComponentUpdate (nextProps, nextState) {
        return this.props.checked !== nextProps.checked
    }

    onChange = e => {
        const { item, onCheckedChange } = this.props
        const { checked } = e.target
        onCheckedChange(item, checked)
    }

    render() {
        console.log('children component rerender...')

        const { item, checked } = this.props
        const { name, price } = item

        return <div>
            <div className="item">
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={this.onChange}
                />
                <p className="item-name">{name}</p>
                <p className="item-price">{`￥${price}`}</p>
            </div>
        </div>
    }

}

export default ItemCard