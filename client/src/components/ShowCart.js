import React from 'react'
import { CartContext } from '../context/Cart'
import './list.css'

function removeOne(xs, x) {
  const idx = xs.indexOf(x)
  return xs.filter((_, i) => i !== idx)
}

function Item({ itemData, count, cart, setCart }) {

  const removeItemFromCart = () => {
    const newCart = removeOne(cart, itemData)
    setCart(newCart)
  }

  const addAnotherToCart = () => setCart([...cart, itemData])

  const removeItem = () => setCart(cart.filter((item) => item !== itemData))

  return <li className="item">
    <div className="itemProperty_image">
                <img src={itemData.image} alt="sorry :(" />
              </div>
    <div className="itemProperty">
      <b>TITLE</b>: {itemData.title}
    </div>
    <div className="itemCount">
      <span className="itemCountBtn" onClick={addAnotherToCart}> + </span>
      <button style={{margin: "10px"}}>{count}</button>
      <span className="itemCountBtn" onClick={removeItemFromCart} > - </span>
    </div>
    <div className="itemProperty">
      <b>AUTHOR</b>: {itemData.author}
    </div>

    <div className="itemProperty">
      <b>PRICE</b>: {itemData.price}
    </div>

    <br/>
    <button className='btn' onClick={removeItem}>Remove from Cart</button>
    <hr></hr>
  </li>
}

function CartList() {
  /**
   * @param {Cart} cart 
   * @returns {Map<Item, number>} mapping of an item to its count
   */
  function getItemCounts(cart) {
    // countOfItem.get(item) -> number of times `item` exists in cart
    const countOfItem = new Map()
    for (const item of cart) {
      const existingCount = countOfItem.get(item)
      if (existingCount) {
        // If we've already seen `item`, then increment its count
        countOfItem.set(item, existingCount + 1)
      } else {
        // this is the first time we encountered 'item' in this loop
        countOfItem.set(item, 1)
      }
    }
    return countOfItem
  }

  return <CartContext.Consumer>
    {({ cart, setCart }) => {
      const totalCartPrice = cart.reduce((acc, item) => item.price + acc, 0)
      const countOfItem = getItemCounts(cart)
      const uniqueCartItems = Array.from(countOfItem.keys()).sort((a, b) =>
        a.title > b.title
      )

      return <div className="cartInfo" style={{marginTop:"30px"}}>
        Total: <b> {totalCartPrice} </b>
        <hr></hr>
        <ul className="itemList">
          {uniqueCartItems.map((item, index) =>
            <Item
              itemData={item}
              count={countOfItem.get(item)}
              cart={cart}
              setCart={setCart}
              key={index} />)}
        </ul>
      </div>
    }}
  </CartContext.Consumer>
}

export const ShowCart = () => {
  return (
    <CartList />

  )
}