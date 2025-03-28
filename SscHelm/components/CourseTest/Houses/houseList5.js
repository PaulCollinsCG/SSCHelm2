import HouseRow3 from "./houseRow3";
import React, { useState } from "react";

const housesArray = [
    {
        reference: "ABI1200",
        address: "1 Abbey Road",
        price: 120000,
    },
    {
        reference: "ABI1201",
        address: "2 Top Road",
        price: 160000,
    },
]

const HouseList5 = () => {
    // 1st rule of hooks: Call hooks at top level
    // 2nd rule of hooks: Called within the components function
    const [houses, setHouses] = useState(housesArray);

    const addHouse = () => {
        setHouses([...houses,
            {
                reference: "ABI1202",
                address: "3 Bottom Street",
                price: 160000,
            },
        ]);
    }

    return (
        <>
        <h4>HouseList5.js :</h4>
            <table>
                <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Address</th>
                        <th>Price</th>
                    </tr>                   
                </thead>
                <tbody>
                    {houses.map(h => <HouseRow3 key={h.reference} {...h}/>)}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={addHouse}>Add</button>
        </>
    );
};

export default HouseList5;