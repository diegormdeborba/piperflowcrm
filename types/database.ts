// Tipos gerados manualmente para corresponder ao schema em
// supabase/migrations/001_initial_schema.sql
//
// Quando o projeto Supabase estiver criado, substituir por:
//   npx supabase gen types typescript --project-id <id> > types/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string
          name: string
          slug: string
          plan: "free" | "pro"
          stripe_customer_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          plan?: "free" | "pro"
          stripe_customer_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          plan?: "free" | "pro"
          stripe_customer_id?: string | null
          created_at?: string
        }
      }
      workspace_members: {
        Row: {
          workspace_id: string
          user_id: string
          role: "admin" | "member"
        }
        Insert: {
          workspace_id: string
          user_id: string
          role?: "admin" | "member"
        }
        Update: {
          workspace_id?: string
          user_id?: string
          role?: "admin" | "member"
        }
      }
      leads: {
        Row: {
          id: string
          workspace_id: string
          name: string
          email: string | null
          phone: string | null
          company: string | null
          role: string | null
          status: "new" | "contacted" | "qualified" | "lost"
          owner_id: string
          created_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          name: string
          email?: string | null
          phone?: string | null
          company?: string | null
          role?: string | null
          status?: "new" | "contacted" | "qualified" | "lost"
          owner_id: string
          created_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          company?: string | null
          role?: string | null
          status?: "new" | "contacted" | "qualified" | "lost"
          owner_id?: string
          created_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          workspace_id: string
          lead_id: string | null
          title: string
          value: number | null
          stage: "new_lead" | "contacted" | "proposal_sent" | "negotiation" | "won" | "lost"
          owner_id: string
          due_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          lead_id?: string | null
          title: string
          value?: number | null
          stage?: "new_lead" | "contacted" | "proposal_sent" | "negotiation" | "won" | "lost"
          owner_id: string
          due_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          lead_id?: string | null
          title?: string
          value?: number | null
          stage?: "new_lead" | "contacted" | "proposal_sent" | "negotiation" | "won" | "lost"
          owner_id?: string
          due_date?: string | null
          created_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          workspace_id: string
          lead_id: string
          type: "call" | "email" | "meeting" | "note"
          description: string
          author_id: string
          created_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          lead_id: string
          type: "call" | "email" | "meeting" | "note"
          description: string
          author_id: string
          created_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          lead_id?: string
          type?: "call" | "email" | "meeting" | "note"
          description?: string
          author_id?: string
          created_at?: string
        }
      }
      invites: {
        Row: {
          id: string
          workspace_id: string
          email: string
          role: "admin" | "member"
          token: string
          accepted_at: string | null
          expires_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          email: string
          role?: "admin" | "member"
          token?: string
          accepted_at?: string | null
          expires_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          email?: string
          role?: "admin" | "member"
          token?: string
          accepted_at?: string | null
          expires_at?: string
        }
      }
    }
    Functions: {
      is_workspace_member: {
        Args: { wid: string }
        Returns: boolean
      }
      is_workspace_admin: {
        Args: { wid: string }
        Returns: boolean
      }
    }
  }
}

// Atalhos para uso nos componentes
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]
