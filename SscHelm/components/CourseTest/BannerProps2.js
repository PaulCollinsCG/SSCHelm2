// props must be read only See React 18 Fundamentals Ch5/Props 2:20
const BannerProps2 = ({headerText}) => {
    return (
        <header className="row mb-1">
            <div className="col-7 mt-1">
                {headerText}
            </div>
        </header>
    );
};

export default BannerProps2;