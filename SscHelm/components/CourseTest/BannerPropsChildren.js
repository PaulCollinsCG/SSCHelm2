// props must be read only See React 18 Fundamentals Ch5/Props 2:20
const BannerPropsChildren = ({children}) => {
    return (
        <header className="row mb-1">
            <div className="col-7 mt-1">
                {children}
            </div>
        </header>
    );
};

export default BannerPropsChildren;