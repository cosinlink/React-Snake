import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    /* Adapt the colors based on primary prop */
    background: ${(props) =>
        props.displayed === true ? 'palevioletred' : 'white'};

    width: 2em;
    height: 2em;
    margin: 0 0.1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`

export const Grid = ({ displayed }) => {
    return <Button disabled displayed={displayed}/>
}
