import NoviceRaceRow from "./noviceRaceRow"

const raceResults = [
    {
      rank: "1st",
      class: "SOLO",
      sailNo: "5740",
      helmName: "Mike Cossey",
      crewName: "",
      startingPH: 1156,
      currentPH: 1142,
      r1: 2,
      r2: 4,
      r3: 9,
      r4: 7,
      r5: 105.0,
      r6: 2,
      r7: 10,
      total: 139
    },
    {
      rank: "2nd",
      class: "ILCA 7 / Laser",
      sailNo: "164548",
      helmName: "Paul Collins",
      crewName: "",
      startingPH: 1253,
      currentPH: 1247,
      r1: 3,
      r2: 105.0,
      r3: 105.0,
      r4: 12,
      r5: 105.0,
      r6: 5.7,
      r7: 2,
      total: 337.7
    },
    {
      rank: "3rd",
      class: "SOLO",
      sailNo: "5704",
      helmName: "Jamie Cuxson",
      crewName: "",
      startingPH: 1124,
      currentPH: 1114,
      r1: 1,
      r2: 2,
      r3: 105.0,
      r4: 2,
      r5: 105.0,
      r6: 105.0,
      r7: 105.0,
      total: 425
    },
    {
      rank: "4th",
      class: "PHANTOM",
      sailNo: "1347",
      helmName: "Brian Webley",
      crewName: "",
      startingPH: 1048,
      currentPH: 1042,
      r1: 105.0,
      r2: 105.0,
      r3: 1,
      r4: 105.0,
      r5: 105.0,
      r6: 4,
      r7: 2.5,
      total: 427.5
    },
    {
      rank: "5th",
      class: "MIRACLE",
      sailNo: "1638",
      helmName: "Ross Patterson",
      crewName: "Paul Jephcott",
      startingPH: 1494,
      currentPH: 1531,
      r1: 105.0,
      r2: 105.0,
      r3: 3.5,
      r4: 105.0,
      r5: 105.0,
      r6: 6,
      r7: 1,
      total: 430.5
    },
    {
      rank: "6th",
      class: "SOLO",
      sailNo: "5671",
      helmName: "Simon Dipple",
      crewName: "",
      startingPH: 1156,
      currentPH: 1155,
      r1: 105.0,
      r2: 105.0,
      r3: 105.0,
      r4: 3,
      r5: 6,
      r6: 105.0,
      r7: 4.5,
      total: 433.5
    },
    {
      rank: "7th",
      class: "SOLO",
      sailNo: "4768",
      helmName: "Jon Cawthorne",
      crewName: "",
      startingPH: 1139,
      currentPH: 1142,
      r1: 5,
      r2: 105.0,
      r3: 5.0,
      r4: 5.0,
      r5: 105.0,
      r6: 105.0,
      r7: 105.0,
      total: 435
    },
    {
      rank: "8th",
      class: "ILCA 7 / Laser",
      sailNo: "6",
      helmName: "Tim Mardon",
      crewName: "",
      startingPH: 1142,
      currentPH: 1135,
      r1: 105.0,
      r2: 105.0,
      r3: 7,
      r4: 5,
      r5: 105.0,
      r6: 105.0,
      r7: 7,
      total: 439
    },
    {
      rank: "9th",
      class: "PHANTOM",
      sailNo: "1400",
      helmName: "Pete Smith",
      crewName: "",
      startingPH: 1013,
      currentPH: 999,
      r1: 4,
      r2: 105.0,
      r3: 3,
      r4: 15.0,
      r5: 105.0,
      r6: 105.0,
      r7: 105.0,
      total: 442
    },
    {
      rank: "10th",
      class: "PHANTOM",
      sailNo: "1492",
      helmName: "Jim Hopton",
      crewName: "",
      startingPH: 950,
      currentPH: 955,
      r1: 105.0,
      r2: 105.0,
      r3: 4,
      r4: 11,
      r5: 7,
      r6: 105.0,
      r7: 105.0,
      total: 442
    },
    {
      rank: "11th",
      class: "SOLO",
      sailNo: "5025",
      helmName: "Mike Evans",
      crewName: "",
      startingPH: 1183,
      currentPH: 1186,
      r1: 105.0,
      r2: 105.0,
      r3: 10,
      r4: 6,
      r5: 105.0,
      r6: 105.0,
      r7: 8.0,
      total: 444
    },
    {
      rank: "12th",
      class: "SOLO",
      sailNo: "5210",
      helmName: "Neil Wilkinson",
      crewName: "",
      startingPH: 1116,
      currentPH: 1125,
      r1: 105.0,
      r2: 105.0,
      r3: 105.0,
      r4: 8,
      r5: 4,
      r6: 105.0,
      r7: 14,
      total: 446
    },
    {
      rank: "13th",
      class: "MIRROR (S/H)",
      sailNo: "70514",
      helmName: "Lindsay Haig",
      crewName: "",
      startingPH: 1483,
      currentPH: 1474,
      r1: 105.0,
      r2: 105.0,
      r3: 15,
      r4: 105.0,
      r5: 105.0,
      r6: 9.0,
      r7: 3,
      total: 447
    },
    {
      rank: "14th",
      class: "SOLO",
      sailNo: "4439",
      helmName: "Cole Briscoe",
      crewName: "",
      startingPH: 1104,
      currentPH: 1122,
      r1: 105.0,
      r2: 105.0,
      r3: 105.0,
      r4: 9,
      r5: 8,
      r6: 105.0,
      r7: 13,
      total: 450
    },
    {
      rank: "15th",
      class: "ENTERPRISE",
      sailNo: "21500",
      helmName: "Paul Burgoine",
      crewName: "",
      startingPH: 1139,
      currentPH: 1107,
      r1: 105.0,
      r2: 105.0,
      r3: 105.0,
      r4: 105.0,
      r5: 105.0,
      r6: 1,
      r7: 1.0,
      total: 527
    },
    {
      rank: "16th",
      class: "LARK",
      sailNo: "2481",
      helmName: "Andy Ward",
      crewName: "Toby Ward",
      startingPH: 1203,
      currentPH: 1190,
      r1: 105.0,
      r2: 1.0,
      r3: 105.0,
      r4: 1,
      r5: 105.0,
      r6: 105.0,
      r7: 105.0,
      total: 527
    },
    {
      rank: "17th",
      class: "ILCA 6 / Laser Radial",
      sailNo: "173611",
      helmName: "Paul Burgoine",
      crewName: "",
      startingPH: 1122,
      currentPH: 1100,
      r1: 105.0,
      r2: 1,
      r3: 105.0,
      r4: 105.0,
      r5: 2,
      r6: 105.0,
      r7: 105.0,
      total: 528
    },
    {
      rank: "18th",
      class: "SOLO",
      sailNo: "4503",
      helmName: "Mark Cuxson",
      crewName: "",
      startingPH: 1168,
      currentPH: 1147,
      r1: 105.0,
      r2: 105.0,
      r3: 5,
      r4: 105.0,
      r5: 105.0,
      r6: 3,
      r7: 105.0,
      total: 533
    },
    {
      rank: "19th",
      class: "LARK",
      sailNo: "2495",
      helmName: "Stuart Hydon",
      crewName: "Ann Biglin",
      startingPH: 1002,
      currentPH: 997,
      r1: 4.0,
      r2: 105.0,
      r3: 105.0,
      r4: 4,
      r5: 105.0,
      r6: 105.0,
      r7: 105.0,
      total: 533
    },
    {
      rank: "20th",
      class: "Topper",
      sailNo: "34683",
      helmName: "Adam Collins",
      crewName: "",
      startingPH: 1560,
      currentPH: 1541,
      r1: 8.0,
      r2: 105.0,
      r3: 105.0,
      r4: 105.0,
      r5: 105.0,
      r6: 105.0,
      r7: 4,
      total: 537
    },
    {
      rank: "21st",
      class: "LARK",
      sailNo: "2468",
      helmName: "Olly Saunders",
      crewName: "Zara Frankton",
      startingPH: 1076,
      currentPH: 1057,
      r1: 105.0,
      r2: 105.0,
      r3: 2,
      r4: 105.0,
      r5: 11.0,
      r6: 105.0,
      r7: 105.0,
      total: 538
    },
    {
      rank: "22nd",
      class: "COMET",
      sailNo: "815",
      helmName: "Dave Turtle",
      crewName: "",
      startingPH: 1179,
      currentPH: 1177,
      r1: 105.0,
      r2: 105.0,
      r3: 6,
      r4: 105.0,
      r5: 105.0,
      r6: 105.0,
      r7: 8,
      total: 539
    },
    {
      rank: "23rd",
      class: "ILCA 7 / Laser",
      sailNo: "200088",
      helmName: "John Dransfield",
      crewName: "",
      startingPH: 1172,
      currentPH: 1172,
      r1: 105.0,
      r2: 5.0,
      r3: 105.0,
      r4: 105.0,
      r5: 11.0,
      r6: 105.0,
      r7: 105.0,
      total: 541
    }
  ];


  const RaceList = () => {
    return (
        <>
          <div className="row mb-2">
            <h2 className="themeFontColor text-center">
              Personal Handicap Results
            </h2>
          </div>
          <div className="table-responsive" >
            <table className="table table-striped table-hover">
                <thead table-light>
                <tr>
                    <th className="border p-2 text-left">Rank</th>
                    <th className="border p-2 text-left">Class</th>
                    <th className="border p-2 text-left">Sail No</th>
                    <th className="border p-2 text-left">Helm</th>
                    <th className="border p-2 text-left">Crew</th>
                    <th className="border p-2 text-right">Starting PH</th>
                    <th className="border p-2 text-right">Current PH</th>
                    <th className="border p-2 text-right">R1</th>
                    <th className="border p-2 text-right">R2</th>
                    <th className="border p-2 text-right">R3</th>
                    <th className="border p-2 text-right">R4</th>
                    <th className="border p-2 text-right">R5</th>
                    <th className="border p-2 text-right">R6</th>
                    <th className="border p-2 text-right">R7</th>
                    <th className="border p-2 text-right">Total</th>
                </tr>
                </thead>
                <tbody>
                {raceResults.map(r => <NoviceRaceRow key={r.rank} result={r} />)}
                </tbody>
            </table>
          </div>
          </>
      );
    }
    
    export default RaceList;