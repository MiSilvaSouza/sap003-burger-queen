# Burger Queen

## Índice

* [1. Burger Queen](#1-burger-queen)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Interface](#3-interface)
* [4. Tecnologias Utilizadas](#4-tecnologias-utilizadas)
* [5. Como Executar](#5-como-executar)
* [6. Segurança](#6-segurança)

***

## 1. Burger Queen

Aplicativo _Single Page Aplication_ para utilização de um restaurante. Possibilita ao garçon anotar pedidos utilizando um tablet e enviá-los para a cozinha para que sejam preparados.

## 2. Resumo do projeto

A interface do salão, mostra o menu do restaurante divido em dois grupos: café da manhã e restante do dia.
Nesta interface o garçon pode selecionar a escolha do cliente, digitar o nome do cliente, mesa e enviar o pedido para cozinha para serem preparados.

A interface da cozinha, mostra a relação de pedidos pendentes que deverão ser preparados.
Após preparação, a cozinha mudará o status do pedido para pronto e conseguirá uma relação de todos os pedidos prontos.
Quando o pedido for entregue o status será mudado para entregue e todos os pedidos entregues serão relacionados com o tempo de preparo.

## 3. Interface

  INTERFACE SALÃO

![Saloon1](https://raw.githubusercontent.com/MiSilvaSouza/sap003-burger-queen/master/public/imagens/Captura%20de%20tela%20de%202020-01-14%2017-19-14.png)

![Saloon2](https://raw.githubusercontent.com/MiSilvaSouza/sap003-burger-queen/master/public/imagens/Captura%20de%20tela%20de%202020-01-14%2017-19-43.png)

 INTERFACE COZINHA

![Pending](https://raw.githubusercontent.com/MiSilvaSouza/sap003-burger-queen/master/public/imagens/Captura%20de%20tela%20de%202020-01-14%2017-20-37.png)

![Ready](https://raw.githubusercontent.com/MiSilvaSouza/sap003-burger-queen/master/public/imagens/Captura%20de%20tela%20de%202020-01-14%2017-21-07.png)

![Delivered](https://raw.githubusercontent.com/MiSilvaSouza/sap003-burger-queen/master/public/imagens/Captura%20de%20tela%20de%202020-01-14%2017-21-34.png)



 
## 4. Tecnologias Utilizadas

* JavaScript (ES6)
* HTML5
* CSS
* Firebase v12 (modular API)
* Aphrodite
* Growl
* React 16.12
* React Router DOM 5.1

## 5. Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)
- Conta Firebase configurada

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/MiSilvaSouza/sap003-burger-queen.git
cd sap003-burger-queen
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

3. Edite `.env.local` e adicione suas credenciais do Firebase

4. Instale as dependências:
```bash
npm install
```

5. Inicie o servidor de desenvolvimento:
```bash
npm start
```

6. Para build de produção:
```bash
npm run build
```

## 6. Segurança

Este projeto foi auditado e todas as vulnerabilidades conhecidas foram corrigidas.

**Status de Segurança**: ✅ **0 vulnerabilidades** (npm audit)

### Principais Melhorias de Segurança:

1. **Credenciais Protegidas**: Todas as credenciais do Firebase foram movidas para variáveis de ambiente
2. **Dependências Atualizadas**: Todos os pacotes vulneráveis foram atualizados para versões seguras
3. **Firebase Moderno**: Atualizado para Firebase v12 com API modular

Para mais detalhes sobre segurança, consulte [SECURITY.md](./SECURITY.md).

### Verificar Vulnerabilidades

Execute regularmente para verificar vulnerabilidades:
```bash
npm audit
```

