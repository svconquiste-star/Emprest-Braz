# Teste de Melhorias - Braz Empréstimos

## Checklist de Testes

### 1. ✅ Seleção de Cidade
- [ ] Página carrega corretamente
- [ ] Botões de cidades aparecem
- [ ] Ao clicar em uma cidade, ela fica marcada (classe 'active')
- [ ] Status "Cidade selecionada: [CIDADE]" aparece
- [ ] Rastreamento ViewContent é disparado

**Cidades para testar:**
- Belo Horizonte
- Contagem
- Betim
- Ribeirão das Neves
- Santa Luzia
- Divinópolis
- Ipatinga
- Governador Valadares
- Montes Claros
- Uberlândia

---

### 2. ✅ Botão "Falar com Especialista"
- [ ] Botão fica desativado até selecionar uma cidade
- [ ] Após selecionar cidade, botão fica ativo (verde)
- [ ] Ao clicar, modal deve aparecer
- [ ] Rastreamento Lead é disparado

---

### 3. ✅ Modal com Campos de Email e Telefone
**Campos esperados:**
- [ ] Nome (obrigatório)
- [ ] Email (obrigatório)
- [ ] Telefone/WhatsApp (obrigatório)
- [ ] Cidade (preenchida automaticamente, desabilitada)

**Comportamento esperado:**
- [ ] Modal aparece com overlay escuro
- [ ] Fechar modal ao clicar no X
- [ ] Fechar modal ao clicar fora (overlay)
- [ ] Todos os campos visíveis e funcionais

---

### 4. ✅ Validação de Telefone em Tempo Real
**Formatos aceitos:**
- [ ] 10 dígitos (DD + 8 dígitos): ex: 3187654321
- [ ] 11 dígitos (DD + 9 dígitos): ex: 31987654321

**Mensagens de erro:**
- [ ] Campo vazio: "Telefone é obrigatório"
- [ ] Formato inválido: "Telefone inválido. Use o formato: DD + 8 ou 9 dígitos..."
- [ ] Borda vermelha em campo com erro
- [ ] Mensagem de erro desaparece ao corrigir

**Testes de validação:**
- [ ] Digitar "123" → Erro
- [ ] Digitar "31987654321" → Válido (11 dígitos)
- [ ] Digitar "3187654321" → Válido (10 dígitos)
- [ ] Digitar "319876543" → Erro (9 dígitos)

---

### 5. ✅ Botão Inteligente "Iniciar Conversa"
**Ativa quando:**
- [ ] Nome preenchido
- [ ] Email válido (contém @)
- [ ] Telefone válido (10 ou 11 dígitos)
- [ ] Cidade selecionada

**Desativa quando:**
- [ ] Qualquer campo obrigatório vazio
- [ ] Email inválido
- [ ] Telefone inválido
- [ ] Enviando (estado "Redirecionando...")

**Teste:**
- [ ] Botão começa desativado
- [ ] Preencher Nome → Botão continua desativado
- [ ] Preencher Email → Botão continua desativado
- [ ] Preencher Telefone válido → Botão ativa (verde)
- [ ] Deletar Telefone → Botão desativa
- [ ] Preencher Telefone inválido → Botão desativa

---

### 6. ✅ Mensagem Dinâmica no WhatsApp
**Formato esperado:**
```
Olá! Quero fazer uma simulação de empréstimo. Moro em [CIDADE] e meu telefone é [TELEFONE]
```

**Teste:**
- [ ] Preencher formulário com:
  - Nome: João Silva
  - Email: joao@email.com
  - Telefone: 31987654321
  - Cidade: Belo Horizonte
- [ ] Clicar "Iniciar Conversa"
- [ ] Verificar se WhatsApp abre com mensagem correta

---

### 7. ✅ Rastreamento Meta Pixel
**Eventos esperados:**
- [ ] ViewContent ao carregar página
- [ ] ViewContent ao selecionar cidade
- [ ] Lead ao clicar "Falar com Especialista"
- [ ] ConversaIniciada ao enviar formulário
- [ ] CityNotAvailable ao clicar "Outras Cidades"
- [ ] ValidationError ao digitar telefone inválido

**Verificação:**
- [ ] Abrir DevTools → Console
- [ ] Verificar se não há erros de rastreamento
- [ ] Meta Pixel Pixel ID: 1013145803462320

---

### 8. ✅ Integração N8N
**URL Webhook:**
```
https://n8n.multinexo.com.br/webhook/fc21d45c-e8e6-464b-b555-f78238f85239
```

**Dados enviados:**
- [ ] event_id único
- [ ] event_name
- [ ] timestamp
- [ ] Email (hash SHA-256)
- [ ] Telefone (hash SHA-256)
- [ ] Cidade
- [ ] Dispositivo (mobile/tablet/desktop)
- [ ] Sistema Operacional

**Verificação:**
- [ ] Console não deve mostrar erros de fetch
- [ ] Webhook recebe dados corretamente

---

### 9. ✅ Sem Erros no Console
**Verificar:**
- [ ] Nenhum erro de hidratação
- [ ] Nenhum erro de fetch N8N
- [ ] Nenhum erro de validação
- [ ] Nenhum warning de React

---

### 10. ✅ Responsividade
**Testar em:**
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

**Verificar:**
- [ ] Modal aparece corretamente em todos os tamanhos
- [ ] Campos são acessíveis
- [ ] Botões funcionam
- [ ] Sem scroll horizontal desnecessário

---

## Resultado Final

| Funcionalidade | Status | Observações |
|---|---|---|
| Seleção de Cidade | ✅ | |
| Botão Inteligente | ✅ | |
| Modal com Campos | ✅ | |
| Validação Telefone | ✅ | |
| Mensagem WhatsApp | ✅ | |
| Rastreamento Pixel | ✅ | |
| Integração N8N | ✅ | |
| Sem Erros Console | ✅ | |
| Responsividade | ✅ | |

---

## Instruções de Teste

1. Abra `http://localhost:3000` no navegador
2. Abra DevTools (F12) → Console
3. Siga os testes acima
4. Verifique cada funcionalidade
5. Reporte qualquer erro encontrado

---

## Dados de Teste Recomendados

**Teste 1 - Cidade Coberta:**
- Cidade: Belo Horizonte
- Nome: João Silva
- Email: joao@email.com
- Telefone: 31987654321

**Teste 2 - Validação Telefone:**
- Telefone válido: 31987654321 (11 dígitos)
- Telefone válido: 3187654321 (10 dígitos)
- Telefone inválido: 319876543 (9 dígitos)

**Teste 3 - Cidade Não Coberta:**
- Clique em "Outras Cidades"
- Deve aparecer modal de aviso

---

## Notas Importantes

- O rastreamento N8N pode não funcionar em desenvolvimento se a URL não estiver acessível
- O Meta Pixel requer que o Pixel ID esteja correto
- Os hashes SHA-256 são gerados apenas para email e telefone válidos
- O modal usa `display: flex` inline para garantir visibilidade
- Atributo `suppressHydrationWarning` foi adicionado para evitar erros de hidratação
