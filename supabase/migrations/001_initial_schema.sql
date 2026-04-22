-- ============================================================
-- PipeFlow CRM — Schema inicial
-- Executar no Supabase SQL Editor (ou via supabase db push)
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Tabelas ─────────────────────────────────────────────────

CREATE TABLE workspaces (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT        NOT NULL,
  slug             TEXT        NOT NULL UNIQUE,
  plan             TEXT        NOT NULL DEFAULT 'free'
                               CHECK (plan IN ('free', 'pro')),
  stripe_customer_id TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE workspace_members (
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES auth.users(id)  ON DELETE CASCADE,
  role         TEXT NOT NULL DEFAULT 'member'
               CHECK (role IN ('admin', 'member')),
  PRIMARY KEY (workspace_id, user_id)
);

CREATE TABLE leads (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID        NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name         TEXT        NOT NULL,
  email        TEXT,
  phone        TEXT,
  company      TEXT,
  role         TEXT,
  status       TEXT        NOT NULL DEFAULT 'new'
               CHECK (status IN ('new', 'contacted', 'qualified', 'lost')),
  owner_id     UUID        NOT NULL REFERENCES auth.users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE deals (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID        NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  lead_id      UUID        REFERENCES leads(id) ON DELETE SET NULL,
  title        TEXT        NOT NULL,
  value        NUMERIC,
  stage        TEXT        NOT NULL DEFAULT 'new_lead'
               CHECK (stage IN ('new_lead','contacted','proposal_sent','negotiation','won','lost')),
  owner_id     UUID        NOT NULL REFERENCES auth.users(id),
  due_date     DATE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE activities (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID        NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  lead_id      UUID        NOT NULL REFERENCES leads(id)      ON DELETE CASCADE,
  type         TEXT        NOT NULL
               CHECK (type IN ('call','email','meeting','note')),
  description  TEXT        NOT NULL,
  author_id    UUID        NOT NULL REFERENCES auth.users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE invites (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID        NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  email        TEXT        NOT NULL,
  role         TEXT        NOT NULL DEFAULT 'member'
               CHECK (role IN ('admin', 'member')),
  token        TEXT        NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  accepted_at  TIMESTAMPTZ,
  expires_at   TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days')
);

-- ─── Índices ─────────────────────────────────────────────────

CREATE INDEX idx_workspace_members_user_id  ON workspace_members(user_id);
CREATE INDEX idx_leads_workspace_id         ON leads(workspace_id);
CREATE INDEX idx_leads_owner_id             ON leads(owner_id);
CREATE INDEX idx_deals_workspace_id         ON deals(workspace_id);
CREATE INDEX idx_deals_stage                ON deals(stage);
CREATE INDEX idx_deals_owner_id             ON deals(owner_id);
CREATE INDEX idx_activities_workspace_id    ON activities(workspace_id);
CREATE INDEX idx_activities_lead_id         ON activities(lead_id);
CREATE INDEX idx_invites_token              ON invites(token);

-- ─── RLS — Habilitar em todas as tabelas ─────────────────────

ALTER TABLE workspaces        ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads             ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals             ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities        ENABLE ROW LEVEL SECURITY;
ALTER TABLE invites           ENABLE ROW LEVEL SECURITY;

-- ─── Funções auxiliares ──────────────────────────────────────

-- Verifica se o usuário autenticado é membro do workspace
CREATE OR REPLACE FUNCTION is_workspace_member(wid UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = wid AND user_id = auth.uid()
  )
$$;

-- Verifica se o usuário autenticado é admin do workspace
CREATE OR REPLACE FUNCTION is_workspace_admin(wid UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = wid AND user_id = auth.uid() AND role = 'admin'
  )
$$;

-- ─── Policies: workspaces ────────────────────────────────────

CREATE POLICY "members_select_workspace"
  ON workspaces FOR SELECT
  USING (is_workspace_member(id));

CREATE POLICY "admins_update_workspace"
  ON workspaces FOR UPDATE
  USING (is_workspace_admin(id));

-- INSERT liberado via service_role (criação no onboarding — Server Action)
CREATE POLICY "service_insert_workspace"
  ON workspaces FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ─── Policies: workspace_members ─────────────────────────────

CREATE POLICY "members_select_workspace_members"
  ON workspace_members FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "admins_insert_workspace_members"
  ON workspace_members FOR INSERT
  WITH CHECK (is_workspace_admin(workspace_id));

CREATE POLICY "admins_delete_workspace_members"
  ON workspace_members FOR DELETE
  -- Admin pode remover qualquer membro; membro pode sair sozinho
  USING (is_workspace_admin(workspace_id) OR user_id = auth.uid());

-- ─── Policies: leads ─────────────────────────────────────────

CREATE POLICY "members_select_leads"
  ON leads FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "members_insert_leads"
  ON leads FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id));

CREATE POLICY "members_update_leads"
  ON leads FOR UPDATE
  USING (is_workspace_member(workspace_id));

CREATE POLICY "admins_delete_leads"
  ON leads FOR DELETE
  USING (is_workspace_admin(workspace_id));

-- ─── Policies: deals ─────────────────────────────────────────

CREATE POLICY "members_select_deals"
  ON deals FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "members_insert_deals"
  ON deals FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id));

CREATE POLICY "members_update_deals"
  ON deals FOR UPDATE
  USING (is_workspace_member(workspace_id));

CREATE POLICY "admins_delete_deals"
  ON deals FOR DELETE
  USING (is_workspace_admin(workspace_id));

-- ─── Policies: activities ────────────────────────────────────

CREATE POLICY "members_select_activities"
  ON activities FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "members_insert_activities"
  ON activities FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id));

-- Apenas o autor ou admin pode atualizar/deletar atividades
CREATE POLICY "author_or_admin_update_activities"
  ON activities FOR UPDATE
  USING (author_id = auth.uid() OR is_workspace_admin(workspace_id));

CREATE POLICY "author_or_admin_delete_activities"
  ON activities FOR DELETE
  USING (author_id = auth.uid() OR is_workspace_admin(workspace_id));

-- ─── Policies: invites ───────────────────────────────────────

CREATE POLICY "admins_manage_invites"
  ON invites FOR ALL
  USING (is_workspace_admin(workspace_id));

-- Qualquer usuário autenticado pode consultar invite pelo token
-- (necessário para a página /invite/[token] antes de aceitar)
CREATE POLICY "authenticated_select_invite_by_token"
  ON invites FOR SELECT
  USING (auth.uid() IS NOT NULL);
