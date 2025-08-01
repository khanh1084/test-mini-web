import React, { useState, useEffect } from "react";
import axios from "axios";
import ParentForm from "./ParentForm";
import ParentList from "./ParentList";

function ParentManagement() {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/parents");
      setParents(response.data);
    } catch (error) {
      console.error("Error fetching parents:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <ParentForm onParentCreated={fetchParents} />
      <ParentList parents={parents} loading={loading} />
    </div>
  );
}

export default ParentManagement;
