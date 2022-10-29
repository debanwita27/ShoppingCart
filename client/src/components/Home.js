import React from 'react'
import { CartContext } from '../context/Cart'
import { UserContext } from '../context/User'
import { ItemsContext, addItemToDB, updateItemInDB, deleteItemInDB } from '../context/Items'
import './list.css'
import './form.css'

/**
 * @typedef Item An item that the user can buy
 * @property {string} title Title of the book
 * @property {string} author Name of the author
 * @property {number} price Price of the book
 * @property {string} image Image of the book
 */



/**
 * Renders a single item
 * @param {{ itemData: Item }} itemData
 */
function Item({ itemData }) {
  return <div className="item">
    <hr />
    <div className="itemProperty_image">
      <img src={itemData.image} alt="sorry :" />
    </div>
    <div className='itemDetails'>
      <div className="itemProperty">
        <b>TITLE</b>: {itemData.title}
      </div>

      <div className="itemProperty">
        <b>AUTHOR</b>: {itemData.author}
      </div>

      <div className="itemProperty">
        <b>PRICE</b>: {itemData.price}
      </div>
      <br />
    </div>
  </div>
}

function EditableItem({ itemData, setIsEditable }) {
  const { author, title, price, image } = itemData

  const authorRef = React.createRef(null)
  const titleRef = React.createRef(null)
  const priceRef = React.createRef(null)


  return <ItemsContext.Consumer>
    {({ items, setItems }) => {

      const index = items.indexOf(itemData)

      const saveBtn = <button className='btn' onClick={() => {
        const newAuthor = authorRef.current.value || author
        const newTitle = titleRef.current.value || title
        const newPrice = priceRef.current.value || price

        const newItem = {
          title: newTitle,
          author: newAuthor,
          price: newPrice,
          image,
          _id: itemData._id
        }


        const newItems = []
        items.forEach((oldItem, oldItemIndex) => {
          if (oldItemIndex === index) {
            newItems.push(newItem)
          } else {
            newItems.push(oldItem)
          }
        })

        setItems(newItems)
        setIsEditable(false)
        updateItemInDB(newItem)
      }}>
        Save
      </button>

      return <div className="item">
        <b>Title: </b>
        <input type="text" placeholder={title} ref={titleRef} defaultValue={title} />
        <br />
        <b>Author: </b>
        <input type="text" placeholder={author} ref={authorRef} defaultValue={author} />
        <br />
        <b>Price: </b>
        <input type="number" placeholder={price} ref={priceRef} defaultValue={price} />
        <br/>
        {saveBtn}
        <br />
      </div>
    }}
  </ItemsContext.Consumer>
}

function ItemWrapper({ isAdmin, itemData }) {
  const [isEditable, setIsEditable] = React.useState(false)
  const addItemToCart = ({ cart, setCart }) => setCart([...cart, itemData])


  return <CartContext.Consumer>
    {(cartControl) => {

      const addBtn = <button className='btn' onClick={() => addItemToCart(cartControl)}>
        Add to cart
      </button>

      const editBtn = <button className='btn' onClick={() => setIsEditable(true)}>
        Edit
      </button>

      const deleteBtn =
        <ItemsContext.Consumer>
          {({ items, setItems }) => {
            const deleteItem = (id) => {
              deleteItemInDB(id)
              setItems(items.filter(item => item._id !== id))
            }
            return <button className='btn' onClick={() => deleteItem(itemData._id)}>
              Delete
            </button>
          }}
        </ItemsContext.Consumer>


      const getButton = () => {
        if (isAdmin && !isEditable) return [editBtn, deleteBtn]
        if (!isAdmin) return addBtn
      }

      return <li>
        {isEditable ?
          <EditableItem itemData={itemData} setIsEditable={setIsEditable} />
          :
          <Item itemData={itemData} />
        }

        {getButton()}
      </li>
    }}
  </CartContext.Consumer >

}

/**
 * Renders a list of items
 */
function ItemList({ isAdmin }) {
  return <ItemsContext.Consumer>
    {({ items }) => <ul className="itemList">
      {items.map((item) => {
        return <ItemWrapper itemData={item} key={item._id} isAdmin={isAdmin} />
      }
      )}
    </ul>}
  </ItemsContext.Consumer>
}


function NewItem() {
  const titleRef = React.createRef(null);
  const authorRef = React.createRef(null);
  const priceRef = React.createRef(null);
  const imageRef = React.createRef(null);

  const [successStatusText, setSuccessStatusText] = React.useState('')

  const addItem = () => {
    const title = titleRef.current.value
    const author = authorRef.current.value
    const price = priceRef.current.value
    const image = imageRef.current.value

    const newItem = { title, author, price, image }
    if(addItemToDB(newItem)){
      setSuccessStatusText('Item Added Successfully')
    }
    
  }

  return <form className='formContainer'>
    <label htmlFor="title">Title: </label>
    <input type="text" name="title" ref={titleRef} />
    <label htmlFor="author">Author: </label>
    <input type="text" name="author" ref={authorRef} />  
    <label htmlFor="title">Price: </label>
    <input type="number" name="price" ref={priceRef} /> 
    <label htmlFor="image">Image URL: </label>
    <input type="text" name="image" ref={imageRef} />
    <br/>
    <button className="btn" onClick={(e) => {
      e.preventDefault()
      addItem()
    }}>Add</button>
    <div style={{ color: "green" }}>{successStatusText}</div>
  </form>
}

const Home = () => {
  return (
    <UserContext.Consumer>
      {
        ({ user }) => {
          const isLoggedIn = !!user;
          if (isLoggedIn) {
            return <>
              <ItemList isAdmin={isLoggedIn} />
              <NewItem />
            </>
          } else {
            return <ItemList isAdmin={isLoggedIn} />
          }
        }
      }
    </UserContext.Consumer>
  )
}

export default Home