import HouseRow3 from "./houseRow3";

const houses = [
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

const HouseList3 = () => {
    return (
        <>
        <h4>HouseList3.js :</h4>
            <table>
                <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Address</th>
                        <th>Price</th>
                    </tr>                   
                </thead>
                <tbody>
                    {houses.map(h => <HouseRow3 key={h.reference} reference = {h.reference} address={h.address} price={h.price}/>)}
                </tbody>
            </table>
        </>
    );
};

export default HouseList3;