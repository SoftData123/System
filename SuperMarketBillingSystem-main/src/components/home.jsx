import React, { useEffect, useState } from "react";
import { customer } from "../img";
import styles from './home.module.css';
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios";

const date = new Date();

export default function Home() {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/")
            .then((res) => setAuth(res.data.success));
    }, []);

    return (
        <>
            {auth ? (
                <div className={styles.background}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>🛒 Supermarket Bliss</h1>
                            <p className={styles.date}>{date.toDateString()}</p>
                        </div>

                        <div className={styles.mainContent}>
                            <div className={styles.textBlock}>
                                <p className={styles.moto}>
                                    Discover <span>freshness</span>,<br />
                                    taste the <span>delight</span>.
                                </p>
                                <div className={styles.buttons}>
                                    <Link to="/bill" className={styles.btn}>🧾 Billing</Link>
                                    <Link to="/admin/login" className={styles.btnOutline}>🔐 Admin Login</Link>
                                </div>
                            </div>

                            <div className={styles.imageBlock}>
                                <img src={customer} alt="customer" className={styles.heroImage} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.loader}>
                    <ReactLoading type="spinningBubbles" color="#fff" height={150} width={150} />
                </div>
            )}
        </>
    );
}
