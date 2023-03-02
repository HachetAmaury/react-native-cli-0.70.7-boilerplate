# Detailed installation process

## Getting Started

## 1. React Native

Project initialized with react-native-cli

```bash
npx react-native@latest init ReactNativeCliBoilerplate --version="0.70.7"
```

## 1. Typescript

```bash
yarn add --dev @tsconfig/react-native @types/jest @types/react @types/react-test-renderer typescript @types/react-native
```

Create a tsconfig.json file in the root of your project.

```json
{
  "extends": "@tsconfig/react-native/tsconfig.json"
}
```

Change App.js => App.tsx

Relaunch the app

```bash
npx react-native start
```
