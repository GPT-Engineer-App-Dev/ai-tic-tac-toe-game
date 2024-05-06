import { useState } from 'react';
import { Box, Button, Container, Text, VStack, Grid, GridItem } from '@chakra-ui/react';

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      if (!newBoard.includes(null)) {
        setWinner('Tie');
      } else {
        aiMove(newBoard);
      }
    }
  };

  const aiMove = (newBoard) => {
    let available = [];
    newBoard.forEach((cell, idx) => {
      if (cell === null) available.push(idx);
    });
    const randomMove = available[Math.floor(Math.random() * available.length)];
    newBoard[randomMove] = 'O';
    setBoard(newBoard);
    setIsXNext(true);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {board.map((cell, index) => (
            <GridItem w="40px" h="40px" key={index} bg="teal.500" display="flex" alignItems="center" justifyContent="center" onClick={() => handleClick(index)}>
              <Text fontSize="xl" color="white">{cell}</Text>
            </GridItem>
          ))}
        </Grid>
        <Button colorScheme="teal" variant="outline" onClick={resetGame}>Reset Game</Button>
      </VStack>
    </Container>
  );
};

export default Index;