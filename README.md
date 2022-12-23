# temiverse-web
## Procedure to set up the ec2 instance when the ip address has changed
1. Restart Ant Media Server and reset SSL.
Reference: https://resources.antmedia.io/docs/setting-up-ssl

```
sudo service antmedia restart
sudo service antmedia status
```

```
cd /usr/local/antmedia
sudo ./enable_ssl.sh -d stream.robocore.ai -v custom
```
Then, go to wix.com to manage the DNS records, including the A record and the TXT record regarding the ACME challenge.

- https://stream.robocore.ai:5443/ should be working now.

<br>

2. Change the ip address that appears in `~/temiverse-web/pages/index.tsx`
For instance, update the ip address to `16.163.180.160`.
```js
<iframe
    className="temi-control"
    src="http://16.163.180.160:8000/"
    width="480"
    height="270"
/>
```

<br>

3. Restart temi-control and temiverse-web (both are web) 
```
cd ~
tmux new -s temi-control
```
Inside tmux,
```
cd temi-control
node index.js
```

```
cd ~
tmux new -s temiverse-web
```
Inside tmux,
```
cd temiverse-web

yarn install

yarn dev
```

```
tmux list-sessions
```

- http://16.163.180.160:3000/ should be working now.
