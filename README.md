# Sorz - Desenvolvimento Digital

<p align="center">
  <img src="public/images/logo.webp" alt="Sorz Logo" width="300" />
</p>

## 📋 Sobre o Projeto

Sorz é um site de portfólio moderno para serviços de desenvolvimento digital, construído com Next.js e TailwindCSS. O site apresenta projetos, tecnologias utilizadas, e oferece um formulário de contato para potenciais clientes.

### ✨ Características

- **Design Responsivo**: Experiência otimizada em dispositivos móveis e desktop
- **Multilíngue**: Suporte completo para português e inglês
- **Modo Escuro**: Interface adaptada para visualização noturna
- **SEO Otimizado**: Meta tags, Schema.org, e outras práticas para melhor indexação
- **Acessibilidade**: Implementação de práticas WCAG para melhor acessibilidade
- **Conformidade LGPD/GDPR**: Sistema de consentimento de cookies e políticas de privacidade
- **Integração WhatsApp**: Botão flutuante para contato direto

## 🚀 Tecnologias

- **Frontend**:
  - [Next.js 15](https://nextjs.org/) - Framework React com renderização híbrida
  - [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para JavaScript
  - [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitário
  - [Headless UI](https://headlessui.com/) - Componentes acessíveis sem estilo
  - [Lucide Icons](https://lucide.dev/) - Conjunto de ícones SVG

- **Ferramentas**:
  - [Formspree](https://formspree.io/) - Processamento de formulários sem backend
  - [Vercel](https://vercel.com/) - Plataforma de hospedagem e CI/CD

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

## 🌐 Internacionalização

O site suporta português e inglês, com detecção automática do idioma preferido do usuário. Para adicionar um novo idioma:

1. Crie um novo arquivo em `i18n/locales/[código-idioma].ts`
2. Adicione o código do idioma ao array `locales` em `i18n/index.ts`
3. Atualize o middleware para incluir o novo idioma

## 🔒 Segurança

- **Skew Protection**: Proteção contra desincronização de relógio
- **Consentimento de Cookies**: Sistema completo de gerenciamento de consentimento
- **HTTPS**: Forçado em todas as páginas
- **Sanitização de Entrada**: Validação de dados de formulário

## 📱 PWA

O site é otimizado como Progressive Web App (PWA), permitindo instalação em dispositivos móveis e funcionamento offline limitado.

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
