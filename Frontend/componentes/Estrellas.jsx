export default function StarRating({ rating }) {
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? "⭐" : "☆"}</span>
      ))}
    </div>
  );
}
