import Card from "@/components/ui/Card";

export default function CustomerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card title="Active Requests">
          <p className="text-2xl font-bold text-primary">2</p>
          <span className="text-sm text-muted">In progress or pending</span>
        </Card>
        <Card title="Completed Jobs">
          <p className="text-2xl font-bold text-secondary">1</p>
          <span className="text-sm text-muted">All time</span>
        </Card>
      </div>
    </div>
  );
}
