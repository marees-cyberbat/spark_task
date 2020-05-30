import React, {useState, useEffect, useRef} from 'react'


import M from 'materialize-css'

import * as actions from '../../actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NoteList(props){
  let history = useHistory();
  const mounted = useRef();
  const previosState = usePrevious(props);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if(props.error !== previosState.error)
         if(props.error.id === 'add_note' && props.error.msg === 'Successful' && props.list.mode === 'update'){

          props.getNote(`${props.auth.user.id || props.auth.user._id}`);
          M.toast({html: `Note Updated`})
        } else if(props.error.id === 'DELETE_NOTE' && props.error.msg === 'Successful' && props.list.mode === 'delete'){
          props.getNote(`${props.auth.user.id || props.auth.user._id}`);
          M.toast({html: `Note Deleted`})
        } else if(props.error.id === 'DELETE_CATEGORY' && props.error.msg === 'Successful'){
          props.getNote(`${props.auth.user.id || props.auth.user._id}`);
          try{
            props.chosen(props.list.category.resp.category[0])
          }catch(e){
            console.log(e.toString())
          }
          
          generateLists()
          M.toast({html: `Category Deleted`})
        }
        
  
  
      console.log(previosState);
      console.log(props)
    }
  });
    const [notePrev, setNotePrev] = useState()
    const titleRef = useRef();
    const noteRef = useRef();

    let doAddNote = ()=>{

      if(titleRef.current.value.trim() === '' || noteRef.current.value.trim() === '')
                return M.toast({html: `Please Enter Category Name`})
            if(props.auth.isAuthenticated){
                let newNote = {
                    category: props.list.chosen,
                    title: titleRef.current.value.trim(),
                    note: noteRef.current.value.trim(),
                    user: `${props.auth.user.id || props.auth.user._id}`
                }
                console.log(newNote)
                props.modeAction('update')
                props.addNote(newNote)
                props.deleteNote(notePrev)
            }
            else{
              M.toast({html: `Session Timed Out Login Again`})
              props.logout();
              history.push('/');
            }
        }
        
        let doClose = ()=>{
            const elem = document.getElementById('modal1');
            const instance = M.Modal.init(elem, {dismissible: true});
            
            instance.destroy();
       
    }
  
    useEffect( () => {
      try{
        console.log(props.list)
      if(props.list.chosen === undefined)
      console.log(props.list)
      props.chosen(props.list.category.resp.category[0])
       
      } catch(e){
        console.log(e.toString())
        props.chosen('Add Some Category')
      }
  }, [props.list.category.resp])

  let generateWelcome = ()=>{
    try{
      return props.list.category.resp.category.length > 0 ?
        <div class="m-5 indigo lighten-4 center jumbotron">
        <h1 class="display-4">Hi There!</h1>
        <p class="lead info-txt">Take a Note!</p>
        
        <div class="m-2 btn red">Youtube demo</div>
        <div class="m-2 btn black">Github source</div>
        </div>
      :
        
        <div class="m-5 indigo lighten-4 center jumbotron">
        <h1 class="display-4">Hi There!</h1>
        <p class="lead info-txt">Add category to get started</p>
        
        <div class="m-2 btn red">Youtube demo</div>
        <div class="m-2 btn black">Github source</div>
        </div>
      
    } catch{
return <div class="m-5 indigo lighten-4 center jumbotron">
      <h1 class="display-4">Hi There!</h1>
      <p class="lead info-txt">Add category to get started</p>
      
      <div class="m-2 btn red">Youtube demo</div>
      <div class="m-2 btn black">Github source</div>
      </div>
    }
    
  }
