import { logo } from "./banner.module.css";
import Image from 'next/image'
const subtitleStyle = {
    fontStyle: "italic",
    fontSize: "x-large",
    color: "black",
  };

const Banner = ({children}) => {
    return(
        <header className="row mb-4">
            <div className="col-3"> 
                <Image src="/sschelmcrop.png" alt="logo" width={180} height={50} priority/>
            </div>
            <div className='col-9 mt-4' style={subtitleStyle}>         
                 {children}      
            </div>
        </header>
    );
}

export default Banner;