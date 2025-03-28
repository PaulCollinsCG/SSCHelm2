import HouseRow from "./houseRow";

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

const HouseList2 = () => {
    return (
        <>
        <h4>HouseList2.js :</h4>
            <table>
                <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Address</th>
                        <th>Price</th>
                    </tr>                   
                </thead>
                <tbody>
                    {houses.map(h => <HouseRow key={h.reference} house={h}/>)}
                </tbody>

            </table>
        </>
    );
};

export default HouseList2;