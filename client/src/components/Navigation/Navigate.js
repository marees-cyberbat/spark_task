import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css'
import { Link } from 'react-router-dom';
import SideMenu from '../Dashboard/SideMenu'

function Navigate(props){
  let history = useHistory();

    let doLogout = ()=>{
      props.logout();
      history.push('/');
    }
    let instances = null;
    useEffect(() => {
        
      console.log(props);
       
       
            var elems = document.querySelector('.sidenav');
            instances = M.Sidenav.init(elems);     
      }, []);
      let closeNav= ()=>{
        console.log('hey')
        if(instances)
        instances.close();
        else{
          var elems = document.querySelector('.sidenav');
          instances = M.Sidenav.init(elems); 
          instances.close();    
        }
    };
    
    let openNav= ()=>{
        if(instances)
        instances.open();
        else{
          var elems = document.querySelector('.sidenav');
          instances = M.Sidenav.init(elems); 
          instances.open();    
        }
    };


    return (
      <div>
      <ul id="slide-out" className="indigo sidenav">
  <li><div className="user-view">
    <div className="background indigo darken-4">
      {/* backgroun */}
    </div>
    
    <a><span style={{fontSize:'large'}} className="white-text name">SPARK OUT NOTE TASK</span></a>
    <a><span className="white-text email">{`${props.auth.user ? props.auth.user.mail : 'Session Ended'}`}</span></a>
    <div onClick={()=>doLogout()} class="indigo w-100 btn">Logout</div>
  </div></li>
 
<SideMenu />
</ul>


        <nav class="indigo darken-4">
    <div class="nav-wrapper container">
      {props.mode === 'home' ? null : <div class="show-on-small">
      <a onClick={()=>openNav()} style={{padding:"0 35px", float:"left"} } class="brand-logo left"><i class="material-icons ">menu</i></a>
      </div>}
      
   

      <a class="brand-logo">Spark Note</a>
      {props.mode === 'home' ? <div></div> : <ul id="nav-mobile" class="right hide-on-med-and-down">
    <li><a>{`${props.auth.user ? props.auth.user.mail : 'Session Ended'}`}</a></li>
        <li><a onClick={()=>doLogout()}>Logout</a></li>
      </ul>}
    </div>
  </nav>
  </div>
        )
        
        
}
const mapStateToProps = (myState)=>{
  //console.log(myState);\
  let {auth} = myState;
  return{
      auth
  }
 
}



export default connect(mapStateToProps, actions)(Navigate);
