import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Results() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") || "";

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState({ key: "name", dir: "asc" });

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((data) => setRows(data.rows ?? []))
      .finally(() => setLoading(false));
  }, [q]);

  const columns = useMemo(() => {
    if (rows.length === 0) return ["id", "name", "school", "level"];
    return Object.keys(rows[0]);
  }, [rows]);

  const sortedRows = useMemo(() => {
    const copy = [...rows];
    const { key, dir } = sort;

    copy.sort((a, b) => {
      const av = a[key];
      const bv = b[key];

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      const aNum = typeof av === "number" ? av : Number(av);
      const bNum = typeof bv === "number" ? bv : Number(bv);
      const bothNumeric = !Number.isNaN(aNum) && !Number.isNaN(bNum);

      let cmp;
      if (bothNumeric) cmp = aNum - bNum;
      else cmp = String(av).localeCompare(String(bv));

      return dir === "asc" ? cmp : -cmp;
    });

    return copy;
  }, [rows, sort]);

  function toggleSort(key) {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  }

  return (
    <div style={styles.page}>
      <div style={styles.topbar}>
        <button onClick={() => navigate("/")} style={styles.button}>
          Back
        </button>
        <div style={styles.query}>
          Results for: <b>{q}</b>
        </div>
      </div>

      {loading ? (
        <div style={styles.card}>Loading...</div>
      ) : (
        <div style={styles.card}>
          {sortedRows.length === 0 ? (
            <div>No matches.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {columns.map((c) => (
                      <th
                        key={c}
                        onClick={() => toggleSort(c)}
                        style={styles.th}
                        title="Click to sort"
                      >
                        {c}
                        {sort.key === c ? (sort.dir === "asc" ? " ▲" : " ▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((r) => (
                    <tr key={r.id ?? JSON.stringify(r)}>
                      {columns.map((c) => (
                        <td key={c} style={styles.td}>
                          {String(r[c] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#0b0f14", color: "white", padding: 24 },
  topbar: { display: "flex", gap: 12, alignItems: "center", marginBottom: 16 },
  query: { opacity: 0.9 },
  button: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #263041",
    background: "#101826",
    color: "white",
    cursor: "pointer",
  },
  card: {
    border: "1px solid #263041",
    background: "#101826",
    borderRadius: 14,
    padding: 16,
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "10px 10px",
    borderBottom: "1px solid #263041",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  td: { padding: "10px 10px", borderBottom: "1px solid #1e2a3a", whiteSpace: "nowrap" },
};
