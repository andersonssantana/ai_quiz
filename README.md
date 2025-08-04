# AI Quiz Generator - Aplicação Interativa

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## 📋 Visão Geral

Este projeto é um **Gerador de Quiz Interativo** desenvolvido com **TypeScript** que utiliza inteligência artificial para criar perguntas de múltipla escolha sobre qualquer tema escolhido pelo usuário. A aplicação demonstra a integração eficiente entre React 19, TypeScript e APIs de LLM (Large Language Models), oferecendo uma experiência educativa, type-safe e interativa.

### 🎨 Preview da Aplicação

| ![Interface Principal](./public/quiz-main.png) | ![Questões Geradas](./public/quiz-questions.png) |
|:----------------------------------------------:|:------------------------------------------------:|
| **Interface de Entrada**                       | **Quiz Interativo**                             |

## 🚀 Funcionalidades

- **Geração Inteligente de Conteúdo**: Criação automática de 5 perguntas com exatamente 4 alternativas usando Google Gemini AI
- **Type Safety**: Tipagem completa com TypeScript garantindo robustez e manutenibilidade
- **Interface Interativa**: Sistema de quiz com feedback visual imediato após cada resposta
- **Validação Type-Safe**: Type guards para validação rigorosa dos dados da API
- **Tratamento de Erros**: Sistema robusto de validação e tratamento de exceções com tipos
- **Experiência Responsiva**: Interface adaptável para diferentes tamanhos de tela
- **Estados de Loading**: Feedback visual durante a geração de conteúdo
- **Parsing Inteligente**: Processamento type-safe das respostas da API com limpeza automática
- **Prevenção de Interação**: Bloqueio de respostas após seleção para manter integridade do quiz

## 💻 Tecnologias e Ferramentas

### Front-end
- **React 19**: Utilização da versão mais recente com hooks modernos e tipagem completa
- **TypeScript**: Desenvolvimento type-safe com strict mode habilitado
- **Vite**: Build tool otimizada para desenvolvimento rápido com suporte completo ao TypeScript

### Inteligência Artificial
- **Google Gemini AI (Gemini-2.0-Flash)**: Modelo LLM principal para geração de conteúdo
- **OpenAI API**: Configuração preparada para alternativas de IA
- **Prompt Engineering**: Prompts otimizados para geração consistente de quizzes

### Otimizações e Padrões
- **Type Guards**: Validação type-safe com funções de guarda de tipo personalizadas
- **Interface Design**: Definições de tipos centralizadas para máxima reutilização
- **State Management**: Gerenciamento type-safe de estado com React Hooks tipados
- **Performance**: Otimizações para renderização com tipagem que previne erros em runtime
- **Code Quality**: ESLint + TypeScript com regras rigorosas de qualidade de código

## 🧠 Arquitetura e Estrutura

### Organização de Componentes

```bash
src/
├── App.tsx                   # Componente principal da aplicação (TypeScript)
├── QuizQuestion.tsx          # Componente individual de pergunta (TypeScript)
├── main.tsx                  # Ponto de entrada da aplicação (TypeScript)
├── types/
│   └── quiz.ts              # Definições de tipos TypeScript centralizadas
├── vite-env.d.ts            # Tipagem das variáveis de ambiente
├── App.css                   # Estilos específicos da aplicação
└── index.css                 # Estilos globais e variáveis CSS
```

### Fluxo de Dados Type-Safe

1. **Input do Usuário**: Tema inserido no campo de texto (validado com TypeScript)
2. **Processamento IA**: Envio do prompt tipado para Google Gemini AI
3. **Validação Type-Safe**: Parsing com type guards garantindo estrutura correta
4. **Renderização**: Exibição das perguntas com componentes totalmente tipados
5. **Interação**: Sistema de resposta com feedback visual e types seguros

## 🤖 Integração com IA

### Google Gemini AI

A aplicação utiliza o modelo **Gemini-2.0-Flash** para geração de conteúdo:

```typescript
const createPrompt = useCallback((topic: string): string => {
  return `Gere 5 perguntas de múltipla escolha sobre ${topic}. 
  Produza um JSON válido no seguinte formato EXATO:
  [
    { 
      "question": "Texto da pergunta", 
      "options": ["Opção A", "Opção B", "Opção C", "Opção D"], 
      "correct": "Opção A" 
    }
  ]
  IMPORTANTE: Cada pergunta deve ter EXATAMENTE 4 alternativas no array 'options'.`;
}, []);
```

### Características da Implementação Type-Safe

- **Prompt Engineering**: Prompts estruturados com tipagem para resultados consistentes
- **Type Guards**: Validação rigorosa com `questions is QuizQuestionType[]`
- **Parsing Type-Safe**: Sistema de limpeza e validação de JSON com tipos garantidos
- **Fallback de Erro**: Tratamento gracioso de falhas na API com tipos de erro específicos
- **Rate Limiting**: Prevenção de múltiplas requisições com estados tipados

## 🎯 Funcionalidades Detalhadas

### Sistema de Quiz Interativo

- **Seleção Única**: Cada pergunta permite apenas uma resposta
- **Feedback Imediato**: Cores diferenciadas para respostas corretas/incorretas
- **Estado Bloqueado**: Prevenção de mudança após resposta selecionada
- **Destaque Visual**: Realce automático da resposta correta quando usuário erra

### Validação e Segurança Type-Safe

- **Validação de Input**: Verificação de campos obrigatórios com tipagem
- **Type Guards**: Funções de validação que garantem tipos em runtime
- **Sanitização de Dados**: Limpeza type-safe de respostas da API
- **Validação de Estrutura**: Confirmação rigorosa com interfaces TypeScript
- **Tratamento de Exceções**: Captura tipada e apresentação amigável de erros

## 📱 Design Responsivo

### Adaptações por Dispositivo

- **Desktop**: Layout com maior espaçamento
- **Mobile**: Interface em coluna com elementos empilhados

### Princípios de UX/UI

- **Contraste Adequado**: Cores que garantem legibilidade
- **Feedback Visual**: Estados claros para todas as interações
- **Acessibilidade**: Estrutura semântica e foco adequado
- **Transições Suaves**: Animações que melhoram a experiência

## 🔧 Configuração e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Conta no Google AI Studio para obter API Key
- npm ou yarn para gerenciamento de pacotes

### Passo a Passo

1. **Clone o repositório**:
   ```bash
   git clone [url-do-repositorio]
   cd ai_quiz
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   # ou
   yarn
   ```

3. **Configure as variáveis de ambiente**:
   ```bash
   # Crie um arquivo .env na raiz do projeto
   VITE_GOOGLE_GEMINI_API_KEY=sua_api_key_aqui
   ```

4. **Inicie a aplicação**:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse no navegador**:
   [http://localhost:5173](http://localhost:5173)

### Obtendo a API Key

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma nova API Key
3. Adicione a chave no arquivo `.env`

## 🧪 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento com hot-reload
- `npm run build` - Compila TypeScript e gera build otimizada para produção
- `npm run typecheck` - Executa verificação de tipos TypeScript sem emitir arquivos
- `npm run lint` - Executa verificação de código com ESLint + TypeScript
- `npm run preview` - Serve a build de produção localmente

## 🔍 Decisões Técnicas

### Por que Google Gemini AI?

- **Performance**: Modelo Gemini-2.0-Flash oferece resposta rápida
- **Qualidade**: Geração consistente de conteúdo educativo
- **Custo-benefício**: API gratuita com limites generosos
- **Confiabilidade**: Infraestrutura robusta do Google

### Por que React 19 + TypeScript?

- **Hooks Modernos**: Aproveitamento dos recursos mais recentes com tipagem completa
- **Type Safety**: Detecção de erros em tempo de compilação
- **Performance**: Melhorias significativas de renderização com tipos otimizados
- **Developer Experience**: IntelliSense, refactoring seguro e documentação automática
- **Manutenibilidade**: Código mais robusto e fácil de manter a longo prazo

### Por que Vite?

- **Velocidade**: HMR extremamente rápido durante desenvolvimento
- **Simplicidade**: Configuração mínima necessária
- **Otimização**: Build de produção otimizada automaticamente

## 🎓 Aprendizados e Demonstrações

### Habilidades Demonstradas

- **TypeScript Avançado**: Type guards, interfaces complexas e tipagem rigorosa
- **Integração com APIs de IA**: Implementação type-safe de LLMs
- **Processamento de Dados**: Parsing e validação type-safe de JSON complexo
- **Estado Complexo**: Gerenciamento tipado de múltiplos estados da aplicação
- **Error Handling**: Tratamento robusto de exceções com tipos específicos
- **UX/UI Design**: Interface intuitiva, responsiva e type-safe
- **React Moderno**: Uso de hooks tipados e padrões atuais do mercado

### Challenges Superados

- **Migração para TypeScript**: Refatoração completa mantendo funcionalidade
- **Type Safety em Runtime**: Implementação de type guards para validação de API
- **Inconsistência de API**: Tratamento type-safe de variações no formato de resposta
- **Configuração TypeScript**: Setup otimizado para React 19 + Vite + ESLint
- **Parsing Robusto**: Limpeza automática type-safe de markdown e formatação
- **Estado de Loading**: Feedback visual tipado durante operações assíncronas

## 📝 Sobre o Desenvolvedor

Esta aplicação foi desenvolvida para demonstrar competências em:

- **Frontend Moderno**: React 19, TypeScript, CSS moderno
- **Type Safety**: Desenvolvimento rigoroso com TypeScript e type guards
- **Integração de IA**: APIs de LLM com tipagem e prompt engineering
- **Qualidade de Código**: ESLint, configurações rigorosas e best practices
- **UX/UI Design**: Interfaces responsivas, acessíveis e type-safe
- **Arquitetura**: Código limpo, modular, tipado e altamente manutenível
- **Problem Solving**: Soluções criativas e type-safe para desafios técnicos

---

### 🌐 Contato

- 🌐 [GitHub](https://github.com/andersonssantana/)
- 👔 [LinkedIn](https://www.linkedin.com/in/andersonssantana/)
- ✉️ [E-mail](mailto:anderssantana@outlook.com)

---

Desenvolvido com 🤖, ⚛️, 🔷 e 💡 - Demonstrando a fusão entre React 19, TypeScript e Inteligência Artificial
