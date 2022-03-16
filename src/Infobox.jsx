import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import styled from 'styled-components'

function Infobox({ title, cases, total, ...props}) {
    return (
        <Wrap className="infobox__items"
        onClick={props.onClick}
        >
            <Card>
                <CardContent>

                    <Typography className="infobox__title" color="textSecondary">
                        {title}
                    </Typography>

                    <h2 className="infobox__cases">{cases}</h2>


                    <Typography className="infobox__total">
                        {total} Total
                    </Typography>

                </CardContent>
            </Card>
        </Wrap>
           
    )
}

const Wrap = styled.div`
    width:250px;

    .infobox__cases{
        color: #cc1034;
        font-weight: 600;
        font-size: 1.7rem;
        margin-bottom: .5rem;
    }

    .infobox__total{
        color: #6c757d;
        font-weight: 600;
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
    }

`;

export default Infobox