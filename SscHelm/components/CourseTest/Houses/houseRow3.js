import currencyFormatter from "../helpers/currencyFormatter"

const HouseRow3 = ({reference, address, price}) => {
    return (
        <tr>
            <td>{reference}</td>
            <td>{address}</td>
            <td>{currencyFormatter.format(price)}</td>
        </tr>
    );
}

export default HouseRow3;