import React from 'react'
// import { useDispatch } from "react-redux";
import {connect} from 'react-redux';
import { newInputAction } from '../reducers/filterReducer';


const Filter = ({dispatch}) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const filterText = event.target.value
    console.log(filterText);
    dispatch(newInputAction(filterText));
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

// export default Filter
export default connect()(Filter)
