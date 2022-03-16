import React from 'react'
import styled from 'styled-components';
import numeral from 'numeral';

function Table({ countries }) {
    return (
        <Wrap className='table'>
           <table>
               <tbody>
                    {countries.map((country,index) => (
                        <tr key={index}>
                            <td>
                                <Img src={country.countryInfo.flag} alt="" />
                            </td>
                            <td className='margin'>{country.country}</td>
                            <td>
                                <strong>
                                    {numeral(country.cases).format("0,")}
                                </strong>
                            </td>

                        </tr>
                    ))}
               </tbody>
           </table>
        </Wrap>
    )
}


const Wrap = styled.div`
    height:300px;
    overflow-y: scroll;
    overflow-x:hidden;
    
    table{
        border-collapse: collapse;
          tr{
        &:hover{
            cursor:pointer;
            background-color:#f0f2f5 ;

            img{
                padding: 5px;
            }
        }
    }

    tr:nth-of-type(odd){
        background-color: #f3f2f8;

        &:hover{
            background: #fff;
        }
    }

    .margin{
        margin-right:15px; 
    }
    }
`;

const Img = styled.img`
    width:50px;
    margin-top: 10px;
    margin-bottom: 10px;
    object-fit:cover;
    height:50px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right:15px;
    padding: 10px;
`;

export default Table;