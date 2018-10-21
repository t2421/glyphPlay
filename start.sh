
currentDir=$0
cd `dirname $currentDir`
cd frontend
npm run rollup &

cd `dirname $currentDir`
cd frontend/public
php -S localhost:9999 &

cd `dirname $currentDir`
node server-node/server.js &