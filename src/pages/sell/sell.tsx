import React from "react";
import './sell.css'
import Return from '@mui/icons-material/KeyboardBackspace';
function Sell() {

    return(<>
        <div className="maindivsell">
            <div>
                <button className="buttonreturn">
                    <Return fontSize="large"/>
                </button>
            </div>
            <div className="container-sell">
                <h2 className="titulo-casa">CASA</h2>
                <h3 className="texto-casa"> Descrição </h3>
            </div>
        </div>
    </>)

}

export default Sell