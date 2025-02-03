import React, { Component } from 'react'

export default class Card extends Component (props){
  render() {
    return (
      <div>
        <div className="card" mt-3 style="width: 18rem;">
    <img src= {props.img} class="card-img-top" alt="..."/>
    <div className="card-body">
    <p className="card-text">{props.name}</p>
    <p className="card-text">{props.category}</p>
    </div>
</div>
      </div>
    )
  }
}