let generateCategoryDrop = () => {
  try{
    if(props.list.category.resp.category.length > 0)
    return(
      <div class="d-flex justify-content-between">
        <div class="m-3 head-note center">{props.list.chosen}</div>
        <div onClick={doDeleteCat} class="m-3 right btn red white-text">Drop</div>
      </div>
    )
  else
      return null
  } catch{
    return null
  }
  
}
  let generateModal = ()=>{
    return(
        <div id="modal3" class="modal">
        <div class="modal-content">
          <h4>Update Note</h4>
          <label class="indigo-text" >Note Title</label>

          <div class="row col col-sm-12 col-md-12 col-lg-12 col-xl-12" >

    <div class="input-field col col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <input class="indigo-text" ref={titleRef} id="title" type="text" />
     
    </div>
  </div>
  <label class="indigo-text">Take a note here!</label>

  <div class="row col col-sm-12 col-md-12 col-lg-12 col-xl-12">
    <div class="input-field col col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <textarea ref={noteRef} id="textarea2" class="materialize-textarea indigo-text"></textarea>
    </div>
  </div>
  
  <div class="d-flex justify-content-around">
  <div class="modal-close btn bg-danger" onClick={()=>doClose()}>Cancel</div>
  <div class="modal-close btn bg-success" onClick={()=>doAddNote()}>Add</div>
  
  </div>
           
        </div>
      </div>
    );
}
let openModal = (data)=>{
  setNotePrev(data)
  console.log(noteRef)
 titleRef.current.value  = `${data.title}`;

 noteRef.current.value = data.note;
   const elem = document.getElementById('modal3');
   const instance = M.Modal.init(elem, {dismissible: false});
   instance.open();
}

let doDeleteCat = ()=>{
  try{
  console.log(props.auth.user.id || props.auth.user._id);
  let catLists = props.list.category.resp.category;
  const index = catLists.indexOf(props.list.chosen);
  console.log(index)
    if (index > -1) {
      catLists.splice(index, 1);
    }
 // console.log(props.list.category.resp.category)
    props.deleteCat({data:{
      user: `${props.auth.user.id || props.auth.user._id}`,
      category: catLists
  },
  chosen: props.list.chosen
})
  } catch{
    M.toast({html: `Session Expired.. Login again`})
  }
}
    let generateLists = () => {
      
      let respArr = [];
      let noteList = [];
      let isNote = false;
      //console.log(props.list)
      respArr = props.list.notes.resp;
     
      let chosen = props.list.chosen;
     
    
      console.log(props.list)
      try{
        respArr.map((data)=>{
          if(data.category === chosen)
            isNote = true
        })
        if(!isNote){
          try{
            if(props.list.chosen !== 'Add Some Category')
            return props.list.chosen !== 'Add Some Category' ? generateWelcome() : null
          }
          catch{
              return generateWelcome()
          }

        }
       
          
     return  respArr.map((data)=>{
        console.log(data)
        if(data.category === chosen){
          noteList = data.note;
          console.log(noteList)
          return (
            <div class="row m-2">
            <div class="col s12 m6">
              <div class="card indigo lighten-5">
                <div class="card-content">
                  <h4 style={{padding:0, margin:0}} class="indigo-text">{data.title}</h4>
                  <div class="pr-4 pl-4 mt-2">
                   
                     <p class="styled-form">{data.note}</p>
                  
                    
                  
                  </div>
                </div>
                <div class="right-align">
                    <div onClick={()=>openModal(data)} class="indigo btn m-1">Edit</div>
                    <div onClick={()=>{props.modeAction('delete');props.deleteNote(data); }} class="indigo btn m-1">Delete</div>
                </div>
              </div>
            </div>
          </div>
          )
    } 
    
      })
      
    } catch(e){
      return(null)
    }
        
        
    }
    console.log(props.list.chosen)
    return (
      <div class="card">
              
                {generateCategoryDrop()}
             
           

        <div style={{float:'right', marginTop:'20px'}} class="col col-md-12 col-lg-12 col-xl-12">
           
         
                

            {props.list.chosen !== 'Add Some Category' ? null : generateWelcome() } 
           {generateLists()}
           {generateModal()}

        </div>

        </div>
        )
        
   
}

const mapStateToProps = (myState)=>{
  //console.log(myState);\
  let {auth, error, list} = myState;
  return{
      auth,
      error,
      list
  }
 
}


export default connect(mapStateToProps, actions)(NoteList);
