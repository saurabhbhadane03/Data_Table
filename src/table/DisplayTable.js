import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { useSelector, useDispatch } from 'react-redux'
import { FetchAPI , addNewData, deleteData, updateData} from './tableSlicer'


export default function DisplayTable() {
    const data = useSelector( state => state.table.data)
    const dispatch = useDispatch()

    console.log(data)  
    
    useEffect(() =>{
      console.log("inside useEffect")
       dispatch(FetchAPI('https://jsonplaceholder.typicode.com/users'))
    },[])


    const [newInputData , setNewInputData] = useState({
      id: "", 
      name: "",
      email: "",
      phone: "",
      zipcode: "",
      city: ""
    })

 

    const [newDataState , setNewDataState] = useState(false)

    function toogleNewform(){
      setNewDataState( state => !state)
      setNewInputData({
        id: "", 
        name: "",
        email: "",
        phone: "",
        zipcode: "",
        city: ""
      })
    }

    function handleChange(e){
      const{value ,name} = e.target
      setNewInputData( item => {
        return {
          ...item,
          id: editState.state ? item.id : data.length + 1,
          [name]: value
        }
      })
    }

    function submitNewData(){
      dispatch(addNewData(
        {
          id: data.length + 1, 
          name:  newInputData.name,
          email:  newInputData.email,
          phone: newInputData.phone,
          address: {
            city: newInputData.city ,
            zipcode: newInputData.zipcode
          }  
        }
      ))

      setNewInputData({
        id: "", 
        name: "",
        email: "",
        phone: "",
        zipcode: "",
        city: ""
      })

      setNewDataState(false)
    }

    const [ editState , setEditState ] = useState({
        state : false,
        ID : 0
    }) 

    useEffect( () => {
      if(data.length)
      {
        console.log( Boolean(data.length))
        setNewInputData({
          id: data[editState.ID].id, 
          name: data[editState.ID].name ,
          email: data[editState.ID].email,
          phone: data[editState.ID].phone,
          zipcode: data[editState.ID].address.zipcode,
          city: data[editState.ID].address.city
        })
      }

    },[editState.state])

    function handleEdit(Elementid){
      setEditState( itemState => {
        return {
          state : !itemState.state,
          ID : Elementid
        }
      })
    }

    function submitEditedData( index ){

      const editedDataObj = {
        id: newInputData.id, 
        name:  newInputData.name,
        email:  newInputData.email,
        phone: newInputData.phone,
        address: {
          city: newInputData.city ,
          zipcode: newInputData.zipcode
        }  
       }
        dispatch(updateData( {index , editedDataObj} ))
        
        setEditState( itemState => {
          return {
            ...itemState,
            state: false
          }
        })
        
        setNewInputData({
          id: "", 
          name: "",
          email: "",
          phone: "",
          zipcode: "",
          city: ""
        })
          
    }

   // console.log("data" , data)

  return (
    
    <div className='p-5'>
       <h1 className="text-center">Data Table</h1> 

       <Table striped bordered hover className='text-center'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Pincode, City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           
            { data.map( (item,index) => {
              return (
                editState.state && editState.ID === index ? 
                 ( <tr>
                      <td>{newInputData.id}</td>
                      <td><input type="text" name="name" value={newInputData.name} onChange={handleChange} placeholder='Name'></input></td>
                      <td><input type="email" name="email" value={newInputData.email} onChange={handleChange} placeholder='Email@xyz.com'></input></td>
                      <td><input type="tel" name="phone" value={newInputData.phone} onChange={handleChange} placeholder='+91 xxxxx xxxxx'></input></td>
                      <td className='d-flex justify-content-center h-20 align-items-center'>
                          <tr><input type="text" name="zipcode" value={newInputData.zipcode} onChange={handleChange}  placeholder='Zipcode'className='mx-1'></input></tr>
                          <tr><input type="text" name="city" value={newInputData.city} onChange={handleChange} placeholder='City' className='mx-1'></input></tr>
                      </td>
                      <td className="text-center" >
                          <Button variant="outline-success" className='mx-3' onClick={() => submitEditedData(index)}>Update Data</Button>
                      </td>
                    </tr>
                  ) :
                   
                 ( <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{`${item.address.zipcode} , ${item.address.city}`}</td>
                    <td className="text-center" >
                       <Button className='mx-3' onClick={() => {handleEdit(index)}}>Edit</Button>
                       < Button variant="outline-danger" onClick={() => dispatch(deleteData(item.id))}>Delete</Button>
                    </td>
                  </tr>
                 )
              )
            })}

            { newDataState ?
              <tr>
                <td>{data.length + 1}</td>
                <td><input type="text" name="name" value={newInputData.name} onChange={handleChange} placeholder='Name'></input></td>
                <td><input type="email" name="email" value={newInputData.email} onChange={handleChange} placeholder='Email@xyz.com'></input></td>
                <td><input type="tel" name="phone" value={newInputData.phone} onChange={handleChange} placeholder='+91 xxxxx xxxxx'></input></td>
                <td className='d-flex justify-content-center h-20 align-items-center'>
                    <tr><input type="number" name="zipcode" value={newInputData.zipcode} onChange={handleChange}  placeholder='Zipcode'className='mx-1'></input></tr>
                    <tr><input type="text" name="city" value={newInputData.city} onChange={handleChange} placeholder='City' className='mx-1'></input></tr>
                </td>
                <td className="text-center" >
                  <Button variant="outline-success" className='mx-3' onClick={submitNewData}>ADD Data</Button>
                </td>
              </tr> : "" 
            }
          </tbody>
       </Table>
       {editState.state ? 
          "" :
          <Button onClick={toogleNewform}>{ newDataState ? "Cancel" : "Add new Data"}</Button>
        }
    </div>
  )
}
