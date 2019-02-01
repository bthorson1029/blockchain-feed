import React, { Component } from 'react';


class Header extends Component {
  render(){
    return(
      <div className = "container-fluid" >
        <div className="row">
          <div className="intro col-lg-6 pt-5 pb-5">
            <h2>BlockChain News</h2>
          </div>
          <div className="col-lg-6 pt-4">
              <form>
              <div class="form-group">
                <label for="exampleFormControlInput1">Search</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
            </form>
          </div>
        </div >
      </div>
    )
  }
}

export default Header;