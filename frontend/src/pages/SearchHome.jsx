import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function SearchHome() {
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setRecent(localStorage.getItem("lastQuery") || "");
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    localStorage.setItem("lastQuery", query);
    navigate(`/results?q=${encodeURIComponent(query)}`);
  }

  return (
    <Layout>
      <div style={styles.stage}>
        <div style={styles.block}>
          <div style={styles.logo}>Search</div>

          <form onSubmit={onSubmit} style={styles.form}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              style={styles.input}
              autoFocus
            />
          </form>

          <div style={styles.hint}>
            Press Enter to search
            {recent ? (
              <>
                {" · "}
                <button
                  type="button"
                  style={styles.link}
                  onClick={() => navigate(`/results?q=${encodeURIComponent(recent)}`)}
                >
                  Recent: {recent}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  stage: {
    minHeight: "calc(100vh - 48px)",
    display: "grid",
    placeItems: "center",
  },
  block: {
    width: "min(720px, 92vw)",
    textAlign: "center",
  },
  logo: {
    fontSize: 44,
    letterSpacing: -0.8,
    marginBottom: 18,
    opacity: 0.95,
  },
  form: { width: "100%" },
  input: {
    width: "100%",
    padding: "18px 20px",
    fontSize: 18,
    borderRadius: 999,
    border: "1px solid #2a3950",
    background: "rgba(16,24,38,0.85)",
    color: "white",
    outline: "none",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  hint: {
    marginTop: 14,
    opacity: 0.75,
    fontSize: 13,
  },
  link: {
    background: "transparent",
    border: "none",
    padding: 0,
    color: "white",
    opacity: 0.9,
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: 13,
  },
};
