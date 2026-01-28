# obter arquivo kubeconfig
- baixar arquivo kubeconfig
![kubeconfig](obter-arquivo-kubeconfig.png)
- renomear arquivo kubeconfig para spro-examples-kubeconfig.yaml
![renomear para spro-examples-kubeconfig](renomear-para-spro-examples-kubeconfig.png)

# kubectl
- kubectl cli https://kubernetes.io/pt-br/docs/tasks/tools/install-kubectl-windows/
- kubectl login: choco install kubelogin (windows)

## teste de conexão
- kubectl --kubeconfig="<caminho-para-o-arquivo>\spro-examples-kubeconfig.yaml"
- login
![login](login-btp.png)
- listar pods no namespace default
![lista de pods](pods-default.png)