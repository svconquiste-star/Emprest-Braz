# Implementações Realizadas - Braz Empréstimos

> Última atualização: 21/03/2026

---

## 1. Visão Geral do Projeto

- **Nome**: Emprest-Braz
- **Framework**: Next.js 14.2.35 (React 18.3.1)
- **Repositório**: https://github.com/svconquiste-star/Emprest-Braz.git
- **Tipo**: Landing page de simulação de empréstimo com formulário e redirecionamento ao WhatsApp
- **Layout**: Card centralizado, mobile-first, tela única

---

## 2. Estrutura Completa de Arquivos

```
Emprest-Braz/
├── app/
│   ├── layout.js          # Layout raiz (Meta Pixel, fontes, <head>)
│   ├── page.js            # Página principal (formulário + tracking)
│   ├── providers.js       # Providers de contexto (City + WhatsApp)
│   └── globals.css        # Estilos globais (card, form, botão, responsivo)
│
├── lib/
│   ├── tracking.js        # TrackingManager (Meta Pixel + N8N)
│   └── phoneValidator.js  # Validação e formatação de telefone
│
├── components/            # Componentes legados (não usados na página atual)
│   ├── Benefits.js
│   ├── CitySelector.js
│   ├── CityWarningModal.js
│   ├── FAQ.js
│   ├── Hero.js
│   ├── Modal.js
│   ├── Proof.js
│   ├── Steps.js
│   ├── WhatsAppButton.js
│   └── WhatsAppFormModal.js
│
├── context/
│   ├── CityContext.js     # Provider de cidades cobertas
│   └── WhatsAppContext.js # Provider de número WhatsApp
│
├── hooks/
│   └── useTracking.js     # Hook customizado para TrackingManager
│
├── package.json           # Dependências (next, react, react-dom)
├── next.config.js         # Configuração Next.js
├── jsconfig.json          # Configuração de paths
└── .eslintrc.json         # ESLint
```

---

## 3. Arquivos Ativos (Usados na Página Atual)

### `app/layout.js` — Layout Raiz
- Importa fontes: **Outfit** (sans) + **Merriweather** (serif, bold)
- Importa Font Awesome 6.5.0 (ícones)
- **Persiste `fbclid` da URL → cookie `_fbc`** (90 dias) antes do Pixel carregar
- Inicializa Meta Pixel:
  - `fbq('set', 'autoConfig', false, PIXEL_ID)` — desabilita coleta automática
  - `fbq('init', PIXEL_ID)` — inicializa Pixel
  - `fbq('track', 'PageView')` — evento PageView automático
- Inclui `<noscript>` fallback para Pixel

### `app/page.js` — Página Principal
- **Formulário com 4 campos**:
  - Nome (obrigatório)
  - Telefone (obrigatório, validação 10-11 dígitos)
  - Email (opcional, validação de formato)
  - Cidade (obrigatório)
- **Botão "Chamar no WhatsApp"**: ativa quando formulário é válido
- **Ao submeter**:
  1. Abre WhatsApp com mensagem pré-formatada
  2. Envia evento `Contact` ao Pixel + N8N via `trackContact()`
- **Ao carregar**: envia evento `ViewContent` via `trackViewContent()`

### `app/globals.css` — Estilos
- Design dark mode com card centralizado
- Variáveis CSS: `--bg-base`, `--brand`, `--gold`, `--text`, `--muted`
- Mobile-first com breakpoints em 480px e 768px
- Classes: `.card`, `.badge`, `.form-group`, `.btn-whatsapp`, `.trust`, `.footer`
- Validação visual: `.input-error` (borda vermelha), `.error-message`

### `app/providers.js` — Providers
- Envolve `children` com `WhatsAppProvider` + `CityProvider`

### `lib/tracking.js` — Sistema de Rastreamento
- **Classe `TrackingManager`** (singleton via `getTrackingManager()`)
- Detalhes na seção 5 abaixo

### `lib/phoneValidator.js` — Validação de Telefone
- `validatePhone(phone)` → `{ valid, error, formatted }`
- `formatPhoneDisplay(phone)` → formato `(DD) XXXXX-XXXX`
- Aceita 10 dígitos (fixo) ou 11 dígitos (celular)

---

## 4. Configurações Importantes

| Configuração | Valor |
|---|---|
| **Meta Pixel ID** | `1564023121525783` |
| **Webhook N8N** | `https://n8n.multinexo.com.br/webhook/fc21d45c-e8e6-464b-b555-f78238f85239` |
| **WhatsApp (page.js)** | `553187008478` |
| **autoConfig** | `false` (desabilitado — conformidade Core Config) |

---

## 5. Sistema de Rastreamento Meta Pixel ✅

### Eventos Enviados ao Pixel (apenas eventos padrão do Meta)

| Evento | Disparado quando | Destino |
|---|---|---|
| **PageView** | Ao carregar qualquer página | Pixel (via layout.js) |
| **ViewContent** | Ao carregar a página principal | Pixel + N8N |
| **Contact** | Ao clicar "Chamar no WhatsApp" | Pixel + N8N |

### Conformidade com Configuração Core do Meta
- ✅ Apenas eventos **padrão** do Meta (zero eventos custom)
- ✅ Zero parâmetros custom enviados ao Pixel
- ✅ `autoConfig: false` — desabilita correspondência avançada automática
- ✅ Correspondência avançada manual via `fbq('init', PIXEL_ID, userProps)`

### Advanced Matching — Parâmetros Enviados no `fbq('init')`

