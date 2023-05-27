# Simple SWR Polling

Two different examples

- fe: create an poll an individual process. The polling ends when the
  status is finish.
  - Pros:
    - only polls if live processes polled
  - Cons:
    - if many processes are create then multiple polls per process.
    - on initial load you'd have to set up the polls for each process
- f2: poll for all processes
  - Pros
    - easy to set up. 1 poll per session, works similar to websockets and easy to convert
  - Cons
    - never ending polling when the page is focused

## Start Server

cd server
npm install
node server.js

## Start FE individual polling

cd fe
npm install
npm run dev

## Start FE all processes polling

cd fe2
npm install
npm run dev
# swr-polling
