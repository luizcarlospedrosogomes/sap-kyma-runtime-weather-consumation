# criar namespace
nome: inicias do participante
`kubectl --kubeconfig="<caminho-kubeconfig-file>" create namespace <nome-namespace>`

# habilitar sidercar
`kubectl --kubeconfig="<caminho-kubeconfig-file>" label namespaces <nome-namespace> istio-injection=enabled`

# statefulset postgres
Como vamos armazenar os dados do Postgres no cluster, vamos utilizar o StatefulSet. O StatefulSet é um recurso que permite que você crie e gerencie conjuntos de Pods com os mesmos dados, sempre mantendo o estado de todos os Pods em um único nó.

# volumes
Os volumes são usados para armazenar dados persistentes. Os volumes são criados e armazenados no armazenamento local do cluster.

# apply 
- cd .\03-postgres\

- criar secrets: postgres-secret no namespace criado
via dashboard
postgres-user: spro-examples
postgres-password: <gerar senha aleatoria>
![secret-postgres-dashboard](secret-postgres-dashboard.png)

- criar volume
`kubectl --kubeconfig="<caminho-para-o-arquivo>\spro-examples-kubeconfig.yaml"  apply -n <nome-namespace> -f postgres-persistent-volume.yaml`
![volume criado cli](volume-criado-cli.png)

- criar statefulset
`kubectl --kubeconfig="<caminho-para-o-arquivo>\spro-examples-kubeconfig.yaml"  apply -n <nome-namespace> -f postgres-16.3.yaml`
![statefulset criado cli](statefulset-criado-cli.png)

-criar serviço
`kubectl --kubeconfig="<caminho-para-o-arquivo>\spro-examples-kubeconfig.yaml" apply -n <nome-namespace> -f postgres-service.yaml`

# resultado
![postgres em execução](postgres-run-cluster.png)

# Descrição
## sidercar
O Istio sidecar controla o tráfego, segurança e observabilidade de um aplicativo. Dessa forma não ocorre uma comunicação dreta ao pod.
## volumes
Os volumes são usados para armazenar dados persistentes.
o link entre o pod do postgres e o volume é feito nesse trecho do arquivo postgres-16.3.yaml
```
      volumeMounts:
            - name: postgresdb
              mountPath: /data
         
      volumes:
        - name: postgresdb
          persistentVolumeClaim:
            claimName: postgres-data-pvc 
```
Esse trecho é usado como  referencia para uso do volume
```
 name: postgres-data-pvc
```
Esse trecho permite a implantação para leitura e escrita por um único nó do cluster.
```
accessModes: ["ReadWriteOnce"]
```

Esse trecho determina o tamanho do volume, no caso de 20GB.
```
  resources:
    requests:
      storage: 20Gi
```
## serviço
Cria um endpoint interno para o postgres