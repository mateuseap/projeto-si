# Projeto (Sistemas Inteligentes)

<p align="center">
    <img src="https://i.imgur.com/AqknoMb.png" width="600" height="600" />
</p>

Esse projeto foi criado utilizando a biblioteca de animação [p5.js](https://p5js.org/) e tem a finalidade de representar visualmente um **agente autônomo** que realiza uma busca em um ambiente **totalmente observável** buscando um objeto alvo (uma comida). O usuário pode escolher qual será o algoritmo de busca utilizado pelo agente, os algoritmos disponíveis são:

- **BFS**
- **DFS**
- **Greedy**
- **Dijkstra**
- **A***

O ambiente em que o **agente autônomo** se encontra é gerado aleatoriamente e é composto por um **grid 35x35**, onde cada bloco desse grid pode ser de um desses 4 diferentes tipos de blocos: 

- [#DCCBB5] **Areia** (Menor custo)
- [#869818] **Pântano** (Custo médio)
- [#3399CC] **Água** (Maior custo)
- [#565656] **Obstáculo** (Custo ∞)

O **agente autônomo** não pode percorrer blocos que sejam do tipo [#565656] **Obstáculo** e além disso, quanto maior for o custo do bloco que o agente estiver percorrendo, mais lento ele fica. Por fim, vale ressaltar que a posição inicial do **agente autônomo** e do objeto alvo (a comida) também são gerados aleatoriamente.

## 💡 Como rodar o projeto pelo navegador

O deploy do projeto foi realizado utilizando o [GitHub Pages](https://pages.github.com/), basta acessar o link abaixo para rodar o nosso projeto diretamente no seu navegador:

https://mateuseap.github.io/projeto-si/

## 🚀 Como rodar o projeto localmente

Para rodar o projeto locamente você vai precisar instalar o [Node.js](https://nodejs.org/en/) `http-server`, siga os seguintes passos para realizar a instalação:

- Baixe e instale o [Node.js](https://nodejs.org/en/)
- Abra um terminal ou um command prompt (no **Windows** você deve executar o command prompt como administrador)
- No terminal digite o comando:

```bash
npm install -g http-server
```
Se você receber um erro de permissão no **Ubuntu**, tente executar o comando usando `sudo`. Depois de instalar o `http-server`, você está pronto para rodar o projeto!

A partir daí basta digitar o seguinte comando no terminal:

```bash
http-server
```

Ele mostrará em que URL o código será executado, então, você só precisa abrir a URL em seu navegador:

![http-server](https://i.imgur.com/DMHbcdU.png)

## 📋 Relatório de post mortem

1. **Maiores desafios, erros e aprendizados**
    - Dividir as tarefas entre os membros da equipe
    - Representar os algoritmos de busca visualmente (nos deparamos com diversos erros durante esse processo)
    - Definir a arquitetura do projeto

2. **Divisão do trabalho em grupo**
    - Menu, mapa e movimentação do agente: Williams
    - Algoritmos de busca: Guilherme, Mateus, Williams e Lucca
    - Refatoração do código: Guilherme, Mateus e Lucca

3. **Arquitetura e tecnologias utilizadas**
    - [p5.js](https://p5js.org/)
    - [Prettier](https://prettier.io/)
    - [GitHub](https://github.com/)
    - [GitHub Pages](https://pages.github.com/)
    - [http-server](https://www.npmjs.com/package/http-server)

## 👥 Grupo

- [Guilherme Morone (gma2)](https://github.com/guimorone)
- [Mateus Elias de Andrade Pereira (meap)](https://github.com/mateuseap)
- [Lucca Morosini Gioia (lmg2)](https://github.com/LuccaMorosiniGioia)
- [Williams Santiago (wssf)](https://github.com/wssantiago)
