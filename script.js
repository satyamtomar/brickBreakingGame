let bricks=[]
let brickRows=5;
let brickColumns=8
let width=400;
let height=400;
let ball_x=width/2;
let ball_y=height/2;
let ballDiameter=25;
let ball_dx=3;
let ball_dy=1;
let brickWidth=50;
let brickHeight=20;
let paddle_x=0;
let paddle_y=height-30;
let paddleWidth=80;
let paddleHeight=20;
let ballDirX='+';
let ballDirY='+';
let score=0;
let brickOffSet=20;
let difLev=1;

function setup() {
  createCanvas(width, height);
  
  setInterval(gameLevel,15000);
  
  for(let i=0;i<brickRows;i++)
    {
      for(let j=0;j<brickColumns;j++)
        {
          let brick={
            x:j*brickWidth,y:i*brickHeight
          }
          bricks.push(brick);
        }
    }
}

function draw() {
  background('rgb(217,139,217)');
  paddle_x=max(0,min(mouseX,width-paddleWidth));
  //ball
  fill('rgb(116,116,175)')
  circle(ball_x,ball_y,ballDiameter);
  
  //paddle
  fill('rgb(18,93,110)')
  rect(paddle_x,paddle_y,paddleWidth,paddleHeight,5);
  
  
  //brick
  for(let brick of bricks)
    {
      fill('rgb(202,81,120)') 
      rect(brick.x,brick.y,brickWidth,brickHeight);
    }
  
  
  isGameOver();
  isWallHit();
  isPaddleHit();
  isBrickHit();
  //ballMovement
  ballMovement();
  fill('#515A83')
  textSize(18)
  text(`Difficulty level: ${difLev-1}`,width/2-70,height/2-10)
  textSize(16);
  text(`Your Score: ${score}`,width/2-60,height/2+10);
}
function gameLevel()
{
  brickRows++;
  
  if(ball_dy<5)
    {
      ball_dy++;
      difLev++;
    }
  
  if(ball_dx<7)
    {
      ball_dx++;
    }
  for(let brick of bricks )
    {
      brick.y=brick.y+brickHeight;
    }
  for(let i=0;i<brickColumns;i++)
    {
      let brick={
        x:i*brickWidth,y:0
      }
      bricks.push(brick);
    }
    
}
function isGameOver()
{
  if(ball_y+ballDiameter/2>=height)
    {
      noLoop();
      textSize(30);
      fill('#515A83')
      text('Game Over',width/2-80,height/2-40);
    }
}
function isWallHit()
{
  if(ball_x+ballDiameter/2>=width)
  {
    ball_x=width-ballDiameter/2;
    ballDirX='-';
  }
  
  if(ball_x-ballDiameter/2<=0)
    {
      ball_x=ballDiameter/2;
      ballDirX='+';
    }
  if(ball_y-ballDiameter/2<=0)
    {
      ball_y=ballDiameter/2;
      ballDirY='+';
    }
  
}
function isPaddleHit()
{
  if(ball_x>=paddle_x && ball_x<=paddle_x+paddleWidth && ball_y+ballDiameter/2>=paddle_y && ball_y+ballDiameter/2<=paddle_y+ball_dy)
    {
      ball_y=paddle_y-ballDiameter/2;
      ballDirY='-';
      
    }
  if(ball_x-ballDiameter/2<=paddle_x+paddleWidth && ball_x-ballDiameter/2>=paddle_x+paddleWidth-ball_dx && ball_y+ballDiameter/2>=paddle_y && ball_y+ballDiameter/2<=paddle_y+ball_dy)
    {
      ball_y=paddle_y-ballDiameter/2;
      ballDirY='-';
      
    }
  if(ball_x+ballDiameter/2>=paddle_x && ball_x+ballDiameter/2<=paddle_x+ball_dx && ball_y+ballDiameter/2>=paddle_y && ball_y+ballDiameter/2<=paddle_y+ball_dy)
    {
      ball_y=paddle_y-ballDiameter/2;
      ballDirY='-';
      
    }
}
function isBrickHit()
{
  for(let brick of bricks)
    {
      if(ball_x>=brick.x && ball_x<=brick.x+brickWidth && ball_y-ballDiameter/2>=brick.y+brickHeight && ball_y-ballDiameter/2-ball_dy<=brick.y+brickHeight)
        {
          ball_y=brick.y+brickHeight+ballDiameter/2+ball_dy;
          ballDirY='+';
          bricks.splice(bricks.indexOf(brick),1);
          score++;
        }
      
//       if(ball_x-ballDiameter/2<=brick.x+brickWidth && ball_x-ballDiameter/2>=brick.x+brickWidth-ball_dx && ball_y>=brick.y && ball_y<=brick.y+brickHeight)
//         {
//             ball_x=brick.x+ballDiameter/2;
//           ballDirX='+';
//           bricks.splice(bricks.indexOf(brick),1);
//           score++;
//         }
    }
}
function ballMovement()
{
  if(ballDirX=='+')
    {
      ball_x=ball_x+ball_dx;
    }
  else{
    ball_x=ball_x-ball_dx;
  }
  
  if(ballDirY=='+')
    {
      ball_y=ball_y+ball_dy;
    }
  else{
    ball_y=ball_y-ball_dy;
  }
}

