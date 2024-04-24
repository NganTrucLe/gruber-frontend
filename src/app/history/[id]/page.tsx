export default function HistoryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>History Detail Page</h1>
      <p>{params.id}</p>
    </div>
  );
}
