#getdynamodb.bat
curl -O https://d1ni2b6xgvw0s0.cloudfront.net/v2.x/dynamodb_local_latest.zip

powershell -Command "Expand-Archive -Path 'dynamodb_local_latest.zip' -DestinationPath 'dynamodb_local'"

cd dynamodb_local

java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 9911 
