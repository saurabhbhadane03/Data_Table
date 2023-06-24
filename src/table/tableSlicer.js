import { createSlice } from "@reduxjs/toolkit";

export const tableSlicer = createSlice({
    name:'table',
    initialState: {
            "data": []
    },

    reducers: {
        addData: (state , data) => {
            state.data = data.payload.map( data => {
                return {
                    id: data.id, 
                    name:  data.name,
                    email:  data.email,
                    phone: data.phone,
                    address: {
                      city: data.address.city ,
                      zipcode: data.address.zipcode
                    },  
                  }
            })
        },
        addNewData: (state , newData) => {
            state.data = [ 
                ...state.data,
                newData.payload
            ]
        },
        deleteData : (state , Index) => {
            state.data = state.data.filter( item => {
                return item.id != Index.payload
            })
        },
        updateData : (state , updatedObj) => {
           // console.log( "Index" ,Index)
           state.data = state.data.map( (item,i,arr) =>{
            if( updatedObj.payload.index === i) return arr[i] = updatedObj.payload.editedDataObj
            else return arr[i] = item
        })

        }
    }
})

export const { addData, addNewData, deleteData, updateData } = tableSlicer.actions


export const FetchAPI = (url) => (dispatch) => {
   
    async function getData(){
        const res = await fetch(url)
        const data = await res.json()
        await dispatch(addData(data))
    }
    getData()
  }

export default tableSlicer.reducer