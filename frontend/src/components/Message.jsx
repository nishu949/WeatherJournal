export default function Message({ type, text }) {
  if (!text) return null;
  return <div className={`msg msg-${type}`}>{text}</div>;
}