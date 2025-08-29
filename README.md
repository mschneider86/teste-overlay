# Teste Overlay - Sistema de Tramitações

Projeto Angular desenvolvido para demonstrar um sistema de overlay persistente para tramitações de processos.

## Funcionalidades

- **Overlay Persistente**: O overlay de tramitações permanece aberto e preserva os dados do formulário durante a navegação entre as abas do sistema
- **Gerenciamento de Estado**: Utiliza serviços Angular para manter o estado global do overlay
- **Interface Responsiva**: Design moderno utilizando Angular Material
- **Formulário Reativo**: Validação e controle de dados usando Reactive Forms

## Tecnologias Utilizadas

- Angular 15+
- Angular Material
- TypeScript
- RxJS
- CSS3

## Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o projeto: `ng serve`
4. Acesse `http://localhost:4200`

## Funcionalidade Principal

O sistema permite:

1. **Abrir Overlay**: Clique no botão "Adicionar Tramitações" para abrir o overlay
2. **Persistência de Dados**: Navegue entre as abas "Dados Gerais" e "Partes Envolvidas" - o overlay permanece aberto com os dados preservados
3. **Gerenciamento de Formulário**: 
   - Preencha os campos do formulário
   - Os dados são automaticamente salvos durante a navegação
   - Use o botão "Limpar" para resetar o formulário
   - Use "Salvar" para confirmar a tramitação
   - Use "Cancelar" para fechar sem salvar

## Arquitetura

O projeto utiliza uma arquitetura baseada em:

- **OverlayService**: Gerencia o estado global do overlay usando BehaviorSubject
- **GlobalOverlayComponent**: Componente wrapper que renderiza o overlay em qualquer lugar da aplicação
- **TramitacaoOverlayComponent**: Componente específico do formulário de tramitações
- **Comunicação Reativa**: Uso de Observables para comunicação entre componentes

## Demonstração

Este projeto demonstra como implementar um overlay persistente que:
- Mantém estado durante navegação SPA
- Preserva dados de formulário
- Utiliza padrões modernos do Angular
- Implementa uma UX fluida e intuitiva

---

**Desenvolvido para demonstração de conceitos avançados de Angular e gerenciamento de estado.**
