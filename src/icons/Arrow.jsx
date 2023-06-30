function Arrow() {
  return (
    <div className="arrow">
      <svg width="25" height="25" viewBox="0 0 50 40">
        <polyline points="0 25, 40 25" stroke="white" strokeWidth="8" fill="none" />
        <polyline points="25 10, 40 25, 25 40" stroke="white" strokeWidth="8" fill="none" />
      </svg>
    </div>
  );
}
export default Arrow;
