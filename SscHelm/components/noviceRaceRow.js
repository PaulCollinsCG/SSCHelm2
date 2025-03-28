const NoviceRaceRow = ({result}) => {
    return(
    <tr>
        <td>{result.rank}</td>
        <td>{result.class}</td>
        <td>{result.sailNo}</td>
        <td>{result.helmName}</td>
        <td>{result.crewName}</td>
        <td>{result.startingPH}</td>
        <td>{result.currentPH}</td>
        <td>{result.r1}</td>
        <td>{result.r2}</td>
        <td>{result.r3}</td>
        <td>{result.r4}</td>
        <td>{result.r5}</td>
        <td>{result.r6}</td>
        <td>{result.r7}</td>
        <td>{result.total}</td>
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

export default NoviceRaceRow;