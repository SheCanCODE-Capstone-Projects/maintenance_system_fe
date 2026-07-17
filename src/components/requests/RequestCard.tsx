import type { MaintenanceRequest } from "@/types/request";
import Card from "@/components/ui/Card";
export default function RequestCard({ request }: { request: MaintenanceRequest }) { return <Card><div className="flex justify-between gap-4"><h3 className="font-semibold">{request.title}</h3><span className="text-sm text-slate-500">{request.status}</span></div><p className="mt-2 text-sm text-slate-600">{request.description}</p></Card>; }
