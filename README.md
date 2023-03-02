A boilerplate for react-native-cli projects.

# Get it running

## 1. Clone the repo

```bash
 git clone https://github.com/HachetAmaury/react-native-cli-0.70.7-boilerplate.git <your-project-name>
```

```bash
cd <your-project-name>
```

## 2. Rename the project

Let's say your project name is My Awesome App

### a. Rename the project with [react-native-rename](https://www.npmjs.com/package/react-native-rename)

```bash
npx react-native-rename "My Awesome App" -b "com.myawesomeapp"
```

### b. Edit /android/app/src/androidTest/java/com/travelapp/DetoxTest.java

```bash
package com.reactnativecliboilerplate; => package com.myawesomeapp;
```

### c. Edit .detoxrc.js

```bash
ReactNativeCliBoilerplate => MyAwesomeApp
```

### d. Reinstall pods

```bash
bundle install

npx pod-install

watchman watch-del-all
```

## 3. Install dependencies

```bash
yarn install
```

## 4. Install ios dependencies

```bash
bundle install

npx pod-install
```

# To develop a new component

## 1. Create a new folder in src/components

## 2. Create a new file with the name of your component

## 3. Create a new file with the name of your component + .stories.tsx

## 4. Run the storybook server

```bash
yarn storybook
```

## 5. Run the app on ios or android

Make sure that storybook is added inside the app

```js
// index.js

let RegisteredApp = App;
RegisteredApp = __DEV__ ? require('./storybook').default : App;
```

Then run the app

```bash
yarn ios
```

```bash
yarn android
```

Browse to http://localhost:7007 to see your component in the app

## 5. Create a new file with the name of your component + .test.tsx

## 6. Run the tests

```bash
yarn test:watch
```

Start developping your component in TDD testing the component with jest and storybook without having to run the app.

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

## 2. Styled Components

```bash
yarn add styled-components && yarn add -D @types/styled-components-react-native
```

Edit tsconfig.json to add this

```json
{
  (...)
  "compilerOptions": {
    "types": ["@types/styled-components-react-native"]
   }
}
```

You can now use styled components in your project

```js
import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: red;
`;

<StyledText>Hello</StyledText>;
```

## 3. Storybook

### Install Storybook

```bash
npx -p @storybook/cli sb init --type react_native
```

When asked press y to install storybook server

### To prevent this error :

```bash
RangeError: Maximum call stack size exceeded (native stack depth)
```

Change [this](https://stackoverflow.com/questions/71425926/storybook-react-native-ios-rangeerror-maximum-call-stack-size-exceeded-nat) in metro.config.js file :

```bash
// metro.config.js

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false, // <--- set this to false
      },
    }),
  },
};
```

### To prevent this async storage warning :

```bash
Starting Storybook v5.3.0, we require to manually pass an asyncStorage prop. Pass null to disable or use one from @react-native-community or react-native itself.\n\nMore info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#react-native-async-storage
```

Following [this](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#react-native-async-storage), install react-native-async-storage/async-storage :

```bash
yarn add  @react-native-async-storage/async-storage
```

And add this to storybook/index.js :

```js
// storybook/index.js

const StorybookUIRoot = getStorybookUI({
  (...)
  asyncStorage: require('@react-native-async-storage/async-storage').default,
});
```

### To fix futur error when launching the app on ios after using async-storage

```bash
cd ios && pod install
```

### To fix bug where the website was loading forever even when Android app was running with storybook

```js
// storybook/index.js
const StorybookUIRoot = getStorybookUI({
 (...)
 host: Platform.OS === 'android' ? '10.0.2.2' : '0.0.0.0'
});
```

### Import Storybook in your app

With React Native, storybook can be imported as a component or run in place of the app.

Edit index.js to import storybook and replace the app :

```js
// index.js

let RegisteredApp = App;
RegisteredApp = __DEV__ ? require('./storybook').default : App;
// ^ comment this line if you don't want to use Storybook

AppRegistry.registerComponent(appName, () => RegisteredApp);
```

### Import stories from any directory

Install react-native-storybook-loader

```bash
yarn add -D react-native-storybook-loader
```

Edit package.json

```json
{
  "scripts": {
    (...)
    "prestorybook": "rnstl"
  },
  (...)
  "config": {
    "react-native-storybook-loader": {
      "searchDir": ["./src/components"], // change with your directory
     "pattern": "**/*.stories.tsx", // change with your pattern
      "outputFile": "./storybook/storyLoader.js"
    }
  },
}
```

Edit storybook/index.js

```js

