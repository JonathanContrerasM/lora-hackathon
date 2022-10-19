# Prerequisites
You need nodejs and npm installed

# Setup
Clone repo
```
git@github.com:jvdassen/lora-hackathon.git
```
Checkout branch

```
git checkout vertical
```

Optional: If you want more datasets, make sure they are in the right format (see `04_10_2022.csv.json`), named correctly (ie start with date '04_10_2022.something') and only contains data for one day. For example, copy `trajectory.json` into two files containing packets for the respective days and name them appropriately. If the data is coming from TTN process it with `node mineDailyTrafficPerDeviceTTN 04_10_2022.csv.json 04_10_2022.csv.json`.

# "What" API

Install API dependencies

```
cd api
npm i
```

Start API

```
node simpleapi.js
```

# Frontend
With the APi running, go to `api/static/lorawan`.
Get the dependencies
```
cd api/static/lorawan
npm i
```

Start the frontend in dev mode
```
npm run serve
```
Now, the API and frontend should run on localhost. The CLI in the frontend will tell you where you can access the frontend.


# Changing things
If you want to change the host or port where a backend service is running, you can simply do it in the frontend `api/static/lorawan`
