const HouseRow = ({house}) => {
    return(
    <tr>
        <td>{house.address}</td>
        <td>{house.country}</td>
        <td>{house.price}</td>
    </tr>
    );
}

// Can do this instead
// const HouseRow = ({address, country, price}) => {
//     return(
//     <tr>
//         <td>{address}</td>
//         <td>{country}</td>
//         <td>{price}</td>
//     </tr>
//     );
// }

export default HouseRow;