# Regras de Negócio — ContentFlow Mobile

## 1. Objetivo

As regras de negócio definem as condições e comportamentos que devem ser seguidos pelo **ContentFlow Mobile**, garantindo que o gerenciamento de ideias e o planejamento de posts ocorram de forma organizada e consistente.

O sistema possui dois fluxos principais de conteúdo:

* **Banco de Ideias:** destinado ao armazenamento de conteúdos que ainda não foram estruturados para publicação.
* **Posts / Planejamento:** destinado aos conteúdos que já estão sendo desenvolvidos para publicação.

Uma ideia pode posteriormente ser transformada em um post e entrar no fluxo de planejamento.

---

## 2. Conta e Acesso

### RN01 — Criação de conta

O usuário deve criar uma conta para utilizar as funcionalidades do sistema.

### RN02 — Dados obrigatórios

O cadastro deve exigir o preenchimento dos campos definidos como obrigatórios pelo sistema.

### RN03 — Autenticação

O usuário deve realizar login utilizando credenciais válidas para acessar suas funcionalidades e conteúdos.

### RN04 — Acesso aos conteúdos

O usuário autenticado deve ter acesso somente aos conteúdos vinculados à sua própria conta.

---

## 3. Banco de Ideias

### RN05 — Finalidade da ideia

Uma ideia representa um conteúdo que o usuário deseja armazenar para desenvolver futuramente, sem necessariamente possuir todas as informações necessárias para uma publicação.

### RN06 — Criação de ideia

O usuário pode criar uma ideia independentemente de possuir um post relacionado.

### RN07 — Gerenciamento de ideias

O usuário pode visualizar, editar e excluir suas ideias armazenadas no Banco de Ideias.

### RN08 — Status da ideia

As ideias não fazem parte do fluxo de status dos posts. Portanto, os status **Planejado**, **Em andamento** e **Postado** não se aplicam às ideias.

### RN09 — Transformação de ideia em post

O usuário pode transformar uma ideia existente em um post quando decidir desenvolver aquele conteúdo para publicação.

### RN10 — Aproveitamento das informações

Ao transformar uma ideia em post, as informações já cadastradas na ideia podem ser utilizadas no preenchimento inicial do novo post.

### RN11 — Histórico da ideia

Após uma ideia ser transformada em post, o sistema deve preservar seu registro ou identificá-la como utilizada, evitando a perda do histórico do conteúdo original.

---

## 4. Posts e Planejamento

### RN12 — Criação direta de post

O usuário pode criar um post diretamente, sem que ele tenha origem em uma ideia.

### RN13 — Post no planejamento

Todo post criado faz parte do fluxo de planejamento de conteúdo do sistema.

### RN14 — Informações do post

Um post pode possuir informações como título, tipo de conteúdo, legenda, data de publicação e demais dados definidos pelo sistema.

### RN15 — Status do post

Todo post deve possuir um status que represente sua situação atual no processo de produção.

### RN16 — Status disponíveis

Os posts devem utilizar os seguintes status:

1. **Planejado**
2. **Em andamento**
3. **Postado**

### RN17 — Status Planejado

O status **Planejado** representa um conteúdo que já foi definido como post, mas ainda não está em processo de produção.

### RN18 — Status Em andamento

O status **Em andamento** representa um conteúdo que está sendo produzido ou preparado para publicação.

### RN19 — Status Postado

O status **Postado** representa um conteúdo que já foi publicado.

### RN20 — Alteração de status

O usuário pode alterar o status de um post de acordo com o andamento de sua produção.

---

## 5. Fluxo entre Ideias e Posts

### RN21 — Duas formas de criar um post

Um post pode ser criado de duas maneiras:

* Diretamente pelo usuário;
* A partir de uma ideia existente no Banco de Ideias.

### RN22 — Conversão de ideia

Ao selecionar a opção de transformar uma ideia em post, o sistema deve iniciar a criação de um novo post utilizando as informações disponíveis da ideia.

