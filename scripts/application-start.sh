#!/bin/bash
sudo chmod -R 777 /home/ubuntu/temiverse-web
cd /home/ubuntu/temiverse-web
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
yarn install
yarn build
yarn start > app.out.log 2> app.err.log < /dev/null &