setlocal
pushd %~dp0
%@Try%
  REM 

  echo automate commit and push

  echo __________________________________________
  echo wnn.dev
  set /p commit_message=Digite a mensagem do commit: 
  set /p origin_name=Digite o nome da origin: 
  git add .
  git commit -m "%commit_message%"
  git push origin "%origin_name%"
  

%@EndTry%
:@Catch
  REM Exception handling code goes here
:@EndCatch

pause