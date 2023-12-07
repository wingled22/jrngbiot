import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "./SidebarItem.css"

export default function SidebarItem(){
    return (
        <div className="nav-item">
            <FontAwesomeIcon icon={faHome} size="2x" />
        </div>
    );
}