import { loadStories } from './storyLoader';

(...)

configure(() => {
    loadStories();
}, module);

```

Now running this command, storyLoader.js file will be created to import all stories from the 'searchDir' directory.

```bash
yarn prestorybook
```

[Source_01](https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/get-started/)
[Source_02](https://www.netguru.com/blog/storybook-in-react-native)
[Source_03](https://dev.to/risafj/setting-up-storybook-for-react-native-typescript-server-loader-ios-android-3b0i)

Create src/components/Button.tsx and add this

```js
/// src/components/Button.tsx

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Button = ({
  label,
  onPress,
  style,
  textColor = '#ffffff',
  backgroundColor = '#95C4CB',
  fill = false,
  ...rest
}: {
  label: string,
  onPress: () => void,
  style?: Object,
  textColor?: string,
  backgroundColor?: string,
  fill?: boolean,
}) => (
  <TouchableOpacity
    {...rest}
    onPress={onPress}
    activeOpacity={0.75}
    style={fill ? {flex: 1} : {}}
    testID="button">
    <View style={{...s.wrapper, ...{backgroundColor}, ...style}}>
      <Text style={{...s.label, ...{color: textColor}}}>{label}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;

const s = StyleSheet.create({
  wrapper: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
```

And a Button.stories.tsx file in ./src/components/stories/ directory

```js
// ./src/components/stories/Button.stories.tsx

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {object, text, color, boolean} from '@storybook/addon-knobs';
import Button from '../Button';

storiesOf('Button', module)
  .addDecorator(story => <View style={s.decorator}>{story()}</View>)
  // 👇 you can add multiple variants of component, here's variant with name 'default'
  .add('default', () => (
    <Button
      onPress={action('onPress')} // 👈 action
      // 👇 knobs
      label={text('label', 'Button label')}
      style={object('style')}
      textColor={color('textColor', '#ffffff')}
      backgroundColor={color('backgroundColor', '#95C4CB')}
      fill={boolean('fill', false)}
    />
  ));

const s = StyleSheet.create({
  decorator: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
```

After running

```bash
yarn storybook
```

storybook/storyLoader.js file will be created or updated

```js
function loadStories() {
  require('../src/components/Button/Button.stories');
}

const stories = ['../src/components/Button/Button.stories'];

module.exports = {
  loadStories,
  stories,
};
```

To run storybook and start developping you can now run those commands in different terminals :

```bash
yarn storybook
yarn start
yarn <platform>
```

Note that if you add a new story you have to run yarn prestorybook to update storyLoader.js file.

```bash
yarn prestorybook
```

When storybook is lauched on ios and/or android you can see the storybook UI on your browser at http://localhost:7007.
This UI is very useful to see all the stories and to test them.
Each change you make in the UI will be reflected in both app, selecting a story, changing some props...

## 4. React Native Testing Library

### Install

```bash
yarn add -D @testing-library/react-native @testing-library/jest-native @testing-library/jest-dom
```

Edit tsconfig.json

```json
{
  "extends": "@tsconfig/react-native/tsconfig.json",
  "compilerOptions": {
    "types": [
      (...)
      "@types/jest", // add this line
      "@testing-library/jest-dom" // add this line
      ]
  }
}

```

Create file setupTests.js at the root of the project

```js
import '@testing-library/jest-native/extend-expect';
```

Create jest.config.js

```js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/setupTests.js',
  ],
};
```

Edit package.json

```json
{
  "scripts": {
    (...)
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Create a test

Create a file Button.tests.tsx in ./src/components/\_\_tests\_\_/ directory

```js
// ./src/components/__tests__/Button.test.tsx

import React from 'react';

import {render, fireEvent} from '@testing-library/react-native';

import Button from '../Button';

describe('<Button />', () => {
  it('should render correctly with right text', () => {
    const {getByText} = render(
      <Button label="Button label" onPress={() => console.log('pressed')} />,
    );

    const button = getByText('Button label');

    expect(button).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <Button label="Button label" onPress={onPress} />,
    );

    fireEvent.press(getByTestId('button'));

    expect(onPress).toHaveBeenCalled();
  });

  it('should render correctly with fill', () => {
    const {getByTestId} = render(
      <Button
        label="Button label"
        onPress={() => console.log('pressed')}
        fill
      />,
    );

    const button = getByTestId('button');

    expect(button.props.style.flex).toEqual(1);
  });

  it('should display the correct text color', () => {
    const {getByText} = render(
      <Button
        label="Button label"
        onPress={() => console.log('pressed')}
        textColor="red"
      />,
    );

    const text = getByText('Button label');

    expect(text.props.style.color).toEqual('red');
  });

  it('should display the correct background color', () => {
    const {getByTestId} = render(
      <Button
        label="Button label"
        onPress={() => console.log('pressed')}
        backgroundColor="#95C4CB"
        style={{}}
      />,
    );

    const button = getByTestId('button');

    expect(button.children[0].props.style.backgroundColor).toEqual('#95C4CB');
  });

  it('should add the correct style', () => {
    const {getByTestId} = render(
      <Button
        label="Button label"
        onPress={() => console.log('pressed')}
        backgroundColor="#95C4CB"
        style={{
          borderWidth: 1,
          borderColor: 'red',
        }}
      />,
    );

    const button = getByTestId('button');

    expect(button.children[0].props.style.borderWidth).toEqual(1);
    expect(button.children[0].props.style.borderColor).toEqual('red');
  });
});
```

### Run tests

```bash
yarn test:watch
```

## 5. Detox E2E tests

Following the official [Detox](https://wix.github.io/Detox/docs/introduction/getting-started/) doc :

### Global install

```bash
yarn global add detox-cli
```

For mac users :

```bash
brew tap wix/brew
brew install applesimutils
```

### Install Detox in project

```bash
yarn add detox jest-circus -D
```

### Jest 29

```bash
yarn add "jest@^29" --dev
```

### Init detox

```bash
detox init
```

Thiw will create three files :

```bash
Created a file at path: .detoxrc.js
Created a file at path: e2e/jest.config.js
Created a file at path: e2e/starter.test.js
```

### Configure detox

Following the official [Detox](https://wix.github.io/Detox/docs/introduction/project-setup) doc :

Edit .detoxrc.js

#### 1. Change every occurence of "YOUR_APP" with the name of your app

To find the name of your app open package.json and look for "name" key /!\ the name must be the same in package.json and in xcode and IS CASE SENSITIVE

```js
(...)
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/YOUR_APP.app', // change this line 1x
      build: 'xcodebuild -workspace ios/YOUR_APP.xcworkspace -scheme YOUR_APP -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build' // change this line 2x
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/YOUR_APP.app', // change this line 1x
      build: 'xcodebuild -workspace ios/YOUR_APP.xcworkspace -scheme YOUR_APP -configuration Release -sdk iphonesimulator -derivedDataPath ios/build' // change this line 2x
    },
  (...)
```

#### 2. Change the device configs

By default Detox select an ios and an android emulator, replace with the one you prefer.

To find the available ios devices run :

```bash
xcrun simctl list devicetypes
```

To find the available android devices run :

```bash
emulator -list-avds
```

Once you get the names of your prefered ios and android emulator devices, replace the following lines in .detoxrc.js :

```js
 // ...
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 12', // change this line
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*', // any attached device
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_API_30_x86', // Change this line
      },
    },
  },
```

#### 3. Additionnal config for android

These are the files you need to create or edit :

- Build scripts:

```bash
  - android/build.gradle
  - android/app/build.gradle
```

- Native test code:

```bash
  - android/app/src/main/java/com/<your.package>/MainApplication.java
```

- Manifests:

```bash
  - android/app/src/main/AndroidManifest.xml
  - android/app/src/main/res/xml/network_security_config.xml
```

##### Build scripts

Edit android/build.gradle

```gradle
buildscript {
  ext {
    (...)
    minSdkVersion = 21 // Must be 18 or higher
    (...)
    kotlinVersion = 'X.Y.Z' // Add this line and replace with the version you want to use ( see next step )
  }
  dependencies {
    (...)
    classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion") // Add this line
  }
  allprojects {
    repositories {
    (...)
    maven { // Add this line
      url("$rootDir/../node_modules/detox/Detox-android") // Add this line
    } // Add this line
    (...)
  }
}
```

To find the version of kotlin you want to use, run :

Open Android Studio, go to Preferences > Languages & Frameworks > Kotlin and look at Current Kotlin plugin version field.

For example, 212-1.6.10-release-923-AS5457.46 means you have version 1.6.10.

Edit android/app/build.gradle

```js
android {
  (...)
  defaultConfig {
    (...)
    testBuildType System.getProperty('testBuildType', 'debug') // Add this line
    testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner' // Add this line
  }
  (...)

  buildTypes {
    release {
      (...)
      proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
      proguardFile "${rootProject.projectDir}/../node_modules/detox/android/detox/proguard-rules-app.pro" // Add this line
    }
  }
  (...)
  dependencies {
    (...)
    androidTestImplementation('com.wix:detox:+') // Add this line
    implementation 'androidx.appcompat:appcompat:1.1.0' // Add this line
    (...)
  }
  (...)
}
```

##### Auxiliary Android test

Create android/app/src/androidTest/java/com/(your.package)/DetoxTest.java

And add the following code, your package name is the name of your app in lowercase, you can find it in package.json in the name key.

Or you could copy and paste the first line from android/app/src/main/java/com/(your.package)/MainActivity.java.

```java
package com.<your.package>; // Change this

import com.wix.detox.Detox;
import com.wix.detox.config.DetoxConfig;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;
import androidx.test.rule.ActivityTestRule;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class DetoxTest {
    @Rule
    public ActivityTestRule<MainActivity> mActivityRule = new ActivityTestRule<>(MainActivity.class, false, false);

    @Test
    public void runDetoxTests() {
        DetoxConfig detoxConfig = new DetoxConfig();
        detoxConfig.idlePolicyConfig.masterTimeoutSec = 90;
        detoxConfig.idlePolicyConfig.idleResourceTimeoutSec = 60;
        detoxConfig.rnContextLoadTimeoutSec = (BuildConfig.DEBUG ? 180 : 60);

        Detox.runTests(mActivityRule, detoxConfig);
    }
}
```

##### Enabling unencrypted traffic for Detox

Create or edit the file android/app/src/main/res/xml/network_security_config.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">localhost</domain>
    </domain-config>
</network-security-config>
```

Edit android/app/src/main/AndroidManifest.xml

```xml
<manifest>
  <application
    (...)
    android:networkSecurityConfig="@xml/network_security_config">
  </application>
</manifest>
```

#### 4. Build the app for detox to test it

Android debug :

```bash
detox build --configuration android.emu.debug
```

Android release :

```bash
detox build --configuration android.emu.release
```

iOS debug :

```bash
detox build --configuration ios.sim.debug
```

iOS release :

```bash
detox build --configuration ios.sim.release
```

#### 5. Launch the test

```bash
 detox test --configuration android.emu.debug
```

```bash
 detox test --configuration ios.sim.debug
```

## 6. React Navigation

### 6.1. Installation

```bash
yarn add @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

```bash
npx pod-install
```

Edit MainActivity.java file which is located in android/app/src/main/java/(your package name)/MainActivity.java

```java
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  
  (...)
}
```

## Troubelshooting

Error :

```bash
/usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1452:in `rescue in block in activate_dependencies': Could not find 'rexml' (>= 0) among 115 total gem(s) (Gem::MissingSpecError)
Checked in 'GEM_PATH=/Users/amaury/.rvm/gems/ruby-2.7.5:/Users/amaury/.rvm/rubies/ruby-2.7.5/lib/ruby/gems/2.7.0:/usr/local/Cellar/cocoapods/1.12.0/libexec' at: /usr/local/Cellar/cocoapods/1.12.0/libexec/specifications/CFPropertyList-3.0.6.gemspec, execute `gem env` for more information
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1449:in `block in activate_dependencies'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1438:in `each'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1438:in `activate_dependencies'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1420:in `activate'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1456:in `block in activate_dependencies'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1438:in `each'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1438:in `activate_dependencies'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1420:in `activate'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1456:in `block in activate_dependencies'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1438:in `each'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1438:in `activate_dependencies'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems/specification.rb:1420:in `activate'
        from /usr/local/Cellar/ruby/3.2.1/lib/ruby/3.2.0/rubygems.rb:284:in `block in activate_bin_path'
```

ruby installed with rvm & cocoapods install with homebrew might be the problem
Homebrew is not able to find the ruby version installed with rvm

brew uninstall --force cocoapods
brew uninstall --force ruby
gem install cocoapods
