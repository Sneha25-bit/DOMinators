
import React, { useState,useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Gamepad2, Fish, X, Circle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { logUserActivity } from '@/api/dashboard';

const logActivity = async (type: 'game', description: string, points: number) => {
  try {
    await logUserActivity({ type, description, points });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};

const GamesPage = () => {
  const { user, updateUserPoints, isAuthenticated } = useAuth();
  const [activeGame, setActiveGame] = useState<'none' | 'tictactoe' | 'guessfish'>('none');

  const token = localStorage.getItem('access_token');

  // Tic Tac Toe State
  const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | 'draw'>('playing');

  // Guess the Fish State
  const [currentFish, setCurrentFish] = useState(0);
  const [score, setScore] = useState(0);
  const [fishGameStatus, setFishGameStatus] = useState<'playing' | 'ended'>('playing');

  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const fetchLeaderboard = async () => {
  try {
    const res = await fetch('https://dominators.onrender.com/api/users/leaderboard/')
    if (!res.ok) throw new Error("Failed to fetch leaderboard");
    const data = await res.json();
    const ranked = data
      .sort((a: any, b: any) => b.points - a.points)
      .map((player: any, index: number) => ({
        rank: index + 1,
        username: player.username,
        points: player.points,
        character: player.marine_character,
      }));
    setLeaderboard(ranked);
  } catch (err) {
    console.error("Failed to load leaderboard:", err);
    toast.error("Couldn't load leaderboard.");
  }
};

useEffect(() => {
  fetchLeaderboard();
}, []);


  const fishQuestions = [
    {
      question: "Which fish is known as the 'King of the Ocean'?",
      options: ['Great White Shark', 'Blue Whale', 'Tuna', 'Swordfish'],
      correct: 0,
      emoji: '🦈'
    },
    {
      question: "What is the fastest fish in the ocean?",
      options: ['Tuna', 'Sailfish', 'Marlin', 'Shark'],
      correct: 1,
      emoji: '🐟'
    },
    {
      question: "Which marine animal has three hearts?",
      options: ['Dolphin', 'Whale', 'Octopus', 'Squid'],
      correct: 2,
      emoji: '🐙'
    },
    {
      question: "What do sea turtles use for navigation?",
      options: ['Stars', 'Magnetic fields', 'Sound waves', 'Ocean currents'],
      correct: 1,
      emoji: '🐢'
    }
  ];

  const getCharacterEmoji = (character: string) => {
    const emojis: { [key: string]: string } = {
      dolphin: '🐬',
      turtle: '🐢',
      whale: '🐋',
      octopus: '🐙',
      shark: '🦈',
      seahorse: '🦄'
    };
    return emojis[character] || '🐠';
  };

  // Tic Tac Toe Logic
  const checkWinner = (squares: ('X' | 'O' | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleTicTacToeClick = async (index: number) => {
    if (board[index] || gameStatus !== 'playing' || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const winner = checkWinner(newBoard);
    if (winner === 'X') {
      setGameStatus('won');
      updateUserPoints(50);
      toast.success('You won! +50 points!');
      await logActivity('game', 'Won Tic Tac Toe', 50);
      await fetchLeaderboard();
      
      return;
    }

    if (newBoard.every(cell => cell !== null)) {
      setGameStatus('draw');
      updateUserPoints(10);
      toast.success('Draw! +10 points!');
      await logActivity('game', 'Drew Tic Tac Toe', 10);
      await fetchLeaderboard();
      return;
    }

    // AI move
    setTimeout(() => {
      ( async () => {
        const aiBoard = [...newBoard];
      const emptyCells = aiBoard.map((cell, idx) => cell === null ? idx : null).filter(val => val !== null);
      if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        aiBoard[randomIndex!] = 'O';
        setBoard(aiBoard);

        const aiWinner = checkWinner(aiBoard);
        if (aiWinner === 'O') {
          setGameStatus('lost');
          toast.error('AI wins this time!');
        } else if (aiBoard.every(cell => cell !== null)) {
          setGameStatus('draw');
          updateUserPoints(10);
          toast.success('Draw! +10 points!');
          await logActivity('game', 'Drew Tic Tac Toe', 10);
        } else {
          setIsPlayerTurn(true);
        }
      }
      })();
    }, 1000);
  };
  const resetTicTacToe = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus('playing');
  };

  // Guess the Fish Logic
  const handleFishAnswer = async (selectedAnswer: number) => {
  const isCorrect = selectedAnswer === fishQuestions[currentFish].correct;
  const isLastQuestion = currentFish === fishQuestions.length - 1;
  const newScore = isCorrect ? score + 1 : score;

  if (isCorrect) {
    setScore(newScore);
    updateUserPoints(25);
    toast.success('Correct! +25 points!');
  } else {
    toast.error('Wrong answer! Try again next time.');
  }

  if (!isLastQuestion) {
    setCurrentFish(prev => prev + 1);
  } else {
    setFishGameStatus('ended');
    toast.success(`Game complete! Final score: ${newScore}/${fishQuestions.length}`);
    await logActivity('game', 'Completed Guess the Fish Quiz', newScore * 25);
    await fetchLeaderboard();
  }
};

  const resetGuessTheFish = () => {
    setCurrentFish(0);
    setScore(0);
    setFishGameStatus('playing');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Gamepad2 className="w-10 h-10 mr-4" />
            Ocean Games
            <Fish className="w-10 h-10 ml-4" />
          </h1>
          <p className="text-white/80 text-lg">
            Play marine-themed games and compete with ocean lovers worldwide
          </p>
        </div>

        {activeGame === 'none' && (
          <>
            {/* Game Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card 
                className="bg-gradient-to-br from-blue-500/80 to-cyan-500/20 backdrop-blur-md border-white/30 cursor-pointer hover:bg-white/20 transition-all duration-300 ripple-effect"
                onClick={() => setActiveGame('tictactoe')}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">⭕</div>
                  <CardTitle className="text-white">Ocean Tic-Tac-Toe</CardTitle>
                  <CardDescription className="text-white/80">
                    Classic game with a marine twist! Win: 50 points, Draw: 10 points
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    Play Game
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="bg-gradient-to-br from-green-500/80 to-teal-500/20 backdrop-blur-md border-white/30 cursor-pointer hover:bg-white/20 transition-all duration-300 ripple-effect"
                onClick={() => setActiveGame('guessfish')}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">🐠</div>
                  <CardTitle className="text-white">Guess the Fish</CardTitle>
                  <CardDescription className="text-white/80">
                    Test your marine knowledge! Each correct answer: 25 points
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Ocean Champions Leaderboard
                </CardTitle>
                <CardDescription className="text-white/80">
                  Top players in our ocean community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div 
                      key={player.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        player.username === user?.username 
                          ? 'bg-cyan-500/30 border border-cyan-400/50' 
                          : 'bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          player.rank === 1 ? 'bg-yellow-500 text-white' :
                          player.rank === 2 ? 'bg-gray-400 text-white' :
                          player.rank === 3 ? 'bg-orange-500 text-white' :
                          'bg-white/20 text-white'
                        }`}>
                          {player.rank}
                        </div>
                        <div className="text-2xl">{getCharacterEmoji(player.character)}</div>
                        <div>
                          <p className="text-white font-medium">@{player.username}</p>
                          <p className="text-white/70 text-sm">{player.points} points</p>
                        </div>
                      </div>
                      {player.rank <= 3 && (
                        <Trophy className={`w-5 h-5 ${
                          player.rank === 1 ? 'text-yellow-400' :
                          player.rank === 2 ? 'text-gray-300' :
                          'text-orange-400'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Tic Tac Toe Game */}
        {activeGame === 'tictactoe' && (
          <Card className="bg-white/20 backdrop-blur-md border-white/30 max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Ocean Tic-Tac-Toe</CardTitle>
              <CardDescription className="text-white/80">
                You are X, AI is O. Three in a row wins!
              </CardDescription>
              <div className="flex justify-between items-center">
                <Badge className="bg-cyan-600 text-white">
                  Status: {gameStatus === 'playing' ? (isPlayerTurn ? 'Your Turn' : 'AI Turn') : 
                           gameStatus === 'won' ? 'You Won!' : 
                           gameStatus === 'lost' ? 'AI Won!' : 'Draw!'}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveGame('none')}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Back to Games
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {board.map((cell, index) => (
                  <Button
                    key={index}
                    className="h-20 w-20 text-2xl bg-white/20 hover:bg-white/30 border border-white/30"
                    onClick={() => handleTicTacToeClick(index)}
                    disabled={!!cell || gameStatus !== 'playing' || !isPlayerTurn}
                  >
                    {cell === 'X' ? <span className="text-3xl">🐠</span> : 
                    cell === 'O' ? <span className="text-3xl">🐡</span> : ''}

                  </Button>
                ))}
              </div>
              {gameStatus !== 'playing' && (
                <Button 
                  onClick={resetTicTacToe}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Play Again
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Guess the Fish Game */}
        {activeGame === 'guessfish' && (
          <Card className="bg-white/20 backdrop-blur-md border-white/30 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Guess the Fish</CardTitle>
              <CardDescription className="text-white/80">
                Test your marine knowledge!
              </CardDescription>
              <div className="flex justify-between items-center">
                <Badge className="bg-teal-600 text-white">
                  Score: {score}/{fishQuestions.length}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveGame('none')}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Back to Games
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {fishGameStatus === 'playing' ? (
                <div className="text-center space-y-6">
                  <div className="text-6xl mb-4">
                    {fishQuestions[currentFish].emoji}
                  </div>
                  <h3 className="text-xl text-white font-semibold mb-6">
                    {fishQuestions[currentFish].question}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {fishQuestions[currentFish].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleFishAnswer(index)}
                        className="p-4 h-auto bg-white/20 hover:bg-white/30 text-white border border-white/30"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-2xl text-white font-bold">Quiz Complete!</h3>
                  <p className="text-white/80 text-lg">
                    Final Score: {score}/{fishQuestions.length}
                  </p>
                  <p className="text-white/80">
                    You earned {score * 25} points!
                  </p>
                  <Button 
                    onClick={resetGuessTheFish}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Play Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default GamesPage;