| Parâmetro | Descrição | Formato |
|---|---|---|
| **em** | Email | Hash SHA-256 |
| **ph** | Telefone | Hash SHA-256 |
| **fn** | Primeiro nome | Hash SHA-256 |
| **ln** | Sobrenome | Hash SHA-256 |
| **ct** | Cidade | Hash SHA-256 |
| **fbc** | Meta Click ID | `fb.1.<timestamp>.<fbclid>` |
| **fbp** | Facebook Browser ID | Cookie `_fbp` |
| **external_id** | ID persistente do visitante | `<timestamp>_<random>` (localStorage) |
| **client_user_agent** | User Agent do navegador | String completa |

### Parâmetros Padrão no `fbq('track', 'Contact', {...})`

| Parâmetro | Valor |
|---|---|
| **currency** | `BRL` |
| **content_type** | `product` |
| **content_id** | `emprestimo` |
| **eventID** | ID único para deduplicação |

### Dados Enviados ao N8N (webhook POST)

Todos os dados acima + campos extras:
- `event_id`, `event_name`, `timestamp` (ISO 8601)
- `cidade`, `nome`, `telefone` (texto plano)
- `device_type` (mobile/tablet/desktop)
- `operating_system` (windows/macos/linux/android/ios)
- `time_on_page` (segundos)
- `source: 'web'`

---

## 6. Funcionalidades do TrackingManager (`lib/tracking.js`)

| Funcionalidade | Descrição |
|---|---|
| **Singleton** | `getTrackingManager()` retorna instância única |
| **Hash SHA-256** | `hashSHA256()` via `crypto.subtle.digest` |
| **Normalização** | Email → lowercase + trim; Telefone → apenas dígitos |
| **Cookie fbc** | Lê `_fbc` do cookie ou gera a partir de `fbclid` na URL |
| **Cookie fbp** | Lê `_fbp` do cookie |
| **External ID** | Persistido no `localStorage` (`visitor_external_id`) |
| **Deduplicação** | `sentEventIds` Set impede envio duplicado |
| **Detecção** | `detectarDispositivo()` + `obterSistemaOperacional()` |
| **Tempo na página** | `getTimeOnPage()` em segundos |
| **Persistência fbc** | Script em `layout.js` salva `fbclid` → cookie `_fbc` (90 dias) |

---

## 7. Fluxo Completo do Usuário

```
1. Usuário acessa a página
   └─→ layout.js: Persiste fbclid → cookie _fbc
   └─→ layout.js: fbq('init') + fbq('track', 'PageView')
   └─→ page.js:   trackViewContent() → Pixel + N8N

2. Usuário preenche formulário
   ├── Nome (obrigatório)
   ├── Telefone (obrigatório, 10-11 dígitos)
   ├── Email (opcional, validação de formato)
   └── Cidade (obrigatório)

3. Usuário clica "Chamar no WhatsApp"
   └─→ Valida formulário
   └─→ Abre WhatsApp com mensagem:
       "Olá! Sou [NOME]. Quero fazer uma simulação
        de empréstimo. Moro em [CIDADE] e meu
        telefone é [TELEFONE]"
   └─→ trackContact() envia:
       ├── fbq('init', PIXEL_ID, { em, ph, fn, ln, ct, fbc, fbp, external_id, client_user_agent })
       ├── fbq('track', 'Contact', { currency, content_type, content_id }, { eventID })
       └── POST N8N webhook (todos os dados)
```

---

## 8. Mensagem Dinâmica no WhatsApp ✅

**Número**: `+55 31 8700-8478`

**Formato da mensagem**:
```
Olá! Sou [NOME]. Quero fazer uma simulação de empréstimo. Moro em [CIDADE] e meu telefone é [TELEFONE]
```

---

## 9. Design e Estilos ✅

### Paleta de Cores
| Variável | Valor | Uso |
|---|---|---|
| `--bg-base` | `#0a0e14` | Fundo da página |
| `--bg-card` | `rgba(15, 20, 30, 0.92)` | Fundo do card |
| `--brand` | `#00d4aa` | Cor primária (verde) |
| `--gold` | `#d4a54a` | Badge e ícone de cadeado |
| `--text` | `#f0f4f8` | Texto principal |
| `--muted` | `rgba(240, 244, 248, 0.55)` | Texto secundário |

### Layout
- Card centralizado vertical e horizontalmente
- Border-radius: 28px com backdrop-filter blur
- Botão WhatsApp com gradiente verde + sombra
- Responsivo: 3 breakpoints (mobile, 480px, 768px)

---

## 10. Servidor Local

### Como Iniciar
```bash
npm run dev
# Acesse http://localhost:3000
```

### Build de Produção
```bash
npm run build
npm run start
```

---

## 11. Histórico de Commits

| Commit | Descrição |
|---|---|
| `8642a8d` | feat: improve matching quality - add email, fn/ln/ct/fbc/fbp/ua |
| `97c8356` | refactor: Core Config compliance - replace ConversaIniciada with Contact |
| `f959dc6` | chore: update Meta Pixel ID to 1564023121525783 |
| `0f58e8c` | refactor: single-screen card layout with form |
| `018aab8` | feat: Advanced Matching - fbc, IP/UA, email hash |

---

## Resumo Final

✅ Landing page single-screen com formulário (nome, telefone, email, cidade)
✅ Redirecionamento ao WhatsApp com mensagem dinâmica
✅ Meta Pixel `1564023121525783` com apenas eventos padrão (Core Config)
✅ Advanced Matching completo: em, ph, fn, ln, ct, fbc, fbp, external_id, UA
✅ Persistência de fbclid → cookie _fbc no carregamento
✅ Webhook N8N recebe todos os dados de cada evento
✅ Deduplicação por event_id único
✅ Hash SHA-256 para todos os dados pessoais
✅ Design dark mode, mobile-first, responsivo
✅ Projeto no GitHub atualizado
