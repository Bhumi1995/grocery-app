import React from 'react'
import {MdEdit, MdDelete} from "react-icons/md"

const List = ({items, removeItem, editItem}) => {
  return (
    <div>{items.map((item) => {
        const {id, title} = item
        return <article key={id}>
            <div className="grocery-lists">
                {title}
            </div>
            <div className="button-group">
                <button onClick={()=> editItem(id)} className='edit-btn' type='button'>
                    <MdEdit/>
                </button>
                <button onClick={()=> removeItem(id)} className='delete-btn' type='button'>
                    <MdDelete/>
                </button>
            </div>
        </article>
    })}</div>
  )
}

export default List