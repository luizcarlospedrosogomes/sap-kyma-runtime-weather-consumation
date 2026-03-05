# criar namespace
nome: inicias do participante
`kubectl --kubeconfig="<caminho-kubeconfig-file>" create namespace <nome-namespace>`

# habilitar sidercar
`kubectl --kubeconfig="<caminho-kubeconfig-file>" label namespaces <nome-namespace> istio-injection=enabled`

## via dashboard
- acesse o namespace criado
- naveggue ate o menu Configuration>Secrets
- crie a secrect

nome: postgres-secret
postgres-user: spro-examples
postgres-password: <a senha esta disponivel na secrets: postgres-secrets do namespace default>


![secret-postgres-dashboard](secret-postgres-dashboard.png)
