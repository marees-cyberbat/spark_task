import React, {useEffect, useRef} from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import M from 'materialize-css'
import '../../App.css'
import { useHistory } from 'react-router-dom';


function Signup(props){
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const ConfirmPasswordRef = useRef();

  const mounted = useRef();
  const previosState = usePrevious(props);
  let history = useHistory();

  //useEffect(()=>{props.clearErrors()},[])
  let routeChange = (path)=>{
    history.push(path);
    
};
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    if(props.error !== previosState.error)
      if(props.error.id === 'REGISTER_FAIL')
        M.toast({html: `${props.error.msg.msg}`})
      else{
        M.toast({html: `${props.error.msg}`})
        routeChange('/dashboard')
      }


    console.log(previosState);
    console.log(props)
  }
});

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

let handleEnter = (event, action) => {
 
    if (event.keyCode === 13) {
      if(action === 'next'){
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
     }
       else
            doRegister()
       
  }
  
}

  let doRegister = ()=>{
    
    if(!usernameRef.current.value.trim() || !emailRef.current.value.trim() || !phoneRef.current.value.trim() || !ConfirmPasswordRef.current.value.trim() || !passwordRef.current.value.trim())
      M.toast({html: `Please Fill All Fields`})
    else if(document.querySelector('#pass').value !== document.querySelector('#confirm_pass').value)
      M.toast({html: 'Password did not match'})
    else{
      let request = {
        username: `${usernameRef.current.value.trim()}`,
        mail: `${emailRef.current.value.trim()}`,
        contact: `${phoneRef.current.value.trim()}`,
        password: `${passwordRef.current.value.trim()}`

      }
      console.log(request)
      props.register(request)
    }
  }

   return(
    <div class="row">
    <form class="col">
    <h1 class="indigo-text">REGISTER</h1>
      <div class="row">
        <div class="input-field col col-sm-12 col-lg-12 col-xl-12 col-md-12">
          <i class="material-icons prefix">account_circle</i>
          <input onKeyDown={(e)=>handleEnter(e, 'next')} ref={usernameRef} id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">Username</label>
        </div>
       </div>
       <div class="row">

        <div class="input-field col col-sm-12 col-lg-12 col-xl-12 col-md-12">
        <i class="material-icons prefix">email</i>

          <input onKeyDown={(e)=>handleEnter(e, 'next')} ref={emailRef} id="email" type="email" class="validate" />
          <label for="email">Email</label>
          <span class="helper-text" data-error="Please Enter Valid E-Mail" data-success="valid"></span>
      
      </div>
      </div>
      <div class="row">

        <div class="input-field col col-sm-12 col-lg-12 col-xl-12 col-md-12">
          <i class="material-icons prefix">phone</i>
          <input onKeyDown={(e)=>handleEnter(e, 'next')} ref={phoneRef} id="tele"  pattern="[789][0-9]{9}" type="tel" class="validate" />
          <label for="tele">Contact Nomber</label>
          <span class="helper-text" data-error="Please Enter Valid Number" data-success="valid"></span>
        </div>
        
      </div>
       <div class="row">

        <div class="input-field col col-sm-12 col-lg-12 col-xl-12 col-md-12">
          <i class="material-icons prefix">security</i>
          <input onKeyDown={(e)=>handleEnter(e, 'next')} ref={passwordRef} id="pass" type="password" class="validate" />
          <label for="pass">Password</label>
        </div>
        
      </div>
       <div class="row">

        <div class="input-field col col-sm-12 col-lg-12 col-xl-12 col-md-12">
          <i class="material-icons prefix">security</i>
          <input onKeyDown={(e)=>handleEnter(e, 'submit')} ref={ConfirmPasswordRef} id="confirm_pass" type="password" class="validate" />
          <label for="confirm_pass">Confirm Password</label>
        </div>
        
      </div>
      <div onClick={()=>doRegister()} class="btn indigo darken-2">Register</div>
      <div onClick={()=>props.myKey(true)} className="mt-3 my-link row justify-content-center">Already have an account? login here!</div>
    </form>
  </div>
   )
}

const mapStateToProps = state => {
  console.log(state);
  return{
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
  
}
export default connect(mapStateToProps, actions)(Signup);
