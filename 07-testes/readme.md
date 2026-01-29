# pacote NPM
- npm i autocannon -g

bash: set TOKEN=<TOKEN>
powershewl:  $env:TOKEN="<token>"

# teste simples
autocannon --renderStatusCodes -c 5 -d 30 -H "Authorization=Bearer $env:TOKEN" https://spro-examples-weather-api.cfa1d98.kyma.ondemand.com/business-partners/partner-current/C001

# teste para escalar
autocannon --renderStatusCodes -c 150 -d 120 -H "Authorization=Bearer $env:TOKEN" https://spro-examples-weather-api.cfa1d98.kyma.ondemand.com/business-partners/partner-current/C001