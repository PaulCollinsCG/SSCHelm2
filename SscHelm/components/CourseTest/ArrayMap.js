const ArrayMap = () => {
    const numbers = ["one", "two", "three"];
    return (
        <>
            {numbers.map(n=> "Number " + n)};
        </>
    );
};

export default ArrayMap;