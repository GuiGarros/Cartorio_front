import "./home.css"
import React, { useState } from "react"
import ButtonGroup from "../../components/ButtonGroups/ButtonGroups"
import Accordion from "../../components/Accordion/Accordion"
import LogoutIcon from '@mui/icons-material/Logout';

function HomePage() {

    const [activeTab, setActiveTab] = useState<'Propriedades' | 'Vendas' | 'Compras' | 'Perfil'>('Propriedades')
    return (
        <body >
            <div className="background-home">
                <div className="teste">
                    <button className="logoutbutton"><LogoutIcon className="logout" fontSize="large"/></button>
                    <div className='titulo-on-top-home'>
                        <h1 className='titulo-home'>BUY & BUY</h1>
                    </div>
                </div>
                <div className='container'>
                        <div className="buttongrouphome">
                            <ButtonGroup activeTab={activeTab} setActiveTab={setActiveTab}/>
                            <div className="backdiv"></div>
                            <Accordion/>
                        </div>
                </div>
                <div className="divbutton">
                    <button className="vendabutton"> NOVA VENDA </button>
                </div>
            </div>
        </body>
    ) 
  }

  export default HomePage