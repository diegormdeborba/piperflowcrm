-- ============================================================
-- PipeFlow CRM — Seed para desenvolvimento
--
-- IMPORTANTE: Executar APÓS criar os usuários de teste no
-- Supabase Auth (Dashboard → Authentication → Users) e
-- substituir os UUIDs abaixo pelos IDs gerados.
--
-- Usuários de teste sugeridos:
--   admin@piperflow.dev  (senha: Teste@123)
--   membro@piperflow.dev (senha: Teste@123)
-- ============================================================

-- ─── Substitua com os UUIDs reais do Supabase Auth ───────────
DO $$
DECLARE
  admin_id  UUID := 'SUBSTITUIR_COM_UUID_DO_ADMIN';
  member_id UUID := 'SUBSTITUIR_COM_UUID_DO_MEMBRO';
  ws_id     UUID := gen_random_uuid();
  lead1_id  UUID := gen_random_uuid();
  lead2_id  UUID := gen_random_uuid();
  lead3_id  UUID := gen_random_uuid();
  lead4_id  UUID := gen_random_uuid();
  lead5_id  UUID := gen_random_uuid();
BEGIN

-- ─── Workspace ───────────────────────────────────────────────
INSERT INTO workspaces (id, name, slug, plan) VALUES
  (ws_id, 'Acme Vendas', 'acme-vendas', 'free');

-- ─── Membros ─────────────────────────────────────────────────
INSERT INTO workspace_members (workspace_id, user_id, role) VALUES
  (ws_id, admin_id,  'admin'),
  (ws_id, member_id, 'member');

-- ─── Leads ───────────────────────────────────────────────────
INSERT INTO leads (id, workspace_id, name, email, phone, company, role, status, owner_id) VALUES
  (lead1_id, ws_id, 'Ana Lima',       'ana.lima@techcorp.com',     '(11) 91234-5678', 'TechCorp',       'CTO',              'new',       admin_id),
  (lead2_id, ws_id, 'Bruno Martins',  'bruno@startupx.io',         '(21) 98765-4321', 'StartupX',       'CEO',              'contacted', admin_id),
  (lead3_id, ws_id, 'Carla Souza',    'carla.souza@megastore.com', '(31) 97654-3210', 'MegaStore',      'Gerente de TI',    'qualified', member_id),
  (lead4_id, ws_id, 'Daniel Costa',   'daniel@consultoria.com',    '(41) 96543-2109', 'Costa Consult',  'Diretor',          'new',       member_id),
  (lead5_id, ws_id, 'Eduarda Ferraz', 'edu@fintech.com.br',        '(51) 95432-1098', 'FinTech Brasil', 'Head of Products', 'contacted', admin_id);

-- ─── Deals ───────────────────────────────────────────────────
INSERT INTO deals (workspace_id, lead_id, title, value, stage, owner_id, due_date) VALUES
  (ws_id, lead1_id, 'Licença anual TechCorp',      45000,  'proposal_sent', admin_id,  CURRENT_DATE + 5),
  (ws_id, lead2_id, 'Implementação StartupX',      18000,  'negotiation',   admin_id,  CURRENT_DATE + 3),
  (ws_id, lead3_id, 'Suporte MegaStore',            9600,  'contacted',     member_id, CURRENT_DATE + 10),
  (ws_id, lead4_id, 'Consultoria Costa',           12000,  'new_lead',      member_id, CURRENT_DATE + 14),
  (ws_id, lead5_id, 'Integração FinTech',          32000,  'won',           admin_id,  NULL),
  (ws_id, lead1_id, 'Módulo analytics TechCorp',   22000,  'new_lead',      admin_id,  CURRENT_DATE + 7),
  (ws_id, lead2_id, 'Treinamento equipe StartupX',  4800,  'lost',          admin_id,  NULL);

-- ─── Atividades ──────────────────────────────────────────────
INSERT INTO activities (workspace_id, lead_id, type, description, author_id, created_at) VALUES
  (ws_id, lead1_id, 'call',    'Ligação inicial — apresentação do produto. Interesse confirmado.', admin_id,  NOW() - INTERVAL '10 days'),
  (ws_id, lead1_id, 'email',   'Envio de proposta comercial com desconto de 10% na licença anual.', admin_id, NOW() - INTERVAL '5 days'),
  (ws_id, lead1_id, 'meeting', 'Reunião de demo com a equipe técnica. Aprovação pendente do CFO.',  admin_id, NOW() - INTERVAL '2 days'),
  (ws_id, lead2_id, 'call',    'Primeiro contato via telefone. Agendado demo para próxima semana.', admin_id, NOW() - INTERVAL '8 days'),
  (ws_id, lead2_id, 'meeting', 'Demo realizado. Negociação em andamento sobre prazo de pagamento.', admin_id, NOW() - INTERVAL '3 days'),
  (ws_id, lead3_id, 'email',   'E-mail de prospecção enviado. Aguardando resposta.',                member_id, NOW() - INTERVAL '6 days'),
  (ws_id, lead3_id, 'call',    'Retorno da Carla. Interesse em suporte premium.',                  member_id, NOW() - INTERVAL '1 day'),
  (ws_id, lead5_id, 'meeting', 'Reunião de fechamento. Contrato assinado.',                        admin_id,  NOW() - INTERVAL '4 days'),
  (ws_id, lead5_id, 'note',    'Cliente satisfeito. Potencial de upsell em 6 meses.',              admin_id,  NOW() - INTERVAL '4 days');

END $$;
