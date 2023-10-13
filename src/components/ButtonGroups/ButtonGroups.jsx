import React, { useState } from "react";
import "./buttonGroups.css"
import HomeIcon from '@mui/icons-material/Home';
import Sell from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


function ButtonGroup({ activeTab, setActiveTab }) {
    return (
        <div className="buttongroupdiv">
            <button className={`buttongroupleft ${activeTab === "Propriedades" && 'border-button'}`} onClick={() => {setActiveTab('Propriedades')}}> <HomeIcon className="icon"/> Propriedades</button>
            <button className={`buttongroup ${activeTab === "Vendas" && 'border-button'}`} onClick={() => {setActiveTab('Vendas')}} > <Sell className="icon"/> Vendas</button>
            <button className={`buttongroup ${activeTab === "Compras" && 'border-button'}`} onClick={() => {setActiveTab('Compras')}} > <ShoppingCartIcon className="icon"/>Compras</button>
            <button className={`buttongroupright ${activeTab === "Perfil" && 'border-button'}`} onClick={() => {setActiveTab('Perfil')}}><ManageAccountsIcon className="icon"/> Perfil</button>
        </div>
    )
}

export default ButtonGroup