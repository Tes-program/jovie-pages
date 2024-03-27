import React from "react";
import jovie from "../assets/jovie.png";

export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-center bg-white shadow-md pt-6 pb-1">
        <img src={jovie} alt="Jovie" />
        </header>
    );
};