import React, { useEffect, useState } from "react";
import axios from "axios";

function LandingPage() {
    useEffect(() => {
        axios.post("/api/products/products").then((res) => {
            console.log(res);
        });
    });

    return <div>asdasd</div>;
}

export default LandingPage;
