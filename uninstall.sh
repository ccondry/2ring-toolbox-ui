#!/bin/sh
echo "uninstalling wfo-toolbox-ui..."
echo "deleting web files directory..."
rm -rf /var/www/toolbox/wfo
echo "web files deleted. You may need to remove the entry in your nginx config that pointed to this wfo folder."
echo "and there might be a cron job you should delete that kept this repo updated."
echo "successfully uninstalled wfo-toolbox-ui."
