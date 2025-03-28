const HouseRow = ({house}) => {
    return (
        <tr>
            <td>{house.reference}</td>
            <td>{house.address}</td>
            <td>{house.price}</td>
        </tr>
    );
}

export default HouseRow;