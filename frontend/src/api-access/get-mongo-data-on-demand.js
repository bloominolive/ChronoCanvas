import { useState, useEffect } from "react";
import axios from "axios"; 

export const useFetchMongoOnDemand = () => {
    const [date, setDate] = useState(null);
    const [endpoint, setEndpoint] = useState(null); 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!endpoint) return; 

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://chronocanvas-api.onrender.com${endpoint}`);
                setData(response.data);
                setError("");
            } catch (err) {
                setError("Failed to fetch data");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error, setEndpoint };
};
