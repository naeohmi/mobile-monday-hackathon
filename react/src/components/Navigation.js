import React, { Component } from 'react';

export default function Navigation(props){
    const renderNavigation = () => {
        return (
            <div>
                <p>HOME | CHAT | DASHBOARD</p>
            </div>
        );
    }

    return (
        <div>
            {renderNavigation()}
        </div>
    );
}