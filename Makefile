# directories
CLIENT_DIR=client
USER_MANAGEMENT_DIR=userManagementService
PRICING_SERVICE_DIR=pricingService

# install package dependencies
install:
	@echo "Running npm install in client directory..."
	cd ${CLIENT_DIR} && npm install
	@echo "Running npm install in userManagementService directory..."
	cd ${USER_MANAGEMENT_DIR} && npm install
	@echo "Running npm install in pricingService directory..."
	cd ${PRICING_SERVICE_DIR} && npm install
	@echo "npm install completed."

# start api-gateway
# @echo "build nginx api gateway"
# docker compose build
startApiGateway:
	@echo "start nginx api gateway"
	docker compose up -d

# stop api-gateway
stopApiGateway:
	@echo "stop nginx api gateway"
	docker compose down