export default function Layout({ children }) {
  return (
    <div style={styles.page}>
      <div style={styles.container}>{children}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 700px at 50% 0%, #162033 0%, #0b0f14 55%)",
    color: "white",
    padding: "24px 16px",
  },
  container: {
    width: "min(1100px, 100%)",
    margin: "0 auto",
  },
};
