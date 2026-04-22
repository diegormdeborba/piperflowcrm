-- ============================================================
-- Fix: workspace_members INSERT policy
--
-- Problema: a policy original exige is_workspace_admin() para
-- INSERT, mas no momento do onboarding o workspace ainda não tem
-- nenhum membro — a função retorna false e o insert falha.
--
-- Solução: também permitir insert quando o usuário está inserindo
-- a si mesmo como admin num workspace que ainda não tem membros.
-- ============================================================

DROP POLICY IF EXISTS "admins_insert_workspace_members" ON workspace_members;

CREATE POLICY "insert_workspace_members"
  ON workspace_members FOR INSERT
  WITH CHECK (
    -- Admin existente pode adicionar membros
    is_workspace_admin(workspace_id)
    OR (
      -- Primeiro membro: usuário inserindo a si mesmo como admin
      -- num workspace recém-criado (sem membros ainda)
      auth.uid() = user_id
      AND role = 'admin'
      AND NOT EXISTS (
        SELECT 1 FROM workspace_members wm
        WHERE wm.workspace_id = workspace_members.workspace_id
      )
    )
  );
