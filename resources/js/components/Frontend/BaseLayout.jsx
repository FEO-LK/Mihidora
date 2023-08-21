import React from "react";
import { CssBaseline, Divider  } from "@mui/material";
import '../../../sass/frontend/styles.css';
import Footer from "./components/Footer";
import Header from "./components/Header";

function BaseLayout({children, title}) {
    return (
        <div className="front__site">
            <React.Fragment>
                <CssBaseline/>

                <Header />
                {/* <Divider /> */}
                {children}
                {/*{title === 'E-Learning Materials' ? (*/}
                {/*    <div style={{backgroundColor:'#EBECF0'}}>*/}
                {/*        {children}*/}
                {/*    </div>*/}
                {/*): {children}}*/}
                <Footer />

            </React.Fragment>
        </div>
    )
}

export default BaseLayout
