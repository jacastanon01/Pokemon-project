 import React from 'react'
 import Button from 'react-bootstrap/Button'
 import ButtonGroup from 'react-bootstrap/ButtonGroup'
 
 const Buttons = ({ onNext, onPrev}) => {
   return (
     <ButtonGroup className='my-3' style={{width: '50%'}}>
        <Button onClick={onPrev}>Previous</Button>
        <Button onClick={onNext}>Next</Button>
     </ButtonGroup>
   )
 }
 
 export default Buttons