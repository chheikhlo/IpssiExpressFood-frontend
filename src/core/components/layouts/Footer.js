import React from "react";

    const Footer = () => {
        return (

                <footer className="bg-dark text-light text-center py-3" style={{ minHeight: "40vh" }}>

                    <h4>Nous contacter</h4>
                    <p>Mail: IEF@gmail.com</p>
                    <p>Numéro: +33 789 563 210</p>
                    <div>

                        <div className="copyright">
                            <p>Tous droits réservés &copy; {new Date().getFullYear()} LSA Location</p>
                        </div>
                    </div>

                </footer>
            );
        };

export default Footer;
