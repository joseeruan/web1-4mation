# 4mation

Este é um jogo de tabuleiro estilo **4mation** em JavaScript, onde dois jogadores competem para formar uma linha de 4 peças consecutivas ortogonalmente ou diagonalmente.  antes que o outro jogador o faça. 

## Como Jogar

1. **Início do Jogo**: Ao carregar o jogo, ele inicia automaticamente com o jogador **azul**.
2. **Jogadores**: O jogo alterna entre dois jogadores: **azul** e **vermelho**.
3. **Inserção de Peças**: Para jogar, clique nas células vazias do tabuleiro. O jogador **azul** começa e a cada rodada o jogador alterna.
4. **Regras Especiais para o Jogador Vermelho**:
    - O jogador **vermelho** só pode fazer a sua jogada em uma célula adjacente à sua última jogada.
    - Se não houver movimentos adjacentes possíveis, o jogador **vermelho** pode escolher qualquer célula vazia.
5. **Vencedor**: O vencedor é o primeiro a formar uma linha de 4 peças consecutivas (vertical, horizontal ou diagonal).
6. **Empate**: O jogo termina empatado quando todas as células do tabuleiro são preenchidas e nenhum jogador venceu.

## Funcionalidades

- **Alternância entre Jogadores**: O jogo alterna entre **azul** e **vermelho** a cada jogada.
- **Mensagem de Status**: O jogo exibe uma mensagem com o nome do jogador que deve jogar, e uma mensagem final quando alguém vence ou o jogo empata.
- **Reiniciar Jogo**: Após o fim de uma partida, há um botão para reiniciar o jogo.
- **Destaque para Movimentos Disponíveis**: As células onde um jogador pode colocar uma peça são destacadas em verde.
=======