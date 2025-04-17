# Build main app package
FROM node:22 AS builder
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY ./ ./

RUN --mount=type=cache,target=/app/.yarn/cache yarn install
RUN yarn run build
RUN rm -rf "$(yarn cache clean)"
RUN rm -rf .git
RUN rm .env*

FROM node:22-slim AS runner
RUN apt-get update && \
  apt-get install -y curl gconf-service libasound2 libatk1.0-0 libc6 \
	libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 \
	libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
	libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
	libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 \
	libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
	fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder /app ./
COPY --from=builder /root/.cache /root/.cache

CMD yarn run start

EXPOSE 3000