### RN23 — Independência entre ideia e post

Após a criação do post a partir de uma ideia, o post deve poder ser editado independentemente da ideia original.

### RN24 — Relação entre origem e post

Quando aplicável, o sistema deve manter a identificação de que determinado post foi originado a partir de uma ideia.

### RN25 — Exclusão do post

A exclusão de um post não deve excluir automaticamente a ideia que deu origem a ele, caso o registro da ideia seja mantido pelo sistema.

---

## 6. Gerenciamento de Conteúdo

### RN26 — Edição

O usuário pode editar seus próprios conteúdos, respeitando as regras específicas de cada tipo de conteúdo.

### RN27 — Exclusão

O usuário pode excluir suas próprias ideias e posts.

### RN28 — Propriedade do conteúdo

Somente o usuário responsável pelo conteúdo pode realizar operações de edição ou exclusão sobre suas ideias e posts.

---

## 7. Fluxo principal do conteúdo

O ContentFlow possui dois caminhos principais:

```text
                         CONTEÚDO
                            │
              ┌─────────────┴─────────────┐
              ↓                           ↓
       BANCO DE IDEIAS             POSTS / PLANEJAMENTO
              │                           │
              │                           ↓
              │                       PLANEJADO
              │                           │
              │                           ↓
              │                     EM ANDAMENTO
              │                           │
              │                           ↓
              │                        POSTADO
              │
              │
              └──── TRANSFORMAR EM POST ────► POST
```

Um conteúdo pode, portanto:

**Caminho 1 — Ideia → Post**

```text
Criar ideia
     ↓
Banco de Ideias
     ↓
Transformar em post
     ↓
Planejado
     ↓
Em andamento
     ↓
Postado
```

**Caminho 2 — Post direto**

```text
Criar post
     ↓
Planejado
     ↓
Em andamento
     ↓
Postado
```

---

## 8. Resumo das regras

| Código | Regra                                                                    |
| ------ | ------------------------------------------------------------------------ |
| RN01   | O usuário deve possuir uma conta para utilizar o sistema.                |
| RN02   | O cadastro deve exigir os dados obrigatórios.                            |
| RN03   | O acesso exige autenticação válida.                                      |
| RN04   | O usuário acessa somente seus próprios conteúdos.                        |
| RN05   | Ideias representam conteúdos ainda não estruturados para publicação.     |
| RN06   | O usuário pode criar ideias independentemente de posts.                  |
| RN07   | Ideias podem ser visualizadas, editadas e excluídas.                     |
| RN08   | Ideias não utilizam os status dos posts.                                 |
| RN09   | Uma ideia pode ser transformada em post.                                 |
| RN10   | Dados da ideia podem ser aproveitados na criação do post.                |
| RN11   | O histórico da ideia deve ser preservado ou identificado como utilizado. |
| RN12   | Posts podem ser criados diretamente.                                     |
| RN13   | Posts fazem parte do planejamento.                                       |
| RN14   | Posts possuem informações próprias de planejamento.                      |
| RN15   | Todo post possui um status.                                              |
| RN16   | Os status são Planejado, Em andamento e Postado.                         |
| RN17   | Planejado representa conteúdo definido, mas ainda não produzido.         |
| RN18   | Em andamento representa conteúdo em produção.                            |
| RN19   | Postado representa conteúdo publicado.                                   |
| RN20   | O usuário pode alterar o status do post.                                 |
| RN21   | Posts podem ser criados diretamente ou a partir de ideias.               |
| RN22   | Transformar uma ideia inicia a criação de um post.                       |
| RN23   | Post e ideia podem ser editados independentemente.                       |
| RN24   | O sistema pode manter a origem do post.                                  |
| RN25   | Excluir um post não exclui automaticamente sua ideia de origem.          |
| RN26   | O usuário pode editar seus conteúdos.                                    |
| RN27   | O usuário pode excluir seus conteúdos.                                   |
| RN28   | Somente o proprietário pode alterar ou excluir seus conteúdos.           |
