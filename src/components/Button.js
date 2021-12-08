import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions/dist/preview";
import className from 'classnames';

export default function Button(props) {
   
   
   let buttonClass = className(
      "button",
      {"button--confirm": props.confirm,
      "button--danger": props.danger}
   )
   
   // let buttonClass = "button";
   

   // if(props.confirm) {
   //    buttonClass += " button--confirm"
   // }

   // if(props.danger) {
   //    buttonClass += " button--danger"
   // }

   return (
      <button 
         className={buttonClass} 
         onClick={props.onClick} 
         disabled={props.disabled}
      >
         {props.children}
      </button>
      );
}
