export type WorkspacePlan = "free" | "pro";
export type WorkspaceRole = "admin" | "member";
export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type DealStage =
  | "new_lead"
  | "contacted"
  | "proposal_sent"
  | "negotiation"
  | "won"
  | "lost";
export type ActivityType = "call" | "email" | "meeting" | "note";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: WorkspacePlan;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface WorkspaceMember {
  workspace_id: string;
  user_id: string;
  role: WorkspaceRole;
}

export interface Lead {
  id: string;
  workspace_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  role: string | null;
  status: LeadStatus;
  owner_id: string;
  created_at: string;
}

export interface Deal {
  id: string;
  workspace_id: string;
  lead_id: string | null;
  title: string;
  value: number | null;
  stage: DealStage;
  owner_id: string;
  due_date: string | null;
  created_at: string;
}

export interface Activity {
  id: string;
  workspace_id: string;
  lead_id: string;
  type: ActivityType;
  description: string;
  author_id: string;
  created_at: string;
}

export interface Invite {
  id: string;
  workspace_id: string;
  email: string;
  role: WorkspaceRole;
  token: string;
  accepted_at: string | null;
  expires_at: string;
}
