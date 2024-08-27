# Build main app package
FROM node:20 AS builder
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY ./ ./

RUN --mount=type=cache,target=/app/.yarn/cache yarn install
RUN yarn run build
RUN rm -rf "$(yarn cache clean)"
RUN rm -rf .git

FROM node:20-slim AS runner
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

COPY --from=builder /app ./

CMD yarn run start

EXPOSE 3000
