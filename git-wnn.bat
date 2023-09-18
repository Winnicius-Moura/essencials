setlocal
pushd %~dp0
%@Try%
  REM 

  echo automate commit and push

  echo __________________________________________
  echo wnn.dev
  set /p commit_message=Digite a mensagem do commit: 
  set /p origin_name=Digite o nome da origin: 
  set /p base_branch=Digite o nome da branch de destino: 
  set /p head_branch=Digite o nome da sua branch local: 
  set /p pr_title=Digite o título do Pull Request: 
  set /p pr_description=Digite a descrição do Pull Request: 
  git add .
  git commit -m "%commit_message%"
  git push origin "%origin_name%"
  gh pr create --base "%base_branch%" --head "%head_branch%" --title "%pr_title%" --body "%pr_description%"
  

%@EndTry%
:@Catch
  REM Exception handling code goes here
:@EndCatch

pause