
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

  80  13/08/26 17:34:54 git pull
   81  13/08/26 17:36:12 cd /tmp
   82  13/08/26 17:36:12 rm -rf emptrack
   83  13/08/26 17:36:30 git clone https://github.com/talarisureshdevops/emptrack.git
   84  13/08/26 17:36:32 ll
   85  13/08/26 17:36:42 cd /tmp/emptrack/frontend
   86  13/08/26 17:36:49 ll
   87  13/08/26 17:37:01 git pull
   88  13/08/26 17:37:26 rm -rf /usr/share/nginx/html/*
   89  13/08/26 17:37:26 cp -r /tmp/emptrack/frontend/* /usr/share/nginx/html/
   90  13/08/26 17:37:40 ls -la /usr/share/nginx/html/
   91  13/08/26 17:37:52 systemctl start nginx
   92  13/08/26 17:37:52 systemctl enable nginx
   93  13/08/26 17:38:03 systemctl status nginx
   94  13/08/26 17:38:39 cd js
   95  13/08/26 17:38:40 ll
   96  13/08/26 17:38:48 cat config.js
   97  13/08/26 17:40:40 curl http://localhost:5000
   98  13/08/26 17:41:39 curl -v http://50.19.4.29:5000
   99  13/08/26 17:41:58 histroy
  100  13/08/26 17:42:07 history
