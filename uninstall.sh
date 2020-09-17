#!/bin/sh
echo "uninstalling 2ring-toolbox-ui..."
echo "deleting web files directory..."
rm -rf /var/www/toolbox/2ring
echo "web files deleted. You may need to remove the entry in your nginx config that pointed to this 2ring folder."
echo "and there might be a cron job you should delete that kept this repo updated."
echo "successfully uninstalled 2ring-toolbox-ui."
