# Website with OTP and chat app

### Install server dependencies

```bash
npm install
```
### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```
### License

This project is licensed under the MIT License

## App scaffolding

This is the suggested scaffolding for this project. You can take a look at:

```bash
.
├── src
│   ├── _type
│   │   └── ...   
│   ├── constants
│   │   └── ...
│   ├── controllers
│   │   └── ...
│   ├── entities
│   │   └── ...
│   ├── exception        (error message managemant)
│   │   └── ...
│   ├── interfaces
│   │   └── ...
│   ├── middleware
│   │   └── ...
│   ├── models
│   │   └── ...
│   ├── routes
│   │   └── ...
│   ├── utils
│   │   └── ...
│   ├── app.ts            (App root and is where the application will be configured.)
│   ├── server.ts         (HTTP server)
├── README.md
├── .nvmrc                (Locks down your Node version.)
├── package.json          (Your application’s package manifest.)
├── tsconfig.json         (The TypeScript project configuration.)
├── prod-path.js          (Tool used to run in production, translates ts-path and alias)
```

## Dependencies  

node-ts-api-base-master
node-ts-api-base