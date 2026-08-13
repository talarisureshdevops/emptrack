
   58  13/08/26 14:26:31 file /tmp/emptrack.zip
   59  13/08/26 14:27:14 ll
   60  13/08/26 14:27:55 rm -rf /usr/share/nginx/html/*
   61  13/08/26 14:28:09 mkdir -p /tmp/emptrack
   62  13/08/26 14:28:25 unzip -q /tmp/emptrack.zip -d /tmp/emptrack
   63  13/08/26 14:28:42 cp -r /tmp/emptrack/emptrack-main/frontend/* /usr/share/nginx/html/
   64  13/08/26 14:28:54 ls -la /usr/share/nginx/html/
   65  13/08/26 14:29:24 systemctl restart nginx
   66  13/08/26 14:29:25 systemctl status nginx
   67  13/08/26 15:37:21 history
