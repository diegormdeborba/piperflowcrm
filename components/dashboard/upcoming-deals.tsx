import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, formatCurrency, formatDate } from "@/lib/utils"

const STAGE_LABELS: Record<string, string> = {
  new_lead:      "Novo Lead",
  contacted:     "Contato",
  proposal_sent: "Proposta",
  negotiation:   "Negociação",
  won:           "Ganho",
  lost:          "Perdido",
}

const STAGE_COLORS: Record<string, string> = {
  new_lead:      "text-blue-600 bg-blue-50",
  contacted:     "text-yellow-600 bg-yellow-50",
  proposal_sent: "text-purple-600 bg-purple-50",
  negotiation:   "text-orange-600 bg-orange-50",
  won:           "text-green-600 bg-green-50",
  lost:          "text-red-600 bg-red-50",
}

interface UpcomingDeal {
  id: string
  title: string
  value: number | null
  stage: string
  due_date: string | null
  leadName: string | null
}

interface UpcomingDealsProps {
  deals: UpcomingDeal[]
}

export function UpcomingDeals({ deals }: UpcomingDealsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Negócios com Prazo Próximo</CardTitle>
      </CardHeader>
      <CardContent>
        {deals.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            Nenhum negócio com prazo nos próximos 7 dias.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Etapa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.title}</TableCell>
                  <TableCell className="text-muted-foreground">{deal.leadName ?? "—"}</TableCell>
                  <TableCell>
                    {deal.value != null ? formatCurrency(deal.value) : "—"}
                  </TableCell>
                  <TableCell>{deal.due_date ? formatDate(deal.due_date) : "—"}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-block text-xs font-medium px-2 py-0.5 rounded-full",
                        STAGE_COLORS[deal.stage] ?? "text-slate-600 bg-slate-100",
                      )}
                    >
                      {STAGE_LABELS[deal.stage] ?? deal.stage}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
