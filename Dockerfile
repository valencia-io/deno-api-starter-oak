FROM denoland/deno:1.20.1

EXPOSE 8000
RUN apt update && apt install -y curl
RUN mkdir -p /app
WORKDIR /app
COPY . .

USER deno
RUN deno cache app.ts
RUN deno task nessie -- --version
CMD ["deno", "task", "start"]