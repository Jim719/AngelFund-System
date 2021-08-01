import React from 'react';

const Layout = ({children}) => {
    return (
        <>
        <div>
            Hello how are you doing
        </div>
        <div>
            {children}
        </div>
        </>
    );
}

export default Layout;
