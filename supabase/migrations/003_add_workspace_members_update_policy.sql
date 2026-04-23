-- ============================================================
-- Fix: workspace_members UPDATE policy ausente
--
-- Problema: changeMemberRole() faz UPDATE em workspace_members
-- mas não havia policy RLS para UPDATE — o enforcement era
-- apenas na camada de aplicação (assertAdmin).
--
-- Com esta policy o banco bloqueia qualquer UPDATE feito por
-- não-admins, mesmo que a aplicação seja bypassada.
-- ============================================================

CREATE POLICY "admins_update_workspace_members"
  ON workspace_members FOR UPDATE
  USING (is_workspace_admin(workspace_id));
