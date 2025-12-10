#!/bin/sh
set -e

GARAGE_CONTAINER="$1"
BUCKET_NAME="${S3_BUCKET:-tegonal-cv}"
KEY_NAME="${BUCKET_NAME}-key"
ENV_FILE="${2:-.env}"
MAX_RETRIES=5
RETRY_INTERVAL=2

echo "Waiting for Garage to be ready..."

# Wait for Garage to be fully operational
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  # Get node ID from garage status output (16 hex chars)
  NODE_ID=$(docker exec "$GARAGE_CONTAINER" /garage status 2>/dev/null | grep -oE '^[a-f0-9]{16}' | head -1 || true)
  if [ -n "$NODE_ID" ]; then
    echo "Garage is ready!"
    break
  fi
  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo "Waiting for Garage... (attempt $RETRY_COUNT/$MAX_RETRIES)"
  sleep $RETRY_INTERVAL
done

if [ -z "$NODE_ID" ]; then
  echo "Error: Could not get Garage node ID after $MAX_RETRIES attempts"
  echo "Please check if the Garage container is running: docker logs $GARAGE_CONTAINER"
  exit 1
fi

echo "Configuring Garage layout for node: ${NODE_ID}..."

# Check if layout already exists
LAYOUT_STATUS=$(docker exec "$GARAGE_CONTAINER" /garage layout show 2>/dev/null || true)
if echo "$LAYOUT_STATUS" | grep -q "No nodes"; then
  docker exec "$GARAGE_CONTAINER" /garage layout assign -z dc1 -c 10G "$NODE_ID"
  docker exec "$GARAGE_CONTAINER" /garage layout apply --version 1
  echo "Layout configured successfully"
else
  echo "Layout already configured"
fi

# Create bucket if it doesn't exist
echo "Creating bucket: $BUCKET_NAME"
docker exec "$GARAGE_CONTAINER" /garage bucket create "$BUCKET_NAME" 2>/dev/null || echo "Bucket may already exist"

# Check if key already exists
EXISTING_KEY=$(docker exec "$GARAGE_CONTAINER" /garage key info "$KEY_NAME" 2>/dev/null || true)

if echo "$EXISTING_KEY" | grep -q "Key ID:"; then
  echo "Key $KEY_NAME already exists"
  ACCESS_KEY=$(echo "$EXISTING_KEY" | grep "Key ID:" | awk '{print $3}')
  SECRET_KEY=$(echo "$EXISTING_KEY" | grep "Secret key:" | awk '{print $3}')
else
  echo "Creating new key: $KEY_NAME"
  KEY_OUTPUT=$(docker exec "$GARAGE_CONTAINER" /garage key create "$KEY_NAME")
  ACCESS_KEY=$(echo "$KEY_OUTPUT" | grep "Key ID:" | awk '{print $3}')
  SECRET_KEY=$(echo "$KEY_OUTPUT" | grep "Secret key:" | awk '{print $3}')
fi

# Grant permissions
echo "Granting permissions to bucket..."
docker exec "$GARAGE_CONTAINER" /garage bucket allow --read --write --owner "$BUCKET_NAME" --key "$KEY_NAME" 2>/dev/null || true

# Update .env file
if [ -f "$ENV_FILE" ]; then
  echo "Updating $ENV_FILE with S3 credentials..."

  # Create temp file
  TEMP_FILE=$(mktemp)

  # Update or add S3 variables
  grep -v "^S3_ACCESS_KEY_ID=" "$ENV_FILE" | grep -v "^S3_SECRET_ACCESS_KEY=" | grep -v "^S3_BUCKET=" | grep -v "^S3_ENDPOINT=" > "$TEMP_FILE" || true

  echo "" >> "$TEMP_FILE"
  echo "S3_ENDPOINT=http://localhost:3900" >> "$TEMP_FILE"
  echo "S3_BUCKET=$BUCKET_NAME" >> "$TEMP_FILE"
  echo "S3_ACCESS_KEY_ID=$ACCESS_KEY" >> "$TEMP_FILE"
  echo "S3_SECRET_ACCESS_KEY=$SECRET_KEY" >> "$TEMP_FILE"

  mv "$TEMP_FILE" "$ENV_FILE"
fi

echo ""
echo "=== Garage S3 Configuration ==="
echo "Endpoint: http://localhost:3900"
echo "Bucket: $BUCKET_NAME"
echo "Access Key ID: $ACCESS_KEY"
echo "Secret Access Key: $SECRET_KEY"
echo ""
echo "S3 credentials have been saved to $ENV_FILE"
