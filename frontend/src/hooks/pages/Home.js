import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchStudents } = useAuth();

  useEffect(() => {
    fetchStudents()
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [fetchStudents]);

  return { students, loading, error };
};

export default useStudents;