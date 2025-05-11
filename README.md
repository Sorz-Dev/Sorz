# Sorz - Desenvolvimento Digital

<p align="center">
  <img src=https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/logo.webp" alt="Sorz Logo" width="300" />
</p>

## 📋 Sobre a Empresa

A Sorz é uma empresa de desenvolvimento digital especializada na criação de soluções web modernas e eficientes. Localizada em Campinas, São Paulo, oferecemos serviços de desenvolvimento de sites, aplicações web (PWA) e aplicativos nativos que resolvem problemas reais de negócios.

Nossa missão é transformar ideias em produtos digitais de alta qualidade, combinando design atraente com código limpo e performático. Trabalhamos com empresas de diversos segmentos, desde pequenos negócios locais até startups em crescimento.

## 🚀 Projeto Principal: Ecossistema Delivery

Nosso projeto principal é um ecossistema completo para delivery, desenvolvido com tecnologias modernas para oferecer uma experiência fluida tanto para clientes quanto para administradores:

- **Painel Administrativo**: Interface completa para gerenciamento de produtos, pedidos e clientes
- **Sistema de Pedidos**: Fluxo intuitivo de pedidos com acompanhamento em tempo real
- **Otimização de Imagens**: Processamento e entrega de imagens em WebP para carregamento rápido
- **Autenticação Segura**: Sistema robusto de login e gerenciamento de usuários
- **Pagamentos Integrados**: Processamento de pagamentos com Stripe
- **Banco de Dados Relacional**: Armazenamento estruturado com PostgreSQL

Este projeto demonstra nossa capacidade de desenvolver soluções completas e escaláveis para necessidades específicas de negócios.

## 💻 Stack Tecnológica

### Frontend
- **React.js**: Biblioteca principal para construção de interfaces
- **Next.js**: Framework React para renderização híbrida e otimização de SEO
- **TypeScript**: Superset tipado de JavaScript para desenvolvimento mais seguro
- **Tailwind CSS**: Framework CSS utilitário para design responsivo
- **Headless UI**: Componentes acessíveis e customizáveis
- **Lucide Icons**: Conjunto de ícones SVG minimalistas

### Backend
- **Node.js**: Ambiente de execução JavaScript server-side
- **Nest.js**: Framework Node.js para APIs escaláveis
- **Bun**: Runtime JavaScript rápido para desenvolvimento
- **PostgreSQL**: Sistema de banco de dados relacional
- **Auth0**: Plataforma de autenticação e autorização
- **Stripe**: Processamento de pagamentos online

### DevOps & Infraestrutura
- **Vercel**: Plataforma para hospedagem e deploy contínuo
- **Neon**: Banco de dados PostgreSQL serverless
- **Blob Storage**: Armazenamento de arquivos e imagens
- **Git/GitHub**: Controle de versão e colaboração

### Ferramentas & Otimização
- **Formspree**: Processamento de formulários sem backend
- **Google Analytics**: Análise de tráfego e comportamento
- **SEO Técnico**: Otimização para mecanismos de busca
- **PWA**: Recursos de Progressive Web App

## 🌐 Recursos do Site

- **Design Responsivo**: Experiência otimizada em qualquer dispositivo
- **Multilíngue**: Suporte completo para português e inglês com detecção automática
- **Modo Escuro**: Interface adaptada para visualização noturna
- **Conformidade LGPD/GDPR**: Sistema de consentimento de cookies e políticas de privacidade
- **Integração WhatsApp**: Botão flutuante para contato direto
- **SEO Otimizado**: Implementação de Schema.org, meta tags e outras práticas recomendadas

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18.17.0 ou superior
- pnpm (recomendado) ou npm

### Instalação

1. Clone o repositório
   \`\`\`bash
   git clone https://github.com/Sorz-Dev/Sorz.git
   cd Sorz
   \`\`\`

2. Instale as dependências
   \`\`\`bash
   pnpm install
   \`\`\`

3. Execute o servidor de desenvolvimento
   \`\`\`bash
   pnpm dev
   \`\`\`

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Build para Produção

\`\`\`bash
pnpm build
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
Sorz/
├── app/                  # Diretório principal do Next.js App Router
│   ├── [lang]/           # Rotas dinâmicas para idiomas
│   │   ├── components/   # Componentes específicos de página
│   │   ├── privacy/      # Página de política de privacidade
│   │   ├── terms/        # Página de termos de uso
│   │   └── client-page.tsx # Componente principal do site
│   └── globals.css       # Estilos globais
├── components/           # Componentes reutilizáveis
│   ├── ui/               # Componentes de UI (shadcn)
│   ├── cookie-consent.tsx # Componente de consentimento de cookies
│   └── whatsapp-button.tsx # Botão flutuante de WhatsApp
├── i18n/                 # Configuração e arquivos de internacionalização
│   └── locales/          # Traduções para cada idioma
├── public/               # Arquivos estáticos
│   └── images/           # Imagens do site
└── middleware.ts         # Middleware para redirecionamento de idioma
\`\`\`

## 🔒 Segurança

- **Skew Protection**: Proteção contra desincronização de relógio
- **Consentimento de Cookies**: Sistema completo de gerenciamento de consentimento
- **HTTPS**: Forçado em todas as páginas
- **Sanitização de Entrada**: Validação de dados de formulário

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

Para questões, sugestões ou colaborações, entre em contato:

- Email: soarxz.dev@gmail.com
- WhatsApp: +55 19 99881-7808
- [LinkedIn](https://www.linkedin.com/in/bruno-soares-7885311b2/)
- [GitHub](https://github.com/Sorz-Dev)

---

<p align="center">
  Desenvolvido com ❤️ por <a href="https://github.com/Sorz-Dev">Sorz</a>
</p>
