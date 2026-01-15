# Teste Completo do Fluxo - Braz Emprestimos

## ✅ Checklist de Funcionalidades

### 1. Botão WhatsApp Condicional
- [ ] Botão aparece desabilitado inicialmente
- [ ] Após seleção de cidade coberta, botão fica habilitado
- [ ] Após seleção de cidade não coberta, botão permanece desabilitado
- [ ] Clique no botão abre o formulário modal

### 2. Formulário de Coleta de Dados
- [ ] Modal abre ao clicar no botão
- [ ] Campo "Nome" está vazio e editável
- [ ] Campo "Cidade" mostra a cidade selecionada (desabilitado)
- [ ] Campo "Email" está vazio e editável
- [ ] Campo "Telefone" está vazio e editável
- [ ] Botão "Falar no WhatsApp" está habilitado quando todos os campos obrigatórios estão preenchidos
- [ ] Botão "Fechar" (×) fecha o modal sem enviar

### 3. Validação de Dados
- [ ] Ao clicar em "Falar no WhatsApp" sem preencher campos, mostra alerta
- [ ] Ao preencher todos os campos, redireciona para WhatsApp
- [ ] Mensagem no WhatsApp contém: nome, cidade, email e telefone

### 4. Rotação de Números WhatsApp
- [ ] Primeiro acesso usa: 5531973443985
- [ ] Segundo acesso usa: 5531987008478
- [ ] Terceiro acesso usa: 5531973443985 (volta ao primeiro)
- [ ] Rotação persiste entre recarregamentos (localStorage)

### 5. Integração Meta Pixel
- [ ] PageView é rastreado ao carregar a página
- [ ] ConversaIniciada é rastreado ao clicar no botão
- [ ] Eventos aparecem no Meta Pixel

## 🧪 Passos de Teste

### Teste 1: Botão Desabilitado
1. Abrir o site
2. Verificar que o botão "FALAR COM ESPECIALISTA" está desabilitado (opaco)
3. Verificar que o título do botão diz "Selecione uma cidade"

### Teste 2: Seleção de Cidade Coberta
1. Clicar em "Belo Horizonte" (cidade coberta)
2. Verificar que o botão fica habilitado (brilhante)
3. Verificar que a mensagem "Cidade selecionada: Belo Horizonte" aparece
4. Clicar no botão
5. Verificar que o modal abre com o formulário

### Teste 3: Preenchimento do Formulário
1. No modal aberto, preencher:
   - Nome: "João Silva"
   - Cidade: "Belo Horizonte" (pré-preenchido)
   - Email: "joao@email.com"
   - Telefone: "(31) 98765-4321"
2. Clicar em "Falar no WhatsApp"
3. Verificar que abre o WhatsApp com a mensagem contendo todos os dados

### Teste 4: Seleção de Cidade Não Coberta
1. Clicar em "Outras Cidades"
2. Verificar que o botão permanece desabilitado
3. Verificar que um modal de aviso aparece

### Teste 5: Rotação de Números
1. Primeiro acesso: verificar URL do WhatsApp contém 5531973443985
2. Recarregar a página
3. Segundo acesso: verificar URL do WhatsApp contém 5531987008478
4. Recarregar a página
5. Terceiro acesso: verificar URL do WhatsApp contém 5531973443985 (volta ao primeiro)

## 📊 Resultado Esperado

Todos os testes devem passar com:
- ✅ Botão funcionando corretamente
- ✅ Formulário modal abrindo e fechando
- ✅ Dados sendo coletados corretamente
- ✅ Redirecionamento para WhatsApp funcionando
- ✅ Rotação de números funcionando
- ✅ Meta Pixel rastreando eventos

## 🔍 Verificação no Console

Abrir DevTools (F12) e verificar:
- Logs: "Abrindo formulário para: [cidade]"
- Sem erros de JavaScript
- localStorage contém "whatsappNumberIndex"
