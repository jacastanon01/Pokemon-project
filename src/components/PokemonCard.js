import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import './PokemonCard.css'

const PokemonCard = ({ name, id, sprites, type }) => {
    return (
        <Card className='my-3 p-3 rounded text-center shadow mb-5 bg-white'>
            <Link to={`/pokemon/${id}`} style={{ textDecoration: 'none' }}>
                <Card.Img
                    style={{ width: '8rem' }}
                    src={sprites.front_default}
                    variant='top'
                />
                <Card.Body className={`${type.name}`}>
                    <Card.Title className="title text-capitalize">
                        {`#${id} ${name}`}
                        <br />
                        {type.name}
                        
                    </Card.Title>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default PokemonCard