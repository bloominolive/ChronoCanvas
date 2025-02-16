import { useState, useEffect } from "react";
import { generateAIContent } from "../ai/generativeAI"; 

export const useFetchOnDemand = () => {
    const [birthDate, setBirthDate] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!birthDate) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const aiData = await generateAIContent(birthDate);
                setData(aiData);
                setError("");
            } catch (err) {
                setError("Failed to fetch AI data");
                console.error("Error fetching AI data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [birthDate]);

    return { data, loading, error, setBirthDate };
};
