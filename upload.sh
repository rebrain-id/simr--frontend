ssh rebrain@103.179.56.226 'sudo rm -rf /var/www/simr.rebrainstudio.com/*'

rsync -avz --progress /Users/bayeng/Documents/Project/Kerja/ProjectBuRos/frontend-simr/dist/* rebrain@103.179.56.226:/var/www/simr.rebrainstudio.com/ --rsync-path='sudo rsync'
