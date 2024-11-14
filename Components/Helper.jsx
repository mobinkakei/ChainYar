import React from "react";

const Helper = ({ title, par, source }) => {
    return (
        <div className="content">
            <div className="index-blocks-2 Help">
                <div className="Helper">
                    <div className="app-desc max-width">
                        <div className="text">
                            <h1>{title}</h1>
                            <p>
                                {par}
                            </p>
                        </div>
                        <img
                            src={source}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Helper;

