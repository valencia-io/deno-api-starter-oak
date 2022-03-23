FROM denoland/deno:1.20.1

EXPOSE 8000

RUN mkdir -p /app
WORKDIR /app
COPY . .

USER deno
RUN deno cache app.ts
CMD ["deno", "task", "start"]