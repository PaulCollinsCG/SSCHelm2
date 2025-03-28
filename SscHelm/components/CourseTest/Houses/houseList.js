const houses = [
    {
        reference: "ABI1200",
        address: "1 Abbey Road",
        price: 120000,
    },
    {
        reference: "ABI1201",
        address: "2 Top Road",
        price: 150000,
    },
]

const HouseList = () => {
    return (
        <>
        <h4>HouseList.js :</h4>
            <table>
                <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Address</th>
                        <th>Price</th>
                    </tr>                   
                </thead>
                <tbody>
                    {houses.map((h) => (
                        <tr key={h.reference}>
                            <td>{h.reference}</td>
                            <td>{h.address}</td>
                            <td>{h.price}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    );
};

export default HouseList;