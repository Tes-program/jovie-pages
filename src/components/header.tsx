import React from "react";
import jovie from "../assets/jovie.png";

export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-center bg-white pt-6 pb-1 w-full">
        <img src={jovie} alt="Jovie" />
        </header>
    );
};