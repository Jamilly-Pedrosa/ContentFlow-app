<p align="center">
  <img src="./docs/imagens/Cover.jpg" alt="Capa do projeto ContentFlow-app">
</p>

> Planeje posts, organize ideias e acompanhe seus resultados.

---

# ✦ Sobre

**ContentFlow App** é a versão mobile do [ContentFlow](https://github.com/RonyFonseca/ContentFlow-web.git), um sistema de planejamento e gestão de conteúdo para redes sociais. O aplicativo permite que social medias e criadores de conteúdo organizem suas ideias, planejem publicações e acompanhem o andamento dos seus conteúdos diretamente pelo celular.

---

## ✦ Funcionalidades

### 🔐 Autenticação

* Cadastro de usuários
* Login
* Validação de campos

---

### 💡 Banco de Ideias

Área destinada à organização de ideias de conteúdo.

* Criar novas ideias
* Visualizar ideias cadastradas
* Organizar ideias para utilização futura

---

### 📝 Gestão de Posts

Permite criar e acompanhar conteúdos que serão publicados.

* Criar post
* Editar post
* Visualizar informações do post
* Adicionar informações como:

  * Título
  * Tipo de conteúdo
  * Categoria
  * Legenda
  * Data
  * Status

---

### 🔄 Planejamento de Conteúdo

Organização do fluxo de produção dos conteúdos:

```text
CONTEÚDO
   │
   ├── Banco de Ideias
   │
   └── Planejamento
          │
          ├── Planejado
          ├── Em andamento
          └── Postado
```

---

### 📊 Acompanhamento

* Visualização dos posts
* Acompanhamento do status de produção
* Organização dos conteúdos planejados

---

## ✦ Tecnologias Utilizadas

### Mobile

* React Native
* Expo
* Expo Router
* TypeScript
* NativeWind
* Tailwind CSS

### UI e Design

* Figma
* Componentes reutilizáveis
* Design System

---

## 🎨 Design e Experiência

O design da aplicação foi prototipado no Figma, com foco em usabilidade, organização visual e fluxo intuitivo.

### ✦ Protótipo do app: [Figma Design](https://www.figma.com/design/Q7mCjCD4lsEHdAO4eLQ9xd/ContentFlow?node-id=707-2119) 

A interface foi projetada no Figma considerando:

* Hierarquia visual
* Componentização
* Acessibilidade
* Consistência de cores e tipografia
* Fluxos simples e intuitivos

### Principais componentes

* Buttons
* Inputs
* Containers
* Cards
* Navegação
* Elementos de formulário

### Principais telas

* Login
* Cadastro
* Banco de Ideias
* Criação de post
* Meus Posts
* Planejamento
* Análise
* Perfil

---

## 🧩 Arquitetura

A aplicação utiliza uma arquitetura baseada em componentes e rotas do **Expo Router**.

---

## ➜ Como executar o projeto

👉 É necessário ter o Node.js e o Expo configurados no ambiente de desenvolvimento.

1. Clone o repositório:

```bash
git clone https://github.com/Jamilly-Pedrosa/ContentFlow-app.git
```

2. Acesse a pasta do projeto
   
4. Instale as dependências: ```npm install```

5. Inicie o projeto: ```npx expo start```

₊⊹ Depois, é possível executar a aplicação utilizando um dispositivo físico com o Expo Go ou um emulador compatível.

