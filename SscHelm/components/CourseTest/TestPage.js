import BannerProps from "./BannerProps";
import BannerProps2 from "./BannerProps2";
import BannerPropsChildren from "./BannerPropsChildren";
import ArrayMap from "./ArrayMap";
import HouseList from "./Houses/houseList";
import HouseList2 from "./Houses/houseList2";
import HouseList3 from "./Houses/houseList3";
import HouseList4 from "./Houses/houseList4";
import HouseList5 from "./Houses/houseList5";
import UseEffectTest from "./useEffectTest";
import ConditionalRendering from "./conditionalRendering";

const TestPage = () => {
     return (
        <>
            <BannerProps headerText="This is my first header text passed as props"/>
            <BannerProps2 headerText="This is my second header text passed as named prop"/>
            <BannerPropsChildren><i>This is my third header text (passed as children)</i></BannerPropsChildren>
            <ArrayMap/>
            <HouseList/>
            <HouseList2/>
            <HouseList3/> {/* Pass individual properties, this is better than one below as only passes what is needed */}
            <HouseList4/> {/* Uses spread operator ie.  ...h*/}
            <HouseList5/> {/* Uses useState hook*/}
            <UseEffectTest/>
            <ConditionalRendering val="1"/>
            <ConditionalRendering val="101"/>
         </>
    ) 
}

export default TestPage