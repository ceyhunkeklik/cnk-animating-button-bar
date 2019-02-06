# cnk-animating-button-bar

> An animated button bar component for React

[![NPM](https://img.shields.io/npm/v/cnk-animating-button-bar.svg)](https://www.npmjs.com/package/cnk-animating-button-bar)

## Install

```bash
npm install --save cnk-animating-button-bar
```

## Usage

```tsx
import React, { Component } from "react";

import ButtonBar, {
  MaterialDesignIcons as Icons
} from "cnk-animating-button-bar";

const buttons = [
  {
    icon: <Icons.MdLayers />,
    text: "Home",
    color: "#9C27B0"
  },
  {
    icon: <Icons.MdFavoriteBorder />,
    text: "Likes",
    color: "#E91E63"
  },
  {
    icon: <Icons.MdSearch />,
    text: "Search",
    color: "#FFC107"
  },
  {
    icon: <Icons.MdPermIdentity />,
    text: "Profile",
    color: "#2196F3"
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panelIndex: -1
    };
  }

  render() {
    const self = this;
    const { panelIndex } = self.state;
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {panelIndex === -1 && "Welcome"}
          {panelIndex === 0 && "Home"}
          {panelIndex === 1 && "Likes"}
          {panelIndex === 2 && "Search"}
          {panelIndex === 3 && "Profile"}
        </div>
        <ButtonBar
          buttons={buttons}
          defaultIndex={panelIndex}
          onSelectionChange={index => {
            self.setState({ panelIndex: index });
          }}
          enableDeselect={true}
        />
      </div>
    );
  }
}

```

## Preview

### Pure Component
<img src="https://raw.githubusercontent.com/ceyhunkeklik/cnk-animating-button-bar/master/cnkanimatedbuttonbarhorizontal.gif" width="445">

### Like Tab Panel
<img src="https://raw.githubusercontent.com/ceyhunkeklik/cnk-animating-button-bar/master/cnkanimatedbuttonbar.gif" height="600">

## License

MIT © [ceyhunkeklik](https://github.com/ceyhunkeklik)
