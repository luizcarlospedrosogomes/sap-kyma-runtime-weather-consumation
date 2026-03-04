krew ubuntu
```
(
  set -x; cd "$(mktemp -d)" &&
  curl -fsSLO "https://github.com/kubernetes-sigs/krew/releases/latest/download/krew-linux_amd64.tar.gz" &&
  tar zxvf krew-linux_amd64.tar.gz &&
  ./krew-linux_amd64 install krew
)
```

# kubelogin linux
```
curl -LO https://github.com/int128/kubelogin/releases/latest/download/kubelogin_linux_amd64.zip
unzip kubelogin_linux_amd64.zip
chmod +x kubelogin
sudo mv kubelogin /usr/local/bin/kubectl-oidc_login


kubectl oidc-login --version
```