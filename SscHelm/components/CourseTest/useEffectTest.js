import React, { useEffect, useRef, useState } from "react";

    //set textList to empty array
    const UseEffectTest = () => {
    const [textList, setTextList] = useState([]);
    const count = useRef(3); // Modifying a useRef does not cause a re-render unlike useState

    useEffect(() => {
        //API is impure (not always returns the same) so wrap in useEffect
        //Let's pretend this is an API
        var returnData = ["1, ", "2, ", "3 ,"];
        setTextList(returnData);
    },
        //The [] below is dependancy to stop this running every time
        []
    );

    const addNumber = () => {
        count.current = count.current + 1;
        setTextList([...textList, count.current + ", "
        ]);
    }

    return (
        <>
            <h4>useEffectTest.js</h4>
            <div>
                {textList}
            </div>
            <button onClick={addNumber}>
                Add
            </button>
        </>
    );
};

export default UseEffectTest;