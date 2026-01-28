- npm i autocannon -g

set TOKEN=<TOKEN>

autocannon -c 80 -d 120 -H "Authorization=Bearer $TOKEN" https://spro-examples-weather-api.cfa1d98.kyma.ondemand.com/business-partners/partner-current/C001
