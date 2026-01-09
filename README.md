# Empréstimo Braz

Landing page Next.js para atendimento de crédito rápido e humano da Braz Empréstimos.

## 📋 Descrição

Plataforma de empréstimos imediatos com atendimento via WhatsApp, desenvolvida com Next.js e React. Oferecemos crédito sem consulta ao SPC/Serasa, com liberação rápida e conversa humana.

## ✨ Características

- **Atendimento Rápido**: Resposta em até 15 minutos
- **Sem Consulta SPC/Serasa**: Análise simplificada
- **Liberação Imediata**: Dinheiro via PIX na hora
- **WhatsApp First**: Todo o fluxo no aplicativo
- **Proteção Total**: Dados criptografados e seguros
- **Componentes React**: Arquitetura modular e escalável
- **Next.js 14**: Performance otimizada com App Router

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/svconquiste-star/Emprest-Braz.git
cd Emprest-Braz
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
braz-emprestimos/
├── app/
│   ├── layout.js           # Layout raiz com providers
│   ├── page.js             # Página principal
│   └── globals.css         # Estilos globais
├── components/
│   ├── Hero.js             # Seção hero com seletor de cidades
│   ├── CitySelector.js     # Componente de seleção de cidades
│   ├── Benefits.js         # Seção de benefícios
│   ├── Steps.js            # Seção de passos
│   ├── Proof.js            # Seção de prova social
│   ├── FAQ.js              # Seção de FAQ
│   └── Modal.js            # Modal de aviso
├── context/
│   └── ModalContext.js     # Context para gerenciar estado do modal
├── package.json            # Dependências do projeto
├── next.config.js          # Configuração do Next.js
├── jsconfig.json           # Configuração de paths
├── .eslintrc.json          # Configuração ESLint
├── README.md               # Este arquivo
├── LICENSE                 # Licença MIT
└── .gitignore              # Arquivos ignorados pelo Git
```

## 🎨 Tecnologias

- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca UI com Hooks
- **CSS3**: Design responsivo e moderno
- **Font Awesome 6.5**: Ícones
- **Google Fonts**: Tipografia (Outfit, Merriweather)
- **Facebook Pixel**: Rastreamento de conversão

## 🔗 Integração

### WhatsApp
O projeto integra com WhatsApp Business através de links `wa.me/`. O número padrão é `+55 31 73443985`.

Configurável em `components/CitySelector.js`:
```javascript
const WHATSAPP_LINK = "https://wa.me/553173443985?text=..."
```

### Facebook Pixel
Rastreamento de eventos para análise de conversão. Pixel ID: `1013145803462320`

Configurado em `app/layout.js` com eventos customizados:
- `CidadeSelecionada`: Quando usuário seleciona uma cidade
- `ConversaIniciada`: Quando usuário clica em "Falar com especialista"

## 📱 Responsividade

A página é totalmente responsiva e funciona em:
- Desktop (1024px+)
- Tablet (600px - 1024px)
- Mobile (até 600px)

## 🌐 Cidades Atendidas

Atualmente atendemos:
- São Joaquim de Bicas
- Betim
- Contagem
- Ibirité

Para adicionar novas cidades, edite o array `CIDADES` em `components/CitySelector.js`:
```javascript
const CIDADES = ["SÃO JOAQUIM DE BICAS", "BETIM", "CONTAGEM", "IBIRITÉ", OUTRAS_CIDADES]
```

## 🧩 Componentes Principais

### CitySelector
Gerencia a seleção de cidades e habilita/desabilita o botão de WhatsApp baseado na disponibilidade.

### Modal
Modal reutilizável para avisos, gerenciado por Context API para estado global.

### Hero
Seção principal com imagem, benefícios e seletor de cidades.

## 📝 Licença

MIT License - Todos os direitos reservados © 2024 Braz Empréstimos

## 📞 Contato

Para dúvidas ou sugestões, entre em contato via WhatsApp: [Falar com especialista](https://wa.me/553173443985?text=Quero%20saber%20mais%20sobre%20empr%C3%A9stimo)

---

**Desenvolvido com ❤️ para facilitar o acesso ao crédito